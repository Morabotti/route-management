package fi.morabotti.routemanagement.dao;

import fi.jubic.easyutils.transactional.TransactionProvider;
import fi.jubic.easyutils.transactional.Transactional;
import fi.morabotti.routemanagement.configuration.ApplicationConfiguration;
import fi.morabotti.routemanagement.model.Location;
import fi.morabotti.routemanagement.model.Person;
import fi.morabotti.routemanagement.model.Route;
import fi.morabotti.routemanagement.model.Step;
import fi.morabotti.routemanagement.model.StepItem;
import fi.morabotti.routemanagement.model.Vehicle;
import fi.morabotti.routemanagement.utils.LocalDateMapper;
import fi.morabotti.routemanagement.view.PaginationQuery;
import fi.morabotti.routemanagement.view.PositionQuery;
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
import static fi.morabotti.routemanagement.db.tables.Route.ROUTE;
import static fi.morabotti.routemanagement.db.tables.Step.STEP;
import static fi.morabotti.routemanagement.db.tables.StepItem.STEP_ITEM;
import static fi.morabotti.routemanagement.db.tables.Vehicle.VEHICLE;

@Singleton
public class RouteDao {
    private final Configuration jooqConfiguration;
    private final TransactionProvider<DSLContext> transactionProvider;

    private final fi.morabotti.routemanagement.db.tables.Location destLocation = LOCATION
            .as("dest_location");

    private final fi.morabotti.routemanagement.db.tables.Location stepLocation = LOCATION
            .as("step_location");

    @Inject
    public RouteDao(
            ApplicationConfiguration applicationConfiguration,
            TransactionProvider<DSLContext> transactionProvider
    ) {
        this.jooqConfiguration = applicationConfiguration.getJooqConfiguration().getConfiguration();
        this.transactionProvider = transactionProvider;
    }

    public Long fetchRouteLength() {
        return DSL.using(jooqConfiguration)
                .selectCount()
                .from(ROUTE)
                .where(ROUTE.DELETED_AT.isNull())
                .fetchOne(0, Long.class);
    }

    public List<Route> fetchRoutes(PositionQuery positionQuery) {
        return selectRoute(DSL.using(jooqConfiguration))
                .where(ROUTE.DELETED_AT.isNull())
                .fetchStream()
                .collect(Route.mapper
                        .withDestination(Location.mapper.alias(destLocation))
                        .withVehicle(Vehicle.mapper)
                        .collectingManyWithSteps(
                                Step.mapper
                                        .withLocation(Location.mapper.alias(stepLocation))
                                        .collectingManyWithStepItems(
                                                StepItem.mapper.withPerson(Person.mapper)
                                        )
                        )
                );
    }

    public List<Route> fetchRoutes(PaginationQuery paginationQuery) {
        return selectRoute(DSL.using(jooqConfiguration))
                .where(ROUTE.DELETED_AT.isNull())
                .limit(paginationQuery.getLimit().orElse(20))
                .offset(paginationQuery.getOffset().orElse(0))
                .fetch()
                .stream()
                .collect(Route.mapper
                        .withDestination(Location.mapper.alias(destLocation))
                        .withVehicle(Vehicle.mapper)
                        .collectingManyWithSteps(
                                Step.mapper.withLocation(Location.mapper.alias(stepLocation))
                                        .collectingManyWithStepItems(
                                                StepItem.mapper.withPerson(Person.mapper)
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
                                .withDestination(Location.mapper.alias(destLocation))
                                .withVehicle(Vehicle.mapper)
                                .collectingWithSteps(
                                        Step.mapper.withLocation(
                                                Location.mapper.alias(stepLocation)
                                        )
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
                            .set(ROUTE.DELETED_AT, LocalDateMapper.ofInstant(Instant.now()))
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

    private SelectJoinStep<Record> selectRoute(
            DSLContext context
    ) {
        return context.select()
                .from(ROUTE)
                .leftJoin(destLocation).on(destLocation.ID.eq(ROUTE.DESTINATION_ID))
                .leftJoin(VEHICLE).on(VEHICLE.ID.eq(ROUTE.VEHICLE_ID))
                .leftJoin(STEP).on(STEP.ROUTE_ID.eq(ROUTE.ID))
                .leftJoin(stepLocation).on(stepLocation.ID.eq(STEP.LOCATION_ID))
                .leftJoin(STEP_ITEM).on(STEP_ITEM.STEP_ID.eq(STEP.ID))
                .leftJoin(PERSON).on(PERSON.ID.eq(STEP_ITEM.PERSON_ID));
    }
}