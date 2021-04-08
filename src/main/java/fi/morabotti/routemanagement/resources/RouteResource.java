package fi.morabotti.routemanagement.resources;

import fi.morabotti.routemanagement.controller.RouteController;
import fi.morabotti.routemanagement.model.Route;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/route")
@Singleton
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RouteResource {
    private final RouteController routeController;

    @Inject
    public RouteResource(RouteController routeController) {
        this.routeController = routeController;
    }

    @GET
    public List<Route> getRoutes() {
        return routeController.getRoutes();
    }

    @POST
    public Route createRoute(Route route) {
        return routeController.createRoute(route);
    }

    @GET
    @Path("/{routeId}")
    public Route getRouteById(
            @PathParam("routeId") Long id
    ) {
        return routeController.getRouteById(id);
    }

    @DELETE
    @Path("/{routeId}")
    public Response deleteRoute(
            @PathParam("routeId") Long id
    ) {
        routeController.deleteRoute(id);
        return Response.ok().build();
    }
}
