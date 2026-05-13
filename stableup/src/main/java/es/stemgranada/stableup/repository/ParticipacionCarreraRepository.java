package es.stemgranada.stableup.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.stemgranada.stableup.entity.ParticipacionCarrera;

@Repository
public interface ParticipacionCarreraRepository extends JpaRepository<ParticipacionCarrera, Long> {
    List<ParticipacionCarrera> findByCarreraId(Long carreraId);

}