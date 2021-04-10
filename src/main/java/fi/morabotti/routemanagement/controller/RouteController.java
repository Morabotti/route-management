package fi.morabotti.routemanagement.controller;

import fi.morabotti.routemanagement.dao.RouteDao;
import fi.morabotti.routemanagement.dao.StepDao;
import fi.morabotti.routemanagement.dao.StepItemDao;
import fi.morabotti.routemanagement.domain.RouteDomain;
import fi.morabotti.routemanagement.model.Route;
import fi.morabotti.routemanagement.model.Step;
import fi.morabotti.routemanagement.view.CreateRouteRequest;
import fi.morabotti.routemanagement.view.CreateStepRequest;
import fi.morabotti.routemanagement.view.StepItemQuery;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.InternalServerErrorException;
import javax.ws.rs.NotFoundException;
import java.util.List;

@Singleton
public class RouteController {
    private final RouteDao routeDao;
    private final StepDao stepDao;
    private final StepItemDao stepItemDao;

    private final RouteDomain routeDomain;

    @Inject
    public RouteController(
            RouteDao routeDao,
            StepDao stepDao,
            StepItemDao stepItemDao,
            RouteDomain routeDomain
    ) {
        this.routeDao = routeDao;
        this.stepDao = stepDao;
        this.stepItemDao = stepItemDao;
        this.routeDomain = routeDomain;
    }

    public List<Route> getRoutes() {
        return routeDao.fetchRoutes();
    }

    public Route getRouteById(Long id) {
        return routeDao.getById(id)
                .get()
                .orElseThrow(NotFoundException::new);
    }

    public Route createRoute(CreateRouteRequest request) {
        return routeDao.create(
                routeDomain.createRoute(request)
        )
                .flatMap(routeDao::getById)
                .get()
                .orElseThrow(BadRequestException::new);
    }

    public void deleteRoute(Long id) {
        routeDao.delete(id)
                .flatMap(ignored -> stepDao.deleteByRouteId(id))
                .flatMap(ignored -> stepItemDao.delete(
                                new StepItemQuery().withRouteId(id),
                                false
                        )
                )
                .get();
    }

    public Route updateRoute(Long id, Route route) {
        return routeDao.update(id, route)
                .get()
                .orElseThrow(InternalServerErrorException::new);
    }

    public Route createStep(CreateStepRequest request, Long routeId) {
        return stepDao.create(
                routeDomain.createStep(request),
                routeId
        )
                .peek(stepId -> stepItemDao.batchCreate(
                                routeDomain.mapPersonIds(request),
                                stepId
                        )
                )
                .flatMap(routeDao::getById)
                .get()
                .orElseThrow(BadRequestException::new);
    }

    public Route deleteStep(Long routeId, Long stepId) {
        return stepDao.deleteById(stepId)
                .flatMap(ignored -> stepItemDao.delete(
                                new StepItemQuery().withStepId(stepId),
                                true
                        )
                )
                .flatMap(ignored -> routeDao.getById(routeId))
                .get()
                .orElseThrow(InternalServerErrorException::new);
    }

    public Route updateStep(Long routeId, Long stepId, Step step) {
        return stepDao.update(routeId, stepId, step)
                .flatMap(ignored -> routeDao.getById(routeId))
                .get()
                .orElseThrow(InternalServerErrorException::new);
    }

    public Step addStepItemToStep(Long stepId, Long personId) {
        return stepItemDao.create(personId, stepId)
                .flatMap(i -> stepDao.getById(stepId))
                .get()
                .orElseThrow(BadRequestException::new);
    }

    public Step deleteStepItemFromStep(Long stepId, Long personId) {
        return stepItemDao.delete(
                new StepItemQuery().withStepId(stepId).withPersonId(personId),
                true
        )
                .flatMap(i -> stepDao.getById(stepId))
                .get()
                .orElseThrow(BadRequestException::new);
    }
}
