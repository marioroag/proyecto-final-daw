package es.stemgranada.stableup.service;

import java.util.List;
import java.util.Optional;

import es.stemgranada.stableup.entity.Carrera;

public interface CarreraService {

    List<Carrera> findAll();

    Optional<Carrera> findById(Long id);

    Carrera save(Carrera carrera);

    void deleteById(Long id);

    void deleteAll();
}
