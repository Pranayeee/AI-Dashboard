import React, { useState } from 'react';
import Card from './Card';
import PromptInput from './PromptInput';
import GraphGenerator from './GraphGenerator';

const MainContent = () => {
  const [output, setOutput] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (prompt) => {
    setIsLoading(true);
    setCurrentPrompt(prompt);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock response based on prompt
    const responses = {
      'company': `Analysis of company insights:\n\nHere are the key financial metrics and performance indicators for the company. The data visualization below shows revenue and expenses across quarters.`,
      'growth': `Growth analysis:\n\nThe company has shown consistent growth across all quarters with Q4 being particularly strong.`,
      'market share': `Market share breakdown:\n\nOur products maintain strong market positions with Product A leading at 35% market share.`
    };
    
    // Determine which response to use based on prompt keywords
    let responseKey = 'default';
    if (prompt.toLowerCase().includes('company') || prompt.toLowerCase().includes('insight')) {
      responseKey = 'company';
    } else if (prompt.toLowerCase().includes('growth')) {
      responseKey = 'growth';
    } else if (prompt.toLowerCase().includes('market share')) {
      responseKey = 'market share';
    }
    
    setOutput(responses[responseKey] || `Response to "${prompt}":\n\nThis is a comprehensive analysis based on your request.`);
    setIsLoading(false);
  };

  const cardData = [
    {
      title: 'Text Generation',
      description: 'Generate human-like text based on your prompts.'
    },
    {
      title: 'Data Visualization',
      description: 'Get charts and graphs for analytical prompts.'
    },
    {
      title: 'Insight Generation',
      description: 'Receive comprehensive business insights.'
    }
  ];

  return (
    <div className="main-content">
      <h1>AI Generative Dashboard</h1>
      <p>Manage and interact with AI models</p>
      
      <div className="card-container">
        {cardData.map((card, index) => (
          <Card 
            key={index}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
      
      <div className="generation-section">
        <h2>AI Analysis Generator</h2>
        <PromptInput onGenerate={handleGenerate} isLoading={isLoading} />
        
        {output && (
          <div className="output-container">
            <h3>Generated Analysis:</h3>
            <div className="output-content">{output}</div>
            
            {/* Conditionally render graph based on prompt */}
            {(currentPrompt.toLowerCase().includes('company') || 
              currentPrompt.toLowerCase().includes('insight') ||
              currentPrompt.toLowerCase().includes('growth') ||
              currentPrompt.toLowerCase().includes('market share')) && (
              <GraphGenerator prompt={currentPrompt} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;