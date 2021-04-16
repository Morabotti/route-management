package fi.morabotti.routemanagement.controller;

import fi.morabotti.routemanagement.dao.LocationDao;
import fi.morabotti.routemanagement.dao.PrimaryLocationDao;
import fi.morabotti.routemanagement.domain.LocationDomain;
import fi.morabotti.routemanagement.model.Location;
import fi.morabotti.routemanagement.model.PrimaryLocation;
import fi.morabotti.routemanagement.view.CreateLocationRequest;
import fi.morabotti.routemanagement.view.PaginationQuery;
import fi.morabotti.routemanagement.view.PaginationResponse;
import fi.morabotti.routemanagement.view.PositionQuery;
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

    private final LocationDomain locationDomain;

    @Inject
    public LocationController(
            LocationDao locationDao,
            PrimaryLocationDao primaryLocationDao,
            LocationDomain locationDomain
    ) {
        this.locationDao = locationDao;
        this.primaryLocationDao = primaryLocationDao;
        this.locationDomain = locationDomain;
    }

    public List<Location> getLocations(PositionQuery positionQuery) {
        return locationDao.fetchLocations(positionQuery);
    }

    public PaginationResponse<Location> getLocations(PaginationQuery paginationQuery) {
        return PaginationResponse.create(
                locationDao.fetchLocations(paginationQuery),
                locationDao.fetchLocationsLength()
        );
    }

    public Location getLocationById(Long id) {
        return locationDao.getById(id)
                .get()
                .orElseThrow(NotFoundException::new);
    }

    public Location createLocation(CreateLocationRequest request) {
        return locationDao.create(
                locationDomain.createLocation(request)
        )
                .peek(locationId -> primaryLocationDao.batchCreateWithPersons(
                        locationDomain.mapPersonIds(request),
                        locationId
                ))
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
