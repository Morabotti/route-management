package fi.morabotti.routemanagement.controller;

import fi.morabotti.routemanagement.dao.PersonDao;
import fi.morabotti.routemanagement.dao.PrimaryLocationDao;
import fi.morabotti.routemanagement.dao.VehicleDao;
import fi.morabotti.routemanagement.domain.AssetDomain;
import fi.morabotti.routemanagement.model.Location;
import fi.morabotti.routemanagement.model.Vehicle;
import fi.morabotti.routemanagement.view.PersonView;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.InternalServerErrorException;
import javax.ws.rs.NotFoundException;
import java.util.List;
import java.util.stream.Collectors;

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

    public List<Vehicle> getVehicles() {
        return vehicleDao.fetchVehicles();
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

    public Void deleteVehicle(Long id) {
        return vehicleDao.delete(id).get();
    }

    public Vehicle updateVehicle(Long id, Vehicle vehicle) {
        return vehicleDao.update(id, vehicle)
                .get()
                .orElseThrow(InternalServerErrorException::new);
    }

    public List<PersonView> getPersons() {
        return personDao.fetchPersons()
                .stream()
                .map(PersonView::of)
                .collect(Collectors.toList());
    }

    public PersonView getPersonById(Long id) {
        return PersonView.of(
                personDao.getById(id)
                        .get()
                        .orElseThrow(NotFoundException::new)
        );
    }

    public PersonView createPerson(PersonView personView) {
        return PersonView.of(
                personDao.create(assetDomain.createPerson(personView))
                        .peek(ignored -> primaryLocationDao.batchCreate(
                                personView.getPrimaryLocations()
                                        .stream()
                                        .map(Location::getId)
                                        .collect(Collectors.toList()),
                                ignored
                        ))
                        .flatMap(personDao::getById)
                        .get()
                        .orElseThrow(BadRequestException::new)
        );
    }

    public Void deletePerson(Long id) {
        return personDao.delete(id)
                .flatMap(ignored -> primaryLocationDao.deleteByPersonId(id))
                .get();
    }

    public PersonView updatePerson(Long id, PersonView personView) {
        return PersonView.of(
                personDao.update(id, assetDomain.createPerson(personView))
                        .get()
                        .orElseThrow(InternalServerErrorException::new)
        );
    }
}
