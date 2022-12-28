import { useState, useCallback } from "react";

interface RequestConfig {
    url: RequestInfo | URL,
    method?: string,
    headers?: {},
    body?: any
}

interface HttpRequest {
    isLoading: boolean,
    hasError: String,
    sendRequest: (requestConfig: RequestConfig, applyData: (data: any) => void) => Promise<void>
}

const useHttp = (): HttpRequest => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const sendRequest = useCallback(async (requestConfig: RequestConfig, applyData: (data: any) => void) => {
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(
                requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
            });

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();
            applyData(data)

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || 'Something went wrong!');
            }
        }
        setIsLoading(false);
    }, []);
    return {
        isLoading: isLoading,
        hasError: error,
        sendRequest: sendRequest
    } as HttpRequest
}

export default useHttp