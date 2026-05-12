package es.stemgranada.stableup.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.stemgranada.stableup.entity.Habito;

@Repository
public interface HabitoRepository extends JpaRepository<Habito, Long> {

}