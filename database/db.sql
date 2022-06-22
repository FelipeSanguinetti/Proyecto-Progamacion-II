CREATE SCHEMA cala;

USE cala;

CREATE TABLE usuarios (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP
);

CREATE TABLE productos (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	tipo VARCHAR(255) NOT NULL,
    imagen TEXT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha DATE NOT NULL,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,
    usuario_id INT UNSIGNED NOT NULL,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);


CREATE TABLE comentarios (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    contenido TEXT NOT NULL,
    usuario_id INT UNSIGNED NOT NULL,
    producto_id INT UNSIGNED NOT NULL,
    
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

INSERT INTO usuarios (id, usuario, nombre, apellido, mail, contrasena, fechaNacimiento, imagen)
VALUES (10, 'mariavaccario', 'Maria', 'Vaccario', 'mariavaccario@gmail.com', '$2a$10$v1CNm22xutmYQbtVzhd5J.ueFMHdpNz3NbHJT1FnRI.5celW12l/e', '2002-09-11', '/images/uploads/c214ec3e9e78db9ad39fa00a3e8d9c52'),
(11, 'simondeabelleyra', 'Simon', 'De Abelleyra', 'sdeabelleyra@gmail.com', '$2a$10$.pLRUQjM3yQZ5S73a6O5oeMWhjQEzlMHAmLX6gZT1iaPkY/g0WBwK', '2003-05-23', '/images/uploads/67c4b2855eb4ab59d955bd45c71c1f7b'),
(12, 'felipesanguinetti', 'Felipe', 'Sanguinetti', 'ssanguinetti@gmail.com', '$2a$10$GLdB7qBpZGOfwqgVbbxS4OOdCXHYaU8zwkFCBb96cCj/03RTeoVnC', '2002-10-27', '/images/uploads/19d4399231ae400f9493c34ea066631b');

INSERT INTO productos(tipo, imagen, nombre, descripcion, fecha, usuario_id)
VALUES('pizza', '/images/products/cabutia azul.png', 'Cabutia Azul', 'Pizza napoletana de fior di latte, cabutia, queso azul y albahaca.', '2021-08-24', 10),
('pizza', '/images/products/mortachio.png', 'Mortacchio', 'Pizza napoletana de fior di latte, mortadela y pistacchios.', '2022-02-05', 10),
('pizza', '/images/products/calzone.png', 'Calzone', 'Especialidad de la cocina italiana elaborado igual que la pizza pero completamente cerrado y relleno con fior di latte, cherrys, nduja, mortadela y albahaca.', '2019-07-31', 11),
('pizza', '/images/products/pesto.png', 'Pesto', 'Pizza napoletana de fior di latte, tomates cherry, sobre una salsa pesto hecha con albahaca y ajo.', '2020-12-09', 12),
('pizza', '/images/products/peperoni.png', 'Pepperoni', 'Pizza napoletana de fior di latte y pepperoni. El pepperoni generalmente está hecho de una mezcla de carne de cerdo y carne de res.', '2019-09-11', 12),
('pizza', '/images/products/margerita.png', 'Margherita', 'Pizza napoletana con fior di latte, tomate cherry y albahaca. La clasica.', '2019-09-21', 12),
('pizza', '/images/products/mpicante.png', 'Margherita Picante', 'Pizza napoletana picante con fior di latte, tomate cherry, albahaca y `Nduja', '2018-11-30', 11),
('pizza', '/images/products/guanciale.png', 'Guanciale', 'Pizza napoletana con fior di latte y guanciale.', '2020-02-10', 6),
('pasta', '/images/products/garganelli.png', 'Garganelli', 'Garganelli all’ uovo con pomodoro de ‘Nduja', '2021-11-15', 7),
('pasta', '/images/products/tortellini.png', 'Tortellini', 'Tortellini relleno de cabutia, queso azul y nuez, con manteca de salvia y almendras.', '2019-08-06', 10),
('pasta', '/images/products/cavatelli.png', 'Cavatelli', 'Cavatelli de remolacha con manteca de girgolas.', '2018-10-17', 8),
('pasta', '/images/products/cestini.png', 'Cestini', 'Cestini rellenos de papa, tomillo, parmesano y ricota con manteca de avellanas.', '2018-01-06', 10),
('pasta', '/images/products/Strozzapretti.png', 'Strozzapretti', 'Strozzapretti con bolognesa de bondiola, acompañado con una focaccia.', '2020-11-04', 11),
('pasta', '/images/products/tagliatele.png', 'Tagliatelle', 'Tagliatelle all`Bolognese.', '2021-03-16', 11),
('pasta', '/images/products/triangoli.png', 'Triangoli', 'Triangoli relleno de batata, boñato y queso de cabra', '2022-02-04', 12);
