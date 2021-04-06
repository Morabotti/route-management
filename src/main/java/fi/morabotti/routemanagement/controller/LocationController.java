package fi.morabotti.routemanagement.controller;

import fi.morabotti.routemanagement.dao.LocationDao;
import fi.morabotti.routemanagement.model.Location;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.InternalServerErrorException;
import javax.ws.rs.NotFoundException;
import java.util.List;

@Singleton
public class LocationController {
    private final LocationDao locationDao;

    @Inject
    public LocationController(
            LocationDao locationDao
    ) {
        this.locationDao = locationDao;
    }

    public List<Location> getLocations() {
        return locationDao.fetchLocations();
    }

    public Location getLocationById(Long id) {
        return locationDao.getById(id)
                .get()
                .orElseThrow(NotFoundException::new);
    }

    public Location createLocation(Location location) {
        return locationDao.create(location)
                .flatMap(locationDao::getById)
                .get()
                .orElseThrow(BadRequestException::new);
    }

    public Void deleteLocation(Long id) {
        return locationDao.delete(id).get();
    }

    public Location updateLocation(Long id, Location location) {
        return locationDao.update(id, location)
                .get()
                .orElseThrow(InternalServerErrorException::new);
    }
}
