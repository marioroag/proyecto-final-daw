package es.stemgranada.stableup.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import es.stemgranada.stableup.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}
