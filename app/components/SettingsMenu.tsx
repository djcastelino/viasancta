'use client';

import { useState } from 'react';
import { useDarkMode } from './DarkModeProvider';

export default function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleRateApp = () => {
    // Open Play Store app page
    const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.divinepilgrim.www.twa';
    // For now during testing, this will show an error until app is published
    // You can also use the internal testing link instead
    window.open(playStoreUrl, '_blank');
  };

  const handleFeedback = () => {
    window.location.href = 'mailto:feedback@divinepilgrim.com?subject=Divine Pilgrim Feedback';
  };

  return (
    <div className="relative">
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Settings"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700 dark:text-gray-300">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
      </button>

      {/* Settings Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#6e3a6c] to-[#8B4789] text-white px-6 py-4 relative">
              <h3 className="text-lg font-bold">Settings</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                aria-label="Close settings"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="p-4 space-y-3">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{isDarkMode ? '🌙' : '☀️'}</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Dark Mode</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Reduce eye strain</p>
                  </div>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    isDarkMode ? 'bg-[#6e3a6c]' : 'bg-gray-300'
                  }`}
                  aria-label="Toggle dark mode"
                >
                  <div
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      isDarkMode ? 'translate-x-7' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-700"></div>

              {/* Rate App Button */}
              <button
                onClick={handleRateApp}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Rate on Play Store</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Help us grow!</p>
                </div>
              </button>

              {/* Feedback Button */}
              <button
                onClick={handleFeedback}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <span className="text-2xl">💬</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Send Feedback</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Share your thoughts</p>
                </div>
              </button>

              {/* Privacy Policy */}
              <a
                href="/privacy"
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <span className="text-2xl">🔒</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Privacy Policy</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Your data is safe</p>
                </div>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
