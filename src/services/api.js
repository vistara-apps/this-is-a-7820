import { supabase, TABLES } from '../lib/supabase'

// Error handling utility
const handleApiError = (error, operation) => {
  console.error(`API Error in ${operation}:`, error)
  throw new Error(`Failed to ${operation}: ${error.message}`)
}

// User API
export const userApi = {
  // Get current user profile
  async getProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      const { data, error } = await supabase
        .from(TABLES.USERS)
        .select('*')
        .eq('id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') { // Not found is OK
        throw error
      }

      return data
    } catch (error) {
      handleApiError(error, 'get user profile')
    }
  },

  // Create or update user profile
  async upsertProfile(profileData) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from(TABLES.USERS)
        .upsert({
          id: user.id,
          email: user.email,
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      handleApiError(error, 'update user profile')
    }
  },

  // Add purchased state
  async addPurchasedState(stateId) {
    try {
      const profile = await this.getProfile()
      const purchasedStates = profile?.purchased_states || []
      
      if (!purchasedStates.includes(stateId)) {
        purchasedStates.push(stateId)
        return await this.upsertProfile({ purchased_states: purchasedStates })
      }
      
      return profile
    } catch (error) {
      handleApiError(error, 'add purchased state')
    }
  }
}

// State Guides API
export const stateGuidesApi = {
  // Get all state guides
  async getAll() {
    try {
      const { data, error } = await supabase
        .from(TABLES.STATE_GUIDES)
        .select('*')
        .order('state_name')

      if (error) throw error
      return data || []
    } catch (error) {
      handleApiError(error, 'fetch state guides')
    }
  },

  // Get specific state guide
  async getByStateId(stateId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.STATE_GUIDES)
        .select('*')
        .eq('state_id', stateId)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      return data
    } catch (error) {
      handleApiError(error, `fetch state guide for ${stateId}`)
    }
  },

  // Create or update state guide (admin function)
  async upsert(stateGuide) {
    try {
      const { data, error } = await supabase
        .from(TABLES.STATE_GUIDES)
        .upsert({
          ...stateGuide,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      handleApiError(error, 'upsert state guide')
    }
  }
}

// Incident Logs API
export const incidentLogsApi = {
  // Get user's incident logs
  async getUserIncidents() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return []

      const { data, error } = await supabase
        .from(TABLES.INCIDENT_LOGS)
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      handleApiError(error, 'fetch user incidents')
    }
  },

  // Create new incident log
  async create(incidentData) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from(TABLES.INCIDENT_LOGS)
        .insert({
          user_id: user.id,
          ...incidentData
        })
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      handleApiError(error, 'create incident log')
    }
  },

  // Update incident log
  async update(id, updates) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from(TABLES.INCIDENT_LOGS)
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('user_id', user.id) // Ensure user can only update their own logs
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      handleApiError(error, 'update incident log')
    }
  },

  // Delete incident log
  async delete(id) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from(TABLES.INCIDENT_LOGS)
        .delete()
        .eq('id', id)
        .eq('user_id', user.id) // Ensure user can only delete their own logs

      if (error) throw error
      return true
    } catch (error) {
      handleApiError(error, 'delete incident log')
    }
  }
}

// Emergency Contacts API
export const emergencyContactsApi = {
  // Get user's emergency contacts
  async getUserContacts() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return []

      const { data, error } = await supabase
        .from(TABLES.EMERGENCY_CONTACTS)
        .select('*')
        .eq('user_id', user.id)
        .order('is_primary', { ascending: false })
        .order('name')

      if (error) throw error
      return data || []
    } catch (error) {
      handleApiError(error, 'fetch emergency contacts')
    }
  },

  // Create emergency contact
  async create(contactData) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from(TABLES.EMERGENCY_CONTACTS)
        .insert({
          user_id: user.id,
          ...contactData
        })
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      handleApiError(error, 'create emergency contact')
    }
  },

  // Update emergency contact
  async update(id, updates) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from(TABLES.EMERGENCY_CONTACTS)
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      handleApiError(error, 'update emergency contact')
    }
  },

  // Delete emergency contact
  async delete(id) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from(TABLES.EMERGENCY_CONTACTS)
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) throw error
      return true
    } catch (error) {
      handleApiError(error, 'delete emergency contact')
    }
  }
}

// Purchases API
export const purchasesApi = {
  // Record a purchase
  async recordPurchase(purchaseData) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from(TABLES.PURCHASES)
        .insert({
          user_id: user.id,
          ...purchaseData
        })
        .select()
        .single()

      if (error) throw error

      // Also update user's purchased states
      if (purchaseData.state_id) {
        await userApi.addPurchasedState(purchaseData.state_id)
      }

      return data
    } catch (error) {
      handleApiError(error, 'record purchase')
    }
  },

  // Get user's purchase history
  async getUserPurchases() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return []

      const { data, error } = await supabase
        .from(TABLES.PURCHASES)
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      handleApiError(error, 'fetch user purchases')
    }
  }
}
