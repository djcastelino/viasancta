'use client';

import { useState, useEffect } from 'react';

interface OnboardingStep {
  title: string;
  description: string;
  highlight?: string;
  icon: string;
}

const steps: OnboardingStep[] = [
  {
    title: 'Welcome to Divine Pilgrim! 🙏',
    description: 'Experience AI-guided virtual pilgrimages to sacred sites, Eucharistic miracles, and holy places worldwide. Let us show you around!',
    icon: '✨'
  },
  {
    title: 'Daily Scripture Challenge 🔥',
    description: 'Test your biblical knowledge every day! Guess the character, event, or miracle with 6 clues. Build your streak and grow in faith.',
    highlight: 'challenge',
    icon: '📖'
  },
  {
    title: 'Eucharistic Miracles 🍞',
    description: 'Explore documented supernatural events where the consecrated Host became flesh and blood. Each miracle includes audio narration and historical context.',
    highlight: 'tours',
    icon: '✝️'
  },
  {
    title: 'Sacred Sites & Tours 🌍',
    description: 'Journey through Marian apparitions, biblical timeline, sacred architecture, and holy mountains. All with AI-powered audio guides.',
    highlight: 'tours',
    icon: '🕊️'
  },
  {
    title: "Today's Promise 💝",
    description: 'Receive daily encouragement with God\'s promises from Scripture. Each day brings new hope and spiritual reflection.',
    highlight: 'promise',
    icon: '🌟'
  }
];

export default function Onboarding() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setTimeout(() => setIsOpen(true), 500);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleClose();
  };

  if (!isOpen) return null;

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
        onClick={handleSkip}
      />

      {/* Onboarding Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full pointer-events-auto animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 border-b border-gray-200">
            <button
              onClick={handleSkip}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close onboarding"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            {/* Progress bar */}
            <div className="mb-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#6e3a6c] to-[#8B4789] transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4 animate-bounce">
                {step.icon}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {step.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Interactive preview hint */}
            {step.highlight && (
              <div className="bg-gradient-to-r from-[#6e3a6c]/10 to-[#8B4789]/10 rounded-2xl p-4 text-center border-2 border-[#6e3a6c]/20">
                <p className="text-sm text-[#6e3a6c] font-semibold">
                  💡 This feature is available on the homepage below!
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-3xl">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handleSkip}
                className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Skip Tour
              </button>

              <div className="flex gap-3">
                {currentStep > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all"
                  >
                    ← Previous
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-[#6e3a6c] to-[#8B4789] text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
                >
                  {currentStep < steps.length - 1 ? 'Next →' : 'Get Started 🙏'}
                </button>
              </div>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentStep 
                      ? 'w-8 bg-[#6e3a6c]' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
