package es.stemgranada.stableup.entity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import es.stemgranada.stableup.enums.RarezaCaballo;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "caballos")
public class Caballo {
    private static final int RANGO_STATS = 30;
    private static final int BONUS_COMUN = 10, BONUS_POCO_COMUN = 20, BONUS_RARO = 30, BONUS_EPICO = 40,
            BONUS_LEGENDARIO = 50;
    private static final int PROBABILIDAD_COMUN = 50, PROBABILIDAD_POCO_COMUN = 75, PROBABILIDAD_RARO = 90,
            PROBABILIDAD_EPICO = 98;

    private static final List<String> NOMBRES = new ArrayList<>(Arrays.asList(
            "Relampago", "Tormenta", "Pegaso", "Furia", "Cometa",
            "Trueno", "Aurora", "Titan", "Sombra", "Huracan",
            "Luna", "Bandido", "Centella", "Destino", "Rayo"));

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String nombre;

    @Enumerated(EnumType.ORDINAL)
    private RarezaCaballo rareza;

    @Column(nullable = false)
    private int velocidad;

    @Column(nullable = false)
    private int energia;

    @Column(nullable = false)
    private double nivel;

    // Relacion usuarios
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    // En caso de querer hacer uno predeterminado
    public Caballo(String nombre, RarezaCaballo rareza, int velocidad, int energia, double nivel, Usuario usuario) {
        this.nombre = nombre;
        this.rareza = rareza;
        this.velocidad = velocidad;
        this.energia = energia;
        this.nivel = nivel;
        this.usuario = usuario;
    }

    // Generador aleatorio
    public Caballo(Usuario usuario) {
        this.nombre = generarNombre();
        this.rareza = generarRareza();
        this.velocidad = generarVelocidad(rareza);
        this.energia = generarEnergia(rareza);
        this.nivel = 1;
        this.usuario = usuario;
    }

    public Caballo() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public RarezaCaballo getRareza() {
        return rareza;
    }

    public void setRareza(RarezaCaballo rareza) {
        this.rareza = rareza;
    }

    public int getVelocidad() {
        return velocidad;
    }

    public void setVelocidad(int velocidad) {
        this.velocidad = velocidad;
    }

    public int getEnergia() {
        return energia;
    }

    public void setEnergia(int energia) {
        this.energia = energia;
    }

    public double getNivel() {
        return nivel;
    }

    public void setNivel(double nivel) {
        this.nivel = nivel;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    private String generarNombre() {
        int numeroRandom = (int) (Math.random() * NOMBRES.size());
        return NOMBRES.get(numeroRandom);

    }

    private RarezaCaballo generarRareza() {
        RarezaCaballo rareza = null;

        int probabilidad = (int) (Math.random() * 100);

        if (probabilidad < PROBABILIDAD_COMUN) {
            rareza = RarezaCaballo.COMUN;
        } else if (probabilidad < PROBABILIDAD_POCO_COMUN) {
            rareza = RarezaCaballo.POCO_COMUN;
        } else if (probabilidad < PROBABILIDAD_RARO) {
            rareza = RarezaCaballo.RARO;
        } else if (probabilidad < PROBABILIDAD_EPICO) {
            rareza = RarezaCaballo.EPICO;
        } else {
            rareza = RarezaCaballo.LEGENDARIO;
        }

        return rareza;
    }

    private int generarVelocidad(RarezaCaballo rareza) {
        int velocidad = 0;

        if (rareza == RarezaCaballo.COMUN) {
            velocidad = (int) (Math.random() * RANGO_STATS) + BONUS_COMUN;
        } else if (rareza == RarezaCaballo.POCO_COMUN) {
            velocidad = (int) (Math.random() * RANGO_STATS) + BONUS_POCO_COMUN;
        } else if (rareza == RarezaCaballo.RARO) {
            velocidad = (int) (Math.random() * RANGO_STATS) + BONUS_RARO;
        } else if (rareza == RarezaCaballo.EPICO) {
            velocidad = (int) (Math.random() * RANGO_STATS) + BONUS_EPICO;
        } else {
            velocidad = (int) (Math.random() * RANGO_STATS) + BONUS_LEGENDARIO;
        }

        return velocidad;
    }

    private int generarEnergia(RarezaCaballo rareza) {
        int energia = 0;

        if (rareza == RarezaCaballo.COMUN) {
            energia = (int) (Math.random() * RANGO_STATS) + BONUS_COMUN;
        } else if (rareza == RarezaCaballo.POCO_COMUN) {
            energia = (int) (Math.random() * RANGO_STATS) + BONUS_POCO_COMUN;
        } else if (rareza == RarezaCaballo.RARO) {
            energia = (int) (Math.random() * RANGO_STATS) + BONUS_RARO;
        } else if (rareza == RarezaCaballo.EPICO) {
            energia = (int) (Math.random() * RANGO_STATS) + BONUS_EPICO;
        } else {
            energia = (int) (Math.random() * RANGO_STATS) + BONUS_LEGENDARIO;
        }

        return energia;
    }

    @Override
    public String toString() {
        return "Caballo #" + id + ": " + nombre + "\n"
                + "  Rareza:     " + rareza + "\n"
                + "  Velocidad:  " + velocidad + "\n"
                + "  Energía:    " + energia + "\n"
                + "  Nivel:      " + nivel + "\n"
                + "  ID Dueño:   " + usuario.getId();
    }

}
