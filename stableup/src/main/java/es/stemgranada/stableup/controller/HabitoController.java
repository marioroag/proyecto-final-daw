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

import es.stemgranada.stableup.entity.Habito;
import es.stemgranada.stableup.service.HabitoService;

@RestController
@RequestMapping("api/v1/habitos")
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

    @DeleteMapping("/{id}")
    public Habito eliminar(@PathVariable Long id) {
        Habito habito = habitoService.findById(id).orElseThrow();
        habitoService.deleteById(id);
        return habito;
    }

    @PutMapping("/{id}")
    public Habito editar(@PathVariable Long id, @RequestBody Habito habitoNuevo) {
        return habitoService.editar(id, habitoNuevo);
    }

    @PostMapping("/{id}/completar")
    public Habito completarHabito(@PathVariable Long id) {
        return habitoService.completarHabito(id);
    }
}
