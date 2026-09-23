import React from 'react';
import { ActiveScreen, UserRole } from '../types';

interface NavigationProps {
  currentScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  userRole: UserRole;
  userEmail: string;
  isOffline: boolean;
  onToggleOffline: () => void;
  onSignOut: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentScreen,
  onNavigate,
  userRole,
  userEmail,
  isOffline,
  onToggleOffline,
  onSignOut,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#022617] text-white border-b border-[#1a3c2b] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Anchor */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('scanner')}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-[#fbf9f4] shadow-sm group-hover:scale-105 transition-transform duration-300">
              <img
                alt="AgriPower.AI Logo"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida/AEtjO1X8y8K7-hmnxwhIQDzfSW_PwMApQHCspOXb2688w3N2AHzZq_dgH55gTtNr7OlgmVhEXydrELvzbu9wrOHzHCnkw-j42C_ZROAYDa42fUysw3WqRXi-JjwSBst_EOQ3pPCmKv79nUTl6naU43i4zpX6sd11C5Mktv1KCL3qTuh4hFcf7-_gznN10ih9yZTCJSyMo5ugwnnerM_8PTQO0o2xXxsDCMZEVLYvJvloKWpzs08xe_HE1qS5MA"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl text-white font-semibold tracking-tight">
                AgriPower<span className="text-[#ff7d51]">.AI</span>
              </span>
              <span className="text-[10px] text-[#82a790] tracking-wider uppercase font-semibold hidden sm:inline">
                Precision Agro-Intelligence
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-[#1a3c2b]/70 p-1.5 rounded-full border border-[#82a790]/20">
            <button
              onClick={() => onNavigate('scanner')}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentScreen === 'scanner'
                  ? 'bg-white text-[#022617] shadow-sm'
                  : 'text-[#eae8e3] hover:text-white hover:bg-[#1a3c2b]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">photo_camera</span>
              <span>Crop Scanner</span>
            </button>

            <button
              onClick={() => onNavigate('history')}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentScreen === 'history'
                  ? 'bg-white text-[#022617] shadow-sm'
                  : 'text-[#eae8e3] hover:text-white hover:bg-[#1a3c2b]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">history_edu</span>
              <span>Field History</span>
            </button>

            <button
              onClick={() => onNavigate('remedies')}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentScreen === 'remedies'
                  ? 'bg-white text-[#022617] shadow-sm'
                  : 'text-[#eae8e3] hover:text-white hover:bg-[#1a3c2b]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">medical_services</span>
              <span>Organic Remedies</span>
            </button>

            <button
              onClick={() => onNavigate('nodes')}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentScreen === 'nodes'
                  ? 'bg-white text-[#022617] shadow-sm'
                  : 'text-[#eae8e3] hover:text-white hover:bg-[#1a3c2b]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">sensors</span>
              <span>14 Field Nodes</span>
            </button>

            <button
              onClick={() => onNavigate('admin')}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentScreen === 'admin'
                  ? 'bg-[#ff7d51] text-[#2f1500] font-bold shadow-sm'
                  : 'text-[#ffdbd0] hover:bg-[#ff7d51]/20'
              }`}
            >
              <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
              <span>Admin Console</span>
              {userRole === 'admin' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#361900]"></span>
              )}
            </button>
          </nav>

          {/* Right Status & Profile Controls */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Offline Mode Switcher */}
            <button
              onClick={onToggleOffline}
              title={isOffline ? 'Offline Field Mode active (local caching)' : 'Live Agro-Network connected'}
              className={`px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border ${
                isOffline
                  ? 'bg-[#552b00] border-[#ffb77d] text-[#ffdcc3]'
                  : 'bg-[#1a3c2b] border-[#82a790]/30 text-[#c5ecd3]'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isOffline ? 'bg-[#ffb77d]' : 'bg-[#c5ecd3] animate-pulse'
                }`}
              ></span>
              <span className="hidden sm:inline font-mono">
                {isOffline ? 'Offline Field Mode' : '14 Nodes Online'}
              </span>
            </button>

            {/* User badge */}
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-xs font-semibold text-white truncate max-w-[130px]">
                {userEmail}
              </span>
              <span className="text-[10px] text-[#82a790] uppercase tracking-wider font-bold">
                {userRole === 'admin' ? 'Fleet Admin (RBAC)' : 'Grower / Farmer'}
              </span>
            </div>

            {/* Sign Out / Return to Auth Screen */}
            <button
              onClick={onSignOut}
              className="px-3 py-1.5 rounded-full bg-[#1a3c2b] hover:bg-[#2c4e3b] text-[#eae8e3] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-[#82a790]/20"
              title="Sign out and return to welcome login screen"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden overflow-x-auto py-2.5 gap-2 border-t border-[#1a3c2b] scrollbar-none">
          <button
            onClick={() => onNavigate('scanner')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-1 ${
              currentScreen === 'scanner' ? 'bg-white text-[#022617]' : 'text-[#eae8e3]'
            }`}
          >
            <span className="material-symbols-outlined text-xs">photo_camera</span>
            Scanner
          </button>
          <button
            onClick={() => onNavigate('history')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-1 ${
              currentScreen === 'history' ? 'bg-white text-[#022617]' : 'text-[#eae8e3]'
            }`}
          >
            <span className="material-symbols-outlined text-xs">history_edu</span>
            Field History
          </button>
          <button
            onClick={() => onNavigate('remedies')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-1 ${
              currentScreen === 'remedies' ? 'bg-white text-[#022617]' : 'text-[#eae8e3]'
            }`}
          >
            <span className="material-symbols-outlined text-xs">medical_services</span>
            Remedies
          </button>
          <button
            onClick={() => onNavigate('nodes')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-1 ${
              currentScreen === 'nodes' ? 'bg-white text-[#022617]' : 'text-[#eae8e3]'
            }`}
          >
            <span className="material-symbols-outlined text-xs">sensors</span>
            14 Nodes
          </button>
          <button
            onClick={() => onNavigate('admin')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-1 ${
              currentScreen === 'admin' ? 'bg-[#ff7d51] text-[#2f1500]' : 'text-[#ffdbd0]'
            }`}
          >
            <span className="material-symbols-outlined text-xs">admin_panel_settings</span>
            Admin
          </button>
        </div>
      </div>
    </header>
  );
};
