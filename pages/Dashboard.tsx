
import React from 'react';
import { Header } from '../components/Header';

interface DashboardProps {
  onNavigateToAvatar: () => void;
  onNavigateToResearch: () => void;
  onNavigateToN8n: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigateToAvatar, onNavigateToResearch, onNavigateToN8n }) => {
  return (
    <>
      <Header title="AI Application Dashboard" subtitle="A collection of powerful AI tools" />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* App Card 1 */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col justify-between hover:ring-2 hover:ring-cyan-500 transition-all duration-300 transform hover:-translate-y-1">
            <div>
              <h2 className="text-xl font-bold text-cyan-400 mb-2">Customer Avatar Deep Dive</h2>
              <p className="text-gray-400 text-sm mb-6 h-20">
                Generate detailed customer personas for the Indian market by analyzing your business, the problem it solves, and your solution.
              </p>
            </div>
            <button
              onClick={onNavigateToAvatar}
              className="w-full bg-cyan-600 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-50 transition-all"
            >
              Launch App
            </button>
          </div>
          
          {/* App Card 2 */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col justify-between hover:ring-2 hover:ring-yellow-500 transition-all duration-300 transform hover:-translate-y-1">
            <div>
              <h2 className="text-xl font-bold text-yellow-400 mb-2">AI Research Assistant</h2>
              <p className="text-gray-400 text-sm mb-6 h-20">
                Leverage Google Search for up-to-date, cited research on any topic. Get comprehensive summaries with linked sources.
              </p>
            </div>
            <button
              onClick={onNavigateToResearch}
              className="w-full bg-yellow-600 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-50 transition-all"
            >
              Launch App
            </button>
          </div>

          {/* New App Card 3 */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col justify-between hover:ring-2 hover:ring-indigo-500 transition-all duration-300 transform hover:-translate-y-1">
            <div>
              <h2 className="text-xl font-bold text-indigo-400 mb-2">n8n Workflow Connector</h2>
              <p className="text-gray-400 text-sm mb-6 h-20">
                Send data to any n8n webhook and receive results in real-time. A powerful tool to connect your dashboard to external automations.
              </p>
            </div>
            <button
              onClick={onNavigateToN8n}
              className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-all"
            >
              Launch App
            </button>
          </div>
        </div>
      </main>
    </>
  );
};
