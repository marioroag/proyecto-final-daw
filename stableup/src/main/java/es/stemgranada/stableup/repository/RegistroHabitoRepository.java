package es.stemgranada.stableup.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.stemgranada.stableup.entity.RegistroHabito;

@Repository
public interface RegistroHabitoRepository extends JpaRepository<RegistroHabito, Long> {

}