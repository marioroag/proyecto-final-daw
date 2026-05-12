package es.stemgranada.stableup;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import es.stemgranada.stableup.entity.Caballo;
import es.stemgranada.stableup.entity.Habito;
import es.stemgranada.stableup.entity.Usuario;
import es.stemgranada.stableup.enums.RarezaCaballo;
import es.stemgranada.stableup.enums.TipoHabito;
import es.stemgranada.stableup.service.HabitoService;
import es.stemgranada.stableup.service.UsuarioService;

@SpringBootApplication
public class StableupApplication {

	public static void main(String[] args) {
		SpringApplication.run(StableupApplication.class, args);
	}

	@Bean
	CommandLineRunner run(UsuarioService usuarioService, HabitoService habitoService) {
		return args -> {
			// Creación Usuarios
			System.out.println("GENERANDO USUARIOS...");
			Usuario u1 = new Usuario("alexfit", "alex@demo.com", 120, 3);
			Usuario u2 = new Usuario("maria_read", "maria@demo.com", 80, 2);
			Usuario u3 = new Usuario("javi_medita", "javi@demo.com", 200, 5);
			Usuario u4 = new Usuario("lucia_pro", "lucia@demo.com", 50, 1);
			Usuario u5 = new Usuario("dani_runner", "dani@demo.com", 300, 6);
			usuarioService.save(u1);
			usuarioService.save(u2);
			usuarioService.save(u3);
			usuarioService.save(u4);
			usuarioService.save(u5);

			// Creación Habitos
			System.out.println("GENERANDO HABITOS...");
			Habito h1 = new Habito("Gym", TipoHabito.STRENGTH, 10, 2, u1);
			Habito h2 = new Habito("Leer", TipoHabito.WELLBEING, 5, 2, u2);
			Habito h3 = new Habito("Meditación", TipoHabito.MENTAL_HEALTH, 8, 3, u3);
			Habito h4 = new Habito("Estudiar", TipoHabito.WELLBEING, 12, 2, u4);
			Habito h5 = new Habito("Correr", TipoHabito.STRENGTH, 15, 3, u5);
			habitoService.save(h1);
			habitoService.save(h2);
			habitoService.save(h3);
			habitoService.save(h4);
			habitoService.save(h5);

			// String nombre, RarezaCaballo rareza, int velocidad, int energia, double
			// nivel, Usuario usuario
			System.out.println("GENERANDO CABALLOS...");
			Caballo c1 = new Caballo("Sombra", RarezaCaballo.COMUN, 8, 12, 9.5, u1);
			Caballo c2 = new Caballo("Trueno", RarezaCaballo.RARO, 18, 20, 22.0, u2);
			Caballo c3 = new Caballo("Brisa", RarezaCaballo.LEGENDARIO, 50, 9, 10.5, u3);
			Caballo c4 = new Caballo("Relámpago", RarezaCaballo.EPICO, 32, 28, 35.0, u4);
			Caballo c5 = new Caballo("Centella", RarezaCaballo.RARO, 21, 17, 19.5, u5);
			// TODO: TERMINAR CABALLOS

			Caballo c6 = new Caballo(u1);
			System.out.println(u1);
			System.out.println(c6);

			usuarioService.findById(1l);
			System.out.println(u1);

		};
	}
}
