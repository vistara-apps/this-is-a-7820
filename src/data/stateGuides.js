export const stateGuides = {
  'demo': {
    stateName: 'Demo State',
    rightsContent: {
      fundamental: [
        'You have the right to remain silent',
        'You have the right to refuse searches',
        'You have the right to ask if you are free to leave',
        'You have the right to an attorney'
      ],
      trafficStops: {
        required: [
          'Provide driver\'s license, registration, and insurance when requested',
          'Keep hands visible and follow lawful orders',
          'Remain in vehicle unless instructed otherwise'
        ],
        optional: [
          'Answer questions beyond identification',
          'Consent to vehicle searches',
          'Allow search of personal belongings'
        ]
      },
      searchSeizure: {
        overview: 'Police need probable cause or a warrant to search your vehicle in most circumstances. You have the right to clearly state you do not consent to searches.',
        stateSpecific: [
          'This is a demo state with example information',
          'Actual state guides contain real legal information',
          'Purchase a state guide for accurate, current laws'
        ]
      }
    },
    emergencyContacts: {
      legalAid: '1-800-DEMO-LAW',
      aclu: '1-800-DEMO-ACLU'
    }
  },
  'CA': {
    stateName: 'California',
    rightsContent: {
      fundamental: [
        'You have the right to remain silent under the 5th Amendment',
        'You have the right to refuse consent to searches',
        'You have the right to ask if you are free to leave',
        'You have the right to an attorney if questioned',
        'You have the right to record police interactions in public'
      ],
      trafficStops: {
        required: [
          'Provide driver\'s license, registration, and proof of insurance',
          'Exit vehicle if lawfully ordered to do so',
          'Keep hands visible at all times',
          'Follow lawful direct orders'
        ],
        optional: [
          'Answer questions about where you\'re going or coming from',
          'Consent to vehicle searches beyond what\'s in plain view',
          'Allow officers to search passengers or their belongings',
          'Perform field sobriety tests (you may request a blood/breath test instead)'
        ]
      },
      searchSeizure: {
        overview: 'In California, police need probable cause, a warrant, or valid consent to search your vehicle. The "automobile exception" allows searches if there\'s probable cause to believe evidence of a crime is in the vehicle.',
        stateSpecific: [
          'California has strong privacy protections under the state constitution',
          'Police cannot search your phone without a warrant',
          'You can revoke consent to search at any time',
          'Passengers have the right to refuse searches of their belongings'
        ]
      }
    },
    emergencyContacts: {
      legalAid: '1-800-520-2356',
      aclu: '415-621-2493'
    }
  },
  'NY': {
    stateName: 'New York',
    rightsContent: {
      fundamental: [
        'You have the right to remain silent under the 5th Amendment',
        'You have the right to refuse consent to searches',
        'You have the right to ask if you are free to leave',
        'You have the right to an attorney if questioned',
        'You have the right to record police interactions in public spaces'
      ],
      trafficStops: {
        required: [
          'Provide driver\'s license, registration, and insurance documentation',
          'Exit vehicle if lawfully commanded',
          'Keep hands visible and avoid sudden movements',
          'Comply with lawful direct orders'
        ],
        optional: [
          'Answer questions beyond basic identification',
          'Consent to searches of vehicle or belongings',
          'Perform field sobriety tests',
          'Allow searches of passengers'
        ]
      },
      searchSeizure: {
        overview: 'New York follows federal Fourth Amendment standards. Police need probable cause or a warrant for most searches. Vehicle searches may be conducted if there\'s probable cause to believe evidence is present.',
        stateSpecific: [
          'New York has additional protections under Article I, Section 12 of the state constitution',
          'Stop-and-frisk requires reasonable suspicion of criminal activity',
          'Police cannot extend traffic stops without additional reasonable suspicion',
          'Recording police is legal in public spaces'
        ]
      }
    },
    emergencyContacts: {
      legalAid: '212-577-3300',
      aclu: '212-607-3300'
    }
  },
  'TX': {
    stateName: 'Texas',
    rightsContent: {
      fundamental: [
        'You have the right to remain silent under the 5th Amendment',
        'You have the right to refuse consent to searches',
        'You have the right to ask if you are free to leave',
        'You have the right to an attorney during questioning',
        'You have the right to record police in public'
      ],
      trafficStops: {
        required: [
          'Provide driver\'s license, registration, and proof of insurance',
          'Exit vehicle if lawfully ordered',
          'Keep hands visible and follow direct commands',
          'Provide identification if lawfully detained'
        ],
        optional: [
          'Answer questions about your activities or destination',
          'Consent to vehicle searches',
          'Allow searches of personal items',
          'Perform field sobriety tests'
        ]
      },
      searchSeizure: {
        overview: 'Texas follows federal Fourth Amendment protections. Police need probable cause or valid consent for vehicle searches. The state has specific laws regarding consent searches and traffic stops.',
        stateSpecific: [
          'Texas Transportation Code allows stops for traffic violations',
          'Consent to search must be voluntary and can be withdrawn',
          'Open carry is legal with proper licensing',
          'Police must inform you of the right to refuse consent in some situations'
        ]
      }
    },
    emergencyContacts: {
      legalAid: '1-800-504-7030',
      aclu: '713-942-8146'
    }
  },
  'FL': {
    stateName: 'Florida',
    rightsContent: {
      fundamental: [
        'You have the right to remain silent',
        'You have the right to refuse searches without a warrant',
        'You have the right to ask if you are free to leave',
        'You have the right to legal representation',
        'You have the right to record police encounters'
      ],
      trafficStops: {
        required: [
          'Provide driver\'s license, vehicle registration, and insurance proof',
          'Exit vehicle if legally ordered to do so',
          'Keep hands visible and avoid sudden movements',
          'Follow lawful police commands'
        ],
        optional: [
          'Answer questions beyond basic identification',
          'Consent to vehicle or personal searches',
          'Perform field sobriety tests',
          'Allow searches of passengers or their belongings'
        ]
      },
      searchSeizure: {
        overview: 'Florida adheres to Fourth Amendment protections. Police need probable cause, a warrant, or voluntary consent for most searches. Vehicle searches require probable cause or consent.',
        stateSpecific: [
          'Florida\'s "Stand Your Ground" law affects some police interactions',
          'Concealed carry permits are recognized',
          'Police cannot extend traffic stops without reasonable suspicion',
          'Recording police is protected under the First Amendment'
        ]
      }
    },
    emergencyContacts: {
      legalAid: '1-800-405-1417',
      aclu: '786-363-2700'
    }
  }
};