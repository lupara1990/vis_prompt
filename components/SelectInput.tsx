
import React, { useState, useEffect } from 'react';
import type { SelectOption } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Edit3 } from 'lucide-react';

interface SelectInputProps {
  id: string;
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({ id, label, options, value, onChange, placeholder }) => {
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    const isPredefined = options.some(opt => opt.value === value && opt.value !== 'other');
    if (isPredefined) {
      setSelectedValue(value);
      setShowOtherInput(false);
    } else if (value) {
      setSelectedValue('other');
      setShowOtherInput(true);
    } else {
      setSelectedValue('');
      setShowOtherInput(false);
    }
  }, [value, options]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    if (newValue === 'other') {
      setShowOtherInput(true);
      onChange('');
    } else {
      setShowOtherInput(false);
      onChange(newValue);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-3">
      <label htmlFor={id} className="block text-sm font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </label>
      <div className="relative group">
        <select
          id={id}
          value={selectedValue}
          onChange={handleSelectChange}
          className="w-full appearance-none px-4 py-3.5 rounded-xl bg-slate-900/50 border border-slate-700 text-slate-200 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all cursor-pointer group-hover:border-slate-600"
        >
          {options.map(option => (
            <option key={option.value} value={option.value} className="bg-slate-900 text-slate-200">
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 group-hover:text-slate-300 transition-colors">
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>

      <AnimatePresence>
        {showOtherInput && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            className="overflow-hidden"
          >
            <div className="relative mt-2">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400">
                <Edit3 className="w-4 h-4" />
              </div>
              <input
                type="text"
                autoFocus
                value={selectedValue === 'other' ? value : ''}
                onChange={handleTextChange}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-800 border border-indigo-500/30 text-slate-100 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-600 shadow-lg shadow-indigo-500/5"
                placeholder={placeholder}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
