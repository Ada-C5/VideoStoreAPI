DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS rentals;

CREATE TABLE movies(
  id serial PRIMARY KEY,
  title TEXT,
  overview TEXT,
  release_date DATE,
  inventory INTEGER,
  stock INTEGER
);

CREATE TABLE customers(
  id serial PRIMARY KEY,
  name TEXT,
  registered_at TIMESTAMP,
  address TEXT,
  city TEXT,
  state TEXT,
  postal_code TEXT,
  phone TEXT,
  account_credit REAL
);

CREATE TABLE rentals(
  id serial PRIMARY KEY,
  customer_id INTEGER,
  title TEXT,
  movie_id INTEGER,
  due_date TIMESTAMP,
  checkout_date TIMESTAMP,
  returned_date TIMESTAMP
);
