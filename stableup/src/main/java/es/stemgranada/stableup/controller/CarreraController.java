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

import es.stemgranada.stableup.entity.Carrera;
import es.stemgranada.stableup.service.CarreraService;

@RestController
@RequestMapping("/api/v1/carreras")
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

    @PostMapping("/iniciar/{idCaballoPropio}")
    public Carrera iniciarCarrera(
            @PathVariable Long idCaballoPropio,
            @RequestBody List<Long> idsContrincantes) {
        return carreraService.iniciarCarrera(idCaballoPropio, idsContrincantes);
    }

    @PutMapping("/{id}")
    public Carrera editarCarrera(@PathVariable Long id, @RequestBody Carrera carreraNueva) {
        return carreraService.editar(id, carreraNueva);
    }

    @DeleteMapping("/{id}")
    public Carrera eliminarCarrera(@PathVariable Long id) {
        Carrera carrera = carreraService.findById(id).orElseThrow();
        carreraService.deleteById(id);
        return carrera;
    }
}
