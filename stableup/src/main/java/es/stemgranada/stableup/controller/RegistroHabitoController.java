package es.stemgranada.stableup.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.stemgranada.stableup.entity.Caballo;
import es.stemgranada.stableup.entity.Habito;
import es.stemgranada.stableup.entity.RegistroHabito;
import es.stemgranada.stableup.service.HabitoService;
import es.stemgranada.stableup.service.RegistroHabitoService;

@RestController
@RequestMapping("api/v1/registros")
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
}
