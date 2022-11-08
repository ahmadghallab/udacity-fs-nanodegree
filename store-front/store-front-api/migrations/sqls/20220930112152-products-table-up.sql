CREATE TABLE products (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(100) NOT NULL, 
  price float NOT NULL, 
  category VARCHAR
);