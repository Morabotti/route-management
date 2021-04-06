package fi.morabotti.routemanagement.resources;

import fi.morabotti.routemanagement.controller.AssetController;
import fi.morabotti.routemanagement.model.Person;
import fi.morabotti.routemanagement.model.Vehicle;
import fi.morabotti.routemanagement.view.CreatePersonRequest;

import javax.inject.Inject;
import javax.inject.Singleton;
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
    @Path("/vehicle")
    public List<Vehicle> getVehicles() {
        return assetController.getVehicles();
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
    public List<Person> getPersons() {
        return assetController.getPersons();
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
