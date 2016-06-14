DROP TABLE IF EXISTS words;
CREATE TABLE movies(
  id serial PRIMARY KEY,
  title text,
  overview text,
  release_date text,
  inventory integer
);

CREATE TABLE customers(
  id serial PRIMARY KEY,
  name text,
  registered_at text,
  address text,
  city text,
  state text,
  postal_code text,
  phone integer,
  account_credit integer
);


CREATE TABLE rentals(
  id serial PRIMARY KEY,
  movie_id integer,
  customer_id integer,
  checked boolean,
  rental_date text,
  due_date text,
);

-- CREATE INDEX words_word ON words (word);
