-- Crear base de datos si no existe
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'PROYECTOWEBFINALV2')
    CREATE DATABASE PROYECTOWEBFINALV2;
GO

USE PROYECTOWEBFINALV2;
GO

-- Desactivar restricciones de integridad referencial temporalmente
-- EXEC sp_MSforeachdb 'USE [?]; ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_INSERT = ON';

-- Eliminar tablas con manejo de dependencias
IF OBJECT_ID('listaPlatos', 'U') IS NOT NULL 
    DROP TABLE listaPlatos;
IF OBJECT_ID('Facturas', 'U') IS NOT NULL 
    DROP TABLE Facturas;
IF OBJECT_ID('Reservas', 'U') IS NOT NULL 
    DROP TABLE Reservas;
IF OBJECT_ID('Clientes', 'U') IS NOT NULL 
    DROP TABLE Clientes;
IF OBJECT_ID('Feedback', 'U') IS NOT NULL 
    DROP TABLE Feedback;
IF OBJECT_ID('Usuarios', 'U') IS NOT NULL 
    DROP TABLE Usuarios;
IF OBJECT_ID('Menu', 'U') IS NOT NULL 
    DROP TABLE Menu;
IF OBJECT_ID('DetalleDeFactura', 'U') IS NOT NULL 
    DROP TABLE DetalleDeFactura;
GO

-- Tabla Usuarios
CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(100) NOT NULL,
    correo NVARCHAR(100) UNIQUE NOT NULL,
    contrasena NVARCHAR(255) NOT NULL,
    fecha_creacion DATETIME DEFAULT GETDATE(),
    rol NVARCHAR(50) DEFAULT 'Usuario'
);
GO

-- Tabla Clientes
CREATE TABLE Clientes (
    id_cliente INT PRIMARY KEY IDENTITY(1,1),
    nombre_cliente NVARCHAR(100) NOT NULL,
    id_usuario INT NOT NULL FOREIGN KEY REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    telefono NVARCHAR(20),
    puntos_fidelidad INT DEFAULT 0
);
GO

-- Tabla Reservas
CREATE TABLE Reservas (
    id_reserva INT PRIMARY KEY IDENTITY(1,1),
    id_cliente INT NOT NULL FOREIGN KEY REFERENCES Clientes(id_cliente) ON DELETE CASCADE,
    fecha_reserva DATETIME NOT NULL,
    numero_personas INT NOT NULL,
    estado NVARCHAR(50) DEFAULT 'Pendiente'
);
GO

-- Tabla Menu
CREATE TABLE Menu (
    id_plato INT PRIMARY KEY IDENTITY(1,1),
    nombre_plato NVARCHAR(100) NOT NULL,
    descripcion NVARCHAR(MAX),
    precio DECIMAL(10,2) NOT NULL
);
GO

-- Tabla Facturas
CREATE TABLE Facturas (
    id_factura INT PRIMARY KEY IDENTITY(1,1),
    id_reserva INT NOT NULL FOREIGN KEY REFERENCES Reservas(id_reserva) ON DELETE CASCADE,
    numeroMesa INT NOT NULL,
    listaPlatos NVARCHAR(MAX) NOT NULL,
    listaPrecios NVARCHAR(MAX) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    fecha_facturacion DATETIME DEFAULT GETDATE()
);
GO

-- Tabla Feedback
CREATE TABLE Feedback (
    id_feedback INT PRIMARY KEY IDENTITY(1,1),
    id_usuario INT FOREIGN KEY REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    comentario NVARCHAR(MAX) NOT NULL,
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
    fecha DATETIME DEFAULT GETDATE()
);
GO

-- Tabla DetalleDeFactura
CREATE TABLE listaPlatos (
    id_listaPlatos INT PRIMARY KEY IDENTITY(1,1),
    id_factura INT NOT NULL FOREIGN KEY REFERENCES Facturas(id_factura) ON DELETE CASCADE,
    id_plato INT NOT NULL FOREIGN KEY REFERENCES Menu(id_plato) ON DELETE CASCADE
);
GO

-- Procedimiento para registrar un usuario
-- Procedimiento para registrar un usuario
IF OBJECT_ID('spRegistrarUsuario', 'P') IS NOT NULL
    DROP PROCEDURE spRegistrarUsuario;
GO
CREATE PROCEDURE spRegistrarUsuario
    @nombre NVARCHAR(100),
    @correo NVARCHAR(100),
    @contrasena NVARCHAR(255),
    @rol NVARCHAR(50) = 'Usuario'
AS
BEGIN
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM Usuarios WHERE correo = @correo)
        BEGIN
            RETURN -1; -- Correo ya registrado
        END

        INSERT INTO Usuarios (nombre, correo, contrasena, rol)
        VALUES (@nombre, @correo, @contrasena, @rol);

        RETURN SCOPE_IDENTITY(); -- ID del usuario registrado
    END TRY
    BEGIN CATCH
        RETURN ERROR_NUMBER();
    END CATCH
END;
GO

-- Procedimiento para vincular un cliente a un usuario registrado
-- Procedimiento para vincular un cliente a un usuario registrado
IF OBJECT_ID('spVincularClienteUsuario', 'P') IS NOT NULL
    DROP PROCEDURE spVincularClienteUsuario;
GO
CREATE PROCEDURE spVincularClienteUsuario
    @id_usuario INT,
    @nombre_cliente NVARCHAR(100),
    @telefono NVARCHAR(20)
AS
BEGIN
    BEGIN TRY
        INSERT INTO Clientes (id_usuario, nombre_cliente, telefono, puntos_fidelidad)
        VALUES (@id_usuario, @nombre_cliente, @telefono, 0);

        RETURN SCOPE_IDENTITY(); -- ID del cliente vinculado
    END TRY
    BEGIN CATCH
        RETURN ERROR_NUMBER();
    END CATCH
END;
GO

-- Procedimiento para iniciar sesión (MODIFICADO)
-- Procedimiento para iniciar sesión
IF OBJECT_ID('spIniciarSesion', 'P') IS NOT NULL
    DROP PROCEDURE spIniciarSesion;
GO
CREATE PROCEDURE spIniciarSesion
    --@correo NVARCHAR(100),
    --@contrasena NVARCHAR(255)
AS
BEGIN
    BEGIN TRY
	/*
        DECLARE @usuario_contrasena NVARCHAR(255);
        
        SELECT @usuario_contrasena = contrasena 
        FROM Usuarios 
        WHERE correo = @correo;

        IF @usuario_contrasena IS NULL OR @usuario_contrasena != @contrasena
        BEGIN
            RETURN -1; -- Credenciales inválidas
        END

        SELECT id_usuario, nombre, correo, rol, fecha_creacion, contrasena
        FROM Usuarios
        WHERE correo = @correo;

        RETURN 0;
		*/

		SELECT nombre, correo, contrasena
		FROM Usuarios

    END TRY
    BEGIN CATCH
        RETURN ERROR_NUMBER();
    END CATCH
END;
GO

-- Procedimiento para insertar plato en el menú
IF OBJECT_ID('spInsertarPlatoMenu', 'P') IS NOT NULL
    DROP PROCEDURE spInsertarPlatoMenu;
GO
CREATE PROCEDURE spInsertarPlatoMenu
    @nombre_plato NVARCHAR(100),
    @descripcion NVARCHAR(MAX),
    @precio DECIMAL(10, 2)
AS
BEGIN
    BEGIN TRY
        IF LTRIM(RTRIM(@nombre_plato)) = ''
        BEGIN
            RETURN -1; -- Nombre de plato no puede estar vacío
        END

        IF @precio <= 0
        BEGIN
            RETURN -2; -- Precio debe ser mayor que cero
        END

        IF EXISTS (SELECT 1 FROM Menu WHERE nombre_plato = @nombre_plato)
        BEGIN
            RETURN -3; -- Plato ya existe
        END

        INSERT INTO Menu (nombre_plato, descripcion, precio)
        VALUES (@nombre_plato, @descripcion, @precio);

        RETURN SCOPE_IDENTITY();
    END TRY
    BEGIN CATCH
        RETURN ERROR_NUMBER();
    END CATCH
END;
GO

-- Procedure to insert price lists
IF OBJECT_ID('spInsertarListaPrecios', 'P') IS NOT NULL
    DROP PROCEDURE spInsertarListaPrecios;
GO
CREATE PROCEDURE spInsertarListaPrecios
    @id_factura INT,
    @listaPrecios NVARCHAR(MAX)
AS
BEGIN
    BEGIN TRY
        -- Check if the invoice exists
        IF NOT EXISTS (SELECT 1 FROM Facturas WHERE id_factura = @id_factura)
        BEGIN
            RETURN -1; -- Invoice not found
        END

        -- Validate the price list is not empty
        IF LTRIM(RTRIM(@listaPrecios)) = ''
        BEGIN
            RETURN -2; -- Price list cannot be empty
        END

        -- Update the existing invoice with the price list
        UPDATE Facturas
        SET listaPrecios = @listaPrecios
        WHERE id_factura = @id_factura;

        RETURN @id_factura;
    END TRY
    BEGIN CATCH
        RETURN ERROR_NUMBER();
    END CATCH
END;
GO

-- Procedimiento para insertar reserva
IF OBJECT_ID('spInsertarReserva', 'P') IS NOT NULL
    DROP PROCEDURE spInsertarReserva;
GO
CREATE PROCEDURE spInsertarReserva
    @fecha_reserva DATETIME,
    @numero_personas INT
AS
BEGIN
    BEGIN TRY

        INSERT INTO Reservas (id_cliente, fecha_reserva, numero_personas)
        VALUES (1, @fecha_reserva, @numero_personas);

        RETURN SCOPE_IDENTITY();
    END TRY
    BEGIN CATCH
        RETURN ERROR_NUMBER();
    END CATCH
END;
GO

-- Procedimiento para insertar factura (MODIFICADO)
IF OBJECT_ID('spInsertarFactura', 'P') IS NOT NULL
    DROP PROCEDURE spInsertarFactura;
GO
CREATE PROCEDURE spInsertarFactura
    @numeroMesa INT,
    @listaPlatos NVARCHAR(MAX),
    @listaPrecios NVARCHAR(MAX),
    @total DECIMAL(10, 2)
AS
BEGIN
    BEGIN TRY
        IF @total <= 0
        BEGIN
            RETURN -2; -- Total debe ser mayor que cero
        END

        INSERT INTO Facturas (id_reserva, numeroMesa, listaPlatos, listaPrecios, total)
        VALUES (1, @numeroMesa, @listaPlatos, @listaPrecios, @total);

        RETURN SCOPE_IDENTITY();
    END TRY
    BEGIN CATCH
        RETURN ERROR_NUMBER();
    END CATCH
END;
GO

-- Procedimiento para insertar feedback
IF OBJECT_ID('spInsertarFeedback', 'P') IS NOT NULL
    DROP PROCEDURE spInsertarFeedback;
GO
CREATE PROCEDURE spInsertarFeedback
    @comentario NVARCHAR(MAX),
    @calificacion INT
AS
BEGIN
    BEGIN TRY

        INSERT INTO Feedback (id_usuario, comentario, calificacion)
        VALUES (1, @comentario, @calificacion);

        RETURN SCOPE_IDENTITY();
    END TRY
    BEGIN CATCH
        RETURN ERROR_NUMBER();
    END CATCH
END;
GO

-- Procedimiento para obtener facturas
IF OBJECT_ID('spObtenerFacturas', 'P') IS NOT NULL
    DROP PROCEDURE spObtenerFactura;
GO
CREATE PROCEDURE spObtenerFactura
AS
BEGIN
    BEGIN TRY
        SELECT 
            F.id_factura, 
            F.id_reserva, 
            F.numeroMesa,
			F.listaPlatos,
			F.listaPrecios,
            F.total, 
            F.fecha_facturacion,
            C.nombre_cliente,
            R.fecha_reserva
        FROM 
            Facturas F
        INNER JOIN 
            Reservas R ON F.id_reserva = R.id_reserva
        INNER JOIN 
            Clientes C ON R.id_cliente = C.id_cliente
        ORDER BY 
            F.fecha_facturacion DESC;

        RETURN 0;
    END TRY
    BEGIN CATCH
        RETURN ERROR_NUMBER();
    END CATCH
END;
GO

-- Procedimiento para obtener una factura por ID
IF OBJECT_ID('spObtenerFacturaPorId', 'P') IS NOT NULL
    DROP PROCEDURE spObtenerFacturaPorId;
GO
CREATE PROCEDURE spObtenerFacturaPorId
    @id_factura INT
AS
BEGIN
    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM Facturas WHERE id_factura = @id_factura)
        BEGIN
            RETURN -1; -- Factura no encontrada
        END

        SELECT 
            F.id_factura, 
            F.id_reserva, 
            F.numeroMesa, 
            F.listaPlatos, 
            F.listaPrecios, 
            F.total, 
            F.fecha_facturacion,
            C.nombre_cliente,
            R.fecha_reserva,
            U.nombre AS nombre_usuario,
            U.correo AS correo_usuario
        FROM 
            Facturas F
        INNER JOIN 
            Reservas R ON F.id_reserva = R.id_reserva
        INNER JOIN 
            Clientes C ON R.id_cliente = C.id_cliente
        INNER JOIN
            Usuarios U ON C.id_usuario = U.id_usuario
        WHERE 
            F.id_factura = @id_factura;

        RETURN 0;
    END TRY
    BEGIN CATCH
        RETURN ERROR_NUMBER();
    END CATCH
END;
GO

-- Procedimiento para obtener menú (MODIFICADO)
IF OBJECT_ID('spObtenerMenu', 'P') IS NOT NULL
    DROP PROCEDURE spObtenerMenu;
GO
CREATE PROCEDURE spObtenerMenu
AS
BEGIN
    BEGIN TRY
        SELECT 
            id_plato, 
            nombre_plato, 
            descripcion, 
            precio
        FROM Menu
        ORDER BY nombre_plato;
        RETURN 0;
    END TRY
    BEGIN CATCH
        RETURN ERROR_NUMBER();
    END CATCH
END;
GO

-- Procedimiento para obtener feedback
IF OBJECT_ID('spObtenerFeedback', 'P') IS NOT NULL
    DROP PROCEDURE spObtenerFeedback;
GO
CREATE PROCEDURE spObtenerFeedback
AS
BEGIN
    BEGIN TRY
        SELECT 
            F.id_feedback, 
            U.nombre AS usuario, 
            F.comentario, 
            F.calificacion, 
            F.fecha
        FROM Feedback F
        INNER JOIN Usuarios U ON F.id_usuario = U.id_usuario
        ORDER BY F.fecha DESC;

        RETURN 0;
    END TRY
    BEGIN CATCH
        RETURN ERROR_NUMBER();
    END CATCH
END;
GO

-- Procedimiento para obtener reservas
IF OBJECT_ID('spObtenerReservas', 'P') IS NOT NULL
    DROP PROCEDURE spObtenerReservas;
GO
CREATE PROCEDURE spObtenerReservas
AS
BEGIN
    BEGIN TRY
        SELECT 
            R.id_reserva, 
            C.id_cliente, 
            R.fecha_reserva,
            R.numero_personas, 
            R.estado,
            C.nombre_cliente
        FROM Reservas R
        INNER JOIN Clientes C ON R.id_cliente = C.id_cliente
        ORDER BY R.fecha_reserva DESC;

        RETURN 0;
    END TRY
    BEGIN CATCH
        RETURN ERROR_NUMBER();
    END CATCH
END;
GO

CREATE PROCEDURE spObtenerListaPlatos
@id_factura INT,
@id_plato INT
AS
BEGIN
    SELECT lp.id_listaPlatos, 
           lp.id_factura, 
           lp.id_plato
    FROM listaPlatos lp
    WHERE (@id_factura IS NULL OR lp.id_factura = @id_factura)
      AND (@id_plato IS NULL OR lp.id_plato = @id_plato)
END
GO

-- Procedure to obtain price lists
IF OBJECT_ID('spObtenerListaPrecios', 'P') IS NOT NULL
    DROP PROCEDURE spObtenerListaPrecios;
GO
CREATE PROCEDURE spObtenerListaPrecios
    @id_factura INT = NULL
AS
BEGIN
    BEGIN TRY
        -- If no specific invoice is provided, return all price lists
        IF @id_factura IS NULL
        BEGIN
            SELECT 
                f.id_factura, 
                f.listaPrecios,
                r.fecha_reserva,
                c.nombre_cliente
            FROM 
                Facturas f
            INNER JOIN 
                Reservas r ON f.id_reserva = r.id_reserva
            INNER JOIN 
                Clientes c ON r.id_cliente = c.id_cliente
            ORDER BY 
                f.fecha_facturacion DESC;
        END
        ELSE 
        BEGIN
            -- If a specific invoice is provided, return its price list
            IF NOT EXISTS (SELECT 1 FROM Facturas WHERE id_factura = @id_factura)
            BEGIN
                RETURN -1; -- Invoice not found
            END

            SELECT 
                f.id_factura, 
                f.listaPrecios,
                r.fecha_reserva,
                c.nombre_cliente
            FROM 
                Facturas f
            INNER JOIN 
                Reservas r ON f.id_reserva = r.id_reserva
            INNER JOIN 
                Clientes c ON r.id_cliente = c.id_cliente
            WHERE 
                f.id_factura = @id_factura;
        END

        RETURN 0;
    END TRY
    BEGIN CATCH
        RETURN ERROR_NUMBER();
    END CATCH
END;
GO

-- Insert sample data for Usuarios
INSERT INTO Usuarios (nombre, correo, contrasena, rol)
VALUES 
('Juan Perez', 'juan@example.com', 'password123', 'Usuario'),
('Maria Rodriguez', 'maria@example.com', 'securepass456', 'Admin'),
('Carlos Gonzalez', 'carlos@example.com', 'pass789', 'Usuario'),
('Ana Martinez', 'ana@example.com', 'password321', 'Usuario');

-- Insert sample Clientes linked to Users
INSERT INTO Clientes (id_usuario, nombre_cliente, telefono, puntos_fidelidad)
VALUES 
(1, 'Juan Perez', '555-1234', 50),
(3, 'Carlos Gonzalez', '555-5678', 30),
(4, 'Ana Martinez', '555-9012', 20);

-- Insert sample Menu items
INSERT INTO Menu (nombre_plato, descripcion, precio)
VALUES 
('Paella Valenciana', 'Arroz tradicional español con mariscos y pollo', 25.50),
('Filete Mignon', 'Corte de res premium con salsa de champiñones', 35.00),
('Salmón a la Parrilla', 'Salmón fresco con pure de papas', 28.75),
('Ensalada César', 'Ensalada clásica con aderezo César y pollo', 15.00),
('Risotto de Hongos', 'Risotto cremoso con variedad de hongos', 22.50);

-- Insert sample Reservas
INSERT INTO Reservas (id_cliente, fecha_reserva, numero_personas, estado)
VALUES 
(1, '2024-02-15 19:00:00', 2, 'Pendiente'),
(2, '2024-02-16 20:30:00', 4, 'Confirmada'),
(3, '2024-02-17 18:45:00', 3, 'Pendiente');

-- Insert sample Facturas
INSERT INTO Facturas (id_reserva, numeroMesa, listaPlatos, listaPrecios, total, fecha_facturacion)
VALUES 
(1, 5, 'Paella Valenciana, Ensalada César', '25.50, 15.00', 40.50, GETDATE()),
(2, 8, 'Filete Mignon, Salmón a la Parrilla', '35.00, 28.75', 63.75, GETDATE());

-- Insert sample Feedback
INSERT INTO Feedback (id_usuario, comentario, calificacion)
VALUES 
(1, 'Excelente servicio y comida deliciosa!', 5),
(3, 'La comida estuvo bien, pero un poco lenta la atención', 3),
(4, 'Ambiente muy agradable, volveré pronto', 4);

-- Insert sample listaPlatos (linking dishes to invoices)
INSERT INTO listaPlatos (id_factura, id_plato)
VALUES 
(1, 1), -- Paella Valenciana in first invoice
(1, 4), -- Ensalada César in first invoice
(2, 2), -- Filete Mignon in second invoice
(2, 3); -- Salmón a la Parrilla in second invoice
