
SELECT movies.id, rentals.movie_id, rentals.customer_id, customers.id as customer_id, customers.name
FROM rentals
INNER JOIN movies
ON movies.id=rentals.movie_id
INNER JOIN customers
ON rentals.customer_id=customers.id
WHERE movies.title=$1;
