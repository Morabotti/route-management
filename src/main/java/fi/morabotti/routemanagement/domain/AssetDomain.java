package fi.morabotti.routemanagement.domain;

import fi.morabotti.routemanagement.model.Location;
import fi.morabotti.routemanagement.model.Person;
import fi.morabotti.routemanagement.view.CreatePersonRequest;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.List;
import java.util.stream.Collectors;

@Singleton
public class AssetDomain {

    @Inject
    public AssetDomain() {
    }

    public Person createPerson(CreatePersonRequest request) {
        return Person.builder()
                .setId(0L)
                .setName(request.getName())
                .build();
    }

    public List<Long> mapLocationIds(CreatePersonRequest request) {
        return request.getPrimaryLocations()
                .stream()
                .map(Location::getId)
                .collect(Collectors.toList());
    }
}
