package es.stemgranada.stableup.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.stemgranada.stableup.entity.Carrera;
import es.stemgranada.stableup.repository.CarreraRepository;
import es.stemgranada.stableup.service.CarreraService;

@Service
public class CarreraServiceImpl implements CarreraService {
    @Autowired
    CarreraRepository carreraRepository;

    @Override
    public List<Carrera> findAll() {
        return carreraRepository.findAll();
    }

    @Override
    public Optional<Carrera> findById(Long id) {
        return carreraRepository.findById(id);
    }

    @Override
    public Carrera save(Carrera carrera) {
        return carreraRepository.save(carrera);
    }

    @Override
    public void deleteById(Long id) {
        carreraRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        carreraRepository.deleteAll();
    }

}
