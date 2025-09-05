import React, { useState, useEffect } from 'react';
import { FileText, MapPin, Clock, Share2, Plus, Trash2 } from 'lucide-react';

const IncidentLogger = ({ stateCode }) => {
  const [incidents, setIncidents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: '',
    description: '',
    officerBadge: '',
    witnesses: '',
    outcome: '',
  });

  // Load incidents from localStorage on component mount
  useEffect(() => {
    const savedIncidents = localStorage.getItem('incidents');
    if (savedIncidents) {
      setIncidents(JSON.parse(savedIncidents));
    }
  }, []);

  // Save incidents to localStorage whenever incidents change
  useEffect(() => {
    localStorage.setItem('incidents', JSON.stringify(incidents));
  }, [incidents]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newIncident = {
      id: Date.now().toString(),
      ...formData,
      stateCode,
      createdAt: new Date().toISOString(),
    };
    
    setIncidents([newIncident, ...incidents]);
    setFormData({
      date: '',
      time: '',
      location: '',
      description: '',
      officerBadge: '',
      witnesses: '',
      outcome: '',
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setIncidents(incidents.filter(incident => incident.id !== id));
  };

  const generateShareText = (incident) => {
    const shareText = `
Police Interaction Log
Date: ${incident.date} at ${incident.time}
Location: ${incident.location}
State: ${stateCode}

Description: ${incident.description}

Officer Badge: ${incident.officerBadge || 'Not provided'}
Witnesses: ${incident.witnesses || 'None noted'}
Outcome: ${incident.outcome || 'Ongoing'}

Logged via KnowYourRights app
    `.trim();
    
    return shareText;
  };

  const handleShare = async (incident) => {
    const shareText = generateShareText(incident);
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Police Interaction Log',
          text: shareText,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Incident details copied to clipboard');
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="card">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">Incident Logger</h1>
            <p className="text-textSecondary">
              Document police interactions for your records. This information stays on your device 
              and can be shared when needed.
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Log</span>
          </button>
        </div>
      </div>

      {/* New Incident Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold">Log New Incident</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-textPrimary mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-textPrimary mb-1">
                    Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Street address, intersection, or landmark"
                  required
                  className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe what happened..."
                  required
                  rows={4}
                  className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-1">
                  Officer Badge Number
                </label>
                <input
                  type="text"
                  name="officerBadge"
                  value={formData.officerBadge}
                  onChange={handleInputChange}
                  placeholder="If visible/provided"
                  className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-1">
                  Witnesses
                </label>
                <input
                  type="text"
                  name="witnesses"
                  value={formData.witnesses}
                  onChange={handleInputChange}
                  placeholder="Names or descriptions of witnesses"
                  className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-1">
                  Outcome
                </label>
                <select
                  name="outcome"
                  value={formData.outcome}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select outcome...</option>
                  <option value="Warning">Warning</option>
                  <option value="Citation">Citation</option>
                  <option value="Arrest">Arrest</option>
                  <option value="No Action">No Action</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  Save Incident
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Incidents List */}
      <div className="space-y-4">
        {incidents.length === 0 ? (
          <div className="card text-center py-8">
            <FileText className="w-12 h-12 text-textSecondary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-textSecondary mb-2">
              No incidents logged
            </h3>
            <p className="text-textSecondary mb-4">
              Tap "New Log" to document a police interaction.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-outline"
            >
              Log Your First Incident
            </button>
          </div>
        ) : (
          incidents.map((incident) => (
            <div key={incident.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-sm text-textSecondary">
                    <Clock className="w-4 h-4" />
                    <span>{incident.date} at {incident.time}</span>
                  </div>
                  {incident.outcome && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {incident.outcome}
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleShare(incident)}
                    className="p-2 rounded-md hover:bg-bg transition-colors"
                    title="Share incident"
                  >
                    <Share2 className="w-4 h-4 text-textSecondary" />
                  </button>
                  <button
                    onClick={() => handleDelete(incident.id)}
                    className="p-2 rounded-md hover:bg-bg transition-colors"
                    title="Delete incident"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                  <span className="text-sm">{incident.location}</span>
                </div>
                
                <p className="text-textPrimary">{incident.description}</p>
                
                {incident.officerBadge && (
                  <div className="text-sm text-textSecondary">
                    <strong>Officer Badge:</strong> {incident.officerBadge}
                  </div>
                )}
                
                {incident.witnesses && (
                  <div className="text-sm text-textSecondary">
                    <strong>Witnesses:</strong> {incident.witnesses}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Privacy Notice */}
      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-semibold text-green-800 mb-2">🔒 Privacy Notice</h3>
        <p className="text-sm text-green-700">
          All incident logs are stored locally on your device. Nothing is sent to our servers. 
          You control when and how to share this information.
        </p>
      </div>
    </div>
  );
};

export default IncidentLogger;