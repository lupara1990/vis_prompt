
export interface FormState {
  basePrompt: string;
  subject: string;
  scene: string;
  technical: string;
  details: string[];
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface CheckboxOption {
  value: string;
  label: string;
}
