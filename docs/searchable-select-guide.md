# Searchable Select Component Guide

This guide explains how to implement searchable select dropdowns with debounced API calls in the Rushita-FE project.

## Overview

The searchable select pattern is used throughout the application when users need to search and select from a large dataset that should be fetched from the API. This pattern includes:

1. A Select component with search capability
2. Debounced API calls to prevent excessive requests
3. Loading states and error handling
4. Conditional API fetching based on search input

## Implementation Steps

### 1. Import Required Components and Hooks

```tsx
import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import Select from '@/components/common/form/Select';
import { SelectOption } from '@/lib/api/types/select-option';
```

### 2. Set Up State Variables

```tsx
// Search query state
const [searchQuery, setSearchQuery] = useState('');
const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

// Selected value state
const [selectedValue, setSelectedValue] = useState('');
```

### 3. Implement Debounce Logic

```tsx
// Debounce search query
useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedSearchQuery(searchQuery);
  }, 300);

  return () => {
    clearTimeout(handler);
  };
}, [searchQuery]);
```

### 4. Create API Filter with Debounced Query

```tsx
// Create filter with debounced search
const filter = useMemo(
  () => ({
    searchTerm: debouncedSearchQuery,
    // Add other filter parameters as needed
  }),
  [debouncedSearchQuery]
);

// Only fetch data when user has typed something
const shouldFetchData = debouncedSearchQuery.length > 0;
```

### 5. Set Up API Query

```tsx
// API query with conditional fetching
const { data, isLoading } = useYourApiHook(filter, {
  enabled: shouldFetchData,
});
```

### 6. Implement the Select Component

```tsx
<Select
  label="Your Label"
  placeholder="Search..."
  options={data || []}
  value={selectedValue}
  onChange={(e) => setSelectedValue(e.target.value)}
  isLoading={isLoading}
  onSearch={(value) => setSearchQuery(value)}
  noOptionsMessage={shouldFetchData ? 'No results found' : 'Type to search...'}
  error={error?.message}
/>
```

## Complete Example

Here's a complete example of implementing a searchable patient dropdown:

```tsx
import { useState, useEffect, useMemo } from 'react';
import { useClinicPatients } from '@/lib/api/hooks/useClinicPatients';
import Select from '@/components/common/form/Select';
import { GetPatientDropdownInput } from '@/lib/api/types/clinic-patient';

function PatientSelector() {
  // State for patient search
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [debouncedPatientSearchQuery, setDebouncedPatientSearchQuery] =
    useState('');
  const [selectedPatient, setSelectedPatient] = useState('');

  // Get clinic ID from context or props
  const clinicId = '123'; // Replace with actual clinic ID source

  // Debounce patient search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPatientSearchQuery(patientSearchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [patientSearchQuery]);

  // Create patient filter with debounced search
  const patientFilter = useMemo<GetPatientDropdownInput>(
    () => ({
      clinicId,
      name: debouncedPatientSearchQuery,
    }),
    [clinicId, debouncedPatientSearchQuery]
  );

  // Only fetch patient data when user has typed something
  const shouldFetchPatients = debouncedPatientSearchQuery.length > 0;

  // Fetch patients based on search
  const { data: patientsData, isLoading: patientsLoading } = usePatientDropdown(
    patientFilter,
    { enabled: shouldFetchPatients }
  );

  // Handle patient selection
  const handlePatientSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPatient(event.target.value);
  };

  return (
    <div>
      <Select
        label="Patient"
        placeholder="Search for a patient..."
        options={patientsData || []}
        value={selectedPatient}
        onChange={handlePatientSelect}
        isLoading={patientsLoading}
        onSearch={(value) => setPatientSearchQuery(value)}
        noOptionsMessage={
          shouldFetchPatients
            ? 'No patients found'
            : 'Type to search for patients'
        }
      />
    </div>
  );
}
```

## Component Props Reference

The `Select` component accepts the following props:

| Prop               | Type                                                    | Description                                   |
| ------------------ | ------------------------------------------------------- | --------------------------------------------- |
| `label`            | `string`                                                | Label text for the select                     |
| `placeholder`      | `string`                                                | Placeholder text when no value is selected    |
| `options`          | `{ value: string; label: string \| null }[]`            | Array of options to display                   |
| `value`            | `string`                                                | Currently selected value                      |
| `onChange`         | `(event: React.ChangeEvent<HTMLSelectElement>) => void` | Handler for selection changes                 |
| `isLoading`        | `boolean`                                               | Whether to show loading state                 |
| `onSearch`         | `(query: string) => void`                               | Handler for search input changes              |
| `noOptionsMessage` | `string`                                                | Message to show when no options are available |
| `error`            | `string`                                                | Error message to display                      |
| `disabled`         | `boolean`                                               | Whether the select is disabled                |
| `startIcon`        | `React.ReactNode`                                       | Icon to display at start of input             |
| `endIcon`          | `React.ReactNode`                                       | Icon to display at end of input               |

## Best Practices

1. **Always debounce search queries** to prevent excessive API calls
2. **Use conditional fetching** with the `enabled` option to only fetch when needed
3. **Provide clear feedback** with appropriate loading states and no-results messages
4. **Handle errors gracefully** by displaying error messages when API calls fail
5. **Set appropriate minimum search length** (typically 2-3 characters) before triggering API calls

## Common Patterns

### Parent-Child Component Pattern

When implementing in a parent-child structure:

1. Keep search state and debounce logic in the parent component
2. Pass the search handler and data to the child component
3. Handle selection in the parent component

### Form Integration

When using with React Hook Form:

```tsx
<Controller
  name="patientId"
  control={control}
  render={({ field }) => (
    <Select
      label="Patient"
      options={patientsData || []}
      value={field.value}
      onChange={(e) => field.onChange(e.target.value)}
      onSearch={handleSearch}
      error={errors.patientId?.message}
    />
  )}
/>
```

## Troubleshooting

- **API calls not triggering**: Check that your debounce logic is working and the `enabled` condition is correct
- **No options appearing**: Verify the data format matches what the Select component expects
- **Search not working**: Ensure the `onSearch` prop is correctly passing the search value to your state setter
