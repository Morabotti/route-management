package fi.morabotti.routemanagement.view;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import fi.jubic.easyvalue.EasyValue;
import fi.morabotti.routemanagement.model.Location;

import java.util.List;

@EasyValue
@JsonDeserialize(builder = CreatePersonRequest.Builder.class)
public abstract class CreatePersonRequest {
    public abstract String getName();

    public abstract List<Location> getPrimaryLocations();

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder extends EasyValue_CreatePersonRequest.Builder {
    }
}
