package es.stemgranada.stableup.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50, unique = true)
    private String username;

    @Column(unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private int monedas;

    @Column(nullable = false)
    private double nivel; // Es double por que tengo idea de que aunque solo se muestre el numero completo
                          // (nivel: 10) los decimales estan ahi para manejar la barra de progreso

    public Usuario(String username, int monedas, double nivel) {
        this.username = username;
        this.monedas = monedas;
        this.nivel = nivel;
    }

    public Usuario() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getMonedas() {
        return monedas;
    }

    public void setMonedas(int monedas) {
        this.monedas = monedas;
    }

    public double getNivel() {
        return nivel;
    }

    public void setNivel(double nivel) {
        this.nivel = nivel;
    }

    @Override
    public String toString() {
        return "Usuario [id=" + id + ", username=" + username + ", monedas=" + monedas + ", nivel=" + nivel + "]";
    }
}
