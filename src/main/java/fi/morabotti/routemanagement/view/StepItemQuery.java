package fi.morabotti.routemanagement.view;

import javax.annotation.Nullable;
import javax.ws.rs.QueryParam;
import java.util.Optional;

public class StepItemQuery {
    @QueryParam("id")
    @Nullable
    private Long id;

    @QueryParam("routeId")
    @Nullable
    private Long routeId;

    @QueryParam("stepId")
    @Nullable
    private Long stepId;

    @QueryParam("personId")
    @Nullable
    private Long personId;

    public StepItemQuery() {

    }

    public StepItemQuery(
            @Nullable Long id,
            @Nullable Long routeId,
            @Nullable Long stepId,
            @Nullable Long personId
    ) {
        this.id = id;
        this.routeId = routeId;
        this.stepId = stepId;
        this.personId = personId;
    }

    public StepItemQuery withId(Long id) {
        return new StepItemQuery(
                id,
                this.routeId,
                this.stepId,
                this.personId
        );
    }

    public StepItemQuery withRouteId(Long routeId) {
        return new StepItemQuery(
                this.id,
                routeId,
                this.stepId,
                this.personId
        );
    }

    public StepItemQuery withStepId(Long stepId) {
        return new StepItemQuery(
                this.id,
                this.routeId,
                stepId,
                this.personId
        );
    }

    public StepItemQuery withPersonId(Long personId) {
        return new StepItemQuery(
                this.id,
                this.routeId,
                this.stepId,
                personId
        );
    }

    public Optional<Long> getId() {
        return Optional.ofNullable(this.id);
    }

    public Optional<Long> getRouteId() {
        return Optional.ofNullable(this.routeId);
    }

    public Optional<Long> getStepId() {
        return Optional.ofNullable(this.stepId);
    }

    public Optional<Long> getPersonId() {
        return Optional.ofNullable(this.personId);
    }
}
