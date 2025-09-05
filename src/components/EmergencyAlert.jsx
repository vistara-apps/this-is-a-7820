import React, { useState, useEffect } from 'react';
import { AlertTriangle, Phone, MapPin, Users, Settings } from 'lucide-react';

const EmergencyAlert = () => {
  const [contacts, setContacts] = useState([]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: '' });
  const [location, setLocation] = useState(null);
  const [alertSent, setAlertSent] = useState(false);

  // Load contacts from localStorage
  useEffect(() => {
    const savedContacts = localStorage.getItem('emergencyContacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  // Save contacts to localStorage
  useEffect(() => {
    localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
  }, [contacts]);

  // Get current location
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
        },
        (error) => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      );
    });
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, { ...newContact, id: Date.now().toString() }]);
      setNewContact({ name: '', phone: '', relationship: '' });
      setShowAddContact(false);
    }
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const sendEmergencyAlert = async () => {
    if (contacts.length === 0) {
      alert('Please add emergency contacts first');
      return;
    }

    try {
      // Get current location
      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);

      // Create alert message
      const timestamp = new Date().toLocaleString();
      const locationText = currentLocation 
        ? `Lat: ${currentLocation.lat.toFixed(6)}, Lng: ${currentLocation.lng.toFixed(6)}`
        : 'Location unavailable';

      const alertMessage = `🚨 EMERGENCY ALERT from KnowYourRights app

I am currently in a police interaction and need assistance.

Time: ${timestamp}
Location: ${locationText}

Please contact me or appropriate legal assistance.

This is an automated message from the KnowYourRights safety feature.`;

      // Create SMS links for each contact
      const smsPromises = contacts.map(contact => {
        const smsUrl = `sms:${contact.phone}?body=${encodeURIComponent(alertMessage)}`;
        window.open(smsUrl, '_blank');
        return Promise.resolve();
      });

      await Promise.all(smsPromises);
      setAlertSent(true);
      
      setTimeout(() => setAlertSent(false), 5000);
    } catch (error) {
      console.error('Failed to send emergency alert:', error);
      alert('Failed to get location or send alert. Please try again.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="card">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-red-100 rounded-lg">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">Emergency Alert</h1>
            <p className="text-textSecondary">
              Quickly notify your trusted contacts during a police interaction. 
              Your location and a safety message will be sent discreetly.
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Button */}
      <div className="card-feature text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-4">Send Emergency Alert</h2>
        <p className="text-textSecondary mb-6">
          This will immediately send your location and an alert message to all your emergency contacts.
        </p>
        
        {alertSent ? (
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-4">
            <p className="text-green-800 font-medium">
              ✅ Emergency alert sent to {contacts.length} contact(s)
            </p>
          </div>
        ) : (
          <button
            onClick={sendEmergencyAlert}
            disabled={contacts.length === 0}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors w-full sm:w-auto"
          >
            🚨 SEND ALERT NOW
          </button>
        )}
        
        {contacts.length === 0 && (
          <p className="text-red-600 text-sm mt-2">
            Add emergency contacts below to enable this feature
          </p>
        )}
      </div>

      {/* Emergency Contacts Management */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center space-x-2">
            <Users className="w-5 h-5 text-accent" />
            <span>Emergency Contacts ({contacts.length})</span>
          </h2>
          <button
            onClick={() => setShowAddContact(true)}
            className="btn-primary text-sm"
          >
            Add Contact
          </button>
        </div>

        {/* Contacts List */}
        {contacts.length === 0 ? (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-textSecondary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-textSecondary mb-2">
              No emergency contacts
            </h3>
            <p className="text-textSecondary mb-4">
              Add trusted contacts who can help in emergency situations.
            </p>
            <button
              onClick={() => setShowAddContact(true)}
              className="btn-outline"
            >
              Add Your First Contact
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-4 bg-bg rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Phone className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-sm text-textSecondary">{contact.phone}</div>
                    {contact.relationship && (
                      <div className="text-xs text-textSecondary">{contact.relationship}</div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-lg w-full max-w-md">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold">Add Emergency Contact</h2>
            </div>
            
            <form onSubmit={handleAddContact} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  placeholder="Contact name"
                  required
                  className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                  required
                  className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-1">
                  Relationship
                </label>
                <input
                  type="text"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                  placeholder="e.g., Family, Friend, Lawyer"
                  className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  Add Contact
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddContact(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Safety Tips */}
      <div className="card bg-yellow-50 border border-yellow-200">
        <h3 className="font-semibold text-yellow-800 mb-3">🛡️ Safety Tips</h3>
        <ul className="space-y-2 text-sm text-yellow-700">
          <li>• Use this feature discreetly - don't let officers see you activating it</li>
          <li>• Add reliable contacts who can respond quickly or contact legal help</li>
          <li>• Test the feature beforehand to ensure it works with your contacts</li>
          <li>• Consider adding a lawyer's number if you have legal representation</li>
          <li>• Your location will be shared automatically if available</li>
        </ul>
      </div>

      {/* Current Location Display */}
      {location && (
        <div className="card bg-blue-50 border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2 flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>Last Known Location</span>
          </h3>
          <p className="text-sm text-blue-700 font-mono">
            {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Accuracy: ±{Math.round(location.accuracy)}m
          </p>
        </div>
      )}
    </div>
  );
};

export default EmergencyAlert;