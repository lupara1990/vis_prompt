
import React from 'react';
import type { CheckboxOption } from '../types';
import { Check } from 'lucide-react';

interface CheckboxGroupProps {
  label: string;
  options: CheckboxOption[];
  selectedValues: string[];
  onChange: (newSelected: string[]) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ label, options, selectedValues, onChange }) => {
  const handleCheckboxChange = (value: string) => {
    const newSelected = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(newSelected);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold uppercase tracking-wider text-slate-500">{label}</label>
      <div className="grid grid-cols-1 gap-3">
        {options.map(option => {
          const isSelected = selectedValues.includes(option.value);
          return (
            <label 
              key={option.value} 
              className={`flex items-center group cursor-pointer p-3 rounded-xl border transition-all duration-200 ${
                isSelected 
                  ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-200' 
                  : 'bg-slate-900/30 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:bg-slate-900/50'
              }`}
            >
              <div className="relative flex items-center justify-center w-6 h-6 mr-3">
                <input
                  type="checkbox"
                  className="peer appearance-none w-6 h-6 rounded-lg border-2 border-slate-600 bg-slate-800 checked:bg-indigo-500 checked:border-indigo-500 transition-all cursor-pointer"
                  checked={isSelected}
                  onChange={() => handleCheckboxChange(option.value)}
                />
                <Check className={`absolute w-4 h-4 text-white pointer-events-none transition-transform duration-200 ${isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
              </div>
              <span className="text-sm font-medium leading-tight select-none">{option.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
