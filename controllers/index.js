IndexController = {
  locals: {
    title: 'INDEX INDEX INDEX'
  },

  getIndex: function(req, res) {
    res.status(200).json({whatevs: 'whatevs!!!'})
  },

  getZomg: function(req, res) {
    res.status(200).json({it_works: 'Yeah MF!!!'})
  }
}

module.exports = IndexController
