package fi.morabotti.routemanagement.view;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import fi.jubic.easyvalue.EasyValue;
import fi.morabotti.routemanagement.model.Location;
import fi.morabotti.routemanagement.model.Person;

import javax.annotation.Nullable;
import java.util.List;

@EasyValue
@JsonDeserialize(builder = CreateStepRequest.Builder.class)
public abstract class CreateStepRequest {
    @Nullable
    public abstract Integer getPriority();

    public abstract Location getLocation();

    public abstract List<Person> getStepItems();

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder extends EasyValue_CreateStepRequest.Builder {
    }
}

