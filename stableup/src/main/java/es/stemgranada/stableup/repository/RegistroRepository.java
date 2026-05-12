package es.stemgranada.stableup.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.stemgranada.stableup.entity.Registro;

@Repository
public interface RegistroRepository extends JpaRepository<Registro, Long> {

}