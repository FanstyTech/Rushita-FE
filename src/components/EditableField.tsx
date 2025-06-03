'use client';

interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  multiline?: boolean;
  className?: string;
}

export default function EditableField({
  value,
  onChange,
  label,
  multiline,
  className,
}: EditableFieldProps) {
  if (multiline) {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm text-gray-600">{label}</label>
        )}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`text-gray-400 w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
          rows={4}
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm text-gray-600">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`text-gray-400 w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      />
    </div>
  );
}
