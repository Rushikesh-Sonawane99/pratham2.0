'use client'

import { UseFormReturn } from 'react-hook-form'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { Sliders } from 'lucide-react'
import { FormData } from '../CreateFieldForm'

interface FieldAttributesProps {
  form: UseFormReturn<FormData>
}

export default function FieldAttributes({ form }: FieldAttributesProps) {
  const { register, watch, formState: { errors } } = form
  const isMultiSelect = watch('isMultiSelect')
  const fieldType = watch('fieldType')
  const showPatternField = fieldType === 'text' || fieldType === 'numeric'

  return (
    <Card>
      <CardHeader>
        <CardTitle icon={<Sliders className="w-5 h-5" />}>
          Field Attributes
        </CardTitle>
        <p className="text-neutral-600 text-sm mt-2">
          Configure field behavior and validation attributes
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Checkbox Attributes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                {...register('isEditable')}
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
              />
              <span className="text-sm font-medium text-neutral-700">
                Is Editable
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                {...register('isRequired')}
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
              />
              <span className="text-sm font-medium text-neutral-700">
                Is Required
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                {...register('isMultiSelect')}
                className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
              />
              <span className="text-sm font-medium text-neutral-700">
                Is Multi Select
              </span>
            </label>
          </div>

          {/* Conditional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isMultiSelect && (
              <Input
                {...register('maxSelections', {
                  valueAsNumber: true,
                  min: { value: 1, message: 'Must be at least 1' }
                })}
                type="number"
                label="Max Selections"
                placeholder="e.g., 3"
                min={1}
                error={errors.maxSelections?.message}
                helpText="Maximum number of selections allowed"
              />
            )}

            {showPatternField && (
              <Input
                {...register('pattern')}
                label="Pattern (Regex)"
                placeholder="e.g., ^[0-9]+$"
                helpText="Validation pattern for input"
              />
            )}
          </div>

          {/* Validation Rules */}
          {(fieldType === 'text' || fieldType === 'numeric') && (
            <div>
              <label className="form-label">Validation Rules</label>
              <textarea
                {...register('validation')}
                rows={3}
                className="form-input"
                placeholder="Enter additional validation rules"
              />
              <p className="form-help">
                Additional validation rules for the field
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}