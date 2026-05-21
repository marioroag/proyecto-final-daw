package es.stemgranada.stableup.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.stemgranada.stableup.entity.Caballo;
import es.stemgranada.stableup.entity.ParticipacionCarrera;
import es.stemgranada.stableup.service.CaballoService;

@RestController
@RequestMapping("/api/v1/caballos")
public class CaballoController {
    @Autowired
    CaballoService caballoService;

    @GetMapping("/{id}")
    public Optional<Caballo> obtenerCaballo(@PathVariable Long id) {
        return caballoService.findById(id);
    }

    @GetMapping("/{id}/participaciones")
    public List<ParticipacionCarrera> obtenerParticipaciones(@PathVariable Long id) {
        return caballoService.findParticipacionesById(id);
    }

    @GetMapping
    public List<Caballo> listarCaballos() {
        return caballoService.findAll();
    }

    @PostMapping("/usuario/{usuarioId}")
    public Optional<Caballo> generarParaUsuario(@PathVariable Long usuarioId) {
        return caballoService.generarCaballoAleatorioAsignado(usuarioId);
    }

    @GetMapping("/contrincantes/{usuarioId}")
    public List<Caballo> obtenerContrincantes(@PathVariable Long id) {
        return caballoService.findContrincantesByCaballoId(id);
    }
}
