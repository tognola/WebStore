
DROP DATABASE STORE;
CREATE DATABASE STORE;

USE STORE;

DROP TABLE IF EXISTS categories;
CREATE TABLE categories(
    id INT PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(50) NOT NULL,
    deleted BOOLEAN
);

DROP TABLE IF EXISTS products;
CREATE TABLE products(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    category_id INT NOT NULL,
    price FLOAT NOT NULL,
    quantity INT,
    deleted BOOLEAN,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

DROP TABLE IF EXISTS users;
CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    address VARCHAR(200) NOT NULL,
    role INT NOT NULL,
    deleted BOOLEAN
);


DROP TABLE IF EXISTS orders;
CREATE TABLE orders(
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATETIME NOT NULL,
    total_price FLOAT NOT NULL,
    state VARCHAR(50)
);

-- alter table orders modify column date DATETIME;

DROP TABLE IF EXISTS orders_prod_users;
CREATE TABLE orders_prod_users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);