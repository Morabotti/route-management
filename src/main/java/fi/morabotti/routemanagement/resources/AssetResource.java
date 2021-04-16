package fi.morabotti.routemanagement.resources;

import fi.morabotti.routemanagement.controller.AssetController;
import fi.morabotti.routemanagement.model.Person;
import fi.morabotti.routemanagement.model.Vehicle;
import fi.morabotti.routemanagement.view.CreatePersonRequest;
import fi.morabotti.routemanagement.view.PaginationQuery;
import fi.morabotti.routemanagement.view.PaginationResponse;
import fi.morabotti.routemanagement.view.SearchQuery;

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

@Path("/asset")
@Singleton
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AssetResource {
    private final AssetController assetController;

    @Inject
    public AssetResource(AssetController assetController) {
        this.assetController = assetController;
    }

    @GET
    @Path("/vehicle/taken/{licenseNumber}")
    public Boolean isLicenseNumberTaken(
            @PathParam("licenseNumber") String licenseNumber
    ) {
        return assetController.isVehicleLicenseNumberTaken(licenseNumber);
    }

    @GET
    @Path("/vehicle")
    public PaginationResponse<Vehicle> getVehicles(
            @BeanParam PaginationQuery paginationQuery,
            @BeanParam SearchQuery searchQuery
    ) {
        return assetController.getVehicles(paginationQuery, searchQuery);
    }

    @POST
    @Path("/vehicle")
    public Vehicle createVehicle(Vehicle vehicle) {
        return assetController.createVehicle(vehicle);
    }

    @GET
    @Path("/vehicle/{vehicleId}")
    public Vehicle getVehicleById(
            @PathParam("vehicleId") Long id
    ) {
        return assetController.getVehicleById(id);
    }

    @PUT
    @Path("/vehicle/{vehicleId}")
    public Vehicle editVehicle(
            @PathParam("vehicleId") Long id,
            Vehicle vehicle
    ) {
        return assetController.updateVehicle(id, vehicle);
    }

    @DELETE
    @Path("/vehicle/{vehicleId}")
    public Response deleteVehicle(
            @PathParam("vehicleId") Long id
    ) {
        assetController.deleteVehicle(id);
        return Response.ok().build();
    }

    @GET
    @Path("/person")
    public PaginationResponse<Person> getPersons(
            @BeanParam PaginationQuery paginationQuery,
            @BeanParam SearchQuery searchQuery
    ) {
        return assetController.getPersons(paginationQuery, searchQuery);
    }

    @POST
    @Path("/person")
    public Person createPerson(CreatePersonRequest request) {
        return assetController.createPerson(request);
    }

    @GET
    @Path("/person/{personId}")
    public Person getPersonById(@PathParam("personId") Long id) {
        return assetController.getPersonById(id);
    }

    @PUT
    @Path("/person/{personId}")
    public Person editPerson(
            @PathParam("personId") Long id,
            Person person
    ) {
        return assetController.updatePerson(id, person);
    }

    @DELETE
    @Path("/person/{personId}")
    public Response deletePerson(@PathParam("personId") Long id) {
        assetController.deletePerson(id);
        return Response.ok().build();
    }
}
