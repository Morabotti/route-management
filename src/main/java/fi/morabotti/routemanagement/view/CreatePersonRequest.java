package fi.morabotti.routemanagement.view;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import fi.jubic.easyvalue.EasyValue;

@EasyValue
@JsonDeserialize(builder = CreatePersonRequest.Builder.class)
public abstract class CreatePersonRequest {
    public abstract String getName();

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder extends EasyValue_CreatePersonRequest.Builder {
    }
}
