package es.stemgranada.stableup.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.stemgranada.stableup.entity.Caballo;
import es.stemgranada.stableup.entity.Usuario;
import es.stemgranada.stableup.service.UsuarioService;

// Postman: http://localhost:8080/api/usuarios
@RestController
@RequestMapping("api/usuarios")
public class UsuarioController {
    @Autowired
    UsuarioService usuarioService;

    @GetMapping("/{id}")
    public Optional<Usuario> obtenerUsuario(@PathVariable Long id) {
        return usuarioService.findById(id);
    }

    @GetMapping("/{id}/caballos")
    public List<Caballo> obtenerCaballosUsuario(@PathVariable Long id) {
        return usuarioService.findCaballosById(id);
    }

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioService.findAll();
    }
}
