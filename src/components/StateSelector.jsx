import React, { useState } from 'react';
import { ChevronDown, MapPin, Lock, Check } from 'lucide-react';
import { stateGuides } from '../data/stateGuides';

const StateSelector = ({ selectedState, onStateSelect, purchasedStates }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStates = Object.entries(stateGuides).filter(([code, guide]) =>
    guide.stateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStateClick = (stateCode) => {
    onStateSelect(stateCode);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-textPrimary mb-2">
        Select Your State
      </label>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 border border-border rounded-md bg-surface hover:bg-bg transition-colors"
      >
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-accent" />
          <span>
            {selectedState ? stateGuides[selectedState]?.stateName : 'Choose a state...'}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-md shadow-card z-50 max-h-80 overflow-hidden">
          <div className="p-3 border-b border-border">
            <input
              type="text"
              placeholder="Search states..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          
          <div className="overflow-y-auto max-h-60">
            {filteredStates.map(([code, guide]) => {
              const isPurchased = purchasedStates.has(code) || code === 'demo';
              
              return (
                <button
                  key={code}
                  onClick={() => handleStateClick(code)}
                  className="w-full flex items-center justify-between p-3 hover:bg-bg transition-colors text-left"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-mono bg-bg px-2 py-1 rounded">
                      {code}
                    </span>
                    <span className="font-medium">{guide.stateName}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {isPurchased ? (
                      <Check className="w-4 h-4 text-accent" />
                    ) : (
                      <Lock className="w-4 h-4 text-textSecondary" />
                    )}
                  </div>
                </button>
              );
            })}
            
            {filteredStates.length === 0 && (
              <div className="p-4 text-center text-textSecondary">
                No states found matching "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StateSelector;