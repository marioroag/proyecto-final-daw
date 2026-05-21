package es.stemgranada.stableup.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "carreras")
@JsonPropertyOrder({ "id", "aforoCaballos", "distancia", "recompensaBase" })
public class Carrera {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int aforoCaballos;

    @Column(nullable = false)
    private double distancia;

    @Column(nullable = false)
    private int recompensaBase;

    // Relacion ParticipacionCarrera
    @OneToMany(mappedBy = "carrera", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ParticipacionCarrera> participaciones = new ArrayList<>();

    public Carrera(int aforoCaballos, double distancia, int recompensaBase) {
        this.aforoCaballos = aforoCaballos;
        this.distancia = distancia;
        this.recompensaBase = recompensaBase;
    }

    public Carrera() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getAforoCaballos() {
        return aforoCaballos;
    }

    public void setAforoCaballos(int aforoCaballos) {
        this.aforoCaballos = aforoCaballos;
    }

    public double getDistancia() {
        return distancia;
    }

    public void setDistancia(double distancia) {
        this.distancia = distancia;
    }

    public List<ParticipacionCarrera> getParticipaciones() {
        return participaciones;
    }

    public void setParticipaciones(List<ParticipacionCarrera> participaciones) {
        this.participaciones = participaciones;
    }

    public void addParticipacion(ParticipacionCarrera p) {
        participaciones.add(p);
        p.setCarrera(this);
    }

    public int getRecompensaBase() {
        return recompensaBase;
    }

    public void setRecompensaBase(int recompensaBase) {
        this.recompensaBase = recompensaBase;
    }

    @Override
    public String toString() {
        return "Carrera [id=" + id + ", distancia=" + distancia + ", recompensaBase=" + recompensaBase + "]";
    }
}
