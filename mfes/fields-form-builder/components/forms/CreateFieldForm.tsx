'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import ApiConfiguration from './sections/ApiConfiguration'
import CoreFieldProperties from './sections/CoreFieldProperties'
import OptionsManager from './sections/OptionsManager'
import FieldAttributes from './sections/FieldAttributes'
import FieldValidation from './sections/FieldValidation'
import JsonPreview from './sections/JsonPreview'
import { ApiClient } from '@/lib/api'
import { Key, Save, RotateCcw } from 'lucide-react'

export interface FormData {
  authToken: string
  fieldName: string
  context: string
  fieldType: string
  tenantId: string
  contextType: string
  sourceDetails?: string
  dependsOn?: string
  maxLength?: number
  minLength?: number
  isEditable: boolean
  isRequired: boolean
  isMultiSelect: boolean
  maxSelections?: number
  pattern?: string
  validation?: string
}

export interface Option {
  id: string
  text: string
  order: number
}

export default function CreateFieldForm() {
  const [options, setOptions] = useState<Option[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const form = useForm<FormData>({
    defaultValues: {
      isEditable: true,
      isRequired: false,
      isMultiSelect: false,
    }
  })

  const { handleSubmit, watch, reset } = form
  const watchedValues = watch()
  const showOptionsSection = ['radio', 'drop_down', 'checkbox'].includes(watchedValues.fieldType)

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // Build the payload
      const convertToSnakeCase = (str: string) => {
        return str.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
      }

      const convertToUpperSnakeCase = (str: string) => {
        return str.toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, '')
      }

      const payload: any = {
        name: convertToSnakeCase(data.fieldName),
        label: convertToUpperSnakeCase(data.fieldName),
        context: data.context,
        contextType: data.contextType,
        type: data.fieldType,
        required: data.isRequired,
        tenantId: data.tenantId,
        fieldAttributes: {
          isEditable: data.isEditable,
          isRequired: data.isRequired,
          isMultiSelect: data.isMultiSelect
        }
      }

      // Add options if field type supports them
      if (['radio', 'drop_down', 'checkbox'].includes(data.fieldType) && options.length > 0) {
        payload.fieldParams = {
          options: options.map((option, index) => ({
            name: convertToSnakeCase(option.text),
            label: convertToUpperSnakeCase(option.text),
            value: convertToSnakeCase(option.text),
            order: index.toString()
          }))
        }
      }

      // Add additional field params
      if (data.sourceDetails || data.dependsOn) {
        if (!payload.fieldParams) payload.fieldParams = {}
        if (data.sourceDetails) payload.fieldParams.sourceDetails = data.sourceDetails
        if (data.dependsOn) payload.fieldParams.dependsOn = data.dependsOn
      }

      // Add validation attributes
      if (data.maxSelections && data.isMultiSelect) {
        payload.fieldAttributes.maxSelections = data.maxSelections
      }
      if (data.pattern) payload.fieldAttributes.pattern = data.pattern
      if (data.validation) payload.fieldAttributes.validation = data.validation
      if (data.maxLength) payload.fieldAttributes.maxLength = data.maxLength
      if (data.minLength) payload.fieldAttributes.minLength = data.minLength

      // Call API
      const result = await ApiClient.createField(payload, data.authToken, data.tenantId)
      
      if (result.success) {
        alert('Field created successfully!')
        reset()
        setOptions([])
      } else {
        throw new Error(result.error || 'Failed to create field')
      }
    } catch (error) {
      console.error('Error creating field:', error)
      alert(`Error creating field: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
      reset()
      setOptions([])
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <ApiConfiguration form={form} />
      
      <CoreFieldProperties form={form} />
      
      {showOptionsSection && (
        <OptionsManager 
          form={form}
          options={options}
          setOptions={setOptions}
        />
      )}
      
      <FieldAttributes form={form} />
      
      <FieldValidation form={form} />
      
      <JsonPreview formData={watchedValues} options={options} />
      
      {/* Action Buttons */}
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isSubmitting}
            >
              <RotateCcw className="w-4 h-4" />
              Reset Form
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="sm:min-w-[140px]"
            >
              <Save className="w-4 h-4" />
              Create Field
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}