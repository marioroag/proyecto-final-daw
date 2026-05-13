package es.stemgranada.stableup.controller;

import java.lang.classfile.ClassFile.Option;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.stemgranada.stableup.entity.Usuario;
import es.stemgranada.stableup.service.UsuarioService;

// Postman: http://localhost:8080/api/usuarios
// Arreglas recursion con JsonIgnore
@RestController
@RequestMapping("api/usuarios")
public class UsuarioController {
    @Autowired
    UsuarioService usuarioService;

    @GetMapping("/{id}")
    public Optional<Usuario> obtenerUsuario(Long usuarioId) {
        return usuarioService.findById(usuarioId);
    }

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioService.findAll();
    }
}
