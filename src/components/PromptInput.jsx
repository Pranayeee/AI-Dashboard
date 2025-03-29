import React, { useState, useEffect, useRef } from 'react';
import { TextField, Paper, List, ListItem, ListItemText } from '@mui/material';

const PromptInput = ({ onGenerate, isLoading }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const inputRef = useRef(null);

  
  const suggestionsDatabase = {
    "insight": ["insight", "insights", "incite", "incight"],
    "company": ["company", "companie", "compnay", "comapny"],
    "growth": ["growth", "growt", "groth", "growht"],
    "analysis": ["analysis", "analisis", "analsis", "analys"],
    "financial": ["financial", "financal", "fiancial", "finantial"],
    "trend": ["trend", "tend", "treand", "trand"],
    "market": ["market", "maket", "markert", "maret"],
    "data": ["data", "date", "datta", "daata"]
  };

  
  const getClosestMatches = (word) => {
    if (!word || word.length < 3) return [];
    
    const lowerWord = word.toLowerCase();
    let matches = [];
    
 
    for (const [correctWord, variations] of Object.entries(suggestionsDatabase)) {
      if (variations.includes(lowerWord)) {
        matches.push(correctWord);
      }
    }
    
    
    if (matches.length === 0) {
      for (const correctWord of Object.keys(suggestionsDatabase)) {
        if (correctWord.startsWith(lowerWord.substring(0, 2))) {
          matches.push(correctWord);
        }
      }
    }
    
    return matches.slice(0, 5);
  };

  
  const autocorrectInput = (text) => {
    const words = text.split(' ');
    const correctedWords = words.map(word => {
      
      if (word.length <= 2) return word;
      
      const matches = getClosestMatches(word);
      return matches.length > 0 ? matches[0] : word;
    });
    
    return correctedWords.join(' ');
  };

  useEffect(() => {
    if (input.length > 2) {
    
      const words = input.split(' ');
      const lastWord = words[words.length - 1];
      
      const wordSuggestions = getClosestMatches(lastWord);
      const phraseSuggestions = [
        "Give me insights about the company",
        "Show me growth trends for last quarter",
        "Analyze market share data",
        "Generate financial report",
        "Visualize sales data"
      ].filter(phrase => 
        phrase.toLowerCase().includes(input.toLowerCase())
      );
      
      setSuggestions([...wordSuggestions, ...phraseSuggestions].slice(0, 5));
      setShowSuggestions(wordSuggestions.length > 0 || phraseSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [input]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInput(newValue);
    
    
    if (newValue.endsWith(' ')) {
      setTimeout(() => {
        const corrected = autocorrectInput(newValue);
        if (corrected !== newValue) {
          setInput(corrected);
        }
      }, 0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctedInput = autocorrectInput(input);
    if (correctedInput !== input) {
      setInput(correctedInput);
    }
    if (correctedInput.trim() && !isLoading) {
      onGenerate(correctedInput);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const words = input.split(' ');
    words.pop();
    words.push(suggestion);
    setInput(words.join(' ') + ' ');
    setShowSuggestions(false);
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (showSuggestions) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSuggestion(prev => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter' && suggestions.length > 0) {
        e.preventDefault();
        handleSuggestionClick(suggestions[activeSuggestion]);
      } else if (e.key === 'Tab' && suggestions.length > 0) {
        e.preventDefault();
        handleSuggestionClick(suggestions[activeSuggestion]);
      }
    }
  };

  return (
    <div className="prompt-input-container" style={{ position: 'relative' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          inputRef={inputRef}
          fullWidth
          multiline
          minRows={3}
          maxRows={6}
          variant="outlined"
          placeholder="Enter your prompt here..."
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => input.length > 2 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          style={{
            marginTop: '1rem',
            padding: '0.8rem 1.5rem',
            background: '#2980b9',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          {isLoading ? 'Generating...' : 'Generate'}
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <Paper 
          elevation={3} 
          style={{
            position: 'absolute',
            width: '100%',
            zIndex: 1000,
            maxHeight: '300px',
            overflowY: 'auto',
            top: '100%',
            left: 0,
            marginTop: '4px'
          }}
        >
          <List dense>
            {suggestions.map((suggestion, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  backgroundColor: index === activeSuggestion ? '#f0f0f0' : 'transparent'
                }}
              >
                <ListItemText 
                  primary={suggestion} 
                  secondary={index < 3 ? "Autocorrect suggestion" : "Prompt suggestion"}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default PromptInput;