package fi.morabotti.routemanagement;

import fi.jubic.snoozy.Application;
import fi.jubic.snoozy.MethodAccess;
import fi.jubic.snoozy.Snoozy;
import fi.jubic.snoozy.StaticFiles;
import fi.jubic.snoozy.filters.UrlRewrite;
import fi.jubic.snoozy.undertow.UndertowServer;
import fi.morabotti.routemanagement.configuration.ApplicationConfiguration;
import fi.morabotti.routemanagement.resources.Resources;

import javax.inject.Inject;
import javax.ws.rs.ApplicationPath;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@ApplicationPath("api")
public class RouteApplication implements Application {
    @Inject
    ApplicationConfiguration configuration;

    @Inject
    @Resources
    Set<Object> resources;

    @Inject
    RouteApplication() {

    }

    @Override
    public Set<StaticFiles> getStaticFiles() {
        return Collections.singleton(
                StaticFiles.builder()
                        .setPrefix("static")
                        .setClassLoader(RouteApplication.class.getClassLoader())
                        .setMethodAccess(MethodAccess.anonymous())
                        .setRewrite(
                                UrlRewrite.of(
                                        "^\\/(?!(((api|assets|locales).*)|.*\\.(html|js|txt)$)).*$",
                                        "/index.html"
                                )
                        )
                        .build()
        );
    }

    @Override
    public Set<Object> getSingletons() {
        return Stream.concat(
                resources.stream(),
                Snoozy.builtins().stream()
        )
                .collect(Collectors.toSet());
    }

    public ApplicationConfiguration getConfiguration() {
        return this.configuration;
    }

    public static void main(String[] args) {
        RouteApplication app = DaggerRouteApplicationComponent.create().getRouteApplication();
        ApplicationConfiguration configuration = app.getConfiguration();

        new UndertowServer().start(app, configuration);
    }
}
