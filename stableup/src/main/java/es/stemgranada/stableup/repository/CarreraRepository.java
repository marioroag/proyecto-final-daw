package es.stemgranada.stableup.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.stemgranada.stableup.entity.Carrera;

@Repository
public interface CarreraRepository extends JpaRepository<Carrera, Long> {

}