package es.stemgranada.stableup.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.stemgranada.stableup.entity.Caballo;
import es.stemgranada.stableup.entity.Habito;
import es.stemgranada.stableup.entity.Usuario;
import es.stemgranada.stableup.repository.HabitoRepository;
import es.stemgranada.stableup.repository.UsuarioRepository;
import es.stemgranada.stableup.service.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    HabitoRepository habitoRepository;

    @Override
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    @Override
    public Optional<Usuario> findById(Long id) {
        return usuarioRepository.findById(id);
    }

    @Override
    public Usuario save(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @Override
    public void deleteById(Long id) {
        usuarioRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        usuarioRepository.deleteAll();
    }

    @Override
    public Optional<Usuario> findByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    @Override
    public List<Habito> findHabitosById(Long id) {
        return usuarioRepository.findById(id).get().getHabitos();
    }

    @Override
    public List<Caballo> findCaballosById(Long id) {
        return usuarioRepository.findById(id).get().getCaballos();
    }

    @Override
    public Habito crearHabito(Long id, Habito habito) {
        Usuario usuario = usuarioRepository.findById(id).orElseThrow();
        habito.setUsuario(usuario);
        habito.setMultiplicadorStreak(1);
        usuario.addHabito(habito);
        return habitoRepository.save(habito);
    }
}
