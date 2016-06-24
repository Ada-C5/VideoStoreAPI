-- select title, movie id, where customer_id = params.id
-- make sql file in db
-- queries in that file create js-accessible functions- use them in the model.

-- SELECT movie_id, title
-- FROM rentals
-- WHERE customer_id=(SELECT id FROM movies WHERE customer_id=$1) AND returned=false", [movie_title]
--
-- List the movies they currently have checked out (/customers/5/current)
-- List the movies a customer has checked out in the past (/customers/5/history)
-- ordered by check out date
-- includes return date

db.run("SELECT * FROM rentals;")
