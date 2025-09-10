'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Code } from 'lucide-react'
import { FormData, Option } from '../CreateFieldForm'

interface JsonPreviewProps {
  formData: FormData
  options: Option[]
}

export default function JsonPreview({ formData, options }: JsonPreviewProps) {
  // Convert field name to snake_case and UPPER_SNAKE_CASE
  const convertToSnakeCase = (str: string) => {
    if (!str) return ''
    return str.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
  }

  const convertToUpperSnakeCase = (str: string) => {
    if (!str) return ''
    return str.toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, '')
  }

  // Build the JSON payload
  const buildJsonPayload = () => {
    const payload: any = {
      name: convertToSnakeCase(formData.fieldName || ''),
      label: convertToUpperSnakeCase(formData.fieldName || ''),
      context: formData.context || '',
      contextType: formData.contextType || '',
      type: formData.fieldType || '',
      required: formData.isRequired || false,
      tenantId: formData.tenantId || '',
      fieldAttributes: {
        isEditable: formData.isEditable !== false,
        isRequired: formData.isRequired || false,
        isMultiSelect: formData.isMultiSelect || false
      }
    }

    // Add options if field type supports them
    if (['radio', 'drop_down', 'checkbox'].includes(formData.fieldType) && options.length > 0) {
      payload.fieldParams = {
        options: options.map((option, index) => ({
          name: convertToSnakeCase(option.text),
          label: convertToUpperSnakeCase(option.text),
          value: convertToSnakeCase(option.text),
          order: index.toString()
        }))
      }
    }

    // Add source details and dependencies if provided
    if (formData.sourceDetails || formData.dependsOn) {
      if (!payload.fieldParams) payload.fieldParams = {}
      if (formData.sourceDetails) payload.fieldParams.sourceDetails = formData.sourceDetails
      if (formData.dependsOn) payload.fieldParams.dependsOn = formData.dependsOn
    }

    // Add validation attributes
    if (formData.maxSelections && formData.isMultiSelect) {
      payload.fieldAttributes.maxSelections = formData.maxSelections
    }

    if (formData.pattern) {
      payload.fieldAttributes.pattern = formData.pattern
    }

    if (formData.validation) {
      payload.fieldAttributes.validation = formData.validation
    }

    if (formData.maxLength) {
      payload.fieldAttributes.maxLength = formData.maxLength
    }

    if (formData.minLength) {
      payload.fieldAttributes.minLength = formData.minLength
    }

    return payload
  }

  const jsonPayload = buildJsonPayload()

  return (
    <Card>
      <CardHeader>
        <CardTitle icon={<Code className="w-5 h-5" />}>
          JSON Preview
        </CardTitle>
        <p className="text-neutral-600 text-sm mt-2">
          Real-time preview of the API payload that will be sent
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="bg-neutral-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-neutral-100">
            <code>{JSON.stringify(jsonPayload, null, 2)}</code>
          </pre>
        </div>
        
        {!formData.fieldName && (
          <div className="mt-3 text-sm text-neutral-500 text-center">
            Start filling the form to see the JSON preview
          </div>
        )}
      </CardContent>
    </Card>
  )
}