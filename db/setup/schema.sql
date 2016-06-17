DROP TABLE IF EXISTS customers;
CREATE TABLE customers(
  id serial PRIMARY KEY,
  name text,
  registered_at text,
  address text,
  city text,
  state text,
  postal_code text,
  phone text,
  account_credit numeric(6, 2)
);

DROP TABLE IF EXISTS movies;
CREATE TABLE movies(
  id serial PRIMARY KEY,
  title text,
  overview text,
  release_date text,
  inventory int
);

DROP TABLE IF EXISTS rentals;
CREATE TABLE rentals(
  id serial PRIMARY KEY,
  customer_id int,
  movie_id int,
  status boolean,
  return_date text
);
