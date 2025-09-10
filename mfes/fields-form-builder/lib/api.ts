import { API_ENDPOINTS, DEFAULT_TENANT_ID } from './config'

// API utility functions
export class ApiClient {
  private static getHeaders(authToken?: string, tenantId?: string) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'accept': '*/*',
    }

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`
    }

    if (tenantId) {
      headers['tenantId'] = tenantId
    }

    return headers
  }

  // Fetch tenants
  static async getTenants(authToken?: string) {
    try {
      const response = await fetch(API_ENDPOINTS.TENANTS, {
        method: 'GET',
        headers: this.getHeaders(authToken)
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return { success: true, data: data.result || [] }
    } catch (error) {
      console.error('Error fetching tenants:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        data: this.getDemoTenants() // Fallback to demo data
      }
    }
  }

  // Create field
  static async createField(payload: any, authToken: string, tenantId?: string) {
    try {
      const response = await fetch(API_ENDPOINTS.FIELDS, {
        method: 'POST',
        headers: this.getHeaders(authToken, tenantId || DEFAULT_TENANT_ID),
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch {
          // Use status text if response is not JSON
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      console.error('Error creating field:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  // Get field by ID
  static async getField(fieldId: string, authToken: string) {
    try {
      const response = await fetch(`${API_ENDPOINTS.FIELDS}/${fieldId}`, {
        method: 'GET',
        headers: this.getHeaders(authToken)
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      console.error('Error fetching field:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  // Update field
  static async updateField(fieldId: string, payload: any, authToken: string, tenantId?: string) {
    try {
      const response = await fetch(API_ENDPOINTS.FIELDS_UPDATE(fieldId), {
        method: 'PATCH',
        headers: this.getHeaders(authToken, tenantId || DEFAULT_TENANT_ID),
        body: JSON.stringify({ fieldParams: payload })
      })

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch {
          // Use status text if response is not JSON
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      console.error('Error updating field:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  // Demo tenant data for when API is not available
  private static getDemoTenants() {
    return [
      {
        tenantId: "ef99949b-7f3a-4a5f-806a-e67e683e38f3",
        tenantName: "SCP Program",
        description: "Second Chance Program"
      },
      {
        tenantId: "demo-tenant-1",
        tenantName: "Demo Tenant 1",
        description: "Demo organization 1"
      },
      {
        tenantId: "demo-tenant-2", 
        tenantName: "Demo Tenant 2",
        description: "Demo organization 2"
      }
    ]
  }
}