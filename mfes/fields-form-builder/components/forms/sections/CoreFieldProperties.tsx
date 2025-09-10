'use client'

import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { ApiClient } from '@/lib/api'
import { Settings } from 'lucide-react'
import { FormData } from '../CreateFieldForm'

interface CoreFieldPropertiesProps {
  form: UseFormReturn<FormData>
}

export default function CoreFieldProperties({ form }: CoreFieldPropertiesProps) {
  const { register, formState: { errors }, watch } = form
  const fieldName = watch('fieldName')
  const authToken = watch('authToken')
  const [tenants, setTenants] = useState([
    { value: 'ef99949b-7f3a-4a5f-806a-e67e683e38f3', label: 'SCP Program' },
    { value: 'demo-tenant-1', label: 'Demo Tenant 1' },
    { value: 'demo-tenant-2', label: 'Demo Tenant 2' }
  ])
  const [loadingTenants, setLoadingTenants] = useState(false)

  // Load tenants from API
  useEffect(() => {
    const loadTenants = async () => {
      if (!authToken) return
      
      setLoadingTenants(true)
      try {
        const result = await ApiClient.getTenants(authToken)
        if (result.success && result.data) {
          const tenantOptions = result.data.map((tenant: any) => ({
            value: tenant.tenantId,
            label: tenant.tenantName || tenant.name || tenant.tenantId
          }))
          setTenants(tenantOptions)
        }
      } catch (error) {
        console.error('Error loading tenants:', error)
      } finally {
        setLoadingTenants(false)
      }
    }

    loadTenants()
  }, [authToken])

  // Convert field name to snake_case for name and UPPER_SNAKE_CASE for label
  const convertToSnakeCase = (str: string) => {
    return str.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
  }

  const convertToUpperSnakeCase = (str: string) => {
    return str.toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, '')
  }

  const contextOptions = [
    { value: 'USERS', label: 'USERS' },
    { value: 'COHORT', label: 'COHORT' }
  ]

  const fieldTypeOptions = [
    { value: 'text', label: 'Text' },
    { value: 'radio', label: 'Radio' },
    { value: 'drop_down', label: 'Dropdown' },
    { value: 'numeric', label: 'Numeric' },
    { value: 'checkbox', label: 'Checkbox' }
  ]

  const contextTypeOptions = [
    { value: 'COHORT', label: 'COHORT' },
    { value: 'BATCH', label: 'BATCH' },
    { value: 'LEARNER', label: 'LEARNER' },
    { value: 'VOLUNTEER', label: 'VOLUNTEER' },
    { value: 'INSTRUCTOR', label: 'INSTRUCTOR' },
    { value: 'LEAD', label: 'LEAD' },
    { value: 'CONTENT_CREATOR', label: 'CONTENT_CREATOR' },
    { value: 'CONTENT_REVIEWER', label: 'CONTENT_REVIEWER' },
    { value: 'CENTRAL_LEAD', label: 'CENTRAL_LEAD' },
    { value: 'SUPER_ADMIN', label: 'SUPER_ADMIN' },
    { value: 'STATE_LEAD', label: 'STATE_LEAD' }
  ]


  return (
    <Card>
      <CardHeader>
        <CardTitle icon={<Settings className="w-5 h-5" />}>
          Core Field Properties
        </CardTitle>
        <p className="text-neutral-600 text-sm mt-2">
          Define the basic properties of your form field
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Field Name */}
          <div>
            <Input
              {...register('fieldName', { 
                required: 'Field name is required' 
              })}
              label="Field Name"
              placeholder="e.g., Preferred Mode of Learning"
              error={errors.fieldName?.message}
              required
            />
            
            {fieldName && (
              <div className="mt-3 p-3 bg-primary-50 border border-primary-200 rounded-lg">
                <div className="text-primary-700 font-medium text-sm mb-2">
                  Auto-generated fields:
                </div>
                <div className="space-y-1 text-sm">
                  <div>
                    <strong>name:</strong>{' '}
                    <code className="bg-primary-100 text-primary-800 px-2 py-1 rounded">
                      {convertToSnakeCase(fieldName)}
                    </code>
                  </div>
                  <div>
                    <strong>label:</strong>{' '}
                    <code className="bg-primary-100 text-primary-800 px-2 py-1 rounded">
                      {convertToUpperSnakeCase(fieldName)}
                    </code>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Context and Field Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              {...register('context', { 
                required: 'Context is required' 
              })}
              label="Context"
              options={contextOptions}
              placeholder="Select Context"
              error={errors.context?.message}
              required
            />

            <Select
              {...register('fieldType', { 
                required: 'Field type is required' 
              })}
              label="Field Type"
              options={fieldTypeOptions}
              placeholder="Select Type"
              error={errors.fieldType?.message}
              required
            />
          </div>

          {/* Tenant and Context Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              {...register('tenantId', { 
                required: 'Tenant is required' 
              })}
              label="Tenant"
              options={tenants}
              placeholder={loadingTenants ? "Loading tenants..." : "Select Tenant"}
              error={errors.tenantId?.message}
              required
            />

            <Select
              {...register('contextType', { 
                required: 'Context type is required' 
              })}
              label="Context Type"
              options={contextTypeOptions}
              placeholder="Select Context Type"
              error={errors.contextType?.message}
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}