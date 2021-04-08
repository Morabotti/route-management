package fi.morabotti.routemanagement.resources;

import dagger.Module;
import dagger.Provides;

import javax.inject.Singleton;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Module
public class ResourceModule {
    @Provides
    @Singleton
    @Resources
    static Set<Object> provideResources(
            AssetResource assetResource,
            LocationResource locationResource,
            RouteResource routeResource
    ) {
        return Stream.of(
                assetResource,
                locationResource,
                routeResource
        )
                .collect(Collectors.toSet());
    }
}
