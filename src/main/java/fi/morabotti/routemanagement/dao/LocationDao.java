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
import fi.morabotti.routemanagement.view.PositionQuery;
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
public class LocationDao {
    private final Configuration jooqConfiguration;
    private final TransactionProvider<DSLContext> transactionProvider;

    @Inject
    public LocationDao(
            ApplicationConfiguration applicationConfiguration,
            TransactionProvider<DSLContext> transactionProvider
    ) {
        this.jooqConfiguration = applicationConfiguration.getJooqConfiguration().getConfiguration();
        this.transactionProvider = transactionProvider;
    }

    public Long fetchLocationsLength(SearchQuery searchQuery) {
        return DSL.using(jooqConfiguration)
                .selectCount()
                .from(LOCATION)
                .where(getConditions(searchQuery))
                .fetchOne(0, Long.class);
    }

    public List<Location> fetchLocations(PositionQuery positionQuery) {
        return DSL.using(jooqConfiguration)
                .select(LOCATION.asterisk())
                .from(LOCATION)
                .where(getConditions(positionQuery))
                .fetch()
                .stream()
                .collect(Location.mapper);
    }

    public List<Location> fetchLocations(PaginationQuery paginationQuery, SearchQuery searchQuery) {
        return selectLocation(DSL.using(jooqConfiguration))
                .where(getConditions(searchQuery))
                .limit(paginationQuery.getLimit().orElse(20))
                .offset(paginationQuery.getOffset().orElse(0))
                .fetch()
                .stream()
                .collect(
                        Location.mapper.collectingManyWithPrimaryPersons(
                                PrimaryLocation.mapper.withPerson(
                                        Person.mapper
                                )
                        )
                );
    }

    public Transactional<Optional<Location>, DSLContext> getById(Long id) {
        return Transactional.of(
                context -> selectLocation(context)
                        .where(LOCATION.ID.eq(id))
                        .and(LOCATION.DELETED_AT.isNull())
                        .fetch()
                        .stream()
                        .collect(
                                Location.mapper.collectingWithPrimaryPersons(
                                        PrimaryLocation.mapper.withPerson(
                                                Person.mapper
                                        )
                                )
                        ),
                transactionProvider
        );
    }

    public Transactional<Long, DSLContext> create(Location location) {
        return Transactional.of(
                context -> context.insertInto(LOCATION)
                        .set(
                                Location.mapper.write(
                                        context.newRecord(LOCATION),
                                        location
                                )
                        )
                        .returning()
                        .fetchOne()
                        .get(LOCATION.ID),
                transactionProvider
        );
    }

    public Transactional<Void, DSLContext> delete(Long id) {
        return Transactional.of(
                context -> {
                    context.update(LOCATION)
                            .set(LOCATION.DELETED_AT, LocalDateMapper.ofInstant(Instant.now()))
                            .where(LOCATION.ID.eq(id))
                            .execute();
                    return null;
                },
                transactionProvider
        );
    }

    public Transactional<Optional<Location>, DSLContext> update(Long id, Location location) {
        return Transactional.of(
                context -> context.update(LOCATION)
                        .set(Location.mapper.write(
                                context.newRecord(LOCATION),
                                location
                        ))
                        .where(LOCATION.ID.eq(id))
                        .and(LOCATION.DELETED_AT.isNull())
                        .execute(),
                transactionProvider
        ).flatMap(ignored -> getById(location.getId()));
    }

    private SelectJoinStep<Record> selectLocation(DSLContext context) {
        return context.select(
                LOCATION.asterisk(),
                PRIMARY_LOCATION.asterisk(),
                PERSON.asterisk()
        )
                .from(LOCATION)
                .leftJoin(PRIMARY_LOCATION).onKey(Keys.FK_PRIMARY_LOCATION_LOCATION)
                .leftJoin(PERSON).onKey(Keys.FK_PRIMARY_LOCATION_PERSON);
    }

    private Condition getConditions(PositionQuery query) {
        return LOCATION.DELETED_AT.isNull()
                .and(LOCATION.LATITUDE.between(query.getMinLatitude(), query.getMaxLatitude()))
                .and(LOCATION.LONGITUDE.between(query.getMinLongitude(), query.getMaxLongitude()));
    }

    private Condition getConditions(SearchQuery searchQuery) {
        return Optional.of(LOCATION.DELETED_AT.isNull())
                .map(condition -> searchQuery.getSearch()
                        .map(search -> condition.and(LOCATION.ADDRESS.contains(search))
                                .or(LOCATION.CITY.contains(search))
                                .or(LOCATION.ZIP.contains(search))
                        )
                        .orElse(condition)
                )
                .get();
    }
}