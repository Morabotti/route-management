package fi.morabotti.routemanagement.domain;

import fi.morabotti.routemanagement.model.Location;
import fi.morabotti.routemanagement.model.Person;
import fi.morabotti.routemanagement.view.CreateLocationRequest;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Singleton
public class LocationDomain {

    @Inject
    public LocationDomain() {
    }

    public Location createLocation(CreateLocationRequest request) {
        return Location.builder()
                .setId(0L)
                .setAddress(request.getAddress())
                .setCity(request.getCity())
                .setLatitude(request.getLatitude())
                .setLongitude(request.getLongitude())
                .setZip(request.getZip())
                .setPrimaryPersons(Collections.emptyList())
                .setDeletedAt(null)
                .build();
    }

    public List<Long> mapPersonIds(CreateLocationRequest request) {
        return request.getPrimaryPersons()
                .stream()
                .map(Person::getId)
                .collect(Collectors.toList());
    }
}
