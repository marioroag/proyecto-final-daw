package es.stemgranada.stableup.service;

import java.util.List;
import java.util.Optional;

import es.stemgranada.stableup.entity.Caballo;
import es.stemgranada.stableup.entity.ParticipacionCarrera;

public interface CaballoService {

    List<Caballo> findAll();

    Optional<Caballo> findById(Long id);

    List<ParticipacionCarrera> findParticipacionesById(Long caballoId);

    Caballo save(Caballo caballo);

    void deleteById(Long id);

    void deleteAll();

    Optional<Caballo> generarCaballoAleatorioAsignado(Long usuarioId);

    List<Caballo> findContrincantesParaUsuario(Long usuarioId);
}
