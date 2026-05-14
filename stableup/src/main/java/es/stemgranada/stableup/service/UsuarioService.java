package es.stemgranada.stableup.service;

import java.util.List;
import java.util.Optional;

import es.stemgranada.stableup.entity.Caballo;
import es.stemgranada.stableup.entity.Habito;
import es.stemgranada.stableup.entity.Usuario;

public interface UsuarioService {

    List<Usuario> findAll();

    Optional<Usuario> findById(Long id);

    Optional<Usuario> findByEmail(String email);

    Usuario save(Usuario usuario);

    void deleteById(Long id);

    void deleteAll();

    List<Caballo> findCaballosById(Long id);

    List<Habito> findHabitosById(Long id);
}
