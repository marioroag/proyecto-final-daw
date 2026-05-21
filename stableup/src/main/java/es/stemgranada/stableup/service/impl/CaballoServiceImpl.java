package es.stemgranada.stableup.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.stemgranada.stableup.entity.Caballo;
import es.stemgranada.stableup.entity.ParticipacionCarrera;
import es.stemgranada.stableup.entity.Usuario;
import es.stemgranada.stableup.repository.CaballoRepository;
import es.stemgranada.stableup.repository.ParticipacionCarreraRepository;
import es.stemgranada.stableup.repository.UsuarioRepository;
import es.stemgranada.stableup.service.CaballoService;
import jakarta.transaction.Transactional;

@Service
public class CaballoServiceImpl implements CaballoService {

    @Autowired
    CaballoRepository caballoRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    public List<Caballo> findAll() {
        return caballoRepository.findAll();
    }

    @Override
    public Optional<Caballo> findById(Long id) {
        return caballoRepository.findById(id);
    }

    @Override
    public Caballo save(Caballo caballo) {
        return caballoRepository.save(caballo);
    }

    @Override
    public void deleteById(Long id) {
        caballoRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        caballoRepository.deleteAll();
    }

    @Transactional
    public Optional<Caballo> generarCaballoAleatorioAsignado(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow();

        Optional<Caballo> resultado = Optional.empty();

        if (usuario.getMonedas() >= Caballo.getCosteGacha()) {
            usuario.setMonedas(usuario.getMonedas() - Caballo.getCosteGacha());

            Caballo nuevoCaballo = new Caballo(usuario);
            usuario.addCaballo(nuevoCaballo);

            resultado = Optional.of(caballoRepository.save(nuevoCaballo));
        }

        return resultado;
    }

    @Override
    public List<ParticipacionCarrera> findParticipacionesById(Long caballoId) {
        return caballoRepository.findById(caballoId).get().getParticipaciones();

    }

    @Override
    public List<Caballo> findContrincantesByCaballoId(Long caballoId) {
        Caballo caballo = caballoRepository.findById(caballoId).orElseThrow();
        Long idDueno = caballo.getUsuario().getId();
        return caballoRepository.findByUsuarioIdNot(idDueno);
    }
}
