package es.stemgranada.stableup.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.stemgranada.stableup.entity.RegistroHabito;
import es.stemgranada.stableup.repository.RegistroHabitoRepository;
import es.stemgranada.stableup.service.RegistroHabitoService;
import jakarta.transaction.Transactional;

@Service
public class RegistroHabitoServiceImpl implements RegistroHabitoService {
    @Autowired
    RegistroHabitoRepository registroHabitoRepository;

    @Override
    public List<RegistroHabito> findAll() {
        return registroHabitoRepository.findAll();
    }

    @Override
    public Optional<RegistroHabito> findById(Long id) {
        return registroHabitoRepository.findById(id);
    }

    @Override
    public RegistroHabito save(RegistroHabito registro) {
        return registroHabitoRepository.save(registro);
    }

    @Override
    public void deleteById(Long id) {
        registroHabitoRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        registroHabitoRepository.deleteAll();
    }

    @Transactional
    @Override
    public RegistroHabito editar(Long id, RegistroHabito registroNuevo) {
        RegistroHabito registro = registroHabitoRepository.findById(id).orElseThrow();
        registro.setFechaCompletado(registroNuevo.getFechaCompletado());
        registro.setMonedasGanadas(registroNuevo.getMonedasGanadas());
        return registroHabitoRepository.save(registro);
    }

}
