package fi.morabotti.routemanagement.dao;

import fi.jubic.easyutils.transactional.TransactionProvider;
import fi.jubic.easyutils.transactional.Transactional;
import fi.morabotti.routemanagement.configuration.ApplicationConfiguration;
import fi.morabotti.routemanagement.model.Person;
import org.jooq.Configuration;
import org.jooq.DSLContext;
import org.jooq.impl.DSL;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static fi.morabotti.routemanagement.db.tables.Person.PERSON;

@Singleton
public class PersonDao {
    private final Configuration jooqConfiguration;
    private final TransactionProvider<DSLContext> transactionProvider;

    @Inject
    public PersonDao(
            ApplicationConfiguration applicationConfiguration,
            TransactionProvider<DSLContext> transactionProvider
    ) {
        this.jooqConfiguration = applicationConfiguration.getJooqConfiguration().getConfiguration();
        this.transactionProvider = transactionProvider;
    }

    public List<Person> fetchPersons() {
        return DSL.using(jooqConfiguration)
                .select(PERSON.asterisk())
                .from(PERSON)
                .where(PERSON.DELETED_AT.isNull())
                .fetch()
                .stream()
                .collect(Person.mapper);
    }

    public Transactional<Optional<Person>, DSLContext> getById(Long id) {
        return Transactional.of(
                context -> context
                        .select(PERSON.asterisk())
                        .from(PERSON)
                        .where(PERSON.ID.eq(id))
                        .and(PERSON.DELETED_AT.isNull())
                        .fetchOptional()
                        .flatMap(Person.mapper::mapOptional),
                transactionProvider
        );
    }

    public Transactional<Long, DSLContext> create(Person person) {
        return Transactional.of(
                context -> context.insertInto(PERSON)
                        .set(
                                Person.mapper.write(
                                        context.newRecord(PERSON),
                                        person
                                )
                        )
                        .returning()
                        .fetchOne()
                        .get(PERSON.ID),
                transactionProvider
        );
    }

    public Transactional<Void, DSLContext> delete(Long id) {
        return Transactional.of(
                context -> {
                    context.update(PERSON)
                            .set(PERSON.DELETED_AT, Timestamp.from(Instant.now()))
                            .where(PERSON.ID.eq(id))
                            .execute();
                    return null;
                },
                transactionProvider
        );
    }

    public Transactional<Optional<Person>, DSLContext> update(Long id, Person person) {
        return Transactional.of(
                context -> context.update(PERSON)
                        .set(Person.mapper.write(
                                context.newRecord(PERSON),
                                person
                        ))
                        .where(PERSON.ID.eq(id))
                        .and(PERSON.DELETED_AT.isNull())
                        .execute(),
                transactionProvider
        ).flatMap(ignored -> getById(person.getId()));
    }
}