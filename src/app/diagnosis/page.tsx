import { BeakerIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

const symptoms = [
  'Fever',
  'Cough',
  'Headache',
  'Fatigue',
  'Sore throat',
  'Shortness of breath',
  'Muscle aches',
  'Loss of taste or smell',
];

const aiSuggestions = [
  {
    condition: 'Common Cold',
    confidence: 85,
    description: 'Viral infection of the upper respiratory tract',
    treatments: ['Rest', 'Hydration', 'Over-the-counter cold medicine'],
  },
  {
    condition: 'Influenza',
    confidence: 65,
    description: 'Viral infection affecting the respiratory system',
    treatments: ['Antiviral medication', 'Rest', 'Fluids'],
  },
];

export default function DiagnosisPage() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">AI-Assisted Diagnosis</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Symptoms Input */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Patient Symptoms</h3>
              </div>
              <div className="border-t border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700">
                        Select Symptoms
                      </label>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {symptoms.map((symptom) => (
                          <div key={symptom} className="flex items-center">
                            <input
                              id={symptom}
                              name="symptoms"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor={symptom} className="ml-2 block text-sm text-gray-900">
                              {symptom}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                        Additional Notes
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="notes"
                          name="notes"
                          rows={3}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Enter any additional observations or notes..."
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <BeakerIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        Analyze with AI
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">AI Suggestions</h3>
              </div>
              <div className="border-t border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <div className="space-y-6">
                    {aiSuggestions.map((suggestion, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-medium text-gray-900">{suggestion.condition}</h4>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {suggestion.confidence}% confidence
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{suggestion.description}</p>
                        <div className="mt-4">
                          <h5 className="text-sm font-medium text-gray-900">Recommended Treatments:</h5>
                          <ul className="mt-2 list-disc list-inside text-sm text-gray-500">
                            {suggestion.treatments.map((treatment, i) => (
                              <li key={i}>{treatment}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
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