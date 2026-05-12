package es.stemgranada.stableup.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.stemgranada.stableup.entity.Caballo;

@Repository
public interface CaballoRepository extends JpaRepository<Caballo, Long> {

}