# Social App

Este proyecto es una aplicación social que permite a los usuarios conectarse con otros usuarios y recibir sugerencias de amistad basadas en sus intereses y conexiones existentes.

## Tabla de Contenidos
- [Tecnologías Usadas](#tecnologías-usadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Backend](#backend)
  - [Configuración](#configuración)
  - [Endpoints](#endpoints)
- [Frontend](#frontend)
  - [Instalación y Ejecución](#instalación-y-ejecución)
  - [Componentes Clave](#componentes-clave)
- [Instalación Completa](#instalación-completa)

---

## Tecnologías Usadas

- **Backend**: Node.js, Neo4j, MongoDB
- **Frontend**: React Native

---

## Estructura del Proyecto

```
root/
├── backend/
│   └── index.js
├── frontend/
│   └── App.js
└── README.md
```

---

## Backend

El backend utiliza Neo4j para manejar relaciones entre usuarios y MongoDB para almacenar información adicional de los usuarios.

### Configuración

1. Instala las dependencias necesarias:
   ```bash
   cd backend
   npm install
   ```

2. Configura las conexiones a Neo4j y MongoDB en el código fuente:
   ```javascript
   const neo4jDriver = neo4j.driver('bolt://<HOST>:7687', neo4j.auth.basic('<USER>', '<PASSWORD>'));
   const mongoClient = new MongoClient('mongodb://<HOST>:27017');
   ```

3. Inicia el servidor:
   ```bash
   node index.js
   ```

### Endpoints

#### `POST /suggest-friends`
Obtiene sugerencias de amistad basadas en conexiones mutuas e intereses.

- **Parámetros:**
  ```json
  {
    "userId": "<user_id>",
    "category": ["Music", "Art"]
  }
  ```

- **Respuesta:**
  ```json
  [
    {
      "id":"1,
      "name": "John Doe",
      "category": ["Music", "Photography"]
    }
  ]
  ```

---

## Frontend

El frontend está desarrollado en React Native para ofrecer una experiencia móvil.

### Instalación y Ejecución

1. Instala las dependencias necesarias:
   ```bash
   cd frontend
   npm install
   ```

2. Ejecuta la aplicación:
   ```bash
   npx react-native run-android
   # o para iOS
   npx react-native run-ios
   ```

### Componentes Clave

#### `People`
Componente que muestra una lista de usuarios sugeridos en tarjetas al estilo Tinder.

- **Código Simplificado:**
  ```tsx
  <View style={styles.container}>
    {users.map(user => (
      <View style={styles.card}>
        <Image source={{ uri: user.image }} />
        <Text>{user.name}</Text>
        <Text>{user.interests.join(', ')}</Text>
      </View>
    ))}
  </View>
  ```

---

## Instalación Completa

1. Clona el repositorio:
   ```bash
   git clone <REPO_URL>
   ```

2. Instala las dependencias en ambas carpetas:
   ```bash
   cd backend
   npm install

   cd ../frontend
   npm install
   ```

3. Configura las variables de conexión en el backend.

4. Ejecuta el backend:
   ```bash
   cd backend
   node index.js
   ```

5. Ejecuta el frontend:
   ```bash
   cd frontend
   npx react-native run-android
   ```

---

## Notas Adicionales

- Asegúrate de tener Neo4j y MongoDB configurados y ejecutándose antes de iniciar el backend.
- El frontend está optimizado para dispositivos Android, pero también funciona en iOS con los ajustes necesarios.

