package fi.morabotti.routemanagement.dao;

import fi.jubic.easyutils.transactional.TransactionProvider;
import fi.jubic.easyutils.transactional.Transactional;
import fi.morabotti.routemanagement.configuration.ApplicationConfiguration;
import fi.morabotti.routemanagement.db.tables.records.StepItemRecord;
import fi.morabotti.routemanagement.model.StepItem;
import fi.morabotti.routemanagement.view.StepItemQuery;
import org.jooq.Condition;
import org.jooq.Configuration;
import org.jooq.DSLContext;
import org.jooq.impl.DSL;

import javax.inject.Inject;
import javax.inject.Singleton;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static fi.morabotti.routemanagement.db.tables.Step.STEP;
import static fi.morabotti.routemanagement.db.tables.StepItem.STEP_ITEM;

@Singleton
public class StepItemDao {
    private final Configuration jooqConfiguration;
    private final TransactionProvider<DSLContext> transactionProvider;

    @Inject
    public StepItemDao(
            ApplicationConfiguration applicationConfiguration,
            TransactionProvider<DSLContext> transactionProvider
    ) {
        this.jooqConfiguration = applicationConfiguration.getJooqConfiguration().getConfiguration();
        this.transactionProvider = transactionProvider;
    }

    public Transactional<Long, DSLContext> create(
            Long personId,
            Long stepId
    ) {
        return Transactional.of(
                context -> context.insertInto(STEP_ITEM)
                        .set(STEP_ITEM.PERSON_ID, personId)
                        .set(STEP_ITEM.STEP_ID, stepId)
                        .returning()
                        .fetchOne()
                        .get(STEP_ITEM.ID),
                transactionProvider
        );
    }

    public Transactional<Long, DSLContext> create(
            StepItem stepItem
    ) {
        return Transactional.of(
                context -> context.insertInto(STEP_ITEM)
                        .set(
                                StepItem.mapper.write(
                                        context.newRecord(STEP_ITEM),
                                        stepItem
                                )
                        )
                        .returning()
                        .fetchOne()
                        .get(STEP_ITEM.ID),
                transactionProvider
        );
    }

    public Transactional<Long, DSLContext> batchCreate(
            List<Long> personIds,
            Long stepId
    ) {
        return Transactional.of(
                context -> {
                    context.batchInsert(
                            personIds
                                    .stream()
                                    .map(personId -> new StepItemRecord(
                                            0L,
                                            personId,
                                            stepId,
                                            null
                                    ))
                                    .collect(Collectors.toList())
                    )
                            .execute();
                    return null;
                },
                transactionProvider
        );
    }

    public Transactional<Void, DSLContext> delete(StepItemQuery query, Boolean hardDelete) {
        return Transactional.of(
                context -> {
                    if (hardDelete) {
                        context.delete(STEP_ITEM)
                                .where(getConditions(query))
                                .execute();
                    }
                    else {
                        context.update(STEP_ITEM)
                                .set(STEP_ITEM.DELETED_AT, Timestamp.from(Instant.now()))
                                .where(getConditions(query))
                                .execute();
                    }
                    return null;
                },
                transactionProvider
        );
    }

    private Condition getConditions(StepItemQuery query) {
        return Optional.of(STEP_ITEM.ID.isNotNull())
                .map(condition -> query.getId()
                        .map(id -> condition.and(STEP_ITEM.ID.eq(id)))
                        .orElse(condition)
                )
                .map(condition -> query.getStepId()
                        .map(id -> condition.and(STEP_ITEM.STEP_ID.eq(id)))
                        .orElse(condition)
                )
                .map(condition -> query.getPersonId()
                        .map(id -> condition.and(STEP_ITEM.PERSON_ID.eq(id)))
                        .orElse(condition)
                )
                .map(condition -> query.getRouteId()
                        .map(id -> condition.and(
                                STEP_ITEM.STEP_ID.in(
                                        DSL.select(STEP.ID)
                                                .from(STEP)
                                                .where(STEP.ROUTE_ID.eq(id))
                                        )
                                )
                        )
                        .orElse(condition)
                )
                .get();
    }
}
