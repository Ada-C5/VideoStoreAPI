DROP TABLE IF EXISTS rentals;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS customers;

CREATE TABLE movies(
  id serial PRIMARY KEY,
  title text,
  overview text,
  release_date text,
  inventory integer
);

CREATE INDEX movies_title ON movies (title);
CREATE INDEX movies_date ON movies (release_date);

CREATE TABLE customers(
  id serial PRIMARY KEY,
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
CREATE INDEX customers_date ON customers (registered_at);
CREATE INDEX customers_postal ON customers (postal_code);

CREATE TABLE rentals(
  id serial PRIMARY KEY,
  movie_id integer REFERENCES movies (id),
  customer_id integer REFERENCES customers (id),
  checked text,
  rental_date text,
  due_date text
);

CREATE INDEX rentals_customers ON rentals (customer_id);
CREATE INDEX rentals_states ON rentals (checked);
