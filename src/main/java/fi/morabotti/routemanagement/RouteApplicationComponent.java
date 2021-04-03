package fi.morabotti.routemanagement;

import dagger.Component;
import dagger.Module;
import dagger.Provides;
import fi.jubic.easyconfig.ConfigMapper;
import fi.jubic.easyutils.transactional.TransactionProvider;
import fi.morabotti.routemanagement.configuration.ApplicationConfiguration;
import fi.morabotti.routemanagement.resources.ResourceModule;
import org.jooq.DSLContext;
import org.jooq.impl.DSL;

import javax.inject.Singleton;
import java.util.function.Function;

@Singleton
@Component(modules = {
        RouteApplicationComponent.AppModule.class,
        ResourceModule.class
})
public interface RouteApplicationComponent {
    RouteApplication getRouteApplication();

    @Module
    class AppModule {
        @Provides
        @Singleton
        static ApplicationConfiguration provideConfiguration() {
            return new ConfigMapper().read(ApplicationConfiguration.class);
        }

        @Provides
        @Singleton
        static TransactionProvider<DSLContext> provideTransactionProvider(
                ApplicationConfiguration applicationConfiguration
        ) {
            DSLContext context = DSL.using(
                    applicationConfiguration.getJooqConfiguration().getConfiguration()
            );

            return new TransactionProvider<DSLContext>() {
                @Override
                public <T> T runWithTransaction(Function<DSLContext, T> procedure) {
                    return context
                            .transactionResult(
                                    transaction -> procedure.apply(DSL.using(transaction))
                            );
                }

                @Override
                public <T> T runWithoutTransaction(Function<DSLContext, T> function) {
                    return null;
                }
            };
        }
    }
}