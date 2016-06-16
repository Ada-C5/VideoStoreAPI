DROP TABLE IF EXISTS customers;
CREATE TABLE customers(
  id serial PRIMARY KEY,
  name text,
  registered_at date,
  address text,
  city text,
  state text,
  postal_code text,
  phone text,
  account_credit decimal(9,2)
);

DROP TABLE IF EXISTS videos;
CREATE TABLE videos(
  id serial PRIMARY KEY,
  title text,
  overview text,
  release_date date,
  inventory integer,
  available_inventory integer
)
