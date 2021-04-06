package fi.morabotti.routemanagement.view;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import fi.jubic.easyvalue.EasyValue;
import fi.morabotti.routemanagement.model.Location;
import fi.morabotti.routemanagement.model.Person;
import fi.morabotti.routemanagement.model.PrimaryLocation;

import java.util.List;
import java.util.stream.Collectors;

@EasyValue
@JsonDeserialize(builder = PersonView.Builder.class)
public abstract class PersonView {
    public abstract Long getId();

    public abstract String getName();

    public abstract List<Location> getPrimaryLocations();

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder extends EasyValue_PersonView.Builder {
    }

    public static PersonView of(Person person) {
        return PersonView.builder()
                .setId(person.getId())
                .setName(person.getName())
                .setPrimaryLocations(
                        person.getPrimaryLocations()
                                .stream()
                                .map(PrimaryLocation::getLocation)
                                .collect(Collectors.toList())
                )
                .build();
    }
}
