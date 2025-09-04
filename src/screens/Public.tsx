import AudioPlayerWithVisualizer from "../components/Reproductor";
import Transcription from "../components/Transcripcion";
import api from "../api.json"

export const PublicScreen = () => {
    return (
        <main className="tercios">
            <section id='transcription'>
                <Transcription
                    apiUrl={`${api.url}${api.endpoints.getGuion}`}
                />
            </section>
            <section id='reproductor'>
                <AudioPlayerWithVisualizer
                    audioUrl={`${api.url}${api.endpoints.getMp3Audio}`}
                />
            </section>
        </main>
    );
}