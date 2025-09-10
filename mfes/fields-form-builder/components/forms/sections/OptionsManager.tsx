'use client'

import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { List, Plus, Trash2, Settings } from 'lucide-react'
import { FormData, Option } from '../CreateFieldForm'

interface OptionsManagerProps {
  form: UseFormReturn<FormData>
  options: Option[]
  setOptions: (options: Option[]) => void
}

export default function OptionsManager({ form, options, setOptions }: OptionsManagerProps) {
  const [optionText, setOptionText] = useState('')
  const { register, formState: { errors } } = form

  const addOption = () => {
    if (optionText.trim()) {
      const newOption: Option = {
        id: `option-${Date.now()}`,
        text: optionText.trim(),
        order: options.length
      }
      setOptions([...options, newOption])
      setOptionText('')
    }
  }

  const removeOption = (id: string) => {
    setOptions(options.filter(option => option.id !== id))
  }

  const moveOption = (id: string, direction: 'up' | 'down') => {
    const currentIndex = options.findIndex(option => option.id === id)
    if (currentIndex === -1) return

    const newOptions = [...options]
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

    if (targetIndex >= 0 && targetIndex < options.length) {
      [newOptions[currentIndex], newOptions[targetIndex]] = [newOptions[targetIndex], newOptions[currentIndex]]
      // Update order values
      newOptions.forEach((option, index) => {
        option.order = index
      })
      setOptions(newOptions)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addOption()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle icon={<List className="w-5 h-5" />}>
          Options Manager
        </CardTitle>
        <p className="text-neutral-600 text-sm mt-2">
          Add and configure options for radio buttons, dropdowns, and checkboxes
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Add Option */}
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                value={optionText}
                onChange={(e) => setOptionText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter option text"
                label="Option Text"
              />
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                onClick={addOption}
                disabled={!optionText.trim()}
                className="h-10"
              >
                <Plus className="w-4 h-4" />
                Add Option
              </Button>
            </div>
          </div>

          {/* Options List */}
          {options.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-neutral-800">Current Options:</h3>
              <div className="space-y-2">
                {options.map((option, index) => (
                  <div
                    key={option.id}
                    className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200"
                  >
                    <div className="flex-1">
                      <span className="text-sm font-medium text-neutral-800">
                        {option.text}
                      </span>
                      <span className="text-xs text-neutral-500 ml-2">
                        Order: {option.order + 1}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => moveOption(option.id, 'up')}
                        disabled={index === 0}
                        className="h-8 w-8 p-0"
                      >
                        ↑
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => moveOption(option.id, 'down')}
                        disabled={index === options.length - 1}
                        className="h-8 w-8 p-0"
                      >
                        ↓
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeOption(option.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Options Configuration */}
          <div className="border-t border-neutral-200 pt-6">
            <h3 className="flex items-center gap-2 text-primary-700 font-medium text-lg mb-4">
              <Settings className="w-5 h-5" />
              Options Configuration
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                {...register('sourceDetails')}
                label="Source Details"
                placeholder="Enter source details for options"
                helpText="Specify the source of option values (API endpoint, file, etc.)"
              />

              <Input
                {...register('dependsOn')}
                label="Depends On"
                placeholder="Enter field dependencies"
                helpText="Specify fields that affect the options shown (e.g., state affects district options)"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}