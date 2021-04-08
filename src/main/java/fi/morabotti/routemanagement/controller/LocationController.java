package fi.morabotti.routemanagement.controller;

import fi.morabotti.routemanagement.dao.LocationDao;
import fi.morabotti.routemanagement.dao.PrimaryLocationDao;
import fi.morabotti.routemanagement.model.Location;
import fi.morabotti.routemanagement.model.PrimaryLocation;
import fi.morabotti.routemanagement.view.PrimaryLocationQuery;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.InternalServerErrorException;
import javax.ws.rs.NotFoundException;
import java.util.List;

@Singleton
public class LocationController {
    private final LocationDao locationDao;
    private final PrimaryLocationDao primaryLocationDao;

    @Inject
    public LocationController(
            LocationDao locationDao,
            PrimaryLocationDao primaryLocationDao
    ) {
        this.locationDao = locationDao;
        this.primaryLocationDao = primaryLocationDao;
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

    public void deleteLocation(Long id) {
        locationDao.delete(id)
                .flatMap(ignored ->
                        primaryLocationDao.delete(
                                new PrimaryLocationQuery()
                                        .withLocationId(id)
                        )
                )
                .get();
    }

    public Location updateLocation(Long id, Location location) {
        return locationDao.update(id, location)
                .get()
                .orElseThrow(InternalServerErrorException::new);
    }

    public void deletePrimaryLocation(Long locationId, Long personId) {
        primaryLocationDao.delete(
                new PrimaryLocationQuery(
                        null,
                        personId,
                        locationId
                )
        ).get();
    }

    public PrimaryLocation addPrimaryLocation(Long locationId, Long personId) {
        return primaryLocationDao.create(locationId, personId)
                .flatMap(primaryLocationDao::getById)
                .get()
                .orElseThrow(BadRequestException::new);
    }



}
