
import type { SelectOption, CheckboxOption } from './types';

export const SUBJECT_OPTIONS: SelectOption[] = [
  { value: '', label: 'Select a subject...' },
  { value: 'editorial candid portrait -- woman seated alone in a corner café', label: 'Candid Portrait - Woman in Café' },
  { value: 'cinematic, rich realism, dramatic -- woman staring off into the distance', label: 'Dramatic Portrait - Woman' },
  { value: 'Product shot of a minimalist, luxury watch', label: 'Product Shot - Watch' },
  { value: 'Wild life photography -- a lone wolf in the wilderness', label: 'Wildlife - Wolf' },
  { value: 'Cityscape -- tall, futuristic buildings at night', label: 'Cityscape - Futuristic' },
  { value: 'other', label: 'Other...' },
];

export const SCENE_OPTIONS: SelectOption[] = [
  { value: '', label: 'Select scene details...' },
  { value: 'early autumn morning, condensation on the window', label: 'Autumn Morning' },
  { value: 'city street at night with neon signs', label: 'City Street at Night' },
  { value: 'inside a professional photography studio', label: 'Studio' },
  { value: 'sunny day on a tropical beach', label: 'Tropical Beach' },
  { value: 'rainy afternoon, reflections on wet asphalt', label: 'Rainy Afternoon' },
  { value: 'other', label: 'Other...' },
];

export const TECHNICAL_OPTIONS: SelectOption[] = [
  { value: '', label: 'Select technical elements...' },
  { value: 'Canon 50mm f1.4, eye-level, shallow depth -- natural light', label: 'Canon 50mm, Natural Light' },
  { value: 'wide-angle lens, cinematic lighting, low angle', label: 'Wide-Angle, Low Angle' },
  { value: 'macro photography, bokeh effect', label: 'Macro, Bokeh' },
  { value: 'backlight, high contrast', label: 'Backlight, High Contrast' },
  { value: 'other', label: 'Other...' },
];

export const DETAILS_OPTIONS: CheckboxOption[] = [
    { value: 'real pores, light under-eye lines, wool scarf texture', label: 'Human Details (pores, wrinkles, texture)' },
    { value: 'pastry crumbs on plate, open book with creased pages', label: 'Object Details (crumbs, creased pages)' },
    { value: 'fur texture, rippling water', label: 'Nature Details (fur, water)' },
    { value: 'steam from a coffee cup', label: 'Sensory Details (steam)' },
];
