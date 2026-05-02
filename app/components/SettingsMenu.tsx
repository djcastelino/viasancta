'use client';

import { useState } from 'react';
import { useDarkMode } from './DarkModeProvider';

export default function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleRateApp = () => {
    const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.divinepilgrim.www.twa';
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
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M12 1v6m0 6v6m-9-9h6m6 0h6"></path>
          <path d="m4.93 4.93 4.24 4.24m5.66 0 4.24-4.24m-14.14 0 4.24 4.24m5.66 5.66 4.24 4.24"></path>
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
            <div className="bg-gradient-to-r from-[#6e3a6c] to-[#8B4789] text-white px-6 py-4">
              <h3 className="text-lg font-bold">Settings</h3>
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
