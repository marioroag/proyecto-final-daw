package es.stemgranada.stableup.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.stemgranada.stableup.entity.Caballo;
import es.stemgranada.stableup.entity.Carrera;
import es.stemgranada.stableup.entity.ParticipacionCarrera;
import es.stemgranada.stableup.repository.CaballoRepository;
import es.stemgranada.stableup.repository.CarreraRepository;
import es.stemgranada.stableup.repository.ParticipacionCarreraRepository;
import es.stemgranada.stableup.service.ParticipacionCarreraService;
import jakarta.transaction.Transactional;

@Service
public class ParticipacionCarreraServiceImpl implements ParticipacionCarreraService {
    @Autowired
    ParticipacionCarreraRepository participacionCarreraRepository;

    @Autowired
    CaballoRepository caballoRepository;

    @Autowired
    CarreraRepository carreraRepository;

    @Override
    public List<ParticipacionCarrera> findAll() {
        return participacionCarreraRepository.findAll();
    }

    @Override
    public Optional<ParticipacionCarrera> findById(Long id) {
        return participacionCarreraRepository.findById(id);
    }

    @Override
    public ParticipacionCarrera save(ParticipacionCarrera participacionCarrera) {
        return participacionCarreraRepository.save(participacionCarrera);
    }

    @Override
    public void deleteById(Long id) {
        participacionCarreraRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        participacionCarreraRepository.deleteAll();
    }

    @Transactional
    public ParticipacionCarrera inscribir(Long caballoId, Long carreraId) {
        Caballo caballo = caballoRepository.findById(caballoId).orElseThrow();
        Carrera carrera = carreraRepository.findById(carreraId).orElseThrow();

        // Sin datos de finalizacion hasta que termine la carrera
        ParticipacionCarrera participacion = new ParticipacionCarrera(caballo, carrera, 0, 0, 0);

        return participacionCarreraRepository.save(participacion);
    }

}
