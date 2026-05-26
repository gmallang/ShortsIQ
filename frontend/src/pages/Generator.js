import axios from 'axios'
import { useState } from 'react';


function Generator() {
    const [topic, setTopic] = useState('')
    const [loading, setLoading] = useState(false)
    const [script, setScript] = useState(null)

    const handleGenerate = async () => {

        setLoading(true)
        const response = await axios.post('http://localhost:5000/api/generate', { topic })
        setScript(response.data)
        setLoading(false)
    }

return (
    <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#a855f7' }}>ShortsIQ</h1>
      <p style={{ color: '#888', marginBottom: '30px' }}>Generate data-driven viral scripts</p>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input 
          value={topic} 
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter your topic..."
          style={{ 
            flex: 1, padding: '12px', borderRadius: '8px', 
            border: '1px solid #333', background: '#1a1a1a', 
            color: '#fff', fontSize: '16px' 
          }}
        />
        <button 
          onClick={handleGenerate}
          style={{ 
            padding: '12px 24px', borderRadius: '8px', border: 'none',
            background: '#a855f7', color: '#fff', fontSize: '16px', cursor: 'pointer'
          }}
        >
          Generate
        </button>
      </div>

      {loading && <p style={{ color: '#a855f7' }}>Analyzing viral patterns and generating script...</p>}
      
      {script && (
        <div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#a855f7' }}>{script.title}</h2>
          
          <div style={{ background: '#1a1a1a', padding: '24px', borderRadius: '12px', marginBottom: '20px' }}>
            <h3 style={{ color: '#888', marginBottom: '12px' }}>SCRIPT</h3>
            <p style={{ lineHeight: '1.8', fontSize: '16px' }}>{script.script}</p>
          </div>

          <div style={{ background: '#1a1a1a', padding: '24px', borderRadius: '12px' }}>
            <h3 style={{ color: '#888', marginBottom: '12px' }}>HOOKS</h3>
            {script.hooks.map((hook, index) => (
              <p key={index} style={{ padding: '8px 0', borderBottom: '1px solid #333' }}>{hook}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default Generator