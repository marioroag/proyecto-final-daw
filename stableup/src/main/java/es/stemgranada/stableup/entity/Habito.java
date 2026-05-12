package es.stemgranada.stableup.entity;

import java.util.ArrayList;
import java.util.List;

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
public class Habito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String nombre;

    @Enumerated(EnumType.STRING)
    private TipoHabito tipo;

    @Column(nullable = false)
    private int recompensa;

    @Column(nullable = false)
    private int multiplicadorStreak;

    // Relacion usuarios
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    // Relacion registros
    @OneToMany(mappedBy = "habito", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Registro> registros = new ArrayList<>();

    public Habito(String nombre, TipoHabito tipo, int recompensa, int multiplicadorStreak, Usuario usuario) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.recompensa = recompensa;
        this.multiplicadorStreak = multiplicadorStreak;
        this.usuario = usuario;
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

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public TipoHabito getTipo() {
        return tipo;
    }

    public void setTipo(TipoHabito tipo) {
        this.tipo = tipo;
    }

    public int getRecompensa() {
        return recompensa;
    }

    public void setRecompensa(int recompensa) {
        this.recompensa = recompensa;
    }

    public int getMultiplicadorStreak() {
        return multiplicadorStreak;
    }

    public void setMultiplicadorStreak(int multiplicadorStreak) {
        this.multiplicadorStreak = multiplicadorStreak;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public List<Registro> getRegistros() {
        return registros;
    }

    public void setRegistros(List<Registro> registro) {
        this.registros = registro;
    }

    public void addRegistro(Registro registro) {
        registros.add(registro);
        registro.setHabito(this);
    }

    public void removeRegistro(Registro registro) {
        registros.remove(registro);
        registro.setHabito(null);
    }

    @Override
    public String toString() {
        return "Habito [id=" + id + ", nombre=" + nombre + ", tipo=" + tipo + ", recompensa=" + recompensa
                + ", multiplicador: " + multiplicadorStreak + "]";
    }

}
