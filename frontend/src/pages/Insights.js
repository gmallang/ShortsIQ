import axios from 'axios'
import { useState } from 'react'

function Insights() {
  const [topic, setTopic] = useState('')
  const [insights, setInsights] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    setLoading(true)
    const response = await axios.get(`https://shortsiq-backend.onrender.com/api/insights?topic=${topic}`)
    setInsights(response.data)
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#a855f7' }}>Insights</h1>
      <p style={{ color: '#888', marginBottom: '30px' }}>Analyze what makes videos go viral in your niche</p>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input 
          value={topic} 
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter your niche topic..."
          style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #333', background: '#1a1a1a', color: '#fff', fontSize: '16px' }}
        />
        <button 
          onClick={handleAnalyze}
          style={{ padding: '12px 24px', borderRadius: '8px', border: 'none', background: '#a855f7', color: '#fff', fontSize: '16px', cursor: 'pointer' }}
        >
          Analyze
        </button>
      </div>

      {loading && <p style={{ color: '#a855f7' }}>Analyzing viral patterns...</p>}
      
      {insights && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ background: '#1a1a1a', padding: '24px', borderRadius: '12px' }}>
            <h3 style={{ color: '#888', marginBottom: '8px' }}>AVG VIEWS</h3>
            <p style={{ fontSize: '2rem', color: '#a855f7' }}>{Math.round(insights.views).toLocaleString()}</p>
          </div>
          <div style={{ background: '#1a1a1a', padding: '24px', borderRadius: '12px' }}>
            <h3 style={{ color: '#888', marginBottom: '8px' }}>AVG LIKES</h3>
            <p style={{ fontSize: '2rem', color: '#a855f7' }}>{Math.round(insights.likes).toLocaleString()}</p>
          </div>
          <div style={{ background: '#1a1a1a', padding: '24px', borderRadius: '12px' }}>
            <h3 style={{ color: '#888', marginBottom: '8px' }}>AVG COMMENTS</h3>
            <p style={{ fontSize: '2rem', color: '#a855f7' }}>{Math.round(insights.comments).toLocaleString()}</p>
          </div>
          <div style={{ background: '#1a1a1a', padding: '24px', borderRadius: '12px' }}>
            <h3 style={{ color: '#888', marginBottom: '8px' }}>ENGAGEMENT RATE</h3>
            <p style={{ fontSize: '2rem', color: '#a855f7' }}>{(insights.engagement_rate * 100).toFixed(2)}%</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Insights