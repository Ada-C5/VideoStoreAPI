var MovieController = {
  sortTitle: function (req, res, next) {
    res.send(
      // CODE TO RETRIEVE movies, sorted by title
    )}
  }

  sortRelease: function (req, res, next) {
    res.send(
      // CODE TO RETRIEVE movies, sorted by release date
    )}
  }

  current: function (req, res, next) {
    res.send(
      // CODE TO RETRIEVE rentals that are (currently checked out) by title
    )}
  }

  history: function (req, res, next) {
    res.send(
      // CODE TO RETRIEVE rentals that were previously checked out by title
    )}
  }

  rentalsTitle: function (req, res, next) {
    res.send(
      // HOW IS THIS DIFFERENT FROM CURRENT/HISTORY BY TITLE?
    )}
  }

  rentalsCustomers: function (req, res, next) {
    res.send(
      //
    )}
  }

  checkout: function (req, res, next) {
    res.send(
      //
    )}
  }

  return: function (req, res, next) {
    res.send(
      //
    )}
  }

  overdue: function (req, res, next) {
    res.send(
      // 
    )}
  }

module.exports = MovieController
