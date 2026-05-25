import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Zap, Radio, Shield, Network, RefreshCw } from 'lucide-react';

interface TelemetryStats {
  sysCharge: string;
  gridStability: string;
  synapseFreq: string;
  packetsRcvd: number;
}

export default function QuantumCore() {
  const [coreMode, setCoreMode] = useState<'stable' | 'hyperflux' | 'overclock' | 'entangled'>('stable');
  const [isHovered, setIsHovered] = useState(false);
  const [telemetry, setTelemetry] = useState<TelemetryStats>({
    sysCharge: '98.4%',
    gridStability: '99.98%',
    synapseFreq: '4.82 GHz',
    packetsRcvd: 1042
  });

  // Cycle through different futuristic operational modes
  const cycleMode = () => {
    const modes: ('stable' | 'hyperflux' | 'overclock' | 'entangled')[] = [
      'stable',
      'hyperflux',
      'overclock',
      'entangled'
    ];
    const currentIndex = modes.indexOf(coreMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setCoreMode(modes[nextIndex]);
  };

  // Dynamically update telemetry readings to look "alive" and interactive
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => {
        const variance = (Math.random() - 0.5) * 0.4;
        let stabilityVariance = (Math.random() - 0.5) * 0.05;
        let chargeValue = parseFloat(prev.sysCharge) + (Math.random() - 0.5);
        if (chargeValue > 100) chargeValue = 100;
        if (chargeValue < 90) chargeValue = 90;

        let stabilityValue = parseFloat(prev.gridStability) + stabilityVariance;
        if (stabilityValue > 100) stabilityValue = 100;
        if (stabilityValue < 98) stabilityValue = 98;

        const freqBase = coreMode === 'stable' ? 4.8 
                       : coreMode === 'hyperflux' ? 8.4 
                       : coreMode === 'overclock' ? 12.6 
                       : 16.2;
        const currentFreq = (freqBase + Math.random() * 0.3).toFixed(2);

        return {
          sysCharge: `${chargeValue.toFixed(1)}%`,
          gridStability: `${stabilityValue.toFixed(2)}%`,
          synapseFreq: `${currentFreq} GHz`,
          packetsRcvd: prev.packetsRcvd + Math.floor(Math.random() * 3)
        };
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [coreMode]);

  // Color mappings for different quantum states
  const colors = {
    stable: {
      primary: '#06b6d4', // Cyan
      secondary: '#3b82f6', // Blue
      glow: 'rgba(6, 182, 212, 0.45)',
      desc: 'ALPHA_LINK: STEADY STATE',
      speed: 16
    },
    hyperflux: {
      primary: '#db2777', // Fuchsia
      secondary: '#8b5cf6', // Violet
      glow: 'rgba(219, 39, 119, 0.45)',
      desc: 'HYPER-FLUX BEAM COLLIDER',
      speed: 8
    },
    overclock: {
      primary: '#eab308', // Gold
      secondary: '#f97316', // Orange
      glow: 'rgba(234, 179, 8, 0.45)',
      desc: 'MAX_SYS DECRYPT PROTOCOL',
      speed: 4
    },
    entangled: {
      primary: '#10b981', // Emerald
      secondary: '#06b6d4', // Cyan
      glow: 'rgba(16, 185, 129, 0.45)',
      desc: 'QUANTUM ENTANGLEMENT MUX',
      speed: 12
    }
  };

  const currentTheme = colors[coreMode];

  return (
    <div className="flex flex-col items-center justify-center select-none w-full max-w-sm mx-auto">
      
      {/* 1. Top Telemetry Mode Display Indicator */}
      <div className="mb-2 flex flex-col items-center">
        <motion.div 
          key={coreMode}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[9px] font-mono px-3 py-1 bg-slate-950/90 border rounded-md tracking-wider shadow-lg flex items-center gap-1.5"
          style={{ 
            borderColor: `${currentTheme.primary}40`,
            color: currentTheme.primary 
          }}
        >
          <Radio className="w-2.5 h-2.5 animate-pulse" />
          {currentTheme.desc}
        </motion.div>
      </div>

      {/* 2. Core Active Spherical Rings Container (Perfect Centering) */}
      <div className="relative w-80 h-80 flex items-center justify-center">
        
        {/* Background Holographic Scanners (Nested inside the 320x320px box, no overflow) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          
          {/* Outermost diagnostic rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, ease: 'linear', duration: currentTheme.speed * 2 }}
            className="w-full h-full absolute rounded-full border border-dashed opacity-45"
            style={{ borderColor: currentTheme.primary }}
          />

          {/* Horizontal & Vertical grid calipers */}
          <div className="w-full h-[1px] absolute border-t opacity-10" style={{ borderColor: currentTheme.primary }} />
          <div className="h-full w-[1px] absolute border-l opacity-10" style={{ borderColor: currentTheme.primary }} />

          {/* Medium ring with tick marks */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, ease: 'linear', duration: currentTheme.speed * 1.5 }}
            className="w-64 h-64 absolute rounded-full border opacity-35 flex items-center justify-center"
            style={{ 
              borderColor: currentTheme.secondary,
              borderStyle: 'double', 
              borderWidth: '2px' 
            }}
          >
            {/* Circular ticks indicator nodes */}
            <div className="absolute top-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
            <div className="absolute bottom-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
            <div className="absolute left-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
            <div className="absolute right-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
          </motion.div>
        </div>

        {/* Main Interactive Reactor Core Shield */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={cycleMode}
          className="w-52 h-52 relative z-10 cursor-pointer flex items-center justify-center group"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <defs>
              <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={currentTheme.primary} stopOpacity="0.8" />
                <stop offset="60%" stopColor={currentTheme.secondary} stopOpacity="0.25" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Central Reactor Power Glow field */}
            <motion.circle
              cx="100"
              cy="100"
              r="60"
              fill="url(#coreGlow)"
              animate={{ 
                r: isHovered ? [55, 75, 55] : [55, 65, 55],
                opacity: [0.7, 0.9, 0.7]
              }}
              transition={{ repeat: Infinity, duration: currentTheme.speed / 4, ease: 'easeInOut' }}
            />

            {/* Concentric rotating SVG orbits */}
            <motion.circle
              cx="100"
              cy="100"
              r="45"
              fill="none"
              stroke={currentTheme.primary}
              strokeWidth="1.5"
              strokeDasharray="40 10 20 10"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, ease: 'linear', duration: currentTheme.speed }}
            />

            <motion.circle
              cx="100"
              cy="100"
              r="38"
              fill="none"
              stroke={currentTheme.secondary}
              strokeWidth="1"
              strokeDasharray="5 5 15 5"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, ease: 'linear', duration: currentTheme.speed * 0.7 }}
            />

            {/* Inner core capsule nodes */}
            <g>
              {/* Triangular Shielding Caliper Left */}
              <path d="M 68 100 L 80 85 L 80 115 Z" fill={`${currentTheme.primary}20`} stroke={currentTheme.primary} strokeWidth="1" />
              {/* Triangular Shielding Caliper Right */}
              <path d="M 132 100 L 120 85 L 120 115 Z" fill={`${currentTheme.primary}20`} stroke={currentTheme.primary} strokeWidth="1" />
              {/* Central Spherical Nodes */}
              <circle cx="100" cy="100" r="16" fill="#020617" stroke={currentTheme.primary} strokeWidth="2" />
            </g>

            {/* High frequency central oscillating wave */}
            <motion.circle
              cx="100"
              cy="100"
              r={isHovered ? 11 : 9}
              fill={currentTheme.primary}
              animate={{ 
                scale: [1, 1.25, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            />
          </svg>

          {/* Hover/Tap Hint Badge */}
          <div 
            className="absolute -bottom-2 bg-slate-950/90 border text-slate-400 group-hover:text-cyan-300 px-3 py-0.5 rounded-full text-[8px] font-mono tracking-widest uppercase transition-all shadow-md"
            style={{ borderColor: `${currentTheme.primary}30` }}
          >
            CLICK TO ROTATE OPERATIONAL TYPE
          </div>
        </motion.div>
      </div>

      {/* 3. Auxiliary Live Telemetry Readouts in Flow (Avoid Clashing) */}
      <div className="grid grid-cols-2 gap-2 w-full px-4 text-[9px] font-mono text-slate-400 mt-2">
        <div className="flex items-center gap-1.5 bg-slate-950/55 p-2 rounded-xl border border-indigo-500/10">
          <Cpu className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
          <span>MODE: <b style={{ color: currentTheme.primary }}>{coreMode.toUpperCase()}</b></span>
        </div>
        
        <div className="flex items-center gap-1.5 bg-slate-950/55 p-2 rounded-xl border border-indigo-500/10">
          <Zap className="w-3.5 h-3.5" style={{ color: currentTheme.secondary }} />
          <span>CHARGE: <span className="text-slate-100">{telemetry.sysCharge}</span></span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950/55 p-2 rounded-xl border border-indigo-500/10">
          <Radio className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
          <span>FREQ: <span style={{ color: currentTheme.primary }}>{telemetry.synapseFreq}</span></span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950/55 p-2 rounded-xl border border-indigo-500/10">
          <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" style={{ color: currentTheme.secondary }} />
          <span>STABLE: <span className="text-emerald-400">{telemetry.gridStability}</span></span>
        </div>
      </div>
    </div>
  );
}
