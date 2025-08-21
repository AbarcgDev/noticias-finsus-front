import React, { useEffect, useState } from 'react';
import { ReactWaveform } from 'react-audio-wave-modern';

interface AudioPlayerWithVisualizerProps {
    audioUrl: string;
}

const AudioPlayerWithVisualizer: React.FC<AudioPlayerWithVisualizerProps> = ({ audioUrl }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const options = {
        container: "#waveform",
        height: 60,
        waveColor: "#23223f",
        progressColor: "#ff5f54",
        cursorWidth: 2,
        barWidth: 3,
        barGap: 2,
        barRadius: 5,
        barHeight: 1,
        mediaControls: false,
        dragToSeek: true,
        responsive: true
    };

    useEffect(() => {
        setIsMounted(true);
        setIsLoading(true);
        setHasError(false);

        // Timer simple para la carga
        const loadingTimer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        // Verificar si el audio es accesible
        const audio = new Audio(audioUrl);

        const handleCanPlay = () => {
            setIsLoading(false);
            setHasError(false);
        };

        const handleLoadError = () => {
            setIsLoading(false);
            setHasError(true);
        };

        audio.addEventListener('canplaythrough', handleCanPlay);
        audio.addEventListener('error', handleLoadError);

        return () => {
            setIsMounted(false);
            clearTimeout(loadingTimer);
            audio.removeEventListener('canplaythrough', handleCanPlay);
            audio.removeEventListener('error', handleLoadError);
        };
    }, [audioUrl]);

    return (
        <div className="audio-waveform-container">
            <div className={`audio-waveform-clean ${isLoading ? 'loading' : ''} ${hasError ? 'error' : ''}`}>

                {/* Estados de carga y error */}
                {isLoading && (
                    <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <span>Cargando audio...</span>
                    </div>
                )}

                {hasError && (
                    <div className="error-state">
                        <span>Error al cargar el audio</span>
                        <button onClick={() => window.location.reload()}>
                            Reintentar
                        </button>
                    </div>
                )}

                {/* Contenido principal cuando está cargado */}
                {isMounted && !isLoading && !hasError && (
                    <div className="waveform-section">
                        <ReactWaveform
                            audioUrl={audioUrl}
                            options={options}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AudioPlayerWithVisualizer;