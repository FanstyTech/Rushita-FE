import React from 'react';

interface DentalProcedure {
  teeth: number[];
  type: string;
  notes?: string;
}

interface DentalChartProps {
  selectedTeeth: number[];
  onTeethSelect: (teeth: number[]) => void;
  procedures: DentalProcedure[];
  onProcedureAdd: (procedure: DentalProcedure) => Promise<void>;
  onProcedureRemove: (index: number) => void;
}

type ProcedureType = 'filling' | 'extraction' | 'root-canal' | 'cleaning' | 'crown' | 'bridge' | 'implant';

const procedureColors = {
  'filling': 'bg-amber-200',
  'extraction': 'bg-red-200',
  'root-canal': 'bg-purple-200',
  'cleaning': 'bg-green-200',
  'crown': 'bg-blue-200',
  'bridge': 'bg-indigo-200',
  'implant': 'bg-pink-200',
};

interface ToothButtonProps {
  number: number;
  selected: boolean;
  onClick: () => void;
  procedure?: ProcedureType | null;
  quadrant: 'upper-right' | 'upper-left' | 'lower-right' | 'lower-left';
}

const ToothButton = ({ number, selected, onClick, procedure, quadrant }: ToothButtonProps) => {
  const getToothShape = () => {
    switch (quadrant) {
      case 'upper-right':
        return 'rounded-t-lg rounded-bl-lg';
      case 'upper-left':
        return 'rounded-t-lg rounded-br-lg';
      case 'lower-right':
        return 'rounded-b-lg rounded-tl-lg';
      case 'lower-left':
        return 'rounded-b-lg rounded-tr-lg';
    }
  };

  return (
    <div className="relative aspect-square">
      <button
        type="button"
        onClick={onClick}
        className={`w-full h-full flex flex-col items-center justify-center border ${
          selected 
            ? 'border-blue-500 bg-blue-50' 
            : procedure && procedure in procedureColors
              ? `border-gray-300 ${procedureColors[procedure as ProcedureType]}`
              : 'border-gray-300 bg-white'
        } ${getToothShape()} hover:bg-blue-50 transition-colors`}
      >
        <span className="text-xs font-medium text-gray-900">{number}</span>
      </button>
      {procedure && (
        <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-500" />
      )}
    </div>
  );
};

export function DentalChart({ selectedTeeth, onTeethSelect, procedures, onProcedureAdd, onProcedureRemove }: DentalChartProps) {
  const [dentalProcedure, setDentalProcedure] = React.useState<{ type: ProcedureType | ''; notes?: string }>({ type: '', notes: '' });

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-sm font-medium text-gray-900 mb-6">Dental Chart</h3>
        
        {/* Upper Teeth */}
        <div className="grid grid-cols-16 gap-1 mb-8">
          {/* Upper Right */}
          {[18,17,16,15,14,13,12,11].map((tooth) => (
            <ToothButton
              key={tooth}
              number={tooth}
              selected={selectedTeeth.includes(tooth)}
              onClick={() => {
                const newSelectedTeeth = selectedTeeth.includes(tooth)
                  ? selectedTeeth.filter(t => t !== tooth)
                  : [...selectedTeeth, tooth];
                onTeethSelect(newSelectedTeeth);
              }}
              procedure={procedures.find(p => p.teeth.includes(tooth))?.type as ProcedureType | null}
              quadrant="upper-right"
            />
          ))}
          {/* Upper Left */}
          {[21,22,23,24,25,26,27,28].map((tooth) => (
            <ToothButton
              key={tooth}
              number={tooth}
              selected={selectedTeeth.includes(tooth)}
              onClick={() => {
                const newSelectedTeeth = selectedTeeth.includes(tooth)
                  ? selectedTeeth.filter(t => t !== tooth)
                  : [...selectedTeeth, tooth];
                onTeethSelect(newSelectedTeeth);
              }}
              procedure={procedures.find(p => p.teeth.includes(tooth))?.type as ProcedureType | null}
              quadrant="upper-left"
            />
          ))}
        </div>


        {/* Lower Teeth */}
        <div className="grid grid-cols-16 gap-1">
          {/* Lower Right */}
          {[48,47,46,45,44,43,42,41].map((tooth) => (
            <ToothButton
              key={tooth}
              number={tooth}
              selected={selectedTeeth.includes(tooth)}
              onClick={() => {
                const newSelectedTeeth = selectedTeeth.includes(tooth)
                  ? selectedTeeth.filter(t => t !== tooth)
                  : [...selectedTeeth, tooth];
                onTeethSelect(newSelectedTeeth);
              }}
              procedure={procedures.find(p => p.teeth.includes(tooth))?.type as ProcedureType | null}
              quadrant="lower-right"
            />
          ))}
          {/* Lower Left */}
          {[31,32,33,34,35,36,37,38].map((tooth) => (
            <ToothButton
              key={tooth}
              number={tooth}
              selected={selectedTeeth.includes(tooth)}
              onClick={() => {
                const newSelectedTeeth = selectedTeeth.includes(tooth)
                  ? selectedTeeth.filter(t => t !== tooth)
                  : [...selectedTeeth, tooth];
                onTeethSelect(newSelectedTeeth);
              }}
              procedure={procedures.find(p => p.teeth.includes(tooth))?.type as ProcedureType | null}
              quadrant="lower-left"
            />
          ))}
        </div>

        
        {/* Procedure Color Legend */}
        <div className="grid grid-cols-4 gap-2 mt-8">
          {Object.entries(procedureColors).map(([procedure, color]) => (
            <div key={procedure} className="flex items-center space-x-2">
              <div className={`w-3 h-3 ${color} rounded`} />
              <span className="text-xs text-gray-600 capitalize">
                {procedure.replace('-', ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Procedure Selection */}
      {selectedTeeth.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Selected Teeth: {selectedTeeth.sort((a,b) => a-b).join(', ')}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Procedure Type
              </label>
              <select
                value={dentalProcedure.type}
                onChange={(e) => setDentalProcedure(prev => ({ 
                  ...prev, 
                  type: e.target.value as ProcedureType | '' 
                }))}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Procedure</option>
                <option value="filling">Filling</option>
                <option value="extraction">Extraction</option>
                <option value="root-canal">Root Canal</option>
                <option value="cleaning">Cleaning</option>
                <option value="crown">Crown</option>
                <option value="bridge">Bridge</option>
                <option value="implant">Implant</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={dentalProcedure.notes}
                onChange={(e) => setDentalProcedure(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Add any specific notes about the procedure..."
              />
            </div>

            <button
              type="button"
              onClick={async () => {
                if (!selectedTeeth.length || !dentalProcedure.type) return;
                
                onProcedureAdd({
                  teeth: selectedTeeth,
                  type: dentalProcedure.type,
                  notes: dentalProcedure.notes
                });
                
                // Only clear the procedure form
                setDentalProcedure({ type: '', notes: '' });
              }}
              disabled={!selectedTeeth.length || !dentalProcedure.type}
              className={`w-full px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                !selectedTeeth.length || !dentalProcedure.type
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Add Procedure
            </button>
          </div>
        </div>
      )}

      {/* List of Added Procedures */}
      {procedures.map((procedure, index) => (
        <div key={index} className="flex justify-between items-start p-3 bg-gray-50 rounded-md">
          <div>
            <p className="text-sm font-medium text-gray-900">
              {procedure.type.charAt(0).toUpperCase() + procedure.type.slice(1)}
            </p>
            <p className="text-xs text-gray-500">
              Teeth: {procedure.teeth.sort((a,b) => a-b).join(', ')}
            </p>
            {procedure.notes && (
              <p className="text-xs text-gray-500 mt-1">{procedure.notes}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => onProcedureRemove(index)}
            className="p-1 text-red-600 hover:bg-gray-100 rounded"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m4-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
