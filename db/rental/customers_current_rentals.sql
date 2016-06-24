SELECT
  customers.name,
  customers.phone,
  customers.account_credit
FROM customers
  INNER JOIN rentals ON customers.id = rentals.customer_id
  INNER JOIN movies ON rentals.movie_id = movies.id
WHERE
  movies.title ILIKE $1 AND
  rentals.return_date IS NULL;
