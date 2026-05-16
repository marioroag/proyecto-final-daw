package es.stemgranada.stableup.service;

import java.util.List;
import java.util.Optional;

import es.stemgranada.stableup.entity.Habito;

public interface HabitoService {

    List<Habito> findAll();

    Optional<Habito> findById(Long id);

    Habito save(Habito habito);

    void deleteById(Long id);

    void deleteAll();

    void completarHabito(Long id);

    Habito editar(Long id, Habito habitoNuevo);
}
