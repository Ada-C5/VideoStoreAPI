
SELECT rentals.status, rentals.customer_id, customers.*
FROM rentals
INNER JOIN customers
ON customers.id=rentals.customer_id
WHERE rentals.status=true;
