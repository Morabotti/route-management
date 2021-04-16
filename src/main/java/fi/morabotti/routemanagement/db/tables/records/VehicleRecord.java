/*
 * This file is generated by jOOQ.
 */
package fi.morabotti.routemanagement.db.tables.records;


import fi.morabotti.routemanagement.db.tables.Vehicle;

import java.time.LocalDateTime;

import org.jooq.Field;
import org.jooq.Record3;
import org.jooq.Row3;
import org.jooq.impl.TableRecordImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class VehicleRecord extends TableRecordImpl<VehicleRecord> implements Record3<Long, String, LocalDateTime> {

    private static final long serialVersionUID = 1L;

    /**
     * Setter for <code>vehicle.id</code>.
     */
    public void setId(Long value) {
        set(0, value);
    }

    /**
     * Getter for <code>vehicle.id</code>.
     */
    public Long getId() {
        return (Long) get(0);
    }

    /**
     * Setter for <code>vehicle.license_number</code>.
     */
    public void setLicenseNumber(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>vehicle.license_number</code>.
     */
    public String getLicenseNumber() {
        return (String) get(1);
    }

    /**
     * Setter for <code>vehicle.deleted_at</code>.
     */
    public void setDeletedAt(LocalDateTime value) {
        set(2, value);
    }

    /**
     * Getter for <code>vehicle.deleted_at</code>.
     */
    public LocalDateTime getDeletedAt() {
        return (LocalDateTime) get(2);
    }

    // -------------------------------------------------------------------------
    // Record3 type implementation
    // -------------------------------------------------------------------------

    @Override
    public Row3<Long, String, LocalDateTime> fieldsRow() {
        return (Row3) super.fieldsRow();
    }

    @Override
    public Row3<Long, String, LocalDateTime> valuesRow() {
        return (Row3) super.valuesRow();
    }

    @Override
    public Field<Long> field1() {
        return Vehicle.VEHICLE.ID;
    }

    @Override
    public Field<String> field2() {
        return Vehicle.VEHICLE.LICENSE_NUMBER;
    }

    @Override
    public Field<LocalDateTime> field3() {
        return Vehicle.VEHICLE.DELETED_AT;
    }

    @Override
    public Long component1() {
        return getId();
    }

    @Override
    public String component2() {
        return getLicenseNumber();
    }

    @Override
    public LocalDateTime component3() {
        return getDeletedAt();
    }

    @Override
    public Long value1() {
        return getId();
    }

    @Override
    public String value2() {
        return getLicenseNumber();
    }

    @Override
    public LocalDateTime value3() {
        return getDeletedAt();
    }

    @Override
    public VehicleRecord value1(Long value) {
        setId(value);
        return this;
    }

    @Override
    public VehicleRecord value2(String value) {
        setLicenseNumber(value);
        return this;
    }

    @Override
    public VehicleRecord value3(LocalDateTime value) {
        setDeletedAt(value);
        return this;
    }

    @Override
    public VehicleRecord values(Long value1, String value2, LocalDateTime value3) {
        value1(value1);
        value2(value2);
        value3(value3);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached VehicleRecord
     */
    public VehicleRecord() {
        super(Vehicle.VEHICLE);
    }

    /**
     * Create a detached, initialised VehicleRecord
     */
    public VehicleRecord(Long id, String licenseNumber, LocalDateTime deletedAt) {
        super(Vehicle.VEHICLE);

        setId(id);
        setLicenseNumber(licenseNumber);
        setDeletedAt(deletedAt);
    }
}
