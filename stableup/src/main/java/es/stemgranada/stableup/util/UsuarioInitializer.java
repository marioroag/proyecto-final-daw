package es.stemgranada.stableup.util;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.github.javafaker.Faker;

import es.stemgranada.stableup.entity.Caballo;
import es.stemgranada.stableup.entity.Habito;
import es.stemgranada.stableup.entity.Usuario;
import es.stemgranada.stableup.enums.TipoHabito;
import es.stemgranada.stableup.service.UsuarioService;
import jakarta.transaction.Transactional;

@Component
public class UsuarioInitializer {

    @Autowired
    private UsuarioService usuarioService;

    private final Faker faker = new Faker(new Locale("es"));

    @Transactional
    public void inicializarUsuarios() {

        for (int i = 0; i < 15; i++) {

            Usuario usuario = crearUsuarioAleatorio();

            guardarUsuario(usuario);
        }
    }

    private Usuario crearUsuarioAleatorio() {

        String username = faker.name().username();

        String email = faker.internet().emailAddress();

        int monedas = faker.number().numberBetween(0, 5000);

        double nivel = faker.number().randomDouble(1, 1, 50);

        Usuario usuario = new Usuario(
                username,
                email,
                monedas,
                nivel);

        crearHabitos(usuario);

        crearCaballos(usuario);

        return usuario;
    }

    private void crearHabitos(Usuario usuario) {

        int numHabitos = faker.number().numberBetween(1, 6);

        for (int i = 0; i < numHabitos; i++) {

            String nombre = "";
            do {
                nombre = faker.programmingLanguage().name();
            } while (nombre.length() > 12);

            TipoHabito tipo = TipoHabito.values()[faker.random().nextInt(TipoHabito.values().length)];

            int multiplicador = faker.number().numberBetween(1, 10);

            Habito habito = new Habito(
                    nombre,
                    tipo,
                    multiplicador,
                    usuario);

            usuario.addHabito(habito);
        }
    }

    private void crearCaballos(Usuario usuario) {

        int numCaballos = faker.number().numberBetween(4, 8);

        for (int i = 0; i < numCaballos; i++) {

            Caballo caballo = new Caballo(usuario);

            usuario.addCaballo(caballo);
        }
    }

    private void guardarUsuario(Usuario usuario) {

        try {

            usuarioService.save(usuario);

        } catch (Exception e) {

            System.err.println(
                    "Error al crear usuario "
                            + usuario.getUsername()
                            + ": "
                            + e.getMessage());
        }
    }
}