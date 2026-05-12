package es.stemgranada.stableup.service;

import java.util.List;
import java.util.Optional;

import es.stemgranada.stableup.entity.Caballo;

public interface CaballoService {

    List<Caballo> findAll();

    Optional<Caballo> findById(Long id);

    Caballo save(Caballo caballo);

    void deleteById(Long id);

    void deleteAll();

    Caballo generarCaballoAleatorio(Long usuarioId);
}
