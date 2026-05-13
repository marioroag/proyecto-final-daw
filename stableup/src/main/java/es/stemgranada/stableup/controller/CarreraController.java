package es.stemgranada.stableup.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.stemgranada.stableup.entity.Carrera;
import es.stemgranada.stableup.service.CarreraService;

@RestController
@RequestMapping("api/carreras")
public class CarreraController {
    @Autowired
    CarreraService carreraService;

    @GetMapping("/{id}")
    public Optional<Carrera> obtenerCarrera(@PathVariable Long id) {
        return carreraService.findById(id);
    }

    @GetMapping
    public List<Carrera> listarCarreras() {
        return carreraService.findAll();
    }
}
