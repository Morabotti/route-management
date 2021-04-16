package fi.morabotti.routemanagement.view;

import javax.annotation.Nullable;
import javax.ws.rs.QueryParam;
import java.util.Optional;

public class SearchQuery {
    @QueryParam("search")
    @Nullable
    private String search;

    public SearchQuery() {

    }

    public SearchQuery(@Nullable String search) {
        this.search = search;
    }

    public Optional<String> getSearch() {
        return Optional.ofNullable(this.search);
    }
}