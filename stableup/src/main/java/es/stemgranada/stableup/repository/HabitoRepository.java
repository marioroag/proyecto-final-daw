package es.stemgranada.stableup.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import es.stemgranada.stableup.entity.Habito;

public interface HabitoRepository extends JpaRepository<Habito, Long> {

}