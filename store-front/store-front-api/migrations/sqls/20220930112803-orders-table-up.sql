CREATE TYPE orderStatus AS ENUM ('active', 'complete');

CREATE TABLE orders (
  id SERIAL PRIMARY KEY, 
  product_id INTEGER REFERENCES products(id) NOT NULL, 
  user_id INTEGER REFERENCES users(id) NOT NULL, 
  quantity integer NOT NULL,
  status orderStatus DEFAULT 'active'
);