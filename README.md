- All endpoints return JSON data unless explicitly stated otherwise. If there is no data/record to return a message such as "This movie has not yet been checked out" or "This customer has not yet checked out a movie" will be returned.

- All endpoints are assumed to be GET unless explicitly stated otherwise

#### Customers
- Retrive a list of all customers: (`/customers`)
- Retrive a subset of customers (`/customers/sort/:sort_params`)
  - Given a sort column, return _n_ customer records, offset by _p_ records (this will be used to create "pages" of customers)
  - Sort params are
    - `name` : (`/name?n=10&p=2`)
    - `registered_at` example: (`/registered-at?n=10&p=2`)
    - `postal_code` example: (`/postal-code?n=10&p=2`)
- Given a customer's `id`...
  - List the movies they _currently_ have checked out (`/customers/:customer_id/current`)
  - List the movies a customer has checked out in the past (`/customers/:customer_id/history`)
    - ordered by check out date
    - includes return date

#### Movies
- Retrieve a list of all movies (`/movies`)
- Retrieve a subset of movies (`/movies/sort/:sort_params`)
  - Given a sort column, return _n_ movie records, offset by _p_ records (this will be used to create "pages" of movies)
  - Sort params are
    - `title` example: (`/title?n=5&p=1`)
    - `release_date` example: (`/release-date?n=5&p=1`)
- Given a movie's `id`...
  - Get a list of customers that have _currently_ checked out a copy of the film (`/movies/:movie_id/current`)
    - includes each customer's name, phone number, and account credit
  - Get a list of customers that have checked out a copy _in the past_
    - includes each customer's name, phone number, and account credit
    - ordered by customer `name` (`/movies/:movie_id/history/sort/name`)
    - ordered by `check-out` (`/movies/:movie_id/history/sort/date`)

#### Rental
- Look a movie up by id to see (`/movies/rentals/2`)
  - it's synopsis
  - release date
  - available inventory (not currently checked-out to a customer)
  - and inventory total
- See a list of customers that have _currently_ checked out any of the movie's inventory (`/movies/rentals/:movie_id/customers`)
- Given a customer's `id` and a movie's `title` ...
  - "check out" one of the movie's inventory to the customer  POST (`/movies/rentals/:movie_id/check-out/:customer_id`)
    - Establish a return date
    - Charge the customer's account (cost up to you)
  - "check in" one of customer's rentals POST (`/movies/rentals/:movie_id/return/:customer_id`)
    - return the movie to its inventory
- See a list of customers with overdue movies (`/movies/rentals/overdue`)
  - include customer name, movie title, check-out date, and return date

  =================================

####Visual tree
All urls are from root (localhost:3000/)

- (`/customers`) (All customers)
 - (`/customers/sort/:sort_params`) (Some customers)
    + `name` : (`/name?n=10&p=2`) (sorted by name)
    + `registered_at` : (`/registered-at?n=10&p=2`) (sortedby join date)
    + `postal_code` : (`/postal-code?n=10&p=2`) (sorted by location)
  - (`/customers/:customer_id/current`) (Currently checked out movies by a customer)
  - (`/customers/:customer_id/history`) (Previously checked out movies by a customer)


- (`/movies`) (All movies)
  - (`/movies/sort/:sort_params`) (Some movies)
    + `title` : (`/title?n=5&p=1`) (Sorted by title)
    + `release_date` : (`/release-date?n=5&p=1`) (Sorted by release date)
  - (`/movies/:movie_id/current`) (Current rentals per movie, ordered by due date)
  - (`/movies/:movie_id/history/sort/:sort_params`) (Some customers who have previously checked out movies)
    + (`/movies/:movie_id/history/sort/name`) (Sort by customer name)
    + (`/movies/:movie_id/history/sort/date`) (Sort by check-out date)

#####[Rentals, an extension of Movies]
  - (`/movies/rentals/:movie_id`) (To see movie details, and number of available copies in addition to total stock)
  - (`/movies/rentals/:movie_id/customers`) (Customers who currently have this movie checked out)
  - POST (`/movies/rentals/:movie_id/check-out/:customer_id`) (Creates a "check-out" of this movie to this customer, assigning the record a due date and charge)
  - POST (`/movies/rentals/:movie_id/return/:customer_id`) ("Returns" this movie checked out to this customer, changing checked-out status to false, and changing the available inventory accordingly)
  - (`/movies/rentals/overdue`)

##Informational endpoints
- (`/api/docs`) (Serves a *HTML view* of documentation)
- (`/api/docs.json`) (Serves JSON documentation)
