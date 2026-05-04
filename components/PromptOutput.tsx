
import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PromptOutputProps {
  promptText: string;
}

export const PromptOutput: React.FC<PromptOutputProps> = ({ promptText }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyPrompt = () => {
    if (promptText) {
      navigator.clipboard.writeText(promptText).then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-lg font-medium text-indigo-300">
          <Terminal className="w-5 h-5" />
          Generated Blueprint
        </label>
        
        <button
          onClick={copyPrompt}
          disabled={!promptText || isCopied}
          className={`group flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg ${
            isCopied
              ? 'bg-emerald-500 text-white border-emerald-400'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed shadow-indigo-500/20 hover:shadow-indigo-500/40 active:scale-95'
          } border border-transparent`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isCopied ? (
              <motion.div
                key="check"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 45 }}
                className="flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Copy to Clipboard</span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
        <div className="relative whitespace-pre-wrap word-wrap break-word bg-slate-950 rounded-xl p-6 border border-slate-800 min-h-[160px] text-slate-300 font-mono text-sm md:text-base leading-relaxed selection:bg-indigo-500/50">
          {promptText || (
            <div className="flex flex-col items-center justify-center h-full text-slate-600 py-4 italic">
              <p>Your architectural prompt will materialize here as you build...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
