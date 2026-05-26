import axios from 'axios'
import { useState, useEffect } from 'react'

function History() {
  const [scripts, setScripts] = useState([])

  useEffect(() => {
    axios.get('https://shortsiq-backend.onrender.com/api/history')
      .then(response => setScripts(response.data))
  }, [])

  return (
    <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', color: '#a855f7' }}>History</h1>
      {scripts.length === 0 && <p style={{ color: '#888' }}>No scripts generated yet.</p>}
      {scripts.map((script, index) => (
        <div key={index} style={{ background: '#1a1a1a', padding: '24px', borderRadius: '12px', marginBottom: '16px' }}>
          <h3 style={{ color: '#a855f7', marginBottom: '8px' }}>{script[1]}</h3>
          <p style={{ color: '#888', fontSize: '14px' }}>{script[3]}</p>
        </div>
      ))}
    </div>
  )
}

export default History