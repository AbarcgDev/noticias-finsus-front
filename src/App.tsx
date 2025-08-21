import './App.css'
import { Header } from './components/Header'
import AudioPlayerWithVisualizer from './components/Reproductor'
import Transcription from './components/Transcripcion'

function App() {
  return (
    <>
      <Header />
      <main>
        <section id='transcription'>
          <Transcription
            apiUrl='http://localhost:8787/api/noticieros/latest'
          />
        </section>
        <section id='reproductor'>
          <AudioPlayerWithVisualizer
            audioUrl='http://localhost:8787/api/noticieros/latest/audio/mp3'
          />
        </section>
      </main>
    </>
  )
}

export default App