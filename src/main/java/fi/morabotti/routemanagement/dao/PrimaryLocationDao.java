package fi.morabotti.routemanagement.dao;

import fi.jubic.easyutils.transactional.TransactionProvider;
import fi.jubic.easyutils.transactional.Transactional;
import fi.morabotti.routemanagement.configuration.ApplicationConfiguration;
import fi.morabotti.routemanagement.db.Keys;
import fi.morabotti.routemanagement.db.tables.records.PrimaryLocationRecord;
import fi.morabotti.routemanagement.model.Location;
import fi.morabotti.routemanagement.model.Person;
import fi.morabotti.routemanagement.model.PrimaryLocation;
import fi.morabotti.routemanagement.view.PrimaryLocationQuery;
import org.jooq.Condition;
import org.jooq.Configuration;
import org.jooq.DSLContext;

import javax.inject.Inject;
import javax.inject.Singleton;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static fi.morabotti.routemanagement.db.tables.Location.LOCATION;
import static fi.morabotti.routemanagement.db.tables.Person.PERSON;
import static fi.morabotti.routemanagement.db.tables.PrimaryLocation.PRIMARY_LOCATION;

@Singleton
public class PrimaryLocationDao {
    private final Configuration jooqConfiguration;
    private final TransactionProvider<DSLContext> transactionProvider;

    @Inject
    public PrimaryLocationDao(
            ApplicationConfiguration applicationConfiguration,
            TransactionProvider<DSLContext> transactionProvider
    ) {
        this.jooqConfiguration = applicationConfiguration.getJooqConfiguration().getConfiguration();
        this.transactionProvider = transactionProvider;
    }

    public Transactional<Optional<PrimaryLocation>, DSLContext> getById(Long id) {
        return Transactional.of(
                context -> context.select(
                        PRIMARY_LOCATION.asterisk(),
                        PERSON.asterisk(),
                        LOCATION.asterisk()
                )
                        .from(PRIMARY_LOCATION)
                        .leftJoin(PERSON).onKey(Keys.FK_PRIMARY_LOCATION_PERSON)
                        .leftJoin(LOCATION).onKey(Keys.FK_PRIMARY_LOCATION_LOCATION)
                        .where(PRIMARY_LOCATION.ID.eq(id))
                        .fetchOptional()
                        .flatMap(
                                PrimaryLocation.mapper
                                        .withLocation(Location.mapper)
                                        .withPerson(Person.mapper)::mapOptional
                        ),
                transactionProvider
        );
    }

    public Transactional<Long, DSLContext> create(
            Long personId,
            Long locationId
    ) {
        return Transactional.of(
                context -> context.insertInto(PRIMARY_LOCATION)
                        .set(PRIMARY_LOCATION.PERSON_ID, personId)
                        .set(PRIMARY_LOCATION.LOCATION_ID, locationId)
                        .returning()
                        .fetchOne()
                        .get(PRIMARY_LOCATION.ID),
                transactionProvider
        );
    }

    public Transactional<Void, DSLContext> batchDelete(List<Long> ids) {
        return Transactional.of(
                context -> {
                    context.deleteFrom(PRIMARY_LOCATION)
                            .where(PRIMARY_LOCATION.ID.in(ids))
                            .execute();
                    return null;
                },
                transactionProvider
        );
    }

    public Transactional<Void, DSLContext> batchCreateWithLocations(
            List<Long> locationIds,
            Long personId
    ) {
        return Transactional.of(
                context -> {
                    context.batchInsert(
                            locationIds
                                    .stream()
                                    .map(locationId -> new PrimaryLocationRecord(
                                            0L,
                                            personId,
                                            locationId
                                    ))
                                    .collect(Collectors.toList())
                    )
                            .execute();
                    return null;
                },
                transactionProvider
        );
    }

    public Transactional<Void, DSLContext> batchCreateWithPersons(
            List<Long> personIds,
            Long locationId
    ) {
        return Transactional.of(
                context -> {
                    context.batchInsert(
                            personIds
                                    .stream()
                                    .map(personId -> new PrimaryLocationRecord(
                                            0L,
                                            personId,
                                            locationId
                                    ))
                                    .collect(Collectors.toList())
                    )
                            .execute();
                    return null;
                },
                transactionProvider
        );
    }

    public Transactional<Void, DSLContext> delete(PrimaryLocationQuery query) {
        return Transactional.of(
                context -> {
                    context.delete(PRIMARY_LOCATION)
                            .where(getConditions(query))
                            .execute();
                    return null;
                },
                transactionProvider
        );
    }

    private Condition getConditions(PrimaryLocationQuery query) {
        return Optional.of(PRIMARY_LOCATION.ID.isNotNull())
                .map(condition -> query.getId()
                        .map(id -> condition.and(PRIMARY_LOCATION.ID.eq(id)))
                        .orElse(condition)
                )
                .map(condition -> query.getLocationId()
                        .map(id -> condition.and(PRIMARY_LOCATION.LOCATION_ID.eq(id)))
                        .orElse(condition)
                )
                .map(condition -> query.getPersonId()
                        .map(id -> condition.and(PRIMARY_LOCATION.PERSON_ID.eq(id)))
                        .orElse(condition)
                )
                .get();
    }
}
