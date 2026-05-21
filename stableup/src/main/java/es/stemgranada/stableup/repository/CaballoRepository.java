package es.stemgranada.stableup.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.stemgranada.stableup.entity.Caballo;
import es.stemgranada.stableup.entity.ParticipacionCarrera;

@Repository
public interface CaballoRepository extends JpaRepository<Caballo, Long> {
    List<ParticipacionCarrera> findParticipacionesById(Long caballoId);

    List<Caballo> findByUsuarioIdNot(Long usuarioId);

}