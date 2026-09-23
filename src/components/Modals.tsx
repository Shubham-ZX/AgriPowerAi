import React, { useState } from 'react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail: string;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  defaultEmail,
}) => {
  const [email, setEmail] = useState(defaultEmail);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#eae8e3] relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#727973] hover:text-[#1b1c19] cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#ffdcc3] flex items-center justify-center text-[#a53b13]">
            <span className="material-symbols-outlined text-lg">lock_reset</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#a53b13]">
            Grower Security Reset
          </span>
        </div>

        <h3 className="font-serif text-2xl font-bold text-[#1b1c19] mb-1">
          Recover Field Access
        </h3>
        <p className="text-xs text-[#414843] mb-5">
          Enter your registered grower or admin email. We will transmit an encrypted 6-digit field bypass code.
        </p>

        {isSubmitted ? (
          <div className="p-4 rounded-2xl bg-[#c5ecd3]/50 text-[#022617] text-xs font-semibold flex items-center gap-3">
            <span className="material-symbols-outlined text-xl text-[#022617]">mark_email_read</span>
            <div>
              <span>Verification code dispatched to {email}!</span>
              <span className="block text-[11px] font-normal text-[#414843] mt-0.5">
                Check your SMS or inbox for field access.
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#414843]">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@agripower.ai"
                className="w-full px-4 py-2.5 rounded-xl bg-[#f0eee9] text-xs text-[#1b1c19] focus:outline-none focus:bg-[#e4e2dd]"
              />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full text-xs font-semibold text-[#414843] hover:bg-[#f0eee9] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-[#a53b13] hover:bg-[#6c1e00] text-white text-xs font-semibold cursor-pointer shadow-sm"
              >
                Send 6-Digit Code
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export const CreateAccountModal: React.FC<CreateAccountModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [farmZone, setFarmZone] = useState('Zone 4 - Solanaceae Row Cluster');
  const [primaryCrop, setPrimaryCrop] = useState('Tomatoes & Peppers');
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDone(true);
    setTimeout(() => {
      setIsDone(false);
      onSuccess(email);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#eae8e3] relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#727973] hover:text-[#1b1c19] cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#c5ecd3] flex items-center justify-center text-[#022617]">
            <span className="material-symbols-outlined text-lg">potted_plant</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#022617]">
            Grower Onboarding
          </span>
        </div>

        <h3 className="font-serif text-2xl font-bold text-[#1b1c19] mb-1">
          Join AgriPower.AI
        </h3>
        <p className="text-xs text-[#414843] mb-5">
          Access the pocket agronomist, automated leaf diagnostics, and zero-cost organic formulations.
        </p>

        {isDone ? (
          <div className="p-4 rounded-2xl bg-[#c5ecd3] text-[#002112] text-xs font-semibold flex items-center gap-3">
            <span className="material-symbols-outlined text-xl">verified</span>
            <div>
              <span>Grower account registered!</span>
              <span className="block text-[11px] font-normal mt-0.5">
                Connecting your plots to the nearest telemetry node...
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#414843]">Farmer / Farm Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Elena Vance (Highland Valley Farm)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f0eee9] text-xs text-[#1b1c19] focus:outline-none focus:bg-[#e4e2dd]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#414843]">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="elena@farm.org"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f0eee9] text-xs text-[#1b1c19] focus:outline-none focus:bg-[#e4e2dd]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#414843]">Primary Crop</label>
                <input
                  type="text"
                  value={primaryCrop}
                  onChange={(e) => setPrimaryCrop(e.target.value)}
                  placeholder="Tomatoes, Corn..."
                  className="w-full px-3 py-2.5 rounded-xl bg-[#f0eee9] text-xs text-[#1b1c19] focus:outline-none focus:bg-[#e4e2dd]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#414843]">Nearest Node</label>
                <select
                  value={farmZone}
                  onChange={(e) => setFarmZone(e.target.value)}
                  className="w-full px-2 py-2.5 rounded-xl bg-[#f0eee9] text-xs text-[#1b1c19] focus:outline-none focus:bg-[#e4e2dd]"
                >
                  <option>Zone 1 - North Valley</option>
                  <option>Zone 4 - Solanaceae</option>
                  <option>Zone 5 - Maize & Legume</option>
                  <option>Zone 10 - Potato Ridge</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full text-xs font-semibold text-[#414843] hover:bg-[#f0eee9] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-[#022617] hover:bg-[#1a3c2b] text-white text-xs font-semibold cursor-pointer shadow-sm"
              >
                Register & Enter Scanner
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
