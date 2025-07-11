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
