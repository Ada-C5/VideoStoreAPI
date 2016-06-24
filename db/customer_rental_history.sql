
SELECT movies.id, rentals.movie_id, rentals.customer_id, rentals.status, customers.*
FROM rentals
INNER JOIN movies
ON movies.id=rentals.movie_id
INNER JOIN customers
ON rentals.customer_id=customers.id
WHERE movies.title=$1 AND rentals.status=false
ORDER BY customers.name;

-- SELECT rentals.movie_id, rentals.customer_id, rentals.status, rentals.checkout_date, customers.*, movies.*
-- FROM rentals
-- INNER JOIN movies
-- ON movies.id=rentals.movie_id
-- INNER JOIN customers
-- ON rentals.customer_id=customers.id
-- WHERE movies.title=$1 AND rentals.status=false
-- ORDER BY to_date(rentals.checkout_date, 'Dy Mon DD YYYY');
