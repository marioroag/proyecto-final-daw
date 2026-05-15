package es.stemgranada.stableup.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DbInitializer implements CommandLineRunner {

    @Autowired
    private UsuarioInitializer usuarioInitializer;

    @Override
    public void run(String... args) {

        inicializarBaseDeDatos();
    }

    private void inicializarBaseDeDatos() {

        System.out.println("Inicializando StableUp...");

        usuarioInitializer.inicializarUsuarios();

        System.out.println("Datos cargados correctamente.");
    }
}