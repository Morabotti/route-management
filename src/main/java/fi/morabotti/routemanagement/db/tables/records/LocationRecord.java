/*
 * This file is generated by jOOQ.
 */
package fi.morabotti.routemanagement.db.tables.records;


import fi.morabotti.routemanagement.db.tables.Location;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.Record7;
import org.jooq.Row7;
import org.jooq.impl.TableRecordImpl;


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
public class LocationRecord extends TableRecordImpl<LocationRecord> implements Record7<Long, String, String, String, BigDecimal, BigDecimal, Timestamp> {

    private static final long serialVersionUID = -2132194605;

    /**
     * Setter for <code>location.id</code>.
     */
    public void setId(Long value) {
        set(0, value);
    }

    /**
     * Getter for <code>location.id</code>.
     */
    public Long getId() {
        return (Long) get(0);
    }

    /**
     * Setter for <code>location.address</code>.
     */
    public void setAddress(String value) {
        set(1, value);
    }

    /**
     * Getter for <code>location.address</code>.
     */
    public String getAddress() {
        return (String) get(1);
    }

    /**
     * Setter for <code>location.zip</code>.
     */
    public void setZip(String value) {
        set(2, value);
    }

    /**
     * Getter for <code>location.zip</code>.
     */
    public String getZip() {
        return (String) get(2);
    }

    /**
     * Setter for <code>location.city</code>.
     */
    public void setCity(String value) {
        set(3, value);
    }

    /**
     * Getter for <code>location.city</code>.
     */
    public String getCity() {
        return (String) get(3);
    }

    /**
     * Setter for <code>location.latitude</code>.
     */
    public void setLatitude(BigDecimal value) {
        set(4, value);
    }

    /**
     * Getter for <code>location.latitude</code>.
     */
    public BigDecimal getLatitude() {
        return (BigDecimal) get(4);
    }

    /**
     * Setter for <code>location.longitude</code>.
     */
    public void setLongitude(BigDecimal value) {
        set(5, value);
    }

    /**
     * Getter for <code>location.longitude</code>.
     */
    public BigDecimal getLongitude() {
        return (BigDecimal) get(5);
    }

    /**
     * Setter for <code>location.deleted_at</code>.
     */
    public void setDeletedAt(Timestamp value) {
        set(6, value);
    }

    /**
     * Getter for <code>location.deleted_at</code>.
     */
    public Timestamp getDeletedAt() {
        return (Timestamp) get(6);
    }

    // -------------------------------------------------------------------------
    // Record7 type implementation
    // -------------------------------------------------------------------------

    /**
     * {@inheritDoc}
     */
    @Override
    public Row7<Long, String, String, String, BigDecimal, BigDecimal, Timestamp> fieldsRow() {
        return (Row7) super.fieldsRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Row7<Long, String, String, String, BigDecimal, BigDecimal, Timestamp> valuesRow() {
        return (Row7) super.valuesRow();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Long> field1() {
        return Location.LOCATION.ID;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field2() {
        return Location.LOCATION.ADDRESS;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field3() {
        return Location.LOCATION.ZIP;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<String> field4() {
        return Location.LOCATION.CITY;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<BigDecimal> field5() {
        return Location.LOCATION.LATITUDE;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<BigDecimal> field6() {
        return Location.LOCATION.LONGITUDE;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Field<Timestamp> field7() {
        return Location.LOCATION.DELETED_AT;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long component1() {
        return getId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component2() {
        return getAddress();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component3() {
        return getZip();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String component4() {
        return getCity();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public BigDecimal component5() {
        return getLatitude();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public BigDecimal component6() {
        return getLongitude();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Timestamp component7() {
        return getDeletedAt();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Long value1() {
        return getId();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value2() {
        return getAddress();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value3() {
        return getZip();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String value4() {
        return getCity();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public BigDecimal value5() {
        return getLatitude();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public BigDecimal value6() {
        return getLongitude();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Timestamp value7() {
        return getDeletedAt();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public LocationRecord value1(Long value) {
        setId(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public LocationRecord value2(String value) {
        setAddress(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public LocationRecord value3(String value) {
        setZip(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public LocationRecord value4(String value) {
        setCity(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public LocationRecord value5(BigDecimal value) {
        setLatitude(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public LocationRecord value6(BigDecimal value) {
        setLongitude(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public LocationRecord value7(Timestamp value) {
        setDeletedAt(value);
        return this;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public LocationRecord values(Long value1, String value2, String value3, String value4, BigDecimal value5, BigDecimal value6, Timestamp value7) {
        value1(value1);
        value2(value2);
        value3(value3);
        value4(value4);
        value5(value5);
        value6(value6);
        value7(value7);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached LocationRecord
     */
    public LocationRecord() {
        super(Location.LOCATION);
    }

    /**
     * Create a detached, initialised LocationRecord
     */
    public LocationRecord(Long id, String address, String zip, String city, BigDecimal latitude, BigDecimal longitude, Timestamp deletedAt) {
        super(Location.LOCATION);

        set(0, id);
        set(1, address);
        set(2, zip);
        set(3, city);
        set(4, latitude);
        set(5, longitude);
        set(6, deletedAt);
    }
}
