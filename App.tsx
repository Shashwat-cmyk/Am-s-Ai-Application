
import React, { useState } from 'react';
import { Dashboard } from './pages/Dashboard';
import { CustomerAvatarApp } from './pages/CustomerAvatarApp';
import { ResearchAssistantApp } from './pages/ResearchAssistantApp';
import { N8nWorkflowApp } from './pages/N8nWorkflowApp';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';

export type Page = 'dashboard' | 'customerAvatar' | 'researchAssistant' | 'n8nWorkflow';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'customerAvatar':
        return <CustomerAvatarApp onNavigateBack={() => navigateTo('dashboard')} />;
      case 'researchAssistant':
        return <ResearchAssistantApp onNavigateBack={() => navigateTo('dashboard')} />;
      case 'n8nWorkflow':
        return <N8nWorkflowApp onNavigateBack={() => navigateTo('dashboard')} />;
      case 'dashboard':
      default:
        return <Dashboard 
                  onNavigateToAvatar={() => navigateTo('customerAvatar')} 
                  onNavigateToResearch={() => navigateTo('researchAssistant')}
                  onNavigateToN8n={() => navigateTo('n8nWorkflow')} 
                />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col relative">
      <div className="flex-grow">
        {renderPage()}
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;
