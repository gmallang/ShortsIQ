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
    <div>
      <input value={topic} onChange={(e) => setTopic(e.target.value)} />
      <button onClick={handleGenerate}>Generate</button>
      {loading && <p>Generating...</p>}
      {script && <p>{script.script}</p>}
    </div>
  )
}

export default Generator