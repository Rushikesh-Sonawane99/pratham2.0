'use client'

import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Key, Eye, EyeOff } from 'lucide-react'
import { FormData } from '../CreateFieldForm'

interface ApiConfigurationProps {
  form: UseFormReturn<FormData>
}

export default function ApiConfiguration({ form }: ApiConfigurationProps) {
  const [showToken, setShowToken] = useState(false)
  const { register, formState: { errors } } = form

  return (
    <Card>
      <CardHeader>
        <CardTitle icon={<Key className="w-5 h-5" />}>
          API Configuration
        </CardTitle>
        <p className="text-neutral-600 text-sm mt-2">
          Configure your API authentication settings
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="relative">
          <Input
            {...register('authToken', { 
              required: 'Authorization token is required' 
            })}
            label="Authorization Token"
            type={showToken ? 'text' : 'password'}
            placeholder="Enter your Bearer token"
            error={errors.authToken?.message}
            helpText="This token will be used for API authentication (Bearer token)"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowToken(!showToken)}
            className="absolute right-2 top-8 h-8 w-8 p-0"
          >
            {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}