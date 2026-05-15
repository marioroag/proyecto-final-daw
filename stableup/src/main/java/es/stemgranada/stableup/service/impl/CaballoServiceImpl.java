package es.stemgranada.stableup.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.stemgranada.stableup.entity.Caballo;
import es.stemgranada.stableup.entity.Usuario;
import es.stemgranada.stableup.repository.CaballoRepository;
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

        Caballo nuevoCaballo = null;
        
        if (usuario.getMonedas() > Caballo.getCosteGacha()) {
            usuario.setMonedas(usuario.getMonedas() - Caballo.getCosteGacha());

            nuevoCaballo = new Caballo(usuario);
            usuario.addCaballo(nuevoCaballo);

        }

        return Optional.of(caballoRepository.save(nuevoCaballo));
    }
}
