package fi.morabotti.routemanagement.view;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import fi.jubic.easyvalue.EasyValue;
import fi.morabotti.routemanagement.model.Person;

import java.math.BigDecimal;
import java.util.List;

@EasyValue
@JsonDeserialize(builder = CreateLocationRequest.Builder.class)
public abstract class CreateLocationRequest {
    public abstract String getAddress();

    public abstract String getZip();

    public abstract String getCity();

    public abstract BigDecimal getLatitude();

    public abstract BigDecimal getLongitude();

    public abstract List<Person> getPrimaryPersons();

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder extends EasyValue_CreateLocationRequest.Builder {
    }
}
