# 📝 To-Do Online

To-Do Online es una aplicación web moderna para la gestión de tareas, diseñada para ayudarte a organizar tu día a día de manera eficiente y colaborativa. El proyecto está compuesto por un backend robusto desarrollado con NestJS y un frontend atractivo construido con Next.js.

---

## 🚀 Características principales

- **Registro e inicio de sesión de usuarios**
- **Gestión de tareas**: crear, editar, eliminar y listar tareas
- **Panel de usuario**: visualización personalizada de tareas
- **Validaciones y seguridad**: autenticación JWT y manejo seguro de contraseñas
- **Interfaz intuitiva y responsiva**

---

## 🏗️ Estructura del Proyecto

```
To-Do Online/
│
├── backend/   # API RESTful con NestJS y TypeORM
│   └── src/
│       ├── auth/      # Autenticación y autorización
│       ├── users/     # Gestión de usuarios
│       ├── tasks/     # Gestión de tareas
│       ├── middlewares/ # Middlewares personalizados
│       └── config/    # Configuración de base de datos
│
├── frontend/  # Interfaz de usuario con Next.js
│   └── src/
│       ├── app/       # Páginas principales (login, registro, dashboard)
│       ├── components/ # Componentes reutilizables
│       └── helpers/   # Funciones auxiliares
│
└── README.md
```

---

## 🛠️ Tecnologías utilizadas

- **Frontend:**
	- [Next.js](https://nextjs.org/)
	- React
	- CSS Modules / PostCSS

- **Backend:**
	- [NestJS](https://nestjs.com/)
	- TypeScript
	- TypeORM
	- JWT para autenticación

- **Base de datos:**
	- PostgreSQL (configurable)

---

## ⚡ Instalación y ejecución

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/to-do-online.git
cd to-do-online
```

### 2. Configura las variables de entorno

- Copia los archivos `example.env` de cada carpeta (`backend/` y/o `frontend/`) y renómbralos a `.env`.
- Completa los valores necesarios (puertos, credenciales de base de datos, etc).

### 3. Instala las dependencias

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 4. Ejecuta la aplicación

#### Backend
```bash
npm run start:dev
```

#### Frontend
```bash
npm run dev
```

La app estará disponible en [http://localhost:3000](http://localhost:3000)

---

## 📁 Estructura de carpetas destacada

- **backend/src/auth/**: Lógica de autenticación y autorización
- **backend/src/tasks/**: Controladores, servicios y entidades de tareas
- **backend/src/users/**: Controladores, servicios y entidades de usuarios
- **frontend/src/app/**: Páginas principales (login, registro, dashboard)
- **frontend/src/components/**: Componentes reutilizables de UI

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar la aplicación, por favor abre un issue o envía un pull request.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

## ✨ Autor

Desarrollado por Bruno Ramos Mejia.
