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

export const TEETH1_OPTIONS: Option[] = [
  { value : '55', label: 55},
  { value: '54', label: 55},
  { value: '53', label: 55},
  { value: '52', label: 55},
  { value: '51', label: 55},
]

export const TEETH2_OPTIONS: Option[] = [
  { value : '85', label: 85},
  { value : '84', label: 84},
  { value : '83', label: 83},
  { value : '82', label: 82},
  { value : '81', label: 81},
]

export const TEETH3_OPTION: Option[] = [
  { value : '18', label: 18},
  { value : '17', label: 17},
  { value : '16', label: 16},
  { value : '15', label: 15},
  { value : '14', label: 14},
  { value : '13', label: 13},
  { value : '12', label: 12},
  { value : '11', label: 11},
  { value : '21', label: 21},
  { value : '22', label: 22},
  { value : '23', label: 23},
  { value : '24', label: 24},
  { value : '25', label: 25},
  { value : '26', label: 26},
  { value : '27', label: 27},
  { value : '28', label: 28},
]

export const TEETH4_OPTION: Option[] = [
  { value : '48', label: 48},
  { value : '47', label: 47},
  { value : '46', label: 46},
  { value : '45', label: 45},
  { value : '44', label: 44},
  { value : '43', label: 43},
  { value : '42', label: 42},
  { value : '41', label: 41},
  { value : '31', label: 31},
  { value : '32', label: 32},
  { value : '33', label: 33},
  { value : '34', label: 34},
  { value : '35', label: 35},
  { value : '36', label: 36},
  { value : '37', label: 37},
  { value : '38', label: 38},
]

export const TEETH5_OPTIONS: Option[] = [
  { value : '61', label: 61},
  { value: '62', label: 62},
  { value: '63', label: 64},
  { value: '64', label: 64},
  { value: '66', label: 65},
]

export const TEETH6_OPTIONS: Option[] = [
  { value : '71', label: 71},
  { value : '72', label: 72},
  { value : '73', label: 73},
  { value : '74', label: 75},
  { value : '75', label: 75},
]

export const DRUGS_HOW_OFTEN_OPTIONS: Option[] = [
  { value : 'rarely', label: 'Rarely'},
  { value : 'sometimes', label: 'Sometimes'},
  { value : 'often', label: 'Often'},
  { value : 'usually', label: 'Usually'},
  { value : 'always', label: 'Always'},
  { value : 'daily', label: 'Daily'},
  { value : 'weekly', label: 'Weekly'},
  { value : 'monthly', label: 'Monthly'},
  { value : 'yearly', label: 'Yearly'},
]

