package es.stemgranada.stableup.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "participacion_carrera")
public class ParticipacionCarrera {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private double tiempoFinal;

    @Column(nullable = false)
    private int recompensa;

    @ManyToOne
    @JoinColumn(name = "caballo_id")
    @JsonIgnore
    private Caballo caballo;

    @ManyToOne
    @JoinColumn(name = "carrera_id")
    @JsonIgnore
    private Carrera carrera;

    public ParticipacionCarrera(Caballo caballo, Carrera carrera, double tiempoFinal, int recompensa) {
        this.caballo = caballo;
        this.carrera = carrera;
        this.tiempoFinal = tiempoFinal;
        this.recompensa = recompensa;
    }

    public ParticipacionCarrera() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Caballo getCaballo() {
        return caballo;
    }

    public void setCaballo(Caballo caballo) {
        this.caballo = caballo;
    }

    public Carrera getCarrera() {
        return carrera;
    }

    public void setCarrera(Carrera carrera) {
        this.carrera = carrera;
    }

    public double getTiempoFinal() {
        return tiempoFinal;
    }

    public void setTiempoFinal(double tiempoFinal) {
        this.tiempoFinal = tiempoFinal;
    }

    public int getRecompensa() {
        return recompensa;
    }

    public void setRecompensa(int recompensa) {
        this.recompensa = recompensa;
    }

}
