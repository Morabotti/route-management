package fi.morabotti.routemanagement.dao;

import fi.jubic.easyutils.transactional.TransactionProvider;
import fi.jubic.easyutils.transactional.Transactional;
import fi.morabotti.routemanagement.configuration.ApplicationConfiguration;
import fi.morabotti.routemanagement.db.Keys;
import fi.morabotti.routemanagement.model.Location;
import fi.morabotti.routemanagement.model.Person;
import fi.morabotti.routemanagement.model.PrimaryLocation;
import fi.morabotti.routemanagement.utils.LocalDateMapper;
import fi.morabotti.routemanagement.view.PaginationQuery;
import fi.morabotti.routemanagement.view.SearchQuery;
import org.jooq.Condition;
import org.jooq.Configuration;
import org.jooq.DSLContext;
import org.jooq.Record;
import org.jooq.SelectJoinStep;
import org.jooq.impl.DSL;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static fi.morabotti.routemanagement.db.tables.Location.LOCATION;
import static fi.morabotti.routemanagement.db.tables.Person.PERSON;
import static fi.morabotti.routemanagement.db.tables.PrimaryLocation.PRIMARY_LOCATION;

@Singleton
public class PersonDao {
    private final Configuration jooqConfiguration;
    private final TransactionProvider<DSLContext> transactionProvider;

    @Inject
    public PersonDao(
            ApplicationConfiguration applicationConfiguration,
            TransactionProvider<DSLContext> transactionProvider
    ) {
        this.jooqConfiguration = applicationConfiguration.getJooqConfiguration().getConfiguration();
        this.transactionProvider = transactionProvider;
    }

    public Long fetchPersonsLength(SearchQuery searchQuery) {
        return DSL.using(jooqConfiguration)
                .selectCount()
                .from(PERSON)
                .leftJoin(PRIMARY_LOCATION).onKey(Keys.FK_PRIMARY_LOCATION_PERSON)
                .leftJoin(LOCATION).onKey(Keys.FK_PRIMARY_LOCATION_LOCATION)
                .where(getConditions(searchQuery))
                .fetchOne(0, Long.class);
    }

    public List<Person> fetchPersons(
            PaginationQuery paginationQuery,
            SearchQuery searchQuery
    ) {
        return selectPerson(DSL.using(jooqConfiguration))
                .where(getConditions(searchQuery))
                .limit(paginationQuery.getLimit().orElse(20))
                .offset(paginationQuery.getOffset().orElse(0))
                .fetch()
                .stream()
                .collect(
                        Person.mapper.collectingManyWithPrimaryLocations(
                                PrimaryLocation.mapper.withLocation(
                                        Location.mapper
                                )
                        )
                );
    }

    public Transactional<Optional<Person>, DSLContext> getById(Long id) {
        return Transactional.of(
                context -> selectPerson(context)
                        .where(PERSON.ID.eq(id))
                        .and(PERSON.DELETED_AT.isNull())
                        .fetch()
                        .stream()
                        .collect(
                                Person.mapper.collectingWithPrimaryLocations(
                                        PrimaryLocation.mapper.withLocation(
                                                Location.mapper
                                        )
                                )
                        ),
                transactionProvider
        );
    }

    public Transactional<Long, DSLContext> create(Person person) {
        return Transactional.of(
                context -> context.insertInto(PERSON)
                        .set(
                                Person.mapper.write(
                                        context.newRecord(PERSON),
                                        person
                                )
                        )
                        .returning()
                        .fetchOne()
                        .get(PERSON.ID),
                transactionProvider
        );
    }

    public Transactional<Void, DSLContext> delete(Long id) {
        return Transactional.of(
                context -> {
                    context.update(PERSON)
                            .set(PERSON.DELETED_AT, LocalDateMapper.ofInstant(Instant.now()))
                            .where(PERSON.ID.eq(id))
                            .execute();
                    return null;
                },
                transactionProvider
        );
    }

    public Transactional<Optional<Person>, DSLContext> update(Long id, Person person) {
        return Transactional.of(
                context -> context.update(PERSON)
                        .set(Person.mapper.write(
                                context.newRecord(PERSON),
                                person
                        ))
                        .where(PERSON.ID.eq(id))
                        .and(PERSON.DELETED_AT.isNull())
                        .execute(),
                transactionProvider
        ).flatMap(ignored -> getById(person.getId()));
    }

    private SelectJoinStep<Record> selectPerson(DSLContext context) {
        return context.select(
                PERSON.asterisk(),
                PRIMARY_LOCATION.asterisk(),
                LOCATION.asterisk()
        )
                .from(PERSON)
                .leftJoin(PRIMARY_LOCATION).onKey(Keys.FK_PRIMARY_LOCATION_PERSON)
                .leftJoin(LOCATION).onKey(Keys.FK_PRIMARY_LOCATION_LOCATION);
    }

    private Condition getConditions(SearchQuery searchQuery) {
        return Optional.of(PERSON.DELETED_AT.isNull().and(LOCATION.DELETED_AT.isNull()))
                .map(condition -> searchQuery.getSearch()
                        .map(search -> condition.and(PERSON.NAME.contains(search))
                                .or(LOCATION.ADDRESS.contains(search))
                                .or(LOCATION.CITY.contains(search))
                                .or(LOCATION.ZIP.contains(search))
                        )
                        .orElse(condition)
                )
                .get();
    }
}