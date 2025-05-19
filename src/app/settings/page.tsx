import { Cog6ToothIcon, UserIcon, BuildingOfficeIcon, BellIcon } from '@heroicons/react/24/outline';

const settings = [
  {
    name: 'Profile',
    description: 'Update your account information and preferences',
    icon: UserIcon,
    href: '#',
  },
  {
    name: 'Clinic Information',
    description: 'Manage your clinic details and operating hours',
    icon: BuildingOfficeIcon,
    href: '#',
  },
  {
    name: 'Notifications',
    description: 'Configure how you receive notifications',
    icon: BellIcon,
    href: '#',
  },
  {
    name: 'AI Settings',
    description: 'Customize AI behavior and preferences',
    icon: Cog6ToothIcon,
    href: '#',
  },
];

export default function SettingsPage() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="space-y-6">
            {settings.map((setting) => (
              <div
                key={setting.name}
                className="bg-white shadow sm:rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <setting.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">{setting.name}</h3>
                      <div className="mt-2 max-w-xl text-sm text-gray-500">
                        <p>{setting.description}</p>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Configure
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Configuration Section */}
          <div className="mt-8">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">AI Model Settings</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Configure the behavior and preferences of the AI assistant.</p>
                </div>
                <div className="mt-5 space-y-4">
                  <div>
                    <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                      AI Model Version
                    </label>
                    <select
                      id="model"
                      name="model"
                      className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>Version 1.0 (Default)</option>
                      <option>Version 2.0 (Beta)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="confidence" className="block text-sm font-medium text-gray-700">
                      Minimum Confidence Threshold
                    </label>
                    <input
                      type="range"
                      id="confidence"
                      name="confidence"
                      min="0"
                      max="100"
                      step="5"
                      defaultValue="75"
                      className="mt-1 block w-full"
                    />
                    <p className="mt-1 text-sm text-gray-500">75% - Only show suggestions with high confidence</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="auto-diagnosis"
                        name="auto-diagnosis"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="auto-diagnosis" className="font-medium text-gray-700">
                        Enable Auto-Diagnosis
                      </label>
                      <p className="text-gray-500">Allow AI to automatically suggest diagnoses based on symptoms</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 