package fi.morabotti.routemanagement.view;

import javax.annotation.Nullable;
import javax.ws.rs.QueryParam;
import java.util.Optional;

public class PrimaryLocationQuery {
    @QueryParam("id")
    @Nullable
    private Long id;

    @QueryParam("personId")
    @Nullable
    private Long personId;

    @QueryParam("locationId")
    @Nullable
    private Long locationId;

    public PrimaryLocationQuery() {

    }

    public PrimaryLocationQuery(
            @Nullable Long id,
            @Nullable Long personId,
            @Nullable Long locationId
    ) {
        this.id = id;
        this.personId = personId;
        this.locationId = locationId;
    }

    public PrimaryLocationQuery withId(Long id) {
        return new PrimaryLocationQuery(
                id,
                this.personId,
                this.locationId
        );
    }

    public PrimaryLocationQuery withPersonId(Long personId) {
        return new PrimaryLocationQuery(
                this.id,
                personId,
                this.locationId
        );
    }

    public PrimaryLocationQuery withLocationId(Long locationId) {
        return new PrimaryLocationQuery(
                this.id,
                this.personId,
                locationId
        );
    }

    public Optional<Long> getId() {
        return Optional.ofNullable(this.id);
    }

    public Optional<Long> getPersonId() {
        return Optional.ofNullable(this.personId);
    }

    public Optional<Long> getLocationId() {
        return Optional.ofNullable(this.locationId);
    }
}
