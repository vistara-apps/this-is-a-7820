import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database table names
export const TABLES = {
  USERS: 'users',
  STATE_GUIDES: 'state_guides',
  INCIDENT_LOGS: 'incident_logs',
  PURCHASES: 'purchases',
  EMERGENCY_CONTACTS: 'emergency_contacts'
}

// Database schemas for reference
export const SCHEMAS = {
  users: {
    id: 'uuid PRIMARY KEY DEFAULT gen_random_uuid()',
    email: 'text',
    state_preference: 'text',
    purchased_states: 'text[]',
    created_at: 'timestamp with time zone DEFAULT now()',
    updated_at: 'timestamp with time zone DEFAULT now()'
  },
  state_guides: {
    id: 'uuid PRIMARY KEY DEFAULT gen_random_uuid()',
    state_id: 'text UNIQUE NOT NULL',
    state_name: 'text NOT NULL',
    rights_content: 'jsonb NOT NULL',
    script_content: 'jsonb NOT NULL',
    languages: 'text[] DEFAULT ARRAY[\'en\']',
    emergency_contacts: 'jsonb',
    created_at: 'timestamp with time zone DEFAULT now()',
    updated_at: 'timestamp with time zone DEFAULT now()'
  },
  incident_logs: {
    id: 'uuid PRIMARY KEY DEFAULT gen_random_uuid()',
    user_id: 'uuid REFERENCES users(id) ON DELETE CASCADE',
    state: 'text NOT NULL',
    timestamp: 'timestamp with time zone NOT NULL',
    notes: 'text',
    location: 'jsonb',
    shared_content_url: 'text',
    metadata: 'jsonb',
    created_at: 'timestamp with time zone DEFAULT now()',
    updated_at: 'timestamp with time zone DEFAULT now()'
  },
  purchases: {
    id: 'uuid PRIMARY KEY DEFAULT gen_random_uuid()',
    user_id: 'uuid REFERENCES users(id) ON DELETE CASCADE',
    state_id: 'text NOT NULL',
    purchase_type: 'text NOT NULL', // 'state' or 'subscription'
    amount: 'decimal(10,2) NOT NULL',
    payment_method: 'text',
    transaction_id: 'text',
    status: 'text DEFAULT \'completed\'',
    created_at: 'timestamp with time zone DEFAULT now()'
  },
  emergency_contacts: {
    id: 'uuid PRIMARY KEY DEFAULT gen_random_uuid()',
    user_id: 'uuid REFERENCES users(id) ON DELETE CASCADE',
    name: 'text NOT NULL',
    phone: 'text NOT NULL',
    relationship: 'text',
    is_primary: 'boolean DEFAULT false',
    created_at: 'timestamp with time zone DEFAULT now()',
    updated_at: 'timestamp with time zone DEFAULT now()'
  }
}
