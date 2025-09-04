import { Editor, type EditorRef } from "../components/Editor"
import { useApi } from "../hooks/useApi";
import React from "react";
import api from "../api.json"

interface NoticieroApiResponse {
    id: string,
    title: string,
    guion: string,
    state: string,
    publicationDate: string,
    approvedBy: string
}

export const Admin = () => {
    const { data, loading, error } = useApi<NoticieroApiResponse>(
        `${api.url}${api.endpoints.getLatestDraft}`
    );

    const editorRef = React.useRef<EditorRef>(null);
    const [isGenerating, setIsGenerating] = React.useState(false);

    if (loading) {
        return <p>Cargando guion...</p>;
    }

    if (error) {
        return <p>Error al cargar el guion: {error}</p>;
    }

    if (!data) {
        return <p>No se encontró el guion.</p>;
    }

    // Handler para validar guión
    const handleValidarGuion = async () => {
        try {
            // Obtener el contenido del editor
            const guionContent = editorRef.current?.getContent();

            if (!guionContent || guionContent.trim() === '') {
                alert('El guión está vacío. Por favor, escriba contenido antes de validar.');
                return;
            }

            console.log('Validando guión...', guionContent);

            const response = await fetch(`${api.url}${api.endpoints.validateNoticiero}${data.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: data.title,
                    guion: guionContent,
                    state: "noticiero.approved",
                    approvedBy: data.approvedBy
                }),
            });

            if (response.ok) {
                const result = await response.json();
                alert('Guión validado correctamente');
                console.log('Resultado de validación:', result);
            } else {
                const error = await response.json();
                alert(`Error al validar el guión: ${error.message || 'Error desconocido'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión');
        }
    };

    const handleGenerarNuevoNoticiero = async () => {
        try {
            setIsGenerating(true);
            const response = await fetch(`${api.url}${api.endpoints.validateNoticiero}`, {
                method: "POST",
            });

            if (response.ok) {
                window.location.reload();
            } else {
                const error = await response.json();
                alert(`Error al crear el noticiero: ${error.message || "Error desconocido"}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error de conexión");
        } finally {
            setIsGenerating(false);
        }
    };


    return (
        <main className="tercios">
            <section id="control-panel">
                <button onClick={handleGenerarNuevoNoticiero} disabled={isGenerating}>
                    Generar Nuevo Noticiero
                </button>
                <button disabled={isGenerating} onClick={handleValidarGuion}>Validar Guion</button>
                <button disabled={isGenerating}>Lista de Censura</button>
                <button disabled={isGenerating}>Notas Finsus</button>
            </section>

            <section id="editor">
                {isGenerating ? (
                    <h3>⏳ Generando guion, por favor espera...</h3>
                ) : (
                    <>
                        <h3>{data.title}</h3>
                        <Editor ref={editorRef} initialText={data.guion} />
                    </>
                )}
            </section>
        </main>
    );
};