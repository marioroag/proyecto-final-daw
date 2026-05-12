package es.stemgranada.stableup.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "registros")
public class Registro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private LocalDate fechaCompletado;

    // @Enumerated(EnumType.STRING)
    // private SatisfaccionHabito satisfaccion; //TODO: Implementar si da tiempo

    @Column
    private int monedasGanadas;

    // Relacion habitos
    @ManyToOne
    @JoinColumn(name = "habito_id")
    private Habito habito;

    public Registro(LocalDate fechaCompletado, int monedasGanadas, Habito habito) {
        this.fechaCompletado = fechaCompletado;
        this.monedasGanadas = monedasGanadas;
        this.habito = habito;
    }

    public Registro() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaCompletado() {
        return fechaCompletado;
    }

    public void setFechaCompletado(LocalDate fechaCompletado) {
        this.fechaCompletado = fechaCompletado;
    }

    public int getMonedasGanadas() {
        return monedasGanadas;
    }

    public void setMonedasGanadas(int monedasGanadas) {
        this.monedasGanadas = monedasGanadas;
    }

    public Habito getHabito() {
        return habito;
    }

    public void setHabito(Habito habito) {
        this.habito = habito;
    }

    @Override
    public String toString() {
        return "Registro [id=" + id + ", fechaCompletado=" + fechaCompletado
                + ", monedasGanadas=" + monedasGanadas + "]";
    }

}
