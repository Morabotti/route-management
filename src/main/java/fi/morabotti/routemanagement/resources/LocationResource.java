package fi.morabotti.routemanagement.resources;

import fi.morabotti.routemanagement.controller.LocationController;
import fi.morabotti.routemanagement.model.Location;
import fi.morabotti.routemanagement.model.PrimaryLocation;
import fi.morabotti.routemanagement.view.CreateLocationRequest;
import fi.morabotti.routemanagement.view.PaginationQuery;
import fi.morabotti.routemanagement.view.PaginationResponse;
import fi.morabotti.routemanagement.view.PositionQuery;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.BeanParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/location")
@Singleton
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class LocationResource {
    private final LocationController locationController;

    @Inject
    public LocationResource(LocationController locationController) {
        this.locationController = locationController;
    }

    @GET
    @Path("/map")
    public List<Location> getLocationsWithPosition(
            @BeanParam PositionQuery positionQuery
    ) {
        return locationController.getLocations(positionQuery);
    }

    @GET
    public PaginationResponse<Location> getLocationsWithPagination(
            @BeanParam PaginationQuery paginationQuery
    ) {
        return locationController.getLocations(paginationQuery);
    }

    @POST
    public Location createLocation(CreateLocationRequest request) {
        return locationController.createLocation(request);
    }

    @GET
    @Path("/{locationId}")
    public Location getLocationById(
            @PathParam("locationId") Long id
    ) {
        return locationController.getLocationById(id);
    }

    @PUT
    @Path("/{locationId}")
    public Location editLocation(
            @PathParam("locationId") Long id,
            Location location
    ) {
        return locationController.updateLocation(id, location);
    }

    @DELETE
    @Path("/{locationId}")
    public Response deleteLocation(
            @PathParam("locationId") Long id
    ) {
        locationController.deleteLocation(id);
        return Response.ok().build();
    }

    @POST
    @Path("/{locationId}/primary/{personId}")
    public PrimaryLocation addLocationAsPrimary(
            @PathParam("locationId") Long locationId,
            @PathParam("personId") Long personId
    ) {
        return locationController.addPrimaryLocation(locationId, personId);
    }

    @DELETE
    @Path("/{locationId}/primary/{personId}")
    public Response deleteLocationAsPrimary(
            @PathParam("locationId") Long locationId,
            @PathParam("personId") Long personId
    ) {
        locationController.deletePrimaryLocation(locationId, personId);
        return Response.ok().build();
    }
}
