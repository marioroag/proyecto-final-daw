package es.stemgranada.stableup;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import es.stemgranada.stableup.entity.Caballo;
import es.stemgranada.stableup.entity.Carrera;
import es.stemgranada.stableup.entity.Habito;
import es.stemgranada.stableup.entity.ParticipacionCarrera;
import es.stemgranada.stableup.entity.Usuario;
import es.stemgranada.stableup.enums.RarezaCaballo;
import es.stemgranada.stableup.enums.TipoHabito;
import es.stemgranada.stableup.service.CaballoService;
import es.stemgranada.stableup.service.CarreraService;
import es.stemgranada.stableup.service.HabitoService;
import es.stemgranada.stableup.service.ParticipacionCarreraService;
import es.stemgranada.stableup.service.UsuarioService;

@SpringBootApplication
public class StableupApplication {

	public static void main(String[] args) {
		SpringApplication.run(StableupApplication.class, args);
	}

	@Bean
	CommandLineRunner run(UsuarioService usuarioService, HabitoService habitoService, CaballoService caballoService,
			CarreraService carreraService, ParticipacionCarreraService participacionCarreraService) {
		return args -> {
		};
	}
}
