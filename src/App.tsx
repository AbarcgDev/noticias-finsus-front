import './App.css'
import AudioPlayerWithVisualizer from './components/Reproductor'

function App() {
  return (
    <main>
      <AudioPlayerWithVisualizer
        audioUrl='http://localhost:8787/api/noticieros/latest/audio/mp3'
      />
    </main>
  )
}

export default App