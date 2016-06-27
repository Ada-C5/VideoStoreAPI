SELECT rentals.status, rentals.customer_id, rentals.return_date, customers.*, rentals.checkout_date, movies.title
FROM rentals
INNER JOIN movies
ON rentals.movie_id=movies.id
INNER JOIN customers
ON customers.id=rentals.customer_id
WHERE rentals.status=true AND to_date(return_date, 'Dy Mon DD YYYY')<current_date;
