package es.stemgranada.stableup.entity;

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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String nombre;

    @Enumerated(EnumType.STRING)
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

    public Caballo(String nombre, RarezaCaballo rareza, int velocidad, int energia, double nivel, Usuario usuario) {
        this.nombre = nombre;
        this.rareza = rareza;
        this.velocidad = velocidad;
        this.energia = energia;
        this.nivel = nivel;
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

    @Override
    public String toString() {
        return "Caballo [id=" + id + ", nombre=" + nombre + ", rareza=" + rareza + ", velocidad=" + velocidad
                + ", energia=" + energia + ", nivel=" + nivel + ", usuario=" + usuario + "]";
    }

}
