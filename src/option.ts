export interface Option {
  value: string | number;
  label: string | number;
}

export const OCCUPATION_OPTIONS: Option[] = [
  { value: 'arzt', label: 'Arzt' },
  { value: 'lehrer', label: 'Lehrer' },
  { value: 'student', label: 'Student' },
  { value: 'entwickler', label: 'Entwickler' },
];

export const INTERVAL_OPTIONS: Option[] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Vierteljährlich' },
  { value: 'half-yearly', label: 'Halbjährlich' },
  { value: 'yearly', label: 'Jährlich' },
  { value: 'other', label: 'Andere' },
]
