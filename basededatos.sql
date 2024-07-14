CREATE database basededatos;

CREATE TABLE Clientes (
ClienteID INT AUTO_INCREMENT primary key,
Nombre VARCHAR(40),
Direccion VARCHAR(40),
Ciudad VARCHAR(40),
codigo_postal INT,
Email VARCHAR(40),
Genero VARCHAR(30)
);

CREATE TABLE peluches (
id INT AUTO_INCREMENT primary key,
Nombre VARCHAR(30) NOT NULL,
imagen_url VARCHAR(255) NOT NULL,
tamano INT,
Precio DECIMAL(10,2),
descripcion TEXT
);

CREATE TABLE Pedidos (
PedidoID INT AUTO_INCREMENT primary key,
Cliente_ID INT,
FOREIGN KEY (Cliente_ID) REFERENCES Clientes(ClienteID),
Fecha DATE,
Total DECIMAL(10,2)
);

CREATE TABLE Proveedores (
ProveedorID INT AUTO_INCREMENT primary key,
CUIT VARCHAR(11), -- Campo para almacenar el DNI como INT
CONSTRAINT chk_cuit_length CHECK (LENGTH(CUIT) = 11), -- Restricción para asegurar 12 dígitos
Nombre VARCHAR(40),
Email VARCHAR(40)
);

INSERT INTO Clientes (Nombre, Direccion, Ciudad, codigo_postal, Email, Genero)
VALUES ('Juan', 'Thames 1200', 'CABA', 1414, 'juan@gmail.com', 'Hombre');
INSERT INTO Clientes (Nombre, Direccion, Ciudad, codigo_postal, Email, Genero)
VALUES ('Maria', 'Corrientes 3210', 'CABA', 1010, 'maria@gmail.com', 'Mujer');
INSERT INTO Clientes (Nombre, Direccion, Ciudad, codigo_postal, Email, Genero)
VALUES ('Juliana Lopez', 'Av Scalabrini Ortiz 565', 'CABA', 1235, 'julopez@gmail.com', 'Mujer');

INSERT INTO Pedidos (Cliente_ID, Fecha, Total) 
VALUES(2, '2024-03-02', 12800);
INSERT INTO Pedidos (Cliente_ID, Fecha, Total)
VALUES(1, '2024-06-15', 101385);
INSERT INTO Pedidos (Cliente_ID, Fecha, Total)
VALUES(2, '2024-07-01', 24300);

INSERT INTO peluches (Nombre, imagen_url, tamano, Precio, descripcion)
VALUES ('Zenitsu Agatsuma', 'img/rubio.png', 15, 20000.00, 'Zenitsu Agatsuma es un Cazador de Demonios y un compañero de viaje de Tanjiro Kamado. A su vez es uno de los personajes principales de Kimetsu no Yaiba, una serie de anime.');
INSERT INTO peluches (Nombre, imagen_url, tamano, Precio, descripcion)
VALUES ('Tony Tony Chopper', 'img/peluche2.jpg', 10, 25000.00, 'Tony Tony Chopper es el médico de los Piratas de Sombrero de Paja. Es un reno que comió la fruta Hito Hito de la isla de Drum. Pertecene a la serie animada One Piece.');
INSERT INTO peluches (Nombre, imagen_url, tamano, Precio, descripcion)
VALUES ('Monkey D. Luffy', 'img/lufy7.jpg', 15, 28000.00, 'Luffy es el protagonista principal de la serie de manga y anime One Piece. Es el capitán y fundador de los Piratas de Sombrero de Paja así como un de los Cuatro Emperadores que gobiernan los mares del Nuevo Mundo.');
INSERT INTO peluches (Nombre, imagen_url, tamano, Precio, descripcion)
VALUES ('Pikachu', 'img/pikachu.jpg', 12, 30000.00, 'Pikachu es un Pokémon de tipo eléctrico. Es el más conocido de la historia por el sel acompañante del protagonista del anime, Ash Ketchum.');
INSERT INTO peluches (Nombre, imagen_url, tamano, Precio, descripcion)
VALUES ('Nezuko Kamado', 'img/sukuna.jpg', 9, 29000.00, 'Es la hermana menor de Tanjiro. Ella fue transformada en Demonio por Muzan Kibutsuji y acompaña a Tanjiro en su viaje para volver a ser humana. Es una de las protagonistas principales de Kimetsu no Yaiba.');
INSERT INTO peluches (Nombre, imagen_url, tamano, Precio, descripcion)
VALUES ('Haku', 'img/dino.jpg', 20, 29000.00, 'Haku, es un niño personaje de la reconocida pelicula El viaje Chihiro, se trasforma en Dragón debido a un hechizo.');
INSERT INTO peluches (Nombre, imagen_url, tamano, Precio, descripcion)
VALUES ('Roronoa Zoro', 'img/zoro.jpg', 12, 29000.00, 'Personaje de la serie One Piece, Zoro es conocido como El Cazador de Piratas es el primer pirata que se unió a Monkey D. Luffy, y el principal combatiente de los Piratas de Sombrero de Paja,uno de sus dos espadachines y uno de los oficiales principales de la Gran Flota de Sombrero de Paja, así como un antiguo cazarecompensas.');
INSERT INTO peluches (Nombre, imagen_url, tamano, Precio, descripcion)
VALUES ('Tanjiro Kamado', 'img/tanjiro.jpg', 10, 21000.00, 'Tanjiro es el protagonista principal de Kimetsu no Yaiba. Un cazador de Demonios cuyo principal objetivo es encontrar al responsable de haber matado a su familia y convertido a su hermana Nezuko en una Demonio.');

SELECT Clientes.Nombre, Clientes.ClienteID, Pedidos.PedidoID, Pedidos.Total, Pedidos.Fecha
FROM Clientes
JOIN Pedidos ON Clientes.ClienteID = Pedidos.Cliente_ID
ORDER BY Pedidos.PedidoID ASC
