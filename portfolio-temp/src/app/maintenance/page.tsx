"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Wrench, Sparkles, Code2, Coffee } from 'lucide-react';

export default function MaintenancePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Animated Background Gradients */}
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]" 
      />
      <motion.div 
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px]" 
      />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />

      {/* Main Content Container */}
      <div className="z-10 flex flex-col items-center text-center w-full max-w-2xl mx-auto space-y-10 p-6 sm:p-10 md:p-14 backdrop-blur-sm bg-white/[0.02] border border-white/[0.05] rounded-3xl shadow-2xl">
        
        {/* Floating Icons Group */}
        <motion.div 
          className="relative h-28 w-28 sm:h-32 sm:w-32 flex items-center justify-center mb-2 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-10 bg-neutral-900 p-3 sm:p-4 rounded-2xl border border-neutral-800 shadow-xl shadow-blue-900/20"
          >
            <Code2 className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400" />
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, 10, 0],
              x: [0, -10, 0],
              rotate: 360
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -right-2 -top-2 sm:-right-4 sm:-top-4 bg-neutral-900 p-2 rounded-xl border border-neutral-800 shadow-lg"
          >
            <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
          </motion.div>

          <motion.div
            animate={{ 
              y: [0, 15, 0],
              x: [0, 10, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -left-2 -bottom-2 sm:-left-4 sm:-bottom-4 bg-neutral-900 p-2 rounded-xl border border-neutral-800 shadow-lg"
          >
            <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
          </motion.div>
          
          <Sparkles className="absolute -top-6 sm:-top-8 left-1/2 w-4 h-4 sm:w-5 sm:h-5 text-yellow-400/70 animate-pulse" />
        </motion.div>

        {/* Text Reveal Animations */}
        <div className="space-y-6 sm:space-y-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 pb-2">
              We'll be back soon
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="w-full flex justify-center"
          >
            <p className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-lg leading-[1.8] sm:leading-loose">
              I'm busy crafting some magical new features and polishing the pixels. 
              The portfolio is currently getting a major upgrade.
            </p>
          </motion.div>
        </div>

        {/* Animated Progress Bar */}
        <motion.div 
          className="w-full max-w-sm pt-6 sm:pt-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] sm:text-xs font-semibold text-neutral-500 uppercase tracking-widest flex items-center gap-1.5 sm:gap-2">
              <Coffee className="w-3 h-3" />
              Brewing updates
            </span>
            <motion.span 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[10px] sm:text-xs font-semibold text-blue-400 uppercase tracking-widest"
            >
              Working on it...
            </motion.span>
          </div>
          
          <div className="h-1.5 w-full bg-neutral-800/50 rounded-full overflow-hidden relative backdrop-blur-sm border border-white/5">
            <motion.div 
              className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-blue-500 to-purple-500 rounded-full"
              animate={{
                x: ['-100%', '300%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </motion.div>

        {/* Contact info / Socials could go here if wanted */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 1.2 }}
           className="pt-6 sm:pt-10 text-neutral-500 text-sm"
        >
          Check back in a little while!
        </motion.div>
      </div>
    </div>
  );
}
