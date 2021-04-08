package fi.morabotti.routemanagement.controller;

import fi.morabotti.routemanagement.dao.RouteDao;
import fi.morabotti.routemanagement.dao.StepDao;
import fi.morabotti.routemanagement.dao.StepItemDao;
import fi.morabotti.routemanagement.model.Route;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.NotFoundException;
import java.util.List;

@Singleton
public class RouteController {
    private final RouteDao routeDao;
    private final StepDao stepDao;
    private final StepItemDao stepItemDao;

    @Inject
    public RouteController(
            RouteDao routeDao,
            StepDao stepDao,
            StepItemDao stepItemDao
    ) {
        this.routeDao = routeDao;
        this.stepDao = stepDao;
        this.stepItemDao = stepItemDao;
    }

    public List<Route> getRoutes() {
        return routeDao.fetchRoutes();
    }

    public Route getRouteById(Long id) {
        return routeDao.getById(id)
                .get()
                .orElseThrow(NotFoundException::new);
    }

    public Route createRoute(Route route) {
        return routeDao.create(route)
                .flatMap(routeDao::getById)
                .get()
                .orElseThrow(BadRequestException::new);
    }

    public Void deleteRoute(Long id) {
        return routeDao.delete(id)
                .flatMap(ignored -> stepDao.deleteByRouteId(id))
                .flatMap(ignored -> stepItemDao.deleteByRouteId(id))
                .get();
    }
}
