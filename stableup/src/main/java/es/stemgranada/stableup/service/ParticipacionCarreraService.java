package es.stemgranada.stableup.service;

import java.util.List;
import java.util.Optional;

import es.stemgranada.stableup.entity.ParticipacionCarrera;

public interface ParticipacionCarreraService {

    List<ParticipacionCarrera> findAll();

    Optional<ParticipacionCarrera> findById(Long id);

    ParticipacionCarrera save(ParticipacionCarrera participacion);

    void deleteById(Long id);

    void deleteAll();

    ParticipacionCarrera inscribir(Long caballoId, Long carreraId);
}
