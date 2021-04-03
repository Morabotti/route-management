package fi.morabotti.routemanagement.controller;

import fi.morabotti.routemanagement.dao.PersonDao;
import fi.morabotti.routemanagement.dao.VehicleDao;
import fi.morabotti.routemanagement.model.Person;
import fi.morabotti.routemanagement.model.Vehicle;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.InternalServerErrorException;
import javax.ws.rs.NotFoundException;
import java.util.List;

@Singleton
public class AssetController {
    private final PersonDao personDao;
    private final VehicleDao vehicleDao;

    @Inject
    public AssetController(
            PersonDao personDao,
            VehicleDao vehicleDao
    ) {
        this.personDao = personDao;
        this.vehicleDao = vehicleDao;
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

    public List<Person> getPersons() {
        return personDao.fetchPersons();
    }

    public Person getPersonById(Long id) {
        return personDao.getById(id)
                .get()
                .orElseThrow(NotFoundException::new);
    }

    public Person createPerson(Person person) {
        return personDao.create(person)
                .flatMap(personDao::getById)
                .get()
                .orElseThrow(BadRequestException::new);
    }

    public Void deletePerson(Long id) {
        return personDao.delete(id).get();
    }

    public Person updatePerson(Long id, Person person) {
        return personDao.update(id, person)
                .get()
                .orElseThrow(InternalServerErrorException::new);
    }
}
