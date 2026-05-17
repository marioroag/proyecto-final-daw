package es.stemgranada.stableup.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.stemgranada.stableup.entity.Habito;
import es.stemgranada.stableup.entity.RegistroHabito;
import es.stemgranada.stableup.entity.Usuario;
import es.stemgranada.stableup.repository.HabitoRepository;
import es.stemgranada.stableup.repository.RegistroHabitoRepository;
import es.stemgranada.stableup.repository.UsuarioRepository;
import es.stemgranada.stableup.service.HabitoService;
import jakarta.transaction.Transactional;

@Service
public class HabitoServiceImpl implements HabitoService {
    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    HabitoRepository habitoRepository;

    @Autowired
    RegistroHabitoRepository registroHabitoRepository;

    @Override
    public List<Habito> findAll() {
        return habitoRepository.findAll();
    }

    @Override
    public Optional<Habito> findById(Long id) {
        return habitoRepository.findById(id);
    }

    @Override
    public Habito save(Habito habito) {
        return habitoRepository.save(habito);
    }

    @Override
    public void deleteById(Long id) {
        habitoRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        habitoRepository.deleteAll();
    }

    @Override
    @Transactional
    public void completarHabito(Long habitoId) {
        // Encuentra el habito y su dueño
        Habito habito = habitoRepository.findById(habitoId).orElseThrow();
        Usuario usuario = habito.getUsuario();

        // Recompensa al usuario y actualiza el streak
        int recompensa = habito.getRecompensaBase() * habito.getMultiplicadorStreak();
        usuario.setMonedas(usuario.getMonedas() + recompensa);
        habito.setMultiplicadorStreak(habito.getMultiplicadorStreak() + 1);

        // Registra la complecion
        RegistroHabito nuevoRegistro = new RegistroHabito(LocalDate.now(), recompensa, habito);
        registroHabitoRepository.save(nuevoRegistro);

        // Guardado
        usuarioRepository.save(usuario);
    }

    @Transactional
    @Override
    public Habito editar(Long habitoId, Habito habitoNuevo) {
        Habito habito = habitoRepository.findById(habitoId).orElseThrow();
        habito.setNombre(habitoNuevo.getNombre());
        habito.setTipo(habitoNuevo.getTipo());
        return habitoRepository.save(habito);
    }

}
