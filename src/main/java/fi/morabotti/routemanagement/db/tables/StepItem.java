/*
 * This file is generated by jOOQ.
 */
package fi.morabotti.routemanagement.db.tables;


import fi.morabotti.routemanagement.db.DefaultSchema;
import fi.morabotti.routemanagement.db.Keys;
import fi.morabotti.routemanagement.db.tables.records.StepItemRecord;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Identity;
import org.jooq.Name;
import org.jooq.Record;
import org.jooq.Row4;
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
public class StepItem extends TableImpl<StepItemRecord> {

    private static final long serialVersionUID = 1L;

    /**
     * The reference instance of <code>step_item</code>
     */
    public static final StepItem STEP_ITEM = new StepItem();

    /**
     * The class holding records for this type
     */
    @Override
    public Class<StepItemRecord> getRecordType() {
        return StepItemRecord.class;
    }

    /**
     * The column <code>step_item.id</code>.
     */
    public final TableField<StepItemRecord, Long> ID = createField(DSL.name("id"), SQLDataType.BIGINT.nullable(false).identity(true), this, "");

    /**
     * The column <code>step_item.person_id</code>.
     */
    public final TableField<StepItemRecord, Long> PERSON_ID = createField(DSL.name("person_id"), SQLDataType.BIGINT.nullable(false), this, "");

    /**
     * The column <code>step_item.step_id</code>.
     */
    public final TableField<StepItemRecord, Long> STEP_ID = createField(DSL.name("step_id"), SQLDataType.BIGINT.nullable(false), this, "");

    /**
     * The column <code>step_item.deleted_at</code>.
     */
    public final TableField<StepItemRecord, LocalDateTime> DELETED_AT = createField(DSL.name("deleted_at"), SQLDataType.LOCALDATETIME(0).defaultValue(DSL.inline("NULL", SQLDataType.LOCALDATETIME)), this, "");

    private StepItem(Name alias, Table<StepItemRecord> aliased) {
        this(alias, aliased, null);
    }

    private StepItem(Name alias, Table<StepItemRecord> aliased, Field<?>[] parameters) {
        super(alias, null, aliased, parameters, DSL.comment(""), TableOptions.table());
    }

    /**
     * Create an aliased <code>step_item</code> table reference
     */
    public StepItem(String alias) {
        this(DSL.name(alias), STEP_ITEM);
    }

    /**
     * Create an aliased <code>step_item</code> table reference
     */
    public StepItem(Name alias) {
        this(alias, STEP_ITEM);
    }

    /**
     * Create a <code>step_item</code> table reference
     */
    public StepItem() {
        this(DSL.name("step_item"), null);
    }

    public <O extends Record> StepItem(Table<O> child, ForeignKey<O, StepItemRecord> key) {
        super(child, key, STEP_ITEM);
    }

    @Override
    public Schema getSchema() {
        return DefaultSchema.DEFAULT_SCHEMA;
    }

    @Override
    public Identity<StepItemRecord, Long> getIdentity() {
        return (Identity<StepItemRecord, Long>) super.getIdentity();
    }

    @Override
    public List<UniqueKey<StepItemRecord>> getKeys() {
        return Arrays.<UniqueKey<StepItemRecord>>asList(Keys.KEY_STEP_ITEM_ID);
    }

    @Override
    public List<ForeignKey<StepItemRecord, ?>> getReferences() {
        return Arrays.<ForeignKey<StepItemRecord, ?>>asList(Keys.FK_STEP_ITEM_PERSON, Keys.FK_STEP_ITEM_STEP);
    }

    public Person person() {
        return new Person(this, Keys.FK_STEP_ITEM_PERSON);
    }

    public Step step() {
        return new Step(this, Keys.FK_STEP_ITEM_STEP);
    }

    @Override
    public StepItem as(String alias) {
        return new StepItem(DSL.name(alias), this);
    }

    @Override
    public StepItem as(Name alias) {
        return new StepItem(alias, this);
    }

    /**
     * Rename this table
     */
    @Override
    public StepItem rename(String name) {
        return new StepItem(DSL.name(name), null);
    }

    /**
     * Rename this table
     */
    @Override
    public StepItem rename(Name name) {
        return new StepItem(name, null);
    }

    // -------------------------------------------------------------------------
    // Row4 type methods
    // -------------------------------------------------------------------------

    @Override
    public Row4<Long, Long, Long, LocalDateTime> fieldsRow() {
        return (Row4) super.fieldsRow();
    }
}
