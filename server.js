const express = require('express')
  const axios = require('axios')
  const app = express()
  const port = 3000

  app.use(express.json())

  app.get('/api/geocode', async (req, res) => {
    const { q } = req.query
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q,
          format: 'json',
          limit: 1
        }
      })
      res.json(response.data)
    } catch (error) {
      console.error('Error fetching geocoding data:', error)
      res.status(500).json([])
    }
  })

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })
