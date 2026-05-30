package es.stemgranada.stableup.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.stemgranada.stableup.entity.Caballo;
import es.stemgranada.stableup.entity.Carrera;
import es.stemgranada.stableup.entity.ParticipacionCarrera;
import es.stemgranada.stableup.entity.Usuario;
import es.stemgranada.stableup.repository.CaballoRepository;
import es.stemgranada.stableup.repository.CarreraRepository;
import es.stemgranada.stableup.service.CarreraService;
import jakarta.transaction.Transactional;

@Service
public class CarreraServiceImpl implements CarreraService {
    @Autowired
    CarreraRepository carreraRepository;

    @Autowired
    CaballoRepository caballoRepository;

    @Override
    public List<Carrera> findAll() {
        return carreraRepository.findAll();
    }

    @Override
    public Optional<Carrera> findById(Long id) {
        return carreraRepository.findById(id);
    }

    @Override
    public Carrera save(Carrera carrera) {
        return carreraRepository.save(carrera);
    }

    @Override
    public void deleteById(Long id) {
        carreraRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        carreraRepository.deleteAll();
    }

    /**
     * Crea una carrera con el caballo propio y los contrincantes indicados.
     * Simula el tiempo de cada uno según sus stats, los ordena por tiempo y
     * reparte recompensa al caballo del jugador según la posición final.
     *
     * @param idCaballoPropio  id del caballo del jugador
     * @param idsContrincantes ids de los caballos rivales
     * @return la carrera ya resuelta y guardada
     */
    @Override
    @Transactional
    public Carrera iniciarCarrera(Long idCaballoPropio, List<Long> idsContrincantes) {
        int aforoCaballos = idsContrincantes.size() + 1;
        double distancia = 1000;
        int recompensaBase = 100;

        Carrera carrera = new Carrera(aforoCaballos, distancia, recompensaBase);

        // Carga todos los caballos que van a participar
        List<Caballo> participantes = new ArrayList<>();

        Caballo caballoPropio = caballoRepository.findById(idCaballoPropio).orElseThrow();
        participantes.add(caballoPropio);

        for (Long idContrincante : idsContrincantes) {
            Caballo contrincante = caballoRepository.findById(idContrincante).orElseThrow();
            participantes.add(contrincante);
        }

        // Crea las participaciones con tiempos simulados segun stats del caballo
        List<ParticipacionCarrera> participaciones = new ArrayList<>();
        for (Caballo caballo : participantes) {
            double tiempo = simularTiempo(caballo, distancia);
            ParticipacionCarrera participacion = new ParticipacionCarrera(caballo, carrera, 0, tiempo, 0);
            participaciones.add(participacion);
        }

        // Ordena las participaciones
        for (int i = 0; i < participaciones.size() - 1; i++) {
            for (int j = 0; j < participaciones.size() - 1; j++) {
                ParticipacionCarrera actual = participaciones.get(j);
                ParticipacionCarrera siguiente = participaciones.get(j + 1);

                if (actual.getTiempoFinal() > siguiente.getTiempoFinal()) {
                    participaciones.set(j, siguiente);
                    participaciones.set(j + 1, actual);
                }
            }
        }

        // Asigna los datos
        for (int indice = 0; indice < participaciones.size(); indice++) {
            ParticipacionCarrera participacion = participaciones.get(indice);
            int posicion = indice + 1;

            participacion.setPosicion(posicion);

            // Solo el caballo del jugador recibe recompensa y monedas
            if (participacion.getCaballo().getId().equals(idCaballoPropio)) {
                int recompensa = recompensaCarrera(posicion);
                participacion.setRecompensa(recompensa);

                Usuario duenio = participacion.getCaballo().getUsuario();
                duenio.setMonedas(duenio.getMonedas() + recompensa);
            }

            carrera.addParticipacion(participacion);
        }

        return carreraRepository.save(carrera);
    }

    /**
     * Calcula el tiempo de un caballo en la carrera a partir de su velocidad
     * y energía, con un pequeño factor aleatorio para que no salga siempre igual.
     *
     * @param caballo   caballo que corre
     * @param distancia distancia de la carrera
     * @return el tiempo en segundos redondeado a dos decimales
     */
    // Calcula los resultados de cada caballo
    private double simularTiempo(Caballo caballo, double distancia) {
        int statsTotales = caballo.getVelocidad() + caballo.getEnergia();
        double factorAleatorio = 0.85 + (Math.random() * 0.3);
        double tiempo = (distancia / statsTotales) * 100 * factorAleatorio;
        return Math.round(tiempo * 100.0) / 100.0;
    }

    private int recompensaCarrera(int posicion) {
        int resultado = 50;

        if (posicion == 1) {
            resultado = 300;
        } else if (posicion == 2) {
            resultado = 200;
        } else if (posicion == 3) {
            resultado = 100;
        }

        return resultado;
    }

    @Transactional
    @Override
    public Carrera editar(Long id, Carrera carreraNueva) {
        Carrera carrera = carreraRepository.findById(id).orElseThrow();
        carrera.setAforoCaballos(carreraNueva.getAforoCaballos());
        carrera.setDistancia(carreraNueva.getDistancia());
        carrera.setRecompensaBase(carreraNueva.getRecompensaBase());
        return carreraRepository.save(carrera);
    }
}
