package fi.morabotti.routemanagement.domain;

import fi.morabotti.routemanagement.model.Person;
import fi.morabotti.routemanagement.view.PersonView;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class AssetDomain {

    @Inject
    public AssetDomain() {
    }

    public Person createPerson(PersonView personView) {
        return Person.builder()
                .setId(personView.getId())
                .setName(personView.getName())
                .build();
    }
}
