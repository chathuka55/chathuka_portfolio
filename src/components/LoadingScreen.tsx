import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const kanjiChars = ['技', '術', 'コ', 'ー', 'ド', '創', '造'];
  const [currentKanji, setCurrentKanji] = useState(0);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Kanji rotation
    const kanjiInterval = setInterval(() => {
      setCurrentKanji(prev => (prev + 1) % kanjiChars.length);
    }, 200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(kanjiInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center z-[10000]">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Animated Circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 border border-[#facc15]/10 rounded-full animate-pulse" />
        <div className="absolute w-48 h-48 border border-[#facc15]/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute w-32 h-32 border border-[#facc15]/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Rotating Kanji */}
        <div className="relative w-24 h-24 flex items-center justify-center mb-8">
          <div className="absolute inset-0 border-2 border-[#facc15]/30 rounded-lg rotate-45 animate-rotate-slow" />
          <div className="absolute inset-0 border-2 border-[#fbbf24]/20 rounded-lg -rotate-12" style={{ animation: 'rotate-slow 15s linear infinite reverse' }} />
          <span className="text-5xl font-japanese text-[#facc15] text-glow-green transition-all duration-200">
            {kanjiChars[currentKanji]}
          </span>
        </div>

        {/* Loading Text */}
        <div className="text-center mb-6">
          <h2 className="font-display text-2xl text-white tracking-widest mb-2">
            LOADING
          </h2>
          <p className="font-japanese text-[#facc15]/60 text-sm tracking-wider">
            読み込み中
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-[#262626] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#facc15] to-[#fbbf24] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Percentage */}
        <div className="mt-4 font-mono-custom text-[#facc15]/80 text-sm">
          {progress}%
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex gap-4">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="w-1 h-1 bg-[#facc15]/40 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#facc15]/20" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#facc15]/20" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#facc15]/20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#facc15]/20" />
    </div>
  );
};

export default LoadingScreen;
