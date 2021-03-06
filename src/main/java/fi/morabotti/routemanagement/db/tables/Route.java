/*
 * This file is generated by jOOQ.
 */
package fi.morabotti.routemanagement.db.tables;


import fi.morabotti.routemanagement.db.DefaultSchema;
import fi.morabotti.routemanagement.db.Keys;
import fi.morabotti.routemanagement.db.tables.records.RouteRecord;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Identity;
import org.jooq.Name;
import org.jooq.Record;
import org.jooq.Row5;
import org.jooq.Schema;
import org.jooq.Table;
import org.jooq.TableField;
import org.jooq.TableOptions;
import org.jooq.UniqueKey;
import org.jooq.impl.DSL;
import org.jooq.impl.SQLDataType;
import org.jooq.impl.TableImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Route extends TableImpl<RouteRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>route</code>
     */
    public static final Route ROUTE = new Route();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<RouteRecord> getRecordType() {
        return RouteRecord.class;
    }

    /**
     * The column <code>route.id</code>.
     */
    public final TableField<RouteRecord, Long> ID = createField(DSL.name("id"), SQLDataType.BIGINT.nullable(false).identity(true), this, "");

    /**
     * The column <code>route.start_time</code>.
     */
    public final TableField<RouteRecord, LocalDateTime> START_TIME = createField(DSL.name("start_time"), SQLDataType.LOCALDATETIME(0).defaultValue(DSL.inline("NULL", SQLDataType.LOCALDATETIME)), this, "");

    /**
     * The column <code>route.vehicle_id</code>.
     */
    public final TableField<RouteRecord, Long> VEHICLE_ID = createField(DSL.name("vehicle_id"), SQLDataType.BIGINT.nullable(false), this, "");

    /**
     * The column <code>route.destination_id</code>.
     */
    public final TableField<RouteRecord, Long> DESTINATION_ID = createField(DSL.name("destination_id"), SQLDataType.BIGINT.nullable(false), this, "");

    /**
     * The column <code>route.deleted_at</code>.
     */
    public final TableField<RouteRecord, LocalDateTime> DELETED_AT = createField(DSL.name("deleted_at"), SQLDataType.LOCALDATETIME(0).defaultValue(DSL.inline("NULL", SQLDataType.LOCALDATETIME)), this, "");

    private Route(Name alias, Table<RouteRecord> aliased) {
        this(alias, aliased, null);
    }

    private Route(Name alias, Table<RouteRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    /**
     * Create an aliased <code>route</code> table reference
     */
    public Route(String alias) {
        this(DSL.name(alias), ROUTE);
    }

    /**
     * Create an aliased <code>route</code> table reference
     */
    public Route(Name alias) {
        this(alias, ROUTE);
    }

    /**
     * Create a <code>route</code> table reference
     */
    public Route() {
        this(DSL.name("route"), null);
    }

    public <O extends Record> Route(Table<O> child, ForeignKey<O, RouteRecord> key) {
        super(child, key, ROUTE);
    }

    @Override
    public Schema getSchema() {
        return DefaultSchema.DEFAULT_SCHEMA;
    }

    @Override
    public Identity<RouteRecord, Long> getIdentity() {
        return (Identity<RouteRecord, Long>) super.getIdentity();
    }

    @Override
    public List<UniqueKey<RouteRecord>> getKeys() {
        return Arrays.<UniqueKey<RouteRecord>>asList(Keys.KEY_ROUTE_ID);
    }

    @Override
    public List<ForeignKey<RouteRecord, ?>> getReferences() {
        return Arrays.<ForeignKey<RouteRecord, ?>>asList(Keys.FK_ROUTE_VEHICLE, Keys.FK_ROUTE_LOCATION);
    }

    public Vehicle vehicle() {
        return new Vehicle(this, Keys.FK_ROUTE_VEHICLE);
    }

    public Location location() {
        return new Location(this, Keys.FK_ROUTE_LOCATION);
    }

    @Override
    public Route as(String alias) {
        return new Route(DSL.name(alias), this);
    }

    @Override
    public Route as(Name alias) {
        return new Route(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public Route rename(String name) {
        return new Route(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public Route rename(Name name) {
        return new Route(name, null);
    }

    // -------------------------------------------------------------------------
    // Row5 type methods
    // -------------------------------------------------------------------------

    @Override
    public Row5<Long, LocalDateTime, Long, Long, LocalDateTime> fieldsRow() {
        return (Row5) super.fieldsRow();
    }
}
