package fi.morabotti.routemanagement.dao;

import fi.jubic.easyutils.transactional.TransactionProvider;
import fi.jubic.easyutils.transactional.Transactional;
import fi.morabotti.routemanagement.configuration.ApplicationConfiguration;
import fi.morabotti.routemanagement.db.Keys;
import fi.morabotti.routemanagement.model.Location;
import fi.morabotti.routemanagement.model.Person;
import fi.morabotti.routemanagement.model.Step;
import fi.morabotti.routemanagement.model.StepItem;
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
import static fi.morabotti.routemanagement.db.tables.Step.STEP;
import static fi.morabotti.routemanagement.db.tables.StepItem.STEP_ITEM;

@Singleton
public class StepDao {
    private final Configuration jooqConfiguration;
    private final TransactionProvider<DSLContext> transactionProvider;

    @Inject
    public StepDao(
            ApplicationConfiguration applicationConfiguration,
            TransactionProvider<DSLContext> transactionProvider
    ) {
        this.jooqConfiguration = applicationConfiguration.getJooqConfiguration().getConfiguration();
        this.transactionProvider = transactionProvider;
    }

    public List<Step> fetchStepsByRouteId(Long routeId) {
        return selectStep(DSL.using(jooqConfiguration))
                .where(STEP.ROUTE_ID.eq(routeId))
                .and(STEP.DELETED_AT.isNull())
                .fetch()
                .stream()
                .collect(Step.mapper.withLocation(Location.mapper)
                        .collectingManyWithStepItems(
                                StepItem.mapper.withPerson(Person.mapper)
                        )
                );
    }

    public Transactional<Optional<Step>, DSLContext> getById(Long id) {
        return Transactional.of(
                context -> selectStep(context)
                        .where(STEP.ID.eq(id))
                        .and(STEP.DELETED_AT.isNull())
                        .fetch()
                        .stream()
                        .collect(Step.mapper.withLocation(Location.mapper)
                                .collectingWithStepItems(
                                        StepItem.mapper.withPerson(Person.mapper)
                                )
                        ),
                transactionProvider
        );
    }

    public Transactional<Long, DSLContext> create(Step step) {
        return Transactional.of(
                context -> context.insertInto(STEP)
                        .set(
                                Step.mapper.write(
                                        context.newRecord(STEP),
                                        step
                                )
                        )
                        .returning()
                        .fetchOne()
                        .get(STEP.ID),
                transactionProvider
        );
    }

    public Transactional<Void, DSLContext> deleteByRouteId(Long routeId) {
        return Transactional.of(
                context -> {
                    context.update(STEP)
                            .set(STEP.DELETED_AT, Timestamp.from(Instant.now()))
                            .where(STEP.ROUTE_ID.eq(routeId))
                            .execute();
                    return null;
                },
                transactionProvider
        );
    }

    public Transactional<Void, DSLContext> deleteById(Long id) {
        return Transactional.of(
                context -> {
                    context.update(STEP)
                            .set(STEP.DELETED_AT, Timestamp.from(Instant.now()))
                            .where(STEP.ID.eq(id))
                            .execute();
                    return null;
                },
                transactionProvider
        );
    }

    public Transactional<Optional<Step>, DSLContext> update(Long id, Step step) {
        return Transactional.of(
                context -> context.update(STEP)
                        .set(Step.mapper.write(
                                context.newRecord(STEP),
                                step
                        ))
                        .where(STEP.ID.eq(id))
                        .and(STEP.DELETED_AT.isNull())
                        .execute(),
                transactionProvider
        ).flatMap(ignored -> getById(step.getId()));
    }

    private SelectJoinStep<Record> selectStep(DSLContext context) {
        return context.select(
                STEP.asterisk(),
                STEP_ITEM.asterisk(),
                PERSON.asterisk(),
                LOCATION.asterisk()
        )
                .from(STEP)
                .leftJoin(STEP_ITEM).onKey(Keys.FK_STEP_ITEM_STEP)
                .leftJoin(PERSON).onKey(Keys.FK_STEP_ITEM_PERSON)
                .leftJoin(LOCATION).onKey(Keys.FK_STEP_LOCATION);
    }
}
