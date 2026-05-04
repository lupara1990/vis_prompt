
import React, { useState, useMemo } from 'react';
import { SelectInput } from './components/SelectInput';
import { CheckboxGroup } from './components/CheckboxGroup';
import { PromptOutput } from './components/PromptOutput';
import { SUBJECT_OPTIONS, SCENE_OPTIONS, TECHNICAL_OPTIONS, DETAILS_OPTIONS } from './constants';
import type { FormState } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Aperture, Info } from 'lucide-react';

const App: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    basePrompt: '',
    subject: '',
    scene: '',
    technical: '',
    details: [],
  });

  const handleSelectChange = (field: keyof Omit<FormState, 'details' | 'basePrompt'>, value: string) => {
    setFormState(prevState => ({ ...prevState, [field]: value }));
  };

  const handleBasePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState(prevState => ({ ...prevState, basePrompt: e.target.value }));
  };

  const handleDetailsChange = (newDetails: string[]) => {
    setFormState(prevState => ({ ...prevState, details: newDetails }));
  };

  const generatedPrompt = useMemo(() => {
    const { basePrompt, subject, scene, technical, details } = formState;
    const promptParts = [];
    
    if (basePrompt.trim()) promptParts.push(basePrompt.trim());
    if (subject) promptParts.push(subject);
    if (scene) promptParts.push(scene);
    if (technical) promptParts.push(technical);
    if (details.length > 0) promptParts.push(details.join(', '));

    if (promptParts.length === 0) {
      return '';
    }

    let finalPrompt = promptParts.join(' -- ');
    finalPrompt += ' --style raw --no blur watermark text distorted faces logos';
    return finalPrompt;
  }, [formState]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-8 flex items-center justify-center font-sans selection:bg-indigo-500/30 relative overflow-hidden">
      {/* Background Architectural Elements - Mimicking the uploaded image silhouette */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Left Pillar */}
        <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-black/80 blur-sm" />
        {/* Right Pillar */}
        <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-black/80 blur-sm" />
        {/* Bottom Silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-black/90 blur-md" />
        {/* Central Glow */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-1/2 h-full bg-indigo-500/5 rounded-full blur-[120px] mix-blend-screen" />
        
        {/* Abstract Texture Layer */}
        <div 
          className="absolute inset-0 opacity-20 mix-blend-overlay grayscale"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2070&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container mx-auto max-w-4xl relative z-10"
      >
        <div className="bg-[#1e293b] rounded-2xl p-6 md:p-10 shadow-2xl shadow-indigo-950/20 border border-slate-700/50 backdrop-blur-sm">
          <header className="mb-10 text-center relative">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block p-3 rounded-2xl bg-indigo-500/10 mb-4 border border-indigo-500/20"
            >
              <Aperture className="w-8 h-8 text-indigo-400" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-indigo-100 to-indigo-300 font-playwrite">
              Visual Prompt Architect
            </h1>
            <p className="text-slate-400 max-w-lg mx-auto text-lg leading-relaxed font-playwrite">
              Transform your basic ideas into cinematic masterpieces with precision-engineered prompt construction.
            </p>
          </header>

          <div className="space-y-8">
            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <label htmlFor="basePrompt" className="text-xl font-semibold text-indigo-300 underline decoration-indigo-500/30 underline-offset-4">
                  0. The Core Idea
                </label>
                <div className="group relative">
                  <Info className="w-4 h-4 text-slate-500 cursor-help" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 rounded-lg text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700 pointer-events-none z-10 shadow-xl">
                    Describe your main subject or action in simple terms. We'll enhance it with the details below.
                  </div>
                </div>
              </div>
              <textarea
                id="basePrompt"
                className="w-full h-32 px-5 py-4 rounded-xl bg-slate-900/50 border border-slate-700 text-slate-100 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 resize-none font-sans text-lg placeholder:text-slate-600"
                placeholder="e.g., A futuristic samurai in a neon-lit rain-washed alleyway..."
                value={formState.basePrompt}
                onChange={handleBasePromptChange}
              />
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <SelectInput
                  id="subject"
                  label="1. Artistic Foundation"
                  options={SUBJECT_OPTIONS}
                  value={formState.subject}
                  onChange={(value) => handleSelectChange('subject', value)}
                  placeholder="e.g., editorial candid portrait"
                />
                <SelectInput
                  id="scene"
                  label="2. Environment & Atmosphere"
                  options={SCENE_OPTIONS}
                  value={formState.scene}
                  onChange={(value) => handleSelectChange('scene', value)}
                  placeholder="e.g., early autumn morning"
                />
              </div>
              <div className="space-y-8">
                <SelectInput
                  id="technical"
                  label="3. Lens & Lighting"
                  options={TECHNICAL_OPTIONS}
                  value={formState.technical}
                  onChange={(value) => handleSelectChange('technical', value)}
                  placeholder="e.g., Canon 50mm f1.4"
                />
                <CheckboxGroup
                  label="4. Fine-Grained Realism"
                  options={DETAILS_OPTIONS}
                  selectedValues={formState.details}
                  onChange={handleDetailsChange}
                />
              </div>
            </div>
          </div>

          <motion.div 
            layout
            className="mt-12 pt-10 border-t border-slate-700/50"
          >
            <PromptOutput promptText={generatedPrompt} />
          </motion.div>
        </div>
        
        <footer className="mt-8 text-center text-slate-500 text-sm">
          <p>© 2024 Visual Prompt Architect • Built for Cinematic Fidelity</p>
        </footer>
      </motion.div>
    </div>
  );
};

export default App;
