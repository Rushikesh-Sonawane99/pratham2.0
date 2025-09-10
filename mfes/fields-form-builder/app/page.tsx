'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Navigation from '@/components/layout/Navigation'
import CreateFieldForm from '@/components/forms/CreateFieldForm'
import { Plus, Edit, Building } from 'lucide-react'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('create')

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-4">
            Dynamic Form Field Creator
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
            Create and configure database fields with advanced options for educational systems
          </p>
          
          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <NavigationCard
              icon={<Plus className="w-8 h-8" />}
              title="Create New Field"
              description="Build custom form fields with validation"
              active={activeTab === 'create'}
              onClick={() => setActiveTab('create')}
              gradient="from-primary-500 to-primary-600"
            />
            <NavigationCard
              icon={<Edit className="w-8 h-8" />}
              title="Edit Existing Field"
              description="Modify and update database fields"
              active={activeTab === 'edit'}
              onClick={() => setActiveTab('edit')}
              gradient="from-secondary-500 to-secondary-600"
            />
            <NavigationCard
              icon={<Building className="w-8 h-8" />}
              title="Manage Tenants"
              description="Configure tenant organizations"
              active={activeTab === 'tenant'}
              onClick={() => setActiveTab('tenant')}
              gradient="from-neutral-500 to-neutral-600"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="card max-w-5xl mx-auto">
          {activeTab === 'create' && <CreateFieldForm />}
          {activeTab === 'edit' && <EditFieldPlaceholder />}
          {activeTab === 'tenant' && <TenantManagementPlaceholder />}
        </div>
      </main>
    </div>
  )
}

interface NavigationCardProps {
  icon: React.ReactNode
  title: string
  description: string
  active: boolean
  onClick: () => void
  gradient: string
}

function NavigationCard({ icon, title, description, active, onClick, gradient }: NavigationCardProps) {
  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 ${
        active 
          ? `bg-gradient-to-r ${gradient} text-white shadow-lg` 
          : 'bg-white text-neutral-700 hover:bg-neutral-50 shadow-card hover:shadow-card-hover'
      }`}
    >
      <div className={`mb-4 ${active ? 'text-white' : 'text-primary-500'}`}>
        {icon}
      </div>
      <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
      <p className={`text-sm ${active ? 'text-white/90' : 'text-neutral-600'}`}>
        {description}
      </p>
    </button>
  )
}

function EditFieldPlaceholder() {
  return (
    <div className="text-center py-12">
      <Edit className="w-16 h-16 text-secondary-500 mx-auto mb-4" />
      <h2 className="text-2xl font-display font-semibold text-neutral-800 mb-2">
        Edit Field Component
      </h2>
      <p className="text-neutral-600">
        This component will allow editing existing form fields
      </p>
    </div>
  )
}

function TenantManagementPlaceholder() {
  return (
    <div className="text-center py-12">
      <Building className="w-16 h-16 text-neutral-500 mx-auto mb-4" />
      <h2 className="text-2xl font-display font-semibold text-neutral-800 mb-2">
        Tenant Management
      </h2>
      <p className="text-neutral-600">
        This component will manage tenant organizations
      </p>
    </div>
  )
}