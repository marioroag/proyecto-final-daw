package es.stemgranada.stableup.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.stemgranada.stableup.entity.RegistroHabito;
import es.stemgranada.stableup.service.RegistroHabitoService;

@RestController
@RequestMapping("/api/v1/registros")
public class RegistroHabitoController {
    @Autowired
    RegistroHabitoService registroHabitoService;

    @GetMapping("/{id}")
    public Optional<RegistroHabito> obtenerRegistroHabito(@PathVariable Long id) {
        return registroHabitoService.findById(id);
    }

    @GetMapping
    public List<RegistroHabito> listarRegistroHabitos() {
        return registroHabitoService.findAll();
    }

    @PostMapping
    public RegistroHabito crearRegistro(@RequestBody RegistroHabito registro) {
        return registroHabitoService.save(registro);
    }

    @PutMapping("/{id}")
    public RegistroHabito editarRegistro(@PathVariable Long id, @RequestBody RegistroHabito registroNuevo) {
        return registroHabitoService.editar(id, registroNuevo);
    }

    @DeleteMapping("/{id}")
    public RegistroHabito eliminarRegistro(@PathVariable Long id) {
        RegistroHabito registro = registroHabitoService.findById(id).orElseThrow();
        registroHabitoService.deleteById(id);
        return registro;
    }
}