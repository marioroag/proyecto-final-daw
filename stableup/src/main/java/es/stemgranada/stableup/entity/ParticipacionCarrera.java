package es.stemgranada.stableup.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

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
@JsonPropertyOrder({ "id", "idCaballo", "posicion", "tiempoFinal", "recompensa" })
public class ParticipacionCarrera {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private double tiempoFinal;

    @Column(nullable = false)
    private int posicion;

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

    public ParticipacionCarrera(Caballo caballo, Carrera carrera, int posicion, double tiempoFinal, int recompensa) {
        this.caballo = caballo;
        this.carrera = carrera;
        this.posicion = posicion;
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

    public int getPosicion() {
        return posicion;
    }

    public void setPosicion(int posicion) {
        this.posicion = posicion;
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

    public Long getIdCaballo() {
        Long resultado = null;
        if (caballo != null) {
            resultado = caballo.getId();
        }
        return resultado;
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
