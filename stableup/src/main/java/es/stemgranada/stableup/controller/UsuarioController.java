package es.stemgranada.stableup.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.stemgranada.stableup.entity.Caballo;
import es.stemgranada.stableup.entity.Habito;
import es.stemgranada.stableup.entity.Usuario;
import es.stemgranada.stableup.service.UsuarioService;

// Postman: http://localhost:8080/api/usuarios
@RestController
@RequestMapping("api/v1/usuarios")
public class UsuarioController {
    @Autowired
    UsuarioService usuarioService;

    @PostMapping
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        return usuarioService.save(usuario);
    }

    @GetMapping("/{id}")
    public Optional<Usuario> obtenerUsuario(@PathVariable Long id) {
        return usuarioService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void eliminarPorId(@PathVariable Long id) {
        usuarioService.deleteById(id);
    }

    @GetMapping("/{id}/caballos")
    public List<Caballo> obtenerCaballosUsuario(@PathVariable Long id) {
        return usuarioService.findCaballosById(id);
    }

    @GetMapping("/{id}/habitos")
    public List<Habito> obtenerHabitosUsuario(@PathVariable Long id) {
        return usuarioService.findHabitosById(id);
    }

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioService.findAll();
    }

    @PostMapping("{id}/habitos")
    public Habito crearHabito(@PathVariable Long id, @RequestBody Habito habito) {
        return usuarioService.crearHabito(id, habito);
    }
}
