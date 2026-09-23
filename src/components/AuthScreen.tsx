import React, { useState } from 'react';
import { UserRole } from '../types';

interface AuthScreenProps {
  onLogin: (role: UserRole, email: string) => void;
  onOpenForgotPassword: () => void;
  onOpenCreateAccount: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onLogin,
  onOpenForgotPassword,
  onOpenCreateAccount,
}) => {
  const [role, setRole] = useState<UserRole>('user');
  const [email, setEmail] = useState('farmer@agripower.ai');
  const [password, setPassword] = useState('FieldHarvest#99');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleRoleChange = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === 'admin') {
      setEmail('admin@agripower.ai');
      setPassword('AgronomyMaster2026!');
    } else {
      setEmail('farmer@agripower.ai');
      setPassword('FieldHarvest#99');
    }
  };

  const handleFillDemo = (demoRole: UserRole) => {
    handleRoleChange(demoRole);
    setToastMessage(`Loaded demo credentials for ${demoRole === 'admin' ? 'Fleet Administrator' : 'Standard Farmer'}`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setToastMessage(
      role === 'admin'
        ? 'Access granted. Initializing Regional Fleet & RBAC Console...'
        : 'Welcome back, Grower! Initializing Camera Leaf Scanner...'
    );

    setTimeout(() => {
      setIsSubmitting(false);
      onLogin(role, email);
    }, 900);
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row overflow-hidden bg-[#fbf9f4]">
      {/* Left Column: Botanical Forest Brand Hero */}
      <div className="w-full lg:w-1/2 bg-[#022617] text-white flex flex-col justify-between p-8 sm:p-12 lg:p-16 xl:p-20 relative overflow-hidden">
        {/* Atmospheric Ambient Glow and Foliage Geometry */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#1a3c2b]/50 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-[#ff7d51]/10 blur-3xl pointer-events-none"></div>

        {/* Top Brand Anchor */}
        <div className="relative z-10 flex flex-col items-start gap-8">
          <div className="flex items-center gap-3.5 group cursor-pointer">
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-[#fbf9f4] shadow-md transform transition-transform group-hover:scale-105 duration-300">
              <img
                alt="AgriPower.AI Leaf Sprout Logo"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida/AEtjO1X8y8K7-hmnxwhIQDzfSW_PwMApQHCspOXb2688w3N2AHzZq_dgH55gTtNr7OlgmVhEXydrELvzbu9wrOHzHCnkw-j42C_ZROAYDa42fUysw3WqRXi-JjwSBst_EOQ3pPCmKv79nUTl6naU43i4zpX6sd11C5Mktv1KCL3qTuh4hFcf7-_gznN10ih9yZTCJSyMo5ugwnnerM_8PTQO0o2xXxsDCMZEVLYvJvloKWpzs08xe_HE1qS5MA"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl text-[#fbf9f4] font-semibold tracking-tight">
                AgriPower<span className="text-[#ff7d51]">.AI</span>
              </span>
              <span className="text-xs text-[#82a790] tracking-wider uppercase font-semibold">
                Precision Agro-Intelligence
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1a3c2b]/80 border border-[#82a790]/20 text-[#c5ecd3] text-[11px] font-bold tracking-wider uppercase backdrop-blur-sm shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#ff7d51] animate-pulse"></span>
            <span>FOR EVERY FARMER, EVERYWHERE</span>
          </div>
        </div>

        {/* Center Narrative */}
        <div className="relative z-10 my-12 lg:my-0 flex flex-col max-w-xl">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] text-[#fbf9f4] leading-[1.1] mb-6 font-semibold">
            The agronomist <br className="hidden sm:inline" />
            <span className="italic text-[#ff7d51] font-normal">in your pocket.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#eae8e3]/90 mb-8 max-w-lg leading-relaxed font-normal">
            Diagnose leaf spots, hungry soil, and hungry pests from a single photo. Get organic, low-cost fixes you can start today — no lab, no jargon, no waiting.
          </p>

          {/* Feature Points with Terracotta Dots */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3.5 group">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff7d51] shadow-sm transform group-hover:scale-125 transition-transform duration-200"></div>
              <span className="text-lg text-[#fbf9f4] font-medium">50+ crop diseases recognised</span>
            </div>
            <div className="flex items-center gap-3.5 group">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff7d51] shadow-sm transform group-hover:scale-125 transition-transform duration-200"></div>
              <span className="text-lg text-[#fbf9f4] font-medium">Organic remedies you already own</span>
            </div>
            <div className="flex items-center gap-3.5 group">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff7d51] shadow-sm transform group-hover:scale-125 transition-transform duration-200"></div>
              <span className="text-lg text-[#fbf9f4] font-medium">Multi-language voice-friendly output</span>
            </div>
          </div>
        </div>

        {/* Live Scan Micro Badge & Footer */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 text-[#82a790] text-xs font-medium border-t border-[#1a3c2b]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c5ecd3] animate-pulse"></span>
            <span className="text-[#c5ecd3]">Field Node Status: Active across 14 zones</span>
          </div>
          <p className="text-[#e4e2dd]/70">
            © 2026 AgriPower.AI · Built for farmers
          </p>
        </div>
      </div>

      {/* Right Column: Tactile Auth Suite */}
      <div className="w-full lg:w-1/2 bg-[#f5f3ee] flex items-center justify-center p-6 sm:p-10 lg:p-14 relative">
        {/* Decorative ambient warm bloom */}
        <div className="absolute top-1/4 right-10 w-80 h-80 rounded-full bg-[#ffdcc3]/30 blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md bg-white rounded-[2rem] shadow-xl p-8 sm:p-10 relative z-10 flex flex-col border border-[#eae8e3]/80">
          {/* Header */}
          <div className="mb-6">
            <h2 className="font-serif text-3xl sm:text-[34px] text-[#1b1c19] mb-2 font-semibold">Welcome back.</h2>
            <p className="text-sm text-[#414843]">Sign in to scan crops and view your history.</p>
          </div>

          {/* Role Selector Switch Tabs */}
          <div className="grid grid-cols-2 p-1.5 mb-6 rounded-full bg-[#eae8e3] text-sm relative select-none">
            <button
              type="button"
              onClick={() => handleRoleChange('user')}
              className={`py-2 px-4 rounded-full text-sm text-center transition-all duration-200 font-semibold cursor-pointer ${
                role === 'user'
                  ? 'bg-white text-[#022617] shadow-sm'
                  : 'text-[#414843] hover:text-[#1b1c19]'
              }`}
            >
              User Sign In
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('admin')}
              className={`py-2 px-4 rounded-full text-sm text-center transition-all duration-200 font-semibold cursor-pointer ${
                role === 'admin'
                  ? 'bg-white text-[#022617] shadow-sm'
                  : 'text-[#414843] hover:text-[#1b1c19]'
              }`}
            >
              Admin Access (RBAC)
            </button>
          </div>

          {/* Role Badge Indicator banner */}
          <div
            className={`mb-6 px-4 py-3 rounded-2xl flex items-start gap-3 transition-colors duration-200 ${
              role === 'admin'
                ? 'bg-[#ffdcc3]/40 border border-[#eb851c]/20'
                : 'bg-[#eae8e3] border border-[#c1c8c1]/30'
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl mt-0.5 ${
                role === 'admin' ? 'text-[#a53b13]' : 'text-[#022617]'
              }`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {role === 'admin' ? 'admin_panel_settings' : 'eco'}
            </span>
            <div className="flex flex-col min-w-0">
              <span
                className={`text-xs font-bold tracking-tight ${
                  role === 'admin' ? 'text-[#a53b13]' : 'text-[#022617]'
                }`}
              >
                {role === 'admin' ? 'Role: Administrator (RBAC Protected)' : 'Role: Standard User'}
              </span>
              <span className="text-xs text-[#414843] truncate">
                {role === 'admin'
                  ? 'User Tracking, Node Fleet Activity, Logs & Yield Analytics'
                  : 'Crop Scanner, Diagnostic Feeds & Field History'}
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[#414843] font-semibold" htmlFor="email">
                Email address
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[#727973] text-lg pointer-events-none">
                  mail
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#f0eee9] text-[#1b1c19] text-sm focus:outline-none focus:bg-[#e4e2dd] focus:ring-1 focus:ring-[#022617] transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs text-[#414843] font-semibold" htmlFor="password">
                  Password
                </label>
                <button
                  type="button"
                  onClick={onOpenForgotPassword}
                  className="text-xs text-[#a53b13] hover:text-[#6c1e00] font-semibold transition-colors cursor-pointer"
                >
                  Forgot code?
                </button>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[#727973] text-lg pointer-events-none">
                  lock
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-11 pr-11 py-3 rounded-xl bg-[#f0eee9] text-[#1b1c19] text-sm focus:outline-none focus:bg-[#e4e2dd] focus:ring-1 focus:ring-[#022617] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-[#727973] hover:text-[#1b1c19] transition-colors flex items-center cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between mt-1 mb-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberSession}
                  onChange={(e) => setRememberSession(e.target.checked)}
                  className="w-4 h-4 rounded text-[#a53b13] focus:ring-0 accent-[#a53b13] cursor-pointer"
                />
                <span className="text-xs text-[#414843]">Remember field session (30d)</span>
              </label>
              <span className="text-xs text-[#022617] flex items-center gap-1 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#2c4e3b] animate-pulse"></span>
                Offline Ready
              </span>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-full bg-[#a53b13] text-white text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-md hover:bg-[#6c1e00] active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-75"
            >
              <span>
                {isSubmitting
                  ? 'Connecting to Node Network...'
                  : role === 'admin'
                  ? 'Enter Admin Console'
                  : 'Sign in'}
              </span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </form>

          {/* Secondary Redirect Action */}
          <div className="mt-6 text-center">
            <p className="text-xs text-[#414843]">
              New to AgriPower?{' '}
              <button
                type="button"
                onClick={onOpenCreateAccount}
                className="text-[#a53b13] font-bold hover:underline cursor-pointer"
              >
                Create an account
              </button>
            </p>
          </div>

          {/* Interactive Quick-Switch Demo Chips */}
          <div className="mt-7 pt-5 bg-[#f5f3ee]/80 border border-[#eae8e3] rounded-2xl p-4 flex flex-col gap-2.5">
            <span className="text-[11px] font-bold tracking-wider text-[#414843] uppercase">
              INTERACTIVE DEMO SWITCHER
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleFillDemo('user')}
                className="px-3.5 py-1.5 rounded-full bg-[#f0eee9] hover:bg-[#e4e2dd] text-[#022617] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-sm text-[#022617]">potted_plant</span>
                <span>Load Farmer Account</span>
              </button>
              <button
                type="button"
                onClick={() => handleFillDemo('admin')}
                className="px-3.5 py-1.5 rounded-full bg-[#f0eee9] hover:bg-[#e4e2dd] text-[#361900] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-sm text-[#a53b13]">shield_person</span>
                <span>Load Admin Credentials</span>
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          {toastMessage && (
            <div className="mt-4 p-3 rounded-xl bg-[#022617] text-white text-xs flex items-center gap-2.5 shadow-md animate-fade-in">
              <span className="material-symbols-outlined text-[#c5ecd3] text-base">check_circle</span>
              <span>{toastMessage}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
