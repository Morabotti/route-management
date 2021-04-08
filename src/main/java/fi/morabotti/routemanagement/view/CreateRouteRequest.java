package fi.morabotti.routemanagement.view;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import fi.jubic.easyvalue.EasyValue;
import fi.morabotti.routemanagement.model.Location;
import fi.morabotti.routemanagement.model.Vehicle;

import javax.annotation.Nullable;
import java.time.Instant;

@EasyValue
@JsonDeserialize(builder = CreateRouteRequest.Builder.class)
public abstract class CreateRouteRequest {
    public abstract Vehicle getVehicle();

    public abstract Location getDestination();

    @Nullable
    public abstract Instant getStartTime();

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder extends EasyValue_CreateRouteRequest.Builder {
    }
}
