package es.stemgranada.stableup.util;

import java.util.Arrays;
import java.util.List;
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

    @SuppressWarnings("deprecation")
    private final Faker faker = new Faker(new Locale("es"));

    private static final List<String> NOMBRES_HABITOS = Arrays.asList(
            "Gym", "Correr", "Leer", "Meditar",
            "Beber 2L de agua", "Dormir 8h", "Sin pantallas",
            "Estudiar idiomas", "Estiramientos", "Diario",
            "Tocar guitarra", "Yoga", "Salir al sol",
            "Llamar a un amigo", "Cocinar en casa", "Dibujar",
            "Limpiar el cuarto", "Aprender algo nuevo",
            "Caminar", "Gratitud diaria",
            "Comer 5 frutas", "Sin azúcar", "Pesas",
            "Respiración 4-7-8", "Pasear sin móvil");

    // Usuarios predeterminados
    public void usuariosPredeterminados() {

        // 1. Usuario rico
        Usuario rico = new Usuario(
                "midas.rico",
                "midas@stableup.com",
                9999,
                14.5);
        crearHabitos(rico);
        crearCaballos(rico);
        guardarUsuario(rico);

        // 2. Usuario pobre
        Usuario pobre = new Usuario(
                "juan.pelado",
                "pelado@stableup.com",
                0,
                1);
        crearHabitos(pobre);
        crearCaballos(pobre);
        guardarUsuario(pobre);

        // 3. Usuario nuevo
        Usuario nuevo = new Usuario(
                "nora.novata",
                "novata@stableup.com",
                100,
                1);
        guardarUsuario(nuevo);
    }

    @Transactional
    public void inicializarUsuarios() {
        usuariosPredeterminados();

        for (int i = 0; i < 5; i++) {

            Usuario usuario = crearUsuarioAleatorio();

            guardarUsuario(usuario);
        }
    }

    private Usuario crearUsuarioAleatorio() {

        String username = faker.name().username();

        String email = faker.internet().emailAddress();

        int monedas = faker.number().numberBetween(200, 1000);

        double nivel = faker.number().randomDouble(1, 1, 15);

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

        int numHabitos = faker.number().numberBetween(1, 4);

        for (int i = 0; i < numHabitos; i++) {

            int indice = faker.random().nextInt(NOMBRES_HABITOS.size());
            String nombre = NOMBRES_HABITOS.get(indice);

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

        int numCaballos = faker.number().numberBetween(2, 4);

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