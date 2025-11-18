
import React, { useState, useCallback } from 'react';
import { Header } from '../components/Header';
import { Loader } from '../components/Loader';
import { Modal } from '../components/Modal';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { conductResearch, ResearchResult } from '../services/researchService';

interface ResearchAssistantAppProps {
    onNavigateBack: () => void;
}

const researchLoadingMessages = [
    "Deploying AI research agents...",
    "Scanning the latest web sources...",
    "Synthesizing information clusters...",
    "Cross-referencing facts and figures...",
    "Compiling a comprehensive summary...",
    "Formatting citations and sources...",
];

const ResearchOutput: React.FC<{ result: ResearchResult }> = ({ result }) => {
    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="prose prose-invert prose-sm md:prose-base max-w-none">
                <MarkdownRenderer markdown={result.text} />
            </div>
            {result.sources.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-yellow-300 mb-4 border-t border-gray-600 pt-4">Sources</h3>
                    <ul className="space-y-2">
                        {result.sources.map((source, index) => (
                            <li key={index} className="text-sm">
                                <a
                                    href={source.web.uri}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan-400 hover:text-cyan-300 hover:underline break-all"
                                >
                                    {index + 1}. {source.web.title || source.web.uri}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export const ResearchAssistantApp: React.FC<ResearchAssistantAppProps> = ({ onNavigateBack }) => {
    const [topic, setTopic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<ResearchResult | null>(null);

    const handleResearch = useCallback(async () => {
        if (!topic.trim()) {
            setError('Please enter a research topic.');
            return;
        }

        setIsLoading(true);
        setResult(null);
        setError(null);

        try {
            const researchData = await conductResearch(topic);
            setResult(researchData);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Failed to conduct research. ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    }, [topic]);

    return (
        <>
            <Header
                title="AI Research Assistant"
                subtitle="Your intelligent research partner"
                onBack={onNavigateBack}
            />
            {isLoading && <Loader messages={researchLoadingMessages} />}
            <main className="container mx-auto px-4 py-8 md:py-12">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
                         <label htmlFor="researchTopic" className="block text-sm font-medium text-yellow-400 mb-2">
                            Research Topic
                        </label>
                        <textarea
                            id="researchTopic"
                            rows={4}
                            className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                            placeholder="e.g., The impact of AI on the Indian job market by 2030"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleResearch}
                            disabled={isLoading}
                            className="w-full bg-yellow-600 text-white font-bold py-3 px-4 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-50 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? 'Researching...' : 'Start Research'}
                        </button>
                    </div>

                    {result && !isLoading && (
                        <ResearchOutput result={result} />
                    )}
                </div>
            </main>
            <Modal isOpen={!!error} onClose={() => setError(null)} title="Warning">
                <p>{error}</p>
            </Modal>
        </>
    );
};
