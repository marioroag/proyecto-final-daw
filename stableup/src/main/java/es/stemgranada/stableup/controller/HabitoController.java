package es.stemgranada.stableup.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.stemgranada.stableup.entity.Habito;
import es.stemgranada.stableup.service.HabitoService;

@RestController
@RequestMapping("api/habitos")
public class HabitoController {
    @Autowired
    HabitoService habitoService;

    @GetMapping("/{id}")
    public Optional<Habito> obtenerHabito(@PathVariable Long id) {
        return habitoService.findById(id);
    }

    @GetMapping
    public List<Habito> listarHabitos() {
        return habitoService.findAll();
    }
}
