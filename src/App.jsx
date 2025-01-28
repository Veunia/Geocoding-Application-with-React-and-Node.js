import React, { useState } from 'react'
  import './App.css'
  import axios from 'axios'

  function App() {
    const [addresses, setAddresses] = useState([])
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    const handleFileUpload = (event) => {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target.result
        try {
          const data = JSON.parse(text)
          if (Array.isArray(data)) {
            setAddresses(data)
          } else {
            console.error('JSON data is not an array')
          }
        } catch (error) {
          console.error('Invalid JSON file')
        }
      }
      reader.readAsText(file)
    }

    const handleGeocode = async () => {
      setLoading(true)
      const geocodedResults = []
      for (const address of addresses) {
        try {
          const response = await axios.get(`/api/geocode`, { params: { q: address.description } })
          const { lat, lon } = response.data[0] || {}
          geocodedResults.push({ ...address, lat, lon })
        } catch (error) {
          console.error('Error geocoding address:', address.description)
          geocodedResults.push({ ...address, lat: null, lon: null })
        }
        await new Promise(resolve => setTimeout(resolve, 1000)) // Delay between requests
      }
      setResults(geocodedResults)
      setLoading(false)
    }

    const handleDownloadCSV = () => {
      console.log('handleDownloadCSV called', results)
      const csvContent = [
        ['Nom', 'Adresse', 'Latitude', 'Longitude'].join(','),
        ...results.map(result => [result.name, result.description, result.lat || 'N/A', result.lon || 'N/A'].join(','))
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'geocoding-results.csv'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }

    const handleTextareaChange = (e) => {
      const lines = e.target.value.split('\n')
      const addrArray = lines.map(line => {
        const [name, description] = line.split(',')
        return { name, description }
      }).filter(addr => addr.name && addr.description) // Ensure both fields are present
      setAddresses(addrArray)
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1>Géocodez facilement vos adresses !</h1>
        </header>
        <main className="App-main">
          <div className="input-section">
            <textarea
              value={addresses.map(addr => `${addr.name},${addr.description}`).join('\n')}
              onChange={handleTextareaChange}
              placeholder="Entrez vos adresses ici (format: Nom,Adresse)"
              rows="10"
              cols="50"
            />
            <input type="file" accept=".csv,.json" onChange={handleFileUpload} />
          </div>
          <button className="geocode-button" onClick={handleGeocode} disabled={loading}>
            {loading ? 'Géocodage en cours...' : 'Géocoder'}
          </button>
          <table className="results-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Adresse</th>
                <th>Latitude</th>
                <th>Longitude</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.name}</td>
                  <td>{result.description}</td>
                  <td>{result.lat || 'N/A'}</td>
                  <td>{result.lon || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {results.length > 0 && (
            <button className="download-button" onClick={handleDownloadCSV}>Télécharger CSV</button>
          )}
        </main>
      </div>
    )
  }

  export default App
