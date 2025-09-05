import React from 'react';
import { Shield, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const StateGuide = ({ guide }) => {
  if (!guide) return null;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="card">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{guide.stateName} Rights Guide</h1>
            <p className="text-textSecondary">
              Know your rights during police interactions in {guide.stateName}. 
              This guide is based on current state and federal laws.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Rights Overview */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-accent" />
          <span>Your Fundamental Rights</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {guide.rightsContent.fundamental.map((right, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-bg rounded-lg">
              <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <span className="text-sm">{right}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Traffic Stops */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <Info className="w-5 h-5 text-primary" />
          <span>During Traffic Stops</span>
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-accent mb-2">What You Must Do:</h3>
            <ul className="space-y-2">
              {guide.rightsContent.trafficStops.required.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-primary mb-2">What You Can Legally Refuse:</h3>
            <ul className="space-y-2">
              {guide.rightsContent.trafficStops.optional.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Search and Seizure */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          <span>Search and Seizure Laws</span>
        </h2>
        <div className="prose prose-sm max-w-none">
          <p className="text-textSecondary mb-4">
            {guide.rightsContent.searchSeizure.overview}
          </p>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-medium text-orange-800 mb-2">Important State-Specific Notes:</h3>
            <ul className="space-y-1">
              {guide.rightsContent.searchSeizure.stateSpecific.map((note, index) => (
                <li key={index} className="text-sm text-orange-700">• {note}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Emergency Contact Info */}
      <div className="card bg-red-50 border border-red-200">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2 text-red-800">
          <AlertTriangle className="w-5 h-5" />
          <span>Emergency Contacts</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-red-700 mb-2">Legal Aid Hotline:</h3>
            <p className="text-red-600 font-mono">{guide.emergencyContacts.legalAid}</p>
          </div>
          <div>
            <h3 className="font-medium text-red-700 mb-2">ACLU Chapter:</h3>
            <p className="text-red-600 font-mono">{guide.emergencyContacts.aclu}</p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="card bg-gray-50 border border-gray-200">
        <p className="text-xs text-gray-600">
          <strong>Disclaimer:</strong> This information is for educational purposes only and does not constitute legal advice. 
          Laws may change, and specific circumstances may affect your rights. For legal advice, consult with a qualified attorney 
          in your jurisdiction.
        </p>
      </div>
    </div>
  );
};

export default StateGuide;