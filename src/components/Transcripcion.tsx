import { useState, useEffect } from 'react';

const Transcription = ({ apiUrl = '/api/script' }) => {
    const [scriptText, setScriptText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    const loadScript = async () => {
        setLoading(true);

        try {
            const response = await fetch(apiUrl);
            const text = await response.json();
            setScriptText(text.guion);

        } catch (err) {
            setError('Error al cargar el guion');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadScript();
    }, [apiUrl]);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="ml-2">Cargando guion...</span>
            </div>
        );
    }

    if (error !== "") {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded">
                <p className="text-red-600">{error}</p>
                <button
                    onClick={loadScript}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="transcription-container">
            <h2 className="transcription-header">Transcripcion</h2>
            <textarea
                value={scriptText}
                readOnly
                className="transcription-textarea"
                placeholder="El guion aparecera aqui..."
            />
        </div>
    );
};

export default Transcription;