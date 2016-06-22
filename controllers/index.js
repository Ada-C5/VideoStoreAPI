IndexController = {
  locals: {
    title: 'INDEX INDEX INDEX'
  },

  getIndex: function(req, res) {
    res.status(200).json({whatevs: 'whatevs!!!'})
  }
}

module.exports = IndexController
