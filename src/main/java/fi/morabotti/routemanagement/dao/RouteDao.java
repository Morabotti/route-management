package fi.morabotti.routemanagement.dao;

import fi.jubic.easyutils.transactional.TransactionProvider;
import fi.jubic.easyutils.transactional.Transactional;
import fi.morabotti.routemanagement.configuration.ApplicationConfiguration;
import fi.morabotti.routemanagement.db.Keys;
import fi.morabotti.routemanagement.model.Location;
import fi.morabotti.routemanagement.model.Person;
import fi.morabotti.routemanagement.model.Route;
import fi.morabotti.routemanagement.model.Step;
import fi.morabotti.routemanagement.model.StepItem;
import fi.morabotti.routemanagement.model.Vehicle;
import org.jooq.Configuration;
import org.jooq.DSLContext;
import org.jooq.Record;
import org.jooq.SelectJoinStep;
import org.jooq.impl.DSL;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static fi.morabotti.routemanagement.db.tables.Location.LOCATION;
import static fi.morabotti.routemanagement.db.tables.Person.PERSON;
import static fi.morabotti.routemanagement.db.tables.Route.ROUTE;
import static fi.morabotti.routemanagement.db.tables.Step.STEP;
import static fi.morabotti.routemanagement.db.tables.StepItem.STEP_ITEM;
import static fi.morabotti.routemanagement.db.tables.Vehicle.VEHICLE;

@Singleton
public class RouteDao {
    private final Configuration jooqConfiguration;
    private final TransactionProvider<DSLContext> transactionProvider;

    @Inject
    public RouteDao(
            ApplicationConfiguration applicationConfiguration,
            TransactionProvider<DSLContext> transactionProvider
    ) {
        this.jooqConfiguration = applicationConfiguration.getJooqConfiguration().getConfiguration();
        this.transactionProvider = transactionProvider;
    }

    public List<Route> fetchRoutes() {
        return selectRoute(DSL.using(jooqConfiguration))
                .where(ROUTE.DELETED_AT.isNull())
                .fetch()
                .stream()
                .collect(Route.mapper
                        .withDestination(Location.mapper)
                        .withVehicle(Vehicle.mapper)
                        .collectingManyWithSteps(
                                Step.mapper.withLocation(Location.mapper)
                                        .collectingManyWithStepItems(
                                                StepItem.mapper.withPerson(
                                                        Person.mapper
                                                )
                                        )
                        )
                );
    }

    public Transactional<Optional<Route>, DSLContext> getById(Long id) {
        return Transactional.of(
                context -> selectRoute(context)
                        .where(ROUTE.ID.eq(id))
                        .and(ROUTE.DELETED_AT.isNull())
                        .fetch()
                        .stream()
                        .collect(Route.mapper
                                .withDestination(Location.mapper)
                                .withVehicle(Vehicle.mapper)
                                .collectingWithSteps(
                                        Step.mapper.withLocation(Location.mapper)
                                                .collectingManyWithStepItems(
                                                        StepItem.mapper.withPerson(
                                                                Person.mapper
                                                        )
                                                )
                                )
                        ),
                transactionProvider
        );
    }

    public Transactional<Long, DSLContext> create(Route route) {
        return Transactional.of(
                context -> context.insertInto(ROUTE)
                        .set(
                                Route.mapper.write(
                                        context.newRecord(ROUTE),
                                        route
                                )
                        )
                        .returning()
                        .fetchOne()
                        .get(ROUTE.ID),
                transactionProvider
        );
    }

    public Transactional<Void, DSLContext> delete(Long id) {
        return Transactional.of(
                context -> {
                    context.update(ROUTE)
                            .set(ROUTE.DELETED_AT, Timestamp.from(Instant.now()))
                            .where(ROUTE.ID.eq(id))
                            .execute();
                    return null;
                },
                transactionProvider
        );
    }

    public Transactional<Optional<Route>, DSLContext> update(Long id, Route route) {
        return Transactional.of(
                context -> context.update(ROUTE)
                        .set(Route.mapper.write(
                                context.newRecord(ROUTE),
                                route
                        ))
                        .where(ROUTE.ID.eq(id))
                        .and(ROUTE.DELETED_AT.isNull())
                        .execute(),
                transactionProvider
        ).flatMap(ignored -> getById(route.getId()));
    }

    private SelectJoinStep<Record> selectRoute(DSLContext context) {
        return context.select(
                ROUTE.asterisk(),
                VEHICLE.asterisk(),
                LOCATION.asterisk(),
                STEP.asterisk(),
                STEP_ITEM.asterisk(),
                PERSON.asterisk(),
                LOCATION.as("step_location").asterisk()
        )
                .from(ROUTE)
                .leftJoin(LOCATION).onKey(Keys.FK_ROUTE_LOCATION)
                .leftJoin(VEHICLE).onKey(Keys.FK_ROUTE_VEHICLE)
                .leftJoin(STEP).onKey(Keys.FK_STEP_ROUTE)
                .leftJoin(LOCATION.as("step_location")).onKey(Keys.FK_STEP_LOCATION)
                .leftJoin(STEP_ITEM).onKey(Keys.FK_STEP_ITEM_STEP)
                .leftJoin(PERSON).onKey(Keys.FK_STEP_ITEM_PERSON);
    }
}