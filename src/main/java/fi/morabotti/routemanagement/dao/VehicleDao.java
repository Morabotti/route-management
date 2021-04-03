package fi.morabotti.routemanagement.dao;

import fi.jubic.easyutils.transactional.TransactionProvider;
import fi.jubic.easyutils.transactional.Transactional;
import fi.morabotti.routemanagement.configuration.ApplicationConfiguration;
import fi.morabotti.routemanagement.model.Vehicle;
import org.jooq.Configuration;
import org.jooq.DSLContext;
import org.jooq.impl.DSL;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static fi.morabotti.routemanagement.db.tables.Vehicle.VEHICLE;

@Singleton
public class VehicleDao {
    private final Configuration jooqConfiguration;
    private final TransactionProvider<DSLContext> transactionProvider;

    @Inject
    public VehicleDao(
            ApplicationConfiguration applicationConfiguration,
            TransactionProvider<DSLContext> transactionProvider
    ) {
        this.jooqConfiguration = applicationConfiguration.getJooqConfiguration().getConfiguration();
        this.transactionProvider = transactionProvider;
    }

    public List<Vehicle> fetchVehicles() {
        return DSL.using(jooqConfiguration)
                .select(VEHICLE.asterisk())
                .from(VEHICLE)
                .where(VEHICLE.DELETED_AT.isNull())
                .fetch()
                .stream()
                .collect(Vehicle.mapper);
    }

    public Transactional<Optional<Vehicle>, DSLContext> getById(Long id) {
        return Transactional.of(
                context -> context
                        .select(VEHICLE.asterisk())
                        .from(VEHICLE)
                        .where(VEHICLE.ID.eq(id))
                        .and(VEHICLE.DELETED_AT.isNull())
                        .fetchOptional()
                        .flatMap(Vehicle.mapper::mapOptional),
                transactionProvider
        );
    }

    public Transactional<Long, DSLContext> create(Vehicle vehicle) {
        return Transactional.of(
                context -> context.insertInto(VEHICLE)
                        .set(
                                Vehicle.mapper.write(
                                        context.newRecord(VEHICLE),
                                        vehicle
                                )
                        )
                        .returning()
                        .fetchOne()
                        .get(VEHICLE.ID),
                transactionProvider
        );
    }

    public Transactional<Void, DSLContext> delete(Long id) {
        return Transactional.of(
                context -> {
                    context.update(VEHICLE)
                            .set(VEHICLE.DELETED_AT, Timestamp.from(Instant.now()))
                            .where(VEHICLE.ID.eq(id))
                            .execute();
                    return null;
                },
                transactionProvider
        );
    }

    public Transactional<Optional<Vehicle>, DSLContext> update(Long id, Vehicle vehicle) {
        return Transactional.of(
                context -> context.update(VEHICLE)
                        .set(Vehicle.mapper.write(
                                context.newRecord(VEHICLE),
                                vehicle
                        ))
                        .where(VEHICLE.ID.eq(id))
                        .and(VEHICLE.DELETED_AT.isNull())
                        .execute(),
                transactionProvider
        ).flatMap(ignored -> getById(vehicle.getId()));
    }
}
