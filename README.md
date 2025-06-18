# Sistema Hospitalario

Este proyecto es una aplicación web para la **gestión de internaciones hospitalarias**. Permite registrar pacientes, administrar ingresos, asignar camas, gestionar habitaciones y turnos médicos.

[Acceder a la aplicación](https://sistema-hospitalario-production-ddb5.up.railway.app/)

---

## Funcionalidades principales

-  **Registrar nuevos ingresos de pacientes** (programados, de emergencia o derivados).
-  **Ver, dar de alta y cancelar admisiones existentes.**
-  **Asignar camas disponibles** en habitaciones según disponibilidad e higiene.
-  **Evitar que pacientes de diferente sexo compartan habitación.**
-  **Editar la información personal de cada paciente.**
-  **Visualizar y actualizar el estado de higienización de cada cama.**

---

## Tecnologías utilizadas

| Tecnología       | Rol                                        |
| ---------------- | ------------------------------------------ |
| **Node.js**      | Backend                                    |
| **Express**      | Framework web                              |
| **Pug**          | Motor de plantillas para vistas            |
| **MySQL2**       | Driver SQL para conexión con base de datos |
| **Sequelize**    | ORM para gestión de modelos y relaciones   |
| **Nodemon**      | Recarga automática durante el desarrollo   |
| **Tailwind CSS** | Framework CSS para estilos                 |

---

## Estructura del proyecto

```
sistema-hospitalario/
├── public/            # Archivos estáticos (CSS, JS, imágenes)
├── src/
│   ├── controllers/   # Lógica de rutas y acciones
│   ├── models/        # Definición de modelos Sequelize
│   ├── routes/        # Rutas Express
│   ├── seeders/       # Datos de prueba
│   ├── views/         # Vistas Pug
├── app.js             # Punto de entrada principal
├── package.json
```

---

## Instalación y uso

### 1. Clonar el repositorio

```bash
git clone https://github.com/JaGo-1/sistema-hospitalario.git
cd sistema-hospitalario
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar la base de datos

- Crear una base de datos (por ejemplo `hospital_db`).
- Configurar el archivo `src/models/db.js` con tus credenciales:

```js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("hospital_db", "usuario", "contraseña", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
```

### 4. Cargar datos de prueba (opcional)

```bash
npm seed
```

### 5. Iniciar la aplicación

```bash
npm start
```

---

## Scripts disponibles

| Comando                    | Descripción                                       |
| -------------------------- | ------------------------------------------------- |
| `npm start`                | Inicia el servidor con Nodemon                    |
| `npm seed` | Carga datos de prueba |

---

## Base de datos

Se utilizan las siguientes entidades principales:

- `Pacientes` → nombre, apellido, dni, sexo, edad, direccion, telefono y telefono_emergencia.
- `Admisiones` → tipo_ingreso, estado, motivo y proviene_guardia.
- `Camas` → numero, ocupada, sexoPaciente e higienizada.
- `Habitaciones` → número y ala.

Relaciones:

- Un paciente puede tener **muchas admisiones**.
- Una admisión pertenece a **un paciente**.
- Una habitación puede tener **muchas camas**.
- Una cama pertenece a **una habitación**.
- Una cama puede tener **una admisión** (cama ocupada).
- Una admisión está asociada a **una cama**.

---

Desarrollado con fines educativos para la materia **Programación Web II | Tecnicatura Universitaria en Desarrollo de Software - Universidad de La Punta**.
