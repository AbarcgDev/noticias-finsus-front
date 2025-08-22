import AudioPlayerWithVisualizer from "../components/Reproductor";
import Transcription from "../components/Transcripcion";

export const PublicScreen = () => {
    return (
        <main className="tercios">
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
    );
}