# Restaurant Management Web Application

University project developed as part of the **Web Programming (Programming 2)** course.  
The main goal of this system is to provide a web-based solution for basic restaurant management, allowing the administration of reservations, customer comments, invoices, and users through a layered architecture.

This project represents my **first large and complex web development**, as well as my first practical experience working with a complete architecture that integrates database, backend, and frontend in a decoupled manner.

---

## 🏗️ Architecture

The system was developed using a **layered architecture**, where each component is separated into its own project or module, promoting better organization, maintainability, and scalability.

### 🔹 Database
- **Engine:** SQL Server  
- Usage of:
  - tables
  - Stored Procedures (SP) for:
    - Data insertion
    - Data retrieval and listing
- Basic validations at the database level

### 🔹 Backend
- Developed using **.NET**
- Data access implemented with **LINQ**
- **REST API** implementation:
  - Acts as an intermediary between the database and the frontend
- Handles business logic and validations using .NET Framework
- Data validations at the logic layer

### 🔹 Frontend
- Web application connected to the APIs
- Clean and functional user interface
- Allows:
  - Data entry
  - Data visualization retrieved from the database
- Interface-level data validations

---

## 🛠️ Technologies Used

### Languages
- SQL (Transact-SQL)
- C#
- HTML
- CSS
- JavaScript

### Frameworks / Libraries
- .NET
- Bootstrap
- Axios
- jQuery

### Tools
- SQL Server
- Visual Studio
- Visual Studio Code

---

## ⚙️ Main Features

- Create reservations
- List reservations
- Submit customer comments (feedback)
- List comments (feedback)
- Create invoices
- List invoices
- User registration
- User login

---

## 🎯 Project Context

System designed for restaurants with the purpose of **centralizing and simplifying the management of basic operations**, such as:
- Customer reservations
- Comments and feedback
- Invoicing
- User management

The project aims to simulate a real-world business web application scenario, applying basic architectural best practices and communication between layers.

---

## 🎥 Demo Video

🔗 **Project demo video:**  
https://youtu.be/_fTW1c5-Rr8?si=dTDUyuWU3uA-kiQ9

---

## 📈 Project Level

**Intermediate**

---

## 📝 Additional Notes

This project was developed as a team together with **Ignacio, Anyelo, and myself**, and corresponds to my **second programming project**, while also being my **first large and complete project**, integrating a layered architecture with database, backend, and frontend.

Due to the level of experience and knowledge we had at the time, the project involved a significant learning curve, especially in architecture design, inter-layer communication, and data validation. Even so, a **functional, well-structured, and visually polished application** was successfully built, with correctly implemented core features.

There are aspects that could be improved or extended, such as more advanced primary key and relationship management, maintaining user session state, and adding new functionalities. These improvement opportunities are part of the learning process and subsequent technical growth.

---

### 👥 Team Contributions

This project was developed as a team, with responsibilities distributed as follows:

- **Database:** Ignacio  
- **Backend & API development:** Sebastian  
- **Frontend logic, validations, and API integration:** Sebastian  
- **Frontend views and UI layout:** Anyelo

---

---

# Aplicación Web de Gestión para Restaurantes

Proyecto universitario desarrollado como parte de la materia **Programación Web (Programación 2)**.  
El objetivo del sistema es brindar una solución web para la gestión básica de un restaurante, permitiendo administrar reservas, comentarios de clientes, facturación y usuarios mediante una arquitectura en capas.

Este proyecto representa mi **primer desarrollo web de mayor tamaño y complejidad**, así como mi primer acercamiento práctico a una arquitectura completa que integra base de datos, backend y frontend de forma desacoplada.

---

## 🏗️ Arquitectura

El sistema fue desarrollado utilizando una **arquitectura por capas**, donde cada componente se encuentra separado en su propio proyecto o módulo, favoreciendo la organización, mantenimiento y escalabilidad del código.

### 🔹 Base de Datos
- **Motor:** SQL Server
- Uso de:
  - Tablas
  - Stored Procedures (SP) para:
    - Inserción de datos
    - Consulta y listado de información
- Validaciones básicas a nivel de base de datos

### 🔹 Backend
- Desarrollado en **.NET**
- Acceso a datos mediante **LINQ**
- Implementación de una **API REST**
  - Actúa como intermediario entre la base de datos y el frontend
- Manejo de la lógica de negocio y validaciones en .NET Framework
- Validaciones de datos a nivel de lógica

### 🔹 Frontend
- Aplicación web conectada a las APIs
- Interfaz visual cuidada y funcional
- Permite:
  - Ingreso de información
  - Visualización de datos obtenidos desde la base de datos
- Validaciones de datos a nivel de interfaz

---

## 🛠️ Tecnologías Utilizadas

### Lenguajes
- SQL (Transact-SQL)
- C#
- HTML
- CSS
- JavaScript

### Frameworks / Librerías
- .NET
- Bootstrap
- Axios
- jQuery

### Herramientas
- SQL Server
- Visual Studio
- Visual Studio Code

---

## ⚙️ Funcionalidades Principales

- Ingreso de reservas
- Listado de reservas
- Ingreso de comentarios (feedback)
- Listado de comentarios (feedback)
- Ingreso de facturas
- Listado de facturas
- Registro de usuarios
- Inicio de sesión de usuarios

---

## 🎯 Contexto del Proyecto

Sistema diseñado para restaurantes con el propósito de **centralizar y facilitar la gestión de operaciones básicas**, tales como:
- Reservas de clientes
- Comentarios y retroalimentación
- Facturación
- Gestión de usuarios

El proyecto busca simular un escenario real de una aplicación web empresarial, aplicando buenas prácticas básicas de arquitectura y comunicación entre capas.

---

## 🎥 Video Demostrativo

🔗 **Video de demostración del proyecto:**  
https://youtu.be/_fTW1c5-Rr8?si=dTDUyuWU3uA-kiQ9

---

## 📈 Nivel del Proyecto

**Intermedio**

---

## 📝 Notas Adicionales

Este proyecto fue desarrollado en equipo junto a **Ignacio, Anyelo y yo**, y corresponde a mi **segundo proyecto programado**, pero al mismo tiempo a mi **primer proyecto grande y completo**, integrando una arquitectura en capas con base de datos, backend y frontend.

Debido al nivel de experiencia y conocimientos con el que contábamos en ese momento, el proyecto presentó una curva de aprendizaje importante, especialmente en el diseño de la arquitectura, la comunicación entre capas y la validación de datos. Aun así, se logró construir una **aplicación funcional, estructurada y visualmente cuidada**, con funcionalidades básicas correctamente implementadas.

Existen aspectos que pueden mejorarse o ampliarse, como una gestión más avanzada de llaves primarias y relaciones, mantener la sesión del usuario, así como la incorporación de nuevas funcionalidades. Estas oportunidades de mejora forman parte del aprendizaje obtenido y del crecimiento técnico posterior.

---

### 👥 Aportes del Equipo

El proyecto fue desarrollado en equipo, con las siguientes responsabilidades:

- **Base de datos:** Ignacio  
- **Backend y desarrollo de la API:** Sebastian  
- **Lógica del frontend, validaciones y conexión con la API:** Sebastian  
- **Vistas y diseño visual del frontend:** Anyelo
