package es.stemgranada.stableup.service;

import java.util.List;
import java.util.Optional;

import es.stemgranada.stableup.entity.Registro;

public interface RegistroService {

    List<Registro> findAll();

    Optional<Registro> findById(Long id);

    Registro save(Registro Registro);

    void deleteById(Long id);

    void deleteAll();
}
