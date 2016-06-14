DROP TABLE IF EXISTS customers;
CREATE TABLE customers(
  id serial PRIMARY KEY,
  name text,
  address text,
  city text,
  state text,
  postal_code text,
  phone text,
  account_credit integer,
  registered_at date
);

-- CREATE INDEX words_word ON words (word);  FIX THIS, I HAVE NO IDEA WHAT INDEX

DROP TABLE IF EXISTS movies;
CREATE TABLE movies(
  id serial PRIMARY KEY,
  title text,
  overview text,
  inventory integer,
  available integer,
  release_date date
);

-- CREATE INDEX words_word ON words (word);  FIX THIS, I HAVE NO IDEA WHAT INDEX

DROP TABLE IF EXISTS rentals;
CREATE TABLE rentals(
  id serial PRIMARY KEY,
  customer_id integer,
  movie_id integer,
  check_out_date date,
  checked_out boolean,
  due_date date
);

-- CREATE INDEX words_word ON words (word);  FIX THIS, I HAVE NO IDEA WHAT INDEX
