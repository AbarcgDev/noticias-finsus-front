import { Editor } from "../components/Editor"
import { useApi } from "../hooks/useApi";

interface NoticieroApiResponse {
    id: string,
    title: string,
    guion: string,
    state: string,
    publicationDate: string,
    approvedBy: string
}

export const Admin = () => {
    const { data, loading, error } = useApi<NoticieroApiResponse>('http://localhost:8787/api/noticieros/latest');

    if (loading) {
        return <p>Cargando guion...</p>;
    }

    if (error) {
        return <p>Error al cargar el guion: {error}</p>;
    }

    if (!data) {
        return <p>No se encontró el guion.</p>;
    }

    return (
        <main>
            <section id="editor">
                <h3>{data.title}</h3>
                <Editor initialText={data.guion} />
                <button>Validar</button>
            </section>
        </main>
    )
}