package fi.morabotti.routemanagement.controller;

import fi.morabotti.routemanagement.dao.PersonDao;
import fi.morabotti.routemanagement.dao.PrimaryLocationDao;
import fi.morabotti.routemanagement.dao.VehicleDao;
import fi.morabotti.routemanagement.domain.AssetDomain;
import fi.morabotti.routemanagement.model.Person;
import fi.morabotti.routemanagement.model.Vehicle;
import fi.morabotti.routemanagement.view.CreatePersonRequest;
import fi.morabotti.routemanagement.view.PaginationQuery;
import fi.morabotti.routemanagement.view.PaginationResponse;
import fi.morabotti.routemanagement.view.PrimaryLocationQuery;
import fi.morabotti.routemanagement.view.SearchQuery;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.InternalServerErrorException;
import javax.ws.rs.NotFoundException;

@Singleton
public class AssetController {
    private final PersonDao personDao;
    private final VehicleDao vehicleDao;
    private final PrimaryLocationDao primaryLocationDao;

    private final AssetDomain assetDomain;

    @Inject
    public AssetController(
            PersonDao personDao,
            VehicleDao vehicleDao,
            PrimaryLocationDao primaryLocationDao,
            AssetDomain assetDomain
    ) {
        this.personDao = personDao;
        this.vehicleDao = vehicleDao;
        this.assetDomain = assetDomain;
        this.primaryLocationDao = primaryLocationDao;
    }

    public Boolean isVehicleLicenseNumberTaken(String licenseNumber) {
        return vehicleDao.getByLicenseNumber(licenseNumber)
                .get()
                .isPresent();
    }

    public PaginationResponse<Vehicle> getVehicles(
            PaginationQuery paginationQuery,
            SearchQuery searchQuery
    ) {
        return PaginationResponse.create(
                vehicleDao.fetchVehicles(paginationQuery, searchQuery),
                vehicleDao.fetchVehicleLength(searchQuery)
        );
    }

    public Vehicle getVehicleById(Long id) {
        return vehicleDao.getById(id)
                .get()
                .orElseThrow(NotFoundException::new);
    }

    public Vehicle createVehicle(Vehicle vehicle) {
        return vehicleDao.create(vehicle)
                .flatMap(vehicleDao::getById)
                .get()
                .orElseThrow(BadRequestException::new);
    }

    public void deleteVehicle(Long id) {
        vehicleDao.delete(id).get();
    }

    public Vehicle updateVehicle(Long id, Vehicle vehicle) {
        return vehicleDao.update(id, vehicle)
                .get()
                .orElseThrow(InternalServerErrorException::new);
    }

    public PaginationResponse<Person> getPersons(
            PaginationQuery paginationQuery,
            SearchQuery searchQuery
    ) {
        return PaginationResponse.create(
                personDao.fetchPersons(paginationQuery, searchQuery),
                personDao.fetchPersonsLength(searchQuery)
        );
    }

    public Person getPersonById(Long id) {
        return personDao.getById(id)
                .get()
                .orElseThrow(NotFoundException::new);
    }

    public Person createPerson(CreatePersonRequest request) {
        return personDao.create(assetDomain.createPerson(request))
                .peek(personId -> primaryLocationDao.batchCreateWithLocations(
                        assetDomain.mapLocationIds(request),
                        personId
                ))
                .flatMap(personDao::getById)
                .get()
                .orElseThrow(BadRequestException::new);
    }

    public void deletePerson(Long id) {
        personDao.delete(id)
                .flatMap(ignored ->
                        primaryLocationDao.delete(
                                new PrimaryLocationQuery().withPersonId(id)
                        )
                )
                .get();
    }

    public Person updatePerson(Long id, Person person) {
        return personDao.update(id, person)
                        .get()
                        .orElseThrow(InternalServerErrorException::new);
    }
}
