package fi.morabotti.routemanagement.domain;

import fi.morabotti.routemanagement.model.Route;
import fi.morabotti.routemanagement.view.CreateRouteRequest;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class RouteDomain {

    @Inject
    public RouteDomain() {
    }

    public Route createRoute(CreateRouteRequest request) {
        return Route.builder()
                .setId(0L)
                .setVehicle(request.getVehicle())
                .setSteps(request.getSteps())
                .setStartTime(request.getStartTime())
                .setDestination(request.getDestination())
                .setDeletedAt(null)
                .build();
    }
}
