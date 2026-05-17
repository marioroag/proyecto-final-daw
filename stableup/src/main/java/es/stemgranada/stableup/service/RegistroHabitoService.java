package es.stemgranada.stableup.service;

import java.util.List;
import java.util.Optional;

import es.stemgranada.stableup.entity.RegistroHabito;

public interface RegistroHabitoService {

    List<RegistroHabito> findAll();

    Optional<RegistroHabito> findById(Long id);

    RegistroHabito save(RegistroHabito Registro);

    void deleteById(Long id);

    void deleteAll();
}
