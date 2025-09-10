import { Plus, Edit, Building } from 'lucide-react'

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    {
      id: 'create',
      label: 'Create Field',
      icon: <Plus className="w-5 h-5" />,
      description: 'Build new form fields'
    },
    {
      id: 'edit',
      label: 'Edit Field',
      icon: <Edit className="w-5 h-5" />,
      description: 'Modify existing fields'
    },
    {
      id: 'tenant',
      label: 'Manage Tenants',
      icon: <Building className="w-5 h-5" />,
      description: 'Configure organizations'
    }
  ]

  return (
    <nav className="bg-white border-b border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-3 py-4 px-2 border-b-2 transition-colors duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-600 hover:text-neutral-800 hover:border-neutral-300'
              }`}
            >
              {tab.icon}
              <div className="text-left">
                <div className="font-medium text-sm">{tab.label}</div>
                <div className="text-xs text-neutral-500">{tab.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}