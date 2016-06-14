DROP TABLE IF EXISTS movies;
CREATE TABLE movies(
  id serial PRIMARY KEY,
  title text,
  overview text,
  release_date date,
  inventory integer
);

DROP TABLE IF EXISTS rentals;
CREATE TABLE rentals(
  id serial PRIMARY KEY,
  movie_id int,
  customer_id int,
  created_date date,
  due_date date,
  returned boolean
);

DROP TABLE IF EXISTS customers;
CREATE TABLE customers(
  id serial PRIMARY KEY,
  name text,
  registered_at timestamp,
  address text,
  city text,
  state text,
  postal_code text,
  phone text,
  account_credit money
);

-- CREATE INDEX words_word ON words (word);
