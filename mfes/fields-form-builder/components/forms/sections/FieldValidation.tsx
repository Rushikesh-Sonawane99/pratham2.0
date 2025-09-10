'use client'

import { UseFormReturn } from 'react-hook-form'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { Shield } from 'lucide-react'
import { FormData } from '../CreateFieldForm'

interface FieldValidationProps {
  form: UseFormReturn<FormData>
}

export default function FieldValidation({ form }: FieldValidationProps) {
  const { register, formState: { errors }, watch } = form
  const fieldType = watch('fieldType')
  
  // Only show length validation for text and numeric fields
  const showLengthValidation = fieldType === 'text' || fieldType === 'numeric'

  if (!showLengthValidation) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle icon={<Shield className="w-5 h-5" />}>
          Field Validation
        </CardTitle>
        <p className="text-neutral-600 text-sm mt-2">
          Set validation constraints for text and numeric fields
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            {...register('maxLength', {
              valueAsNumber: true,
              min: { value: 1, message: 'Must be at least 1' }
            })}
            type="number"
            label="Max Length"
            placeholder="e.g., 255"
            min={1}
            error={errors.maxLength?.message}
            helpText="Maximum character length"
          />

          <Input
            {...register('minLength', {
              valueAsNumber: true,
              min: { value: 0, message: 'Must be at least 0' }
            })}
            type="number"
            label="Min Length"
            placeholder="e.g., 3"
            min={0}
            error={errors.minLength?.message}
            helpText="Minimum character length"
          />
        </div>
      </CardContent>
    </Card>
  )
}