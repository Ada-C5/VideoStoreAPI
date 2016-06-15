DROP TABLE IF EXISTS customers;
CREATE TABLE customers(
  id serial PRIMARY KEY,
  name text,
  address text,
  city text,
  state text,
  postal_code text,
  phone text,
  account_credit float,
  registered_at date
);

CREATE INDEX customers_name ON customers (name);
 -- FIX THIS, I HAVE NO IDEA WHAT INDEX

DROP TABLE IF EXISTS movies;
CREATE TABLE movies(
  id serial PRIMARY KEY,
  title text,
  overview text,
  inventory integer,
  available integer,
  release_date date
);

CREATE INDEX movies_title ON movies (title);
-- FIX THIS, I HAVE NO IDEA WHAT INDEX

DROP TABLE IF EXISTS rentals;
CREATE TABLE rentals(
  id serial PRIMARY KEY,
  customer_id integer,
  movie_id integer,
  check_out_date date,
  checked_out boolean,
  due_date date
);

CREATE INDEX rentals_movie_id ON rentals (movie_id);
-- FIX THIS, I HAVE NO IDEA WHAT INDEX
