// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/user/v1',
  ENDPOINTS: {
    FIELDS: '/fields',
    FIELDS_UPDATE: '/fields/update',
    TENANTS: '/tenant/read',
  }
}

// Build full API URLs
export const API_ENDPOINTS = {
  FIELDS: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.FIELDS}`,
  FIELDS_UPDATE: (fieldId: string) => `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.FIELDS_UPDATE}/${fieldId}`,
  TENANTS: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TENANTS}`,
}

// Default tenant ID
export const DEFAULT_TENANT_ID = 'ef99949b-7f3a-4a5f-806a-e67e683e38f3'