DROP TABLE IF EXISTS words;
CREATE TABLE words(
  id serial PRIMARY KEY,
  word text,
  score integer
);

CREATE INDEX words_word ON words (word);
