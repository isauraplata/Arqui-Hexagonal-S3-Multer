# API REST con Arquitectura Hexagonal
Este proyecto implementa una API REST utilizando arquitectura hexagonal (también conocida como puertos y adaptadores), lo que permite una clara separación de responsabilidades y hace que la aplicación sea altamente configurable y adaptable a diferentes tecnologías.

## 🛠️ Características Principales
- Almacenamiento de Imágenes Flexible: Configura para usar almacenamiento local (con Multer) o Amazon S3
- Fácil de Extender: Agrega nuevos adaptadores para diferentes tecnologías sin modificar el núcleo
- Base de Datos Configurable: Elige entre MongoDB o MySQL sin cambiar la lógica de negocio

Important:The `.env` file stores sensitive information like database credentials and secret keys. 

this is the structure of the `.env` File:

    # MySQL Database Configuration
    DB_HOST=
    DB_USER=
    DB_DATABASE=
    DB_PASSWORD=
    DB_TYPE=mysql  # Tipo de base de datos, en este caso MySQL

    # MongoDB Database Configuration
    MONGO_USER=
    MONGO_PASSWORD=
    MONGO_HOST=
    MONGO_DB=
    MONGO_AUTH_SOURCE=

    # Security Configuration
    SALT=10  # Salting rounds for password hashing
    ACCESS_TOKEN_PRIVATE_KEY=
    REFRESH_TOKEN_PRIVATE_KEY= 

    # Server Configuration
    PORT_SERVER=4000  # Puerto en el que corre el servidor

    # AWS S3 Configuration
    USE_S3=false  # Indica si se usa S3
    S3_BUCKET_NAME=
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    AWS_SESSION_TOKEN=

    # Optional AWS Keys (if needed)
    ACCESS_KEY_ID=


Instructions for Using `.env`:

1. Create a text file named `.env` in your project's root directory.
2. Copy and paste the above content into the `.env` file.
3. Replace the placeholder values with your specific database credentials and secret keys.


## Authors

- [@isauraplata](https://github.com/isauraplata)
