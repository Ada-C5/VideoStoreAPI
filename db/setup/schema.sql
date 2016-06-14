DROP TABLE IF EXISTS movies;
CREATE TABLE movies(
  id PRIMARY KEY,
  title text,
  overview text,
  release_date text,
  inventory integer
);

CREATE INDEX movies_title ON movies (title);
