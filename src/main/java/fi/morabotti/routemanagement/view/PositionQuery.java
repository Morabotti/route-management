package fi.morabotti.routemanagement.view;

import javax.annotation.Nullable;
import javax.ws.rs.QueryParam;
import java.math.BigDecimal;
import java.util.Optional;

public class PositionQuery {
    @QueryParam("lat")
    @Nullable
    private BigDecimal latitude;

    @QueryParam("lng")
    @Nullable
    private BigDecimal longitude;

    @QueryParam("zoom")
    @Nullable
    private Integer zoom;

    public PositionQuery() {

    }

    public PositionQuery(
            @Nullable BigDecimal latitude,
            @Nullable BigDecimal longitude,
            @Nullable Integer zoom
    ) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.zoom = zoom;
    }

    public Optional<BigDecimal> getLatitude() {
        return Optional.ofNullable(this.latitude);
    }

    public Optional<BigDecimal> getLongitude() {
        return Optional.ofNullable(this.longitude);
    }

    public Optional<Integer> getZoom() {
        return Optional.ofNullable(this.zoom);
    }
}