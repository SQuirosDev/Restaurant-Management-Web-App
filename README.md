Aplicación Web de Gestión para Restaurantes

Proyecto universitario desarrollado como parte de la materia Programación Web (Programación 2).
El objetivo del sistema es brindar una solución web para la gestión básica de un restaurante, permitiendo administrar reservas, comentarios de clientes, facturación y usuarios mediante una arquitectura en capas.

Este proyecto representa mi primer desarrollo web de mayor tamaño y complejidad, así como mi primer acercamiento práctico a una arquitectura completa que integra base de datos, backend y frontend de forma desacoplada.

🏗️ Arquitectura

El sistema fue desarrollado utilizando una arquitectura por capas, donde cada componente se encuentra separado en su propio proyecto o módulo, favoreciendo la organización, mantenimiento y escalabilidad del código.

🔹 Base de Datos

Motor: SQL Server

Uso de:

Tablas

Stored Procedures (SP) para:

Inserción de datos

Consulta y listado de información

Validaciones básicas a nivel de base de datos

🔹 Backend

Desarrollado en .NET

Acceso a datos mediante LINQ

Implementación de una API REST

Actúa como intermediario entre la base de datos y el frontend

Manejo de la lógica de negocio y validaciones en .NET Framework

Validaciones de datos a nivel de lógica

🔹 Frontend

Aplicación web conectada a las APIs

Interfaz visual cuidada y funcional

Permite:

Ingreso de información

Visualización de datos obtenidos desde el base de datos

Validaciones de datos a nivel de interfaz

🛠️ Tecnologías Utilizadas
Lenguajes

SQL (Transact-SQL)

C#

HTML

CSS

JavaScript

Frameworks / Librerías

.NET

Bootstrap

Axios

jQuery

Herramientas

SQL Server

Visual Studio

Visual Studio Code

⚙️ Funcionalidades Principales

Ingreso de reservas

Listado de reservas

Ingreso de comentarios (feedback)

Listado de comentarios

Ingreso de facturas

Listado de facturas

Registro de usuarios

Inicio de sesión de usuarios

🎯 Contexto del Proyecto

Sistema diseñado para restaurantes con el propósito de centralizar y facilitar la gestión de operaciones básicas, tales como:

Reservas de clientes

Comentarios y retroalimentación

Facturación

Gestión de usuarios

El proyecto busca simular un escenario real de una aplicación web empresarial, aplicando buenas prácticas básicas de arquitectura y comunicación entre capas.

🎥 Video Demostrativo

🔗 Video de demostración del proyecto:
https://youtu.be/_fTW1c5-Rr8?si=dTDUyuWU3uA-kiQ9

📈 Nivel del Proyecto

Intermedio

📝 Notas Adicionales

Este proyecto fue desarrollado en equipo junto a Ignacio, Anyelo y yo, y corresponde a mi segundo proyecto programado, pero al mismo tiempo a mi primer proyecto grande y completo, integrando una arquitectura en capas con base de datos, backend y frontend.

Debido al nivel de experiencia y conocimientos con el que contábamos en ese momento, el proyecto presentó una curva de aprendizaje importante, especialmente en el diseño de la arquitectura, la comunicación entre capas y la validación de datos. Aun así, se logró construir una aplicación funcional, estructurada y visualmente cuidada, con funcionalidades básicas correctamente implementadas.

Existen aspectos que pueden mejorarse o ampliarse, como una gestión más avanzada de llaves primarias y relaciones, lograr mantener la sesion del usuario, así como la incorporación de nuevas funcionalidades. Estas oportunidades de mejora forman parte del aprendizaje obtenido y del crecimiento técnico posterior.
