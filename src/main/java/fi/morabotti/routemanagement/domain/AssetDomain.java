package fi.morabotti.routemanagement.domain;

import fi.morabotti.routemanagement.model.Person;
import fi.morabotti.routemanagement.view.CreatePersonRequest;

import javax.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class AssetDomain {

    @Inject
    public AssetDomain() {
    }

    public Person createPerson(CreatePersonRequest personRequest) {
        return Person.builder()
                .setId(0L)
                .setName(personRequest.getName())
                .build();
    }
}
