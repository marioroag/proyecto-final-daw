# StableUp

Aplicación web para gestionar hábitos de forma gamificada. Cada vez que completas un hábito ganas monedas y experiencia. Con las monedas consigues caballos aleatorios (estilo gacha) que después compiten en carreras contra los caballos de otros usuarios.

Proyecto final del 1.º curso de DAW (3.er trimestre) en STEM Granada.

[![Ver vídeo de demostración](https://img.youtube.com/vi/26Q3oTDxfro/0.jpg)](https://youtu.be/26Q3oTDxfro)

## Funcionalidades

- **Hábitos con rachas.** Cada hábito se puede completar una vez al día. Completarlo da monedas y XP, y cada día seguido sube el multiplicador de la recompensa. Si pasa más de un día sin completarlo, la racha se reinicia.
- **Gacha de caballos.** Por 100 monedas obtienes un caballo con nombre, velocidad y energía aleatorios según su rareza:

  | Rareza | Probabilidad |
  |---|---|
  | Común | 30 % |
  | Poco común | 25 % |
  | Raro | 20 % |
  | Épico | 19 % |
  | Legendario | 6 % |

- **Carreras.** Eliges uno de tus caballos y rivales de otros usuarios. El tiempo de cada caballo se calcula con sus stats y un pequeño factor aleatorio, y según la posición final ganas entre 50 y 300 monedas.
- **Frontend sin frameworks.** Interfaz en HTML, CSS y JavaScript vanilla con ES Modules, organizada en componentes reutilizables que consumen la API REST.

## Tecnologías

| Parte | Stack |
|---|---|
| Backend | Java 25, Spring Boot 4 (Web MVC + Data JPA), Hibernate, H2, JavaFaker, Maven |
| Frontend | HTML5, CSS3, JavaScript (ES Modules), Bootstrap 5, Bootstrap Icons |
| Herramientas | Git/GitHub, JavaDoc, draw.io (UML), Postman |

## Arquitectura

El backend sigue una **arquitectura por capas**, en la que cada capa solo se comunica con la siguiente:

- **controller**: recibe las peticiones HTTP y devuelve las respuestas (REST).
- **service**: lógica de negocio, separada en interfaz e implementación.
- **repository**: acceso a datos con Spring Data JPA.
- **entity**: modelo de dominio mapeado a tablas con JPA.

La documentación JavaDoc generada está en la carpeta [`docs/`](docs/).

## Diagrama UML

![Diagrama UML](diagrama-uml.svg)

El original se puede editar en [`diagrama-uml.drawio`](diagrama-uml.drawio) con [draw.io](https://app.diagrams.net/).

- Un **Usuario** tiene varios **Caballos** y varios **Hábitos**.
- Un **Hábito** guarda un **Registro** por cada vez que se completa.
- Un **Caballo** participa en **Carreras** a través de **ParticipacionCarrera**.

## Cómo ejecutarlo

Requisitos: **JDK 25**. Maven no hace falta, porque el proyecto incluye el wrapper `mvnw`.

Desde la carpeta `stableup`:

```bash
./mvnw spring-boot:run      # arrancar la aplicación
./mvnw clean package        # compilar
./mvnw test                 # pasar los tests
```

En Windows usa `mvnw.cmd` en lugar de `./mvnw`.

La app queda disponible en `http://localhost:8080`. Al arrancar se generan usuarios, caballos y carreras de prueba.

### Consola H2

La base de datos es en memoria, así que se borra y se vuelve a crear en cada arranque. Para ver las tablas:

1. Abre `http://localhost:8080/h2-console`.
2. Conecta con:
   - **JDBC URL:** `jdbc:h2:mem:StableUp`
   - **User Name:** `sa`
   - **Password:** (vacío)

## API REST

Todas las rutas cuelgan de `/api/v1`, por ejemplo `http://localhost:8080/api/v1/usuarios`.

### Usuarios: `/usuarios`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/usuarios` | Listar todos |
| GET | `/usuarios/{id}` | Obtener uno |
| POST | `/usuarios` | Crear |
| PUT | `/usuarios/{id}` | Editar |
| DELETE | `/usuarios/{id}` | Borrar |
| GET | `/usuarios/{id}/caballos` | Caballos del usuario |
| GET | `/usuarios/{id}/habitos` | Hábitos del usuario |
| POST | `/usuarios/{id}/habitos` | Crear un hábito para ese usuario |

### Hábitos: `/habitos`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/habitos` | Listar todos |
| GET | `/habitos/{id}` | Obtener uno |
| PUT | `/habitos/{id}` | Editar |
| DELETE | `/habitos/{id}` | Borrar |
| POST | `/habitos/{id}/completar` | Completar el hábito y recibir la recompensa |

### Registros: `/registros`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/registros` | Listar todos |
| GET | `/registros/{id}` | Obtener uno |
| POST | `/registros` | Crear |
| PUT | `/registros/{id}` | Editar |
| DELETE | `/registros/{id}` | Borrar |

### Caballos: `/caballos`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/caballos` | Listar todos |
| GET | `/caballos/{id}` | Obtener uno |
| GET | `/caballos/{id}/participaciones` | Sus participaciones en carreras |
| GET | `/caballos/{id}/contrincantes` | Caballos de otros usuarios (posibles rivales) |
| POST | `/caballos/usuario/{usuarioId}` | Generar un caballo aleatorio (cuesta 100 monedas) |
| PUT | `/caballos/{id}` | Editar |
| DELETE | `/caballos/{id}` | Borrar |

### Carreras: `/carreras`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/carreras` | Listar todas |
| GET | `/carreras/{id}` | Obtener una |
| POST | `/carreras/iniciar/{idCaballoPropio}` | Iniciar una carrera (el body lleva la lista de IDs de los rivales) |
| PUT | `/carreras/{id}` | Editar |
| DELETE | `/carreras/{id}` | Borrar |

## Autor

**Mario Rodríguez Aguado** · [GitHub](https://github.com/marioroag)
