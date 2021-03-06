package fi.morabotti.routemanagement.dao;

import fi.jubic.easyutils.transactional.TransactionProvider;
import fi.jubic.easyutils.transactional.Transactional;
import fi.morabotti.routemanagement.configuration.ApplicationConfiguration;
import fi.morabotti.routemanagement.model.Vehicle;
import fi.morabotti.routemanagement.utils.LocalDateMapper;
import fi.morabotti.routemanagement.view.PaginationQuery;
import fi.morabotti.routemanagement.view.SearchQuery;
import org.jooq.Condition;
import org.jooq.Configuration;
import org.jooq.DSLContext;
import org.jooq.impl.DSL;

import javax.inject.Inject;
import javax.inject.Singleton;
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

    public Long fetchVehicleLength(SearchQuery searchQuery) {
        return DSL.using(jooqConfiguration)
                .selectCount()
                .from(VEHICLE)
                .where(getConditions(searchQuery))
                .fetchOne(0, Long.class);
    }

    public List<Vehicle> fetchVehicles(
            PaginationQuery paginationQuery,
            SearchQuery searchQuery
    ) {
        return DSL.using(jooqConfiguration)
                .select(VEHICLE.asterisk())
                .from(VEHICLE)
                .where(getConditions(searchQuery))
                .limit(paginationQuery.getLimit().orElse(20))
                .offset(paginationQuery.getOffset().orElse(0))
                .fetch()
                .stream()
                .collect(Vehicle.mapper);
    }

    public Transactional<Optional<Vehicle>, DSLContext> getByLicenseNumber(String licenseNumber) {
        return Transactional.of(
                context -> context
                        .select(VEHICLE.asterisk())
                        .from(VEHICLE)
                        .where(VEHICLE.LICENSE_NUMBER.eq(licenseNumber.toUpperCase()))
                        .and(VEHICLE.DELETED_AT.isNull())
                        .fetchOptional()
                        .flatMap(Vehicle.mapper::mapOptional),
                transactionProvider
        );
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
                            .set(VEHICLE.DELETED_AT, LocalDateMapper.ofInstant(Instant.now()))
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

    private Condition getConditions(SearchQuery searchQuery) {
        return Optional.of(VEHICLE.DELETED_AT.isNull())
                .map(condition -> searchQuery.getSearch()
                        .map(search -> condition.and(VEHICLE.LICENSE_NUMBER.contains(search)))
                        .orElse(condition)
                )
                .get();
    }
}
