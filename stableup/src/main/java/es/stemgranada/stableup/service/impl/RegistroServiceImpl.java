package es.stemgranada.stableup.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.stemgranada.stableup.entity.Registro;
import es.stemgranada.stableup.repository.RegistroRepository;
import es.stemgranada.stableup.service.RegistroService;

@Service
public class RegistroServiceImpl implements RegistroService {
    @Autowired
    RegistroRepository registroRepository;

    @Override
    public List<Registro> findAll() {
        return registroRepository.findAll();
    }

    @Override
    public Optional<Registro> findById(Long id) {
        return registroRepository.findById(id);
    }

    @Override
    public Registro save(Registro registro) {
        return registroRepository.save(registro);
    }

    @Override
    public void deleteById(Long id) {
        registroRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        registroRepository.deleteAll();
    }

}
