package fi.morabotti.routemanagement.view;

import javax.ws.rs.QueryParam;
import java.math.BigDecimal;

public class PositionQuery {
    @QueryParam("minLat")
    private BigDecimal minLatitude;

    @QueryParam("maxLat")
    private BigDecimal maxLatitude;

    @QueryParam("minLng")
    private BigDecimal minLongitude;

    @QueryParam("maxLng")
    private BigDecimal maxLongitude;

    public PositionQuery() {

    }

    public PositionQuery(
            BigDecimal minLatitude,
            BigDecimal maxLatitude,
            BigDecimal minLongitude,
            BigDecimal maxLongitude
    ) {
        this.minLatitude = minLatitude;
        this.maxLatitude = maxLatitude;
        this.minLongitude = minLongitude;
        this.maxLongitude = maxLongitude;
    }

    public BigDecimal getMinLatitude() {
        return this.minLatitude;
    }

    public BigDecimal getMaxLatitude() {
        return this.maxLatitude;
    }

    public BigDecimal getMinLongitude() {
        return this.minLongitude;
    }

    public BigDecimal getMaxLongitude() {
        return this.maxLongitude;
    }
}