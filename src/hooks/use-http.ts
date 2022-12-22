import { useState, useCallback } from "react";

interface RequestConfig {
    url: RequestInfo | URL,
    method: string,
    headers: {},
    body: String
}

interface HttpRequest {
    isLoading: boolean,
    error: String,
    sendRequest: (requestConfig: RequestConfig, applyData: (data: {}) => {}) => Promise<void>
}

const useHttp = () : HttpRequest => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const sendRequest = useCallback(async (requestConfig: RequestConfig, applyData: (data: {})=>{}) => {
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
            if(err instanceof Error) {
                setError(err.message || 'Something went wrong!');
            }
        }
        setIsLoading(false);
    }, []);
    return {
        isLoading: isLoading,
        error: error,
        sendRequest: sendRequest
    } as HttpRequest
}

export default useHttp