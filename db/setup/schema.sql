DROP TABLE IF EXISTS rentals;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS customers;
CREATE TABLE movies(
  id serial PRIMARY KEY,
  title text,
  overview text,
  release_date date,
  inventory integer
);

CREATE INDEX movies_title ON movies (title);
CREATE INDEX movies_release_date ON movies (release_date);

/*customers */
CREATE TABLE customers(
  id serial PRIMARY KEY,
  name text,
  registered_at text,
  address text,
  city text,
  state text,
  postal_code integer,
  phone text,
  account_credit decimal
);

CREATE INDEX customers_name ON customers (name);

/* rentals */
CREATE TABLE rentals(
  id serial PRIMARY KEY,
  movie_id integer references movies(id),
  customer_id integer references customers(id),
  checkout_date date,
  due_date date,
  return_date date
);

CREATE INDEX rentals_customer_id ON rentals (customer_id);
CREATE INDEX rentals_movie_id ON rentals (movie_id);
