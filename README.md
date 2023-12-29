# Nest-Api

Esta API forma parte del proyecto final del Bootcamp de "Javascript en el Backend de Codigo Facilito".

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## Requisitos

Para poder usar la API solo tienes que contar con Node.js y npm instalados en tu computadora.

## Instalación

1. Clona este repositorio: `git clone https://github.com/Ginoboca1/NestJS-Api.git`
2. Navega al directorio del proyecto: `cd tu-api`
3. Instala las dependencias: `npm install`

## Configuración

1. Crea un archivo de configuración `.env` siguiendo el ejemplo de `.env.example`.
2. Ajusta las variables de entorno según sea necesario. Si necesitas la string connection a la db, puedes encontrarla en el siguiente enlace:
http://localhost:3000/api/docs

Recuerda que para poder utilizar correctamente los endpoints, tendras que obtener un bearer token a traves del Login. 


## Uso

1. Inicia la aplicación: `npm start`
2. La API estará disponible en [http://localhost:3000](http://localhost:3000) por defecto.
3. Consulta la documentación de la API para obtener detalles sobre los puntos finales y las operaciones disponibles.

## Estructura del Proyecto

La API dispone de 4 modulos principales, los cuales son:
-Auth: este es el modulo de autenticacion, dentro se encuentra todo lo relacionado a la autenticacion de las
entidades que pueden hacer uso de la API.

-Users: este es el modulo de usuarios, dentro se encuentra todo lo relacionado a la entidad user.

-Admins: este es el modulo de usuarios, dentro se encuentra todo lo relacionado a la entidad user.

-Posts: este es el modulo de posts, cada entidad tiene la capacidad de crear diferentes posts. Dentro de este modulo se encuentra todo lo relacionado a los posts.
