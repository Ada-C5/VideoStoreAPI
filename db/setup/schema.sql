-- movies-------------------------------------------------
DROP TABLE IF EXISTS movies;
CREATE TABLE movies(
  id serial PRIMARY KEY,
  title text,
  overview text,
  release_date text,
  total_inventory integer,
  available_inventory integer,
  created_at timestamp,
  updated_at timestamp
);

CREATE INDEX movies_title ON movies (title);

-- customers-------------------------------------------------
DROP TABLE IF EXISTS customers;
CREATE TABLE customers(
  id serial PRIMARY KEY,
  name text,
  address text,
  city text,
  state text,
  postal_code text,
  account_credit decimal,
  phone text,
  registered_at timestamp,
  created_at timestamp,
  updated_at timestamp

);

CREATE INDEX customers_name ON customers (name);

-- rentals-------------------------------------------------
DROP TABLE IF EXISTS rentals;
CREATE TABLE rentals(
  id serial PRIMARY KEY,
  movie_id integer,
  customer_id integer,
  status text,
  return_date timestamp,
  created_at timestamp,
  updated_at timestamp
);

CREATE INDEX rentals_status ON rentals (status);
