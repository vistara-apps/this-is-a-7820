import React, { useState } from 'react';
import { MessageSquare, Copy, Languages, Play } from 'lucide-react';
import { scriptLibrary } from '../data/scriptLibrary';

const ScriptLibrary = ({ stateCode }) => {
  const [selectedCategory, setSelectedCategory] = useState('traffic');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [copiedScript, setCopiedScript] = useState(null);

  const scripts = scriptLibrary[selectedCategory] || {};
  const currentScripts = scripts[selectedLanguage] || {};

  const categories = [
    { id: 'traffic', name: 'Traffic Stops', icon: '🚗' },
    { id: 'general', name: 'General Encounters', icon: '👮' },
    { id: 'search', name: 'Search Situations', icon: '🔍' },
    { id: 'arrest', name: 'Arrest Scenarios', icon: '⚖️' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
  ];

  const handleCopyScript = async (scriptText) => {
    try {
      await navigator.clipboard.writeText(scriptText);
      setCopiedScript(scriptText);
      setTimeout(() => setCopiedScript(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handlePlayAudio = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'es' ? 'es-ES' : 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="card">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-accent/10 rounded-lg">
            <MessageSquare className="w-8 h-8 text-accent" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">Interaction Scripts</h1>
            <p className="text-textSecondary">
              Pre-written phrases and responses to help you communicate effectively 
              and assert your rights during police interactions.
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Category Selection */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-textPrimary mb-2">
            Situation Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  selectedCategory === category.id
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border bg-surface hover:bg-bg'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Language Selection */}
        <div>
          <label className="block text-sm font-medium text-textPrimary mb-2">
            Language
          </label>
          <div className="flex space-x-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  selectedLanguage === lang.code
                    ? 'border-accent bg-accent text-white'
                    : 'border-border bg-surface hover:bg-bg'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Languages className="w-4 h-4" />
                  <span className="text-sm font-medium">{lang.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scripts */}
      <div className="space-y-4">
        {Object.entries(currentScripts).map(([key, script]) => (
          <div key={key} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-textPrimary">{script.title}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePlayAudio(script.text)}
                  className="p-2 rounded-md hover:bg-bg transition-colors"
                  title="Play audio"
                >
                  <Play className="w-4 h-4 text-textSecondary" />
                </button>
                <button
                  onClick={() => handleCopyScript(script.text)}
                  className="p-2 rounded-md hover:bg-bg transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className={`w-4 h-4 ${
                    copiedScript === script.text ? 'text-accent' : 'text-textSecondary'
                  }`} />
                </button>
              </div>
            </div>
            
            <div className="bg-bg rounded-lg p-4 mb-3">
              <p className="text-textPrimary leading-relaxed">"{script.text}"</p>
            </div>
            
            <div className="text-sm text-textSecondary">
              <p><strong>When to use:</strong> {script.context}</p>
              {script.tip && (
                <p className="mt-1"><strong>Tip:</strong> {script.tip}</p>
              )}
            </div>
          </div>
        ))}

        {Object.keys(currentScripts).length === 0 && (
          <div className="card text-center py-8">
            <MessageSquare className="w-12 h-12 text-textSecondary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-textSecondary mb-2">
              No scripts available
            </h3>
            <p className="text-textSecondary">
              Scripts for this category and language combination are coming soon.
            </p>
          </div>
        )}
      </div>

      {/* Usage Tips */}
      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-3">💡 Script Usage Tips</h3>
        <ul className="space-y-2 text-sm text-blue-700">
          <li>• Speak clearly and calmly</li>
          <li>• Maintain a respectful tone</li>
          <li>• Don't argue or become confrontational</li>
          <li>• Ask if you're free to leave if not under arrest</li>
          <li>• Request a lawyer if you're being questioned</li>
        </ul>
      </div>
    </div>
  );
};

export default ScriptLibrary;