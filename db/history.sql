SELECT rentals.movie_id, rentals.customer_id, customers.id, movies.*
FROM rentals
INNER JOIN customers
ON rentals.customer_id=customers.id
INNER JOIN movies
ON movies.id=rentals.movie_id
WHERE rentals.customer_id=$1
ORDER BY to_date(rentals.checkout_date, 'Dy Mon DD YYYY');
