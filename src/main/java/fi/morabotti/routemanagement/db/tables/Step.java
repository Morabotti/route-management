/*
 * This file is generated by jOOQ.
 */
package fi.morabotti.routemanagement.db.tables;


import fi.morabotti.routemanagement.db.DefaultSchema;
import fi.morabotti.routemanagement.db.Indexes;
import fi.morabotti.routemanagement.db.Keys;
import fi.morabotti.routemanagement.db.tables.records.StepRecord;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Identity;
import org.jooq.Index;
import org.jooq.Name;
import org.jooq.Record;
import org.jooq.Schema;
import org.jooq.Table;
import org.jooq.TableField;
import org.jooq.UniqueKey;
import org.jooq.impl.DSL;
import org.jooq.impl.TableImpl;


/**
 * This class is generated by jOOQ.
 */
@Generated(
    value = {
        "http://www.jooq.org",
        "jOOQ version:3.11.11"
    },
    comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Step extends TableImpl<StepRecord> {

    private static final long serialVersionUID = 207647218;

    /**
     * The reference instance of <code>step</code>
     */
    public static final Step STEP = new Step();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<StepRecord> getRecordType() {
        return StepRecord.class;
    }

    /**
     * The column <code>step.id</code>.
     */
    public final TableField<StepRecord, Long> ID = createField("id", org.jooq.impl.SQLDataType.BIGINT.nullable(false).identity(true), this, "");

    /**
     * The column <code>step.priority</code>.
     */
    public final TableField<StepRecord, Integer> PRIORITY = createField("priority", org.jooq.impl.SQLDataType.INTEGER.defaultValue(org.jooq.impl.DSL.inline("NULL", org.jooq.impl.SQLDataType.INTEGER)), this, "");

    /**
     * The column <code>step.route_id</code>.
     */
    public final TableField<StepRecord, Long> ROUTE_ID = createField("route_id", org.jooq.impl.SQLDataType.BIGINT.nullable(false), this, "");

    /**
     * The column <code>step.location_id</code>.
     */
    public final TableField<StepRecord, Long> LOCATION_ID = createField("location_id", org.jooq.impl.SQLDataType.BIGINT.nullable(false), this, "");

    /**
     * The column <code>step.deleted_at</code>.
     */
    public final TableField<StepRecord, Timestamp> DELETED_AT = createField("deleted_at", org.jooq.impl.SQLDataType.TIMESTAMP.defaultValue(org.jooq.impl.DSL.inline("NULL", org.jooq.impl.SQLDataType.TIMESTAMP)), this, "");

    /**
     * Create a <code>step</code> table reference
     */
    public Step() {
        this(DSL.name("step"), null);
    }

    /**
     * Create an aliased <code>step</code> table reference
     */
    public Step(String alias) {
        this(DSL.name(alias), STEP);
    }

    /**
     * Create an aliased <code>step</code> table reference
     */
    public Step(Name alias) {
        this(alias, STEP);
    }

    private Step(Name alias, Table<StepRecord> aliased) {
        this(alias, aliased, null);
    }

    private Step(Name alias, Table<StepRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""));
    }

    public <O extends Record> Step(Table<O> child, ForeignKey<O, StepRecord> key) {
        super(child, key, STEP);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Schema getSchema() {
        return DefaultSchema.DEFAULT_SCHEMA;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Index> getIndexes() {
        return Arrays.<Index>asList(Indexes.STEP_FK_STEP_LOCATION, Indexes.STEP_FK_STEP_ROUTE, Indexes.STEP_ID);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Identity<StepRecord, Long> getIdentity() {
        return Keys.IDENTITY_STEP;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<UniqueKey<StepRecord>> getKeys() {
        return Arrays.<UniqueKey<StepRecord>>asList(Keys.KEY_STEP_ID);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<ForeignKey<StepRecord, ?>> getReferences() {
        return Arrays.<ForeignKey<StepRecord, ?>>asList(Keys.FK_STEP_ROUTE, Keys.FK_STEP_LOCATION);
    }

    public Route route() {
        return new Route(this, Keys.FK_STEP_ROUTE);
    }

    public Location location() {
        return new Location(this, Keys.FK_STEP_LOCATION);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Step as(String alias) {
        return new Step(DSL.name(alias), this);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Step as(Name alias) {
        return new Step(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public Step rename(String name) {
        return new Step(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public Step rename(Name name) {
        return new Step(name, null);
    }
}
