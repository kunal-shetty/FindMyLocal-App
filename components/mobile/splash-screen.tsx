"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles } from "lucide-react"

export function MobileSplashScreen() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    // Phase-based animations using CSS and state
    const phases = [
      setTimeout(() => setAnimationPhase(1), 100), // Logo appears
      setTimeout(() => setAnimationPhase(2), 600), // Title appears
      setTimeout(() => setAnimationPhase(3), 1000), // Subtitle appears
      setTimeout(() => setAnimationPhase(4), 1400), // Tagline appears
    ]

    return () => phases.forEach(clearTimeout)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0a14 0%, #12122a 50%, #0a0a14 100%)",
      }}
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-[100px] animate-pulse"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)",
            top: "-20%",
            left: "-20%",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-[80px]"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.5) 0%, transparent 70%)",
            bottom: "-10%",
            right: "-10%",
            animation: "float 10s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Pulsing rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-primary/20"
            style={{
              width: `${80 + i * 60}px`,
              height: `${80 + i * 60}px`,
              animation: `pulse-ring ${2 + i * 0.5}s ease-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/40"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particle-float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <div
        className={`relative z-10 transition-all duration-700 ease-out ${
          animationPhase >= 1 ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-50 translate-y-8"
        }`}
      >
        <div className="relative">
          {/* Glow effect */}
          <div
            className="absolute inset-0 rounded-3xl blur-xl opacity-60"
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
              animation: "glow-pulse 2s ease-in-out infinite",
            }}
          />
          {/* Logo container */}
          <div
            className="relative w-28 h-28 rounded-3xl flex items-center justify-center shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #ec4899 100%)",
            }}
          >
            <Sparkles className="w-14 h-14 text-white drop-shadow-lg" />
          </div>
        </div>
      </div>

      {/* Brand name with letter animation */}
      <div
        className={`mt-10 text-center transition-all duration-700 ease-out delay-100 ${
          animationPhase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h1 className="text-5xl font-bold tracking-tight">
          {"FindMyLocal".split("").map((letter, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                animation: animationPhase >= 2 ? `letter-bounce 0.5s ease-out ${i * 0.05}s both` : "none",
                background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>

      {/* Subtitle */}
      <p
        className={`mt-4 text-lg text-slate-400 tracking-wide transition-all duration-500 ${
          animationPhase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        Discover trusted local services
      </p>

      {/* Tagline with typing effect */}
      <div
        className={`mt-2 flex items-center gap-2 transition-all duration-500 ${
          animationPhase >= 4 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <span className="text-sm text-primary/70">Compare · Book · Hire</span>
        <div className="w-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-20 flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-primary/70"
              style={{
                animation: "bounce-dot 1.4s ease-in-out infinite",
                animationDelay: `${i * 0.16}s`,
              }}
            />
          ))}
        </div>
        <p className="text-xs text-slate-500">Loading your experience...</p>
      </div>

      {/* Custom keyframe styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.6; }
          50% { opacity: 0.3; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes particle-float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
          50% { transform: translateY(-30px) translateX(10px); opacity: 0.8; }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.1); }
        }
        @keyframes letter-bounce {
          0% { transform: translateY(20px); opacity: 0; }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes bounce-dot {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
