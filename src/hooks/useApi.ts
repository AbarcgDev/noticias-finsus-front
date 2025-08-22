// hooks/useApi.ts
import { useState, useEffect } from 'react';

export interface ApiState<T> {
    data: T | null;
    loading: boolean;
    error: string;
}

export interface UseApiReturn<T> extends ApiState<T> {
    refetch: () => Promise<void>;
}

export const useApi = <T = any>(url: string): UseApiReturn<T> => {
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        loading: true,
        error: ''
    });

    const fetchData = async (): Promise<void> => {
        try {
            setState(prev => ({ ...prev, loading: true, error: '' }));

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const result: T = await response.json();

            setState({
                data: result,
                loading: false,
                error: ''
            });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            setState({
                data: null,
                loading: false,
                error: errorMessage
            });
        }
    };

    useEffect(() => {
        if (url) {
            fetchData();
        }
    }, [url]);

    return { ...state, refetch: fetchData };
};