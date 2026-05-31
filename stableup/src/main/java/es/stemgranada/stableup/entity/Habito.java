package es.stemgranada.stableup.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import es.stemgranada.stableup.enums.TipoHabito;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "habitos")
@JsonPropertyOrder({ "id", "nombre", "tipo", "recompensaBase", "multiplicadorStreak" })
public class Habito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String nombre;

    @Enumerated(EnumType.STRING)
    private TipoHabito tipo;

    @Column(nullable = false)
    private int multiplicadorStreak;

    // Relacion usuarios
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @JsonIgnore
    private Usuario usuario;

    // Relacion registros
    @OneToMany(mappedBy = "habito", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RegistroHabito> registros = new ArrayList<>();

    static final int RECOMPENSA_BASE = 15;
    static final double RECOMPENSA_XP = 0.25;

    public Habito(String nombre, TipoHabito tipo, int multiplicadorStreak, Usuario usuario) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.multiplicadorStreak = multiplicadorStreak;
        this.usuario = usuario;
        this.registros = new ArrayList<>();
    }

    public Habito(String nombre, TipoHabito tipo) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.multiplicadorStreak = 1;
        this.registros = new ArrayList<>();
    }

    public Habito() {
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

    public int getRecompensaBase() {
        return RECOMPENSA_BASE;
    }

    public double getRecompensaXp() {
        return RECOMPENSA_XP;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public TipoHabito getTipo() {
        return tipo;
    }

    public void setTipo(TipoHabito tipo) {
        this.tipo = tipo;
    }

    public void setMultiplicadorStreak(int multiplicadorStreak) {
        this.multiplicadorStreak = multiplicadorStreak;
    }

    public int getMultiplicadorStreak() {
        return multiplicadorStreak;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public List<RegistroHabito> getRegistros() {
        return registros;
    }

    public void setRegistros(List<RegistroHabito> registro) {
        this.registros = registro;
    }

    public void addRegistro(RegistroHabito registro) {
        registros.add(registro);
        registro.setHabito(this);
    }

    public void removeRegistro(RegistroHabito registro) {
        registros.remove(registro);
        registro.setHabito(null);
    }

    @Override
    public String toString() {
        return "Habito #" + id + ": " + nombre + "\n"
                + "  Tipo:           " + tipo + "\n"
                + "  Recompensa:     " + RECOMPENSA_BASE + "\n"
                + "  Multiplicador:  " + multiplicadorStreak + "\n"
                + "  Registros:      " + registros.size() + "\n"
                + "  ID Dueño:       " + usuario.getId();
    }

}
