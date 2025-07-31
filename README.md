# 🎮 Games E-commerce - React Project

Un e-commerce moderno de videojuegos desarrollado con React, Bootstrap y JSON Server. Este proyecto permite la gestión completa de videojuegos, usuarios y reseñas con diferentes roles de usuario.

## 🚀 Características

### 👥 Sistema de Usuarios
- **Registro y Login** con validación de formularios
- **Gestión de sesiones** usando React Context
- **Roles de usuario**: Administrador e Invitado
- **Persistencia de sesión** con sessionStorage

### 🎯 Funcionalidades Principales
- **CRUD completo** de videojuegos (Create, Read, Update, Delete)
- **Sistema de categorías** múltiples por juego
- **Gestión de usuarios** para administradores
- **Sistema de reseñas** con votos positivos/negativos
- **Carrusel de imágenes** personalizable
- **Página de detalles** completa para cada juego
- **Diseño responsive** con Bootstrap

### 🎨 Interfaz de Usuario
- **Tema oscuro** moderno y atractivo
- **Bootstrap Icons** para iconografía
- **Componentes reutilizables** con React Bootstrap
- **Navegación intuitiva** con rutas protegidas
- **Alertas personalizadas** con SweetAlert2

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19.1.0** - Biblioteca principal
- **React Router** - Enrutamiento
- **React Bootstrap** - Componentes UI
- **Bootstrap 5.3.6** - Framework CSS
- **Bootstrap Icons** - Iconografía
- **React Hook Form** - Manejo de formularios
- **SweetAlert2** - Alertas interactivas

### Backend/Datos
- **JSON Server** - API REST simulada
- **Cloudinary** - Gestión de imágenes

### Herramientas de Desarrollo
- **Vite** - Build tool y servidor de desarrollo
- **ESLint** - Linter de código

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd CrudEcommerce
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Instalar dependencias adicionales** (si es necesario)
   ```bash
   npm install react-router-dom
   ```

## 🚀 Uso

### Desarrollo
1. **Iniciar el servidor JSON**
   ```bash
   json-server --watch db.json 
   ```
   El servidor estará disponible en `http://localhost:3000`

2. **Iniciar la aplicación React**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`

### Producción
```bash
npm run build
npm run preview
```

## 📁 Estructura del Proyecto

```
CrudEcommerce/
├── public/              # Archivos estáticos
├── src/
│   ├── components/      # Componentes React
│   │   ├── common/      # Componentes comunes (Navbar, Footer)
│   │   ├── pages/       # Páginas principales
│   │   │   ├── Acceso/  # Login, Registro, Usuarios
│   │   │   ├── Juego/   # CRUD de juegos
│   │   │   └── ...
│   │   ├── Helpers/     # Funciones auxiliares y APIs
│   │   └── routes/      # Configuración de rutas
│   ├── context/         # Context API (UserContext)
│   ├── hooks/           # Custom hooks
│   └── assets/          # Imágenes y recursos
├── db.json             # Base de datos JSON
└── server.js           # Servidor JSON personalizado
```

## 🔑 Usuarios de Prueba

### Administrador
- **Email**: admin@admin.com
- **Contraseña**: 12345678
- **Permisos**: CRUD completo de juegos y usuarios

### Usuario Invitado
- **Email**: invitado@invitado.com
- **Contraseña**: 12345678
- **Permisos**: Ver juegos y escribir reseñas

## 🎮 Funcionalidades por Rol

### 👨‍💼 Administrador
- ✅ Crear, editar y eliminar juegos
- ✅ Gestionar usuarios
- ✅ Administrar carrusel de inicio
- ✅ Acceso completo a todas las funciones

### 👤 Usuario Invitado
- ✅ Ver catálogo de juegos
- ✅ Ver detalles de juegos
- ✅ Escribir y eliminar sus propias reseñas
- ✅ Navegar por categorías

### 🌐 Usuario No Registrado
- ✅ Ver catálogo de juegos
- ✅ Ver detalles de juegos
- ❌ Sin acceso a funciones de reseñas

## 🎯 Características Técnicas

### Estado Global
- **UserContext** para manejo de sesión
- **SessionStorage** para persistencia
- **Custom hooks** para lógica reutilizable

### Validación
- **React Hook Form** para formularios
- **Validación en tiempo real**
- **Mensajes de error personalizados**

### API
- **JSON Server** como backend
- **Queries centralizadas** en helpers
- **Manejo de errores** consistente

### Responsive Design
- **Mobile-first** approach
- **Bootstrap Grid System**
- **Componentes adaptativos**

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request


## 🐛 Problemas Conocidos

- Asegúrate de que el servidor JSON esté ejecutándose antes de iniciar la aplicación
- Las imágenes deben estar alojadas en Cloudinary o ser URLs válidas
- Los usuarios deben tener formato de email válido

## 📈 Próximas Mejoras

- [ ] Integración con base de datos real
- [ ] Sistema de pagos
- [ ] Carrito de compras
- [ ] Filtros avanzados
- [ ] Búsqueda por texto
- [ ] Notificaciones push
- [ ] Chat en vivo

## 📄 Licencia

Este proyecto es parte de un ejercicio educativo de RollingCode School.

## 👨‍💻 Autor

**Juan Ruiz**
- GitHub: [@Juanruizkk](https://github.com/Juanruizkk)
- Proyecto: Games E-commerce

---

⭐ Si te gustó este proyecto, ¡dale una estrella en GitHub!
