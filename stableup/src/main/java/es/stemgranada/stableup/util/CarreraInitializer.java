package es.stemgranada.stableup.util;

import java.util.*;
import java.util.stream.Collectors;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.github.javafaker.Faker;

import es.stemgranada.stableup.entity.Caballo;
import es.stemgranada.stableup.entity.Carrera;
import es.stemgranada.stableup.entity.ParticipacionCarrera;
import es.stemgranada.stableup.service.CaballoService;
import es.stemgranada.stableup.service.CarreraService;
import jakarta.transaction.Transactional;

@Component
public class CarreraInitializer {

    @Autowired
    private CarreraService carreraService;
    @Autowired
    private CaballoService caballoService;

    @SuppressWarnings("deprecation")
    private final Faker faker = new Faker(new Locale("es"));

    private static final int NUM_CARRERAS = 15;
    private static final int PARTICIPANTES_POR_CARRERA = 6;

    @Transactional
    public void inicializarCarreras() {
        List<Caballo> caballos = caballoService.findAll();
        if (caballos.size() < PARTICIPANTES_POR_CARRERA) {
            System.err.println("No hay suficientes caballos para crear carreras");
            return;
        }

        for (int i = 0; i < NUM_CARRERAS; i++) {
            crearCarreraConParticipaciones(caballos);
        }
    }

    private void crearCarreraConParticipaciones(List<Caballo> todosCaballos) {
        Carrera carrera = new Carrera(/* parámetros que pida tu constructor */);

        // Elige PARTICIPANTES_POR_CARRERA caballos al azar, sin repetir
        List<Caballo> participantes = new ArrayList<>(todosCaballos);
        Collections.shuffle(participantes);
        participantes = participantes.subList(0, PARTICIPANTES_POR_CARRERA);

        // Genera tiempos y los ordena → posición 1 al más rápido
        List<Double> tiempos = participantes.stream()
                .map(c -> faker.number().randomDouble(2, 60, 120))
                .sorted()
                .collect(Collectors.toList());

        for (int pos = 0; pos < participantes.size(); pos++) {
            Caballo caballo = participantes.get(pos);
            double tiempo = tiempos.get(pos);
            int posicion = pos + 1;
            int recompensa = calcularRecompensa(posicion);

            ParticipacionCarrera p = new ParticipacionCarrera(
                    caballo, carrera, posicion, tiempo, recompensa);

            carrera.addParticipacion(p); // ← asumiendo bidireccional con cascade
        }

        carreraService.save(carrera);
    }

    private int calcularRecompensa(int posicion) {
        return switch (posicion) {
            case 1 -> 500;
            case 2 -> 300;
            case 3 -> 150;
            default -> 50;
        };
    }
}