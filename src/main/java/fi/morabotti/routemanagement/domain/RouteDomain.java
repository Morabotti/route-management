package fi.morabotti.routemanagement.domain;

import fi.morabotti.routemanagement.model.Person;
import fi.morabotti.routemanagement.model.Route;
import fi.morabotti.routemanagement.model.Step;
import fi.morabotti.routemanagement.view.CreateRouteRequest;
import fi.morabotti.routemanagement.view.CreateStepRequest;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Singleton
public class RouteDomain {

    @Inject
    public RouteDomain() {
    }

    public Route createRoute(CreateRouteRequest request) {
        return Route.builder()
                .setId(0L)
                .setVehicle(request.getVehicle())
                .setSteps(Collections.emptyList())
                .setStartTime(request.getStartTime())
                .setDestination(request.getDestination())
                .setDeletedAt(null)
                .build();
    }

    public Step createStep(CreateStepRequest request) {
        return Step.builder()
                .setId(0L)
                .setRoute(null)
                .setPriority(request.getPriority())
                .setLocation(request.getLocation())
                .setStepItems(Collections.emptyList())
                .setDeletedAt(null)
                .build();
    }

    public List<Long> mapPersonIds(CreateStepRequest request) {
        return request.getStepItems()
                .stream()
                .map(Person::getId)
                .collect(Collectors.toList());
    }
}
