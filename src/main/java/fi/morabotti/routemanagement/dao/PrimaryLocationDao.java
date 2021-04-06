package fi.morabotti.routemanagement.dao;

import fi.jubic.easyutils.transactional.TransactionProvider;
import fi.jubic.easyutils.transactional.Transactional;
import fi.morabotti.routemanagement.configuration.ApplicationConfiguration;
import fi.morabotti.routemanagement.db.tables.records.PrimaryLocationRecord;
import org.jooq.Configuration;
import org.jooq.DSLContext;

import javax.inject.Inject;
import javax.inject.Singleton;

import java.util.List;
import java.util.stream.Collectors;

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

    public Transactional<Long, DSLContext> batchCreate(
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

    public Transactional<Void, DSLContext> deleteByPersonId(Long personId) {
        return Transactional.of(
                context -> {
                    context.delete(PRIMARY_LOCATION)
                            .where(PRIMARY_LOCATION.PERSON_ID.eq(personId))
                            .execute();
                    return null;
                },
                transactionProvider
        );
    }

    public Transactional<Void, DSLContext> deleteByLocationId(Long locationId) {
        return Transactional.of(
                context -> {
                    context.delete(PRIMARY_LOCATION)
                            .where(PRIMARY_LOCATION.LOCATION_ID.eq(locationId))
                            .execute();
                    return null;
                },
                transactionProvider
        );
    }

    public Transactional<Void, DSLContext> delete(Long id) {
        return Transactional.of(
                context -> {
                    context.delete(PRIMARY_LOCATION)
                            .where(PRIMARY_LOCATION.ID.eq(id))
                            .execute();
                    return null;
                },
                transactionProvider
        );
    }
}
