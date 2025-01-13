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

- **Backend**: Node.js, Neo4j, MongoDB, ArangoDB
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

El backend utiliza Neo4j para manejar relaciones entre usuarios y MongoDB para almacenar información adicional de los usuarios, o su equivalente con ArangoDB

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
   const db = new Database({
      url: "http://<HOST>:8529", 
    });
    db.useBasicAuth("<USER>", "<PASSWORD>");  
    db.userDatabases("_system");  
   ```

3. Inicia el servidor backend:
   ```bash
   npm start
   ```

### Endpoints

#### `GET /users`
Obtiene sugerencias de amistad basadas en conexiones mutuas e intereses.

- **Parámetros:**
  ```json
  {
    "id": "1",
    "category": "gaming"
  }
  ```

- **Respuesta:**
  ```json
  [
    {
      "id": 7,
        "name": "Grace",
        "interests": [
            "movies",
            "gaming"
        ]
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
   npm start android
   # o para iOS
   npm start ios
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


---

## Notas Adicionales

- Asegúrate de tener Neo4j y MongoDB configurados y ejecutándose antes de iniciar el backend.
- El frontend está optimizado para dispositivos ios, pero también funciona en android con los ajustes necesarios.

