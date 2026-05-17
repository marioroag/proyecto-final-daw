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

    // TODO: Hacer que el streak se pierda si pasa un dia sin completar
    @Override
    @Transactional
    public Habito completarHabito(Long habitoId) {
        // Encuentra el dueño, habito y sus registros
        Habito habito = habitoRepository.findById(habitoId).orElseThrow();
        Usuario usuario = habito.getUsuario();
        List<RegistroHabito> registros = habito.getRegistros();

        boolean completadoHoy = false;

        for (RegistroHabito registro : registros) {
            if (registro.getFechaCompletado().equals(LocalDate.now())) {
                completadoHoy = true;
            }
        }

        if (!completadoHoy) {
            // Recompensa al usuario y actualiza el streak
            int recompensa = habito.getRecompensaBase() * habito.getMultiplicadorStreak();
            usuario.setMonedas(usuario.getMonedas() + recompensa);
            usuario.setNivel(usuario.getNivel() + 0.25);
            habito.setMultiplicadorStreak(habito.getMultiplicadorStreak() + 1);

            // Registra la complecion
            RegistroHabito nuevoRegistro = new RegistroHabito(LocalDate.now(), recompensa, habito);
            habito.addRegistro(nuevoRegistro);
            registroHabitoRepository.save(nuevoRegistro);

            // Guardado
            usuarioRepository.save(usuario);
        }

        return habitoRepository.save(habito);
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
