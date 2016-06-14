DROP TABLE IF EXISTS movies;
CREATE TABLE movies(
  id integer PRIMARY KEY,
  title text,
  overview text,
  release_date text,
  inventory integer
);

CREATE INDEX movies_title ON movies (title);

DROP TABLE IF EXISTS customers;
CREATE TABLE customers(
  id integer PRIMARY KEY,
  name text,
  registered_at text,
  address text,
  city text,
  state text,
  postal_code text,
  phone text,
  account_credit decimal
);

CREATE INDEX customers_name ON customers (name);

DROP TABLE IF EXISTS rentals;
CREATE TABLE rentals(
  id integer PRIMARY KEY,
  movie_id integer REFERENCES movies (id),
  customer_id integer REFERENCES customers (id)
);

CREATE INDEX rentals ON rentals (customer_id);
