
export const sendToN8nWorkflow = async (webhookUrl: string, payload: object): Promise<any> => {
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorBody}`);
        }

        // n8n can return different content types, so we handle JSON and text
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            return await response.text();
        }

    } catch (error) {
        console.error("Error sending request to n8n webhook:", error);
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
             throw new Error("The request was blocked by the browser's CORS policy. Please ensure your n8n instance is configured to allow requests from this origin. See the note on the page for instructions.");
        }
        if (error instanceof Error) {
            throw new Error(`Network or execution error: ${error.message}`);
        }
        throw new Error("An unknown error occurred while contacting the n8n workflow.");
    }
};