import React, { useState, useRef, useEffect } from 'react';
import { DiseaseDiagnosis, FieldHistoryRecord } from '../types';
import { CROP_PRESETS } from '../data/agroData';

interface CropScannerProps {
  onSaveToHistory: (record: FieldHistoryRecord) => void;
  isOffline: boolean;
}

export const CropScanner: React.FC<CropScannerProps> = ({ onSaveToHistory, isOffline }) => {
  const [selectedCrop, setSelectedCrop] = useState<DiseaseDiagnosis>(CROP_PRESETS[0]);
  const [currentImage, setCurrentImage] = useState<string>(CROP_PRESETS[0].sampleImageUrl);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState('');
  const [activeRemedyTab, setActiveRemedyTab] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'es' | 'hi' | 'sw'>('en');
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [plotName, setPlotName] = useState('Plot 4 - West Terrace');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stop speech when unmounting or switching diagnosis
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSelectPreset = (preset: DiseaseDiagnosis) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingVoice(false);
    setSelectedCrop(preset);
    setCurrentImage(preset.sampleImageUrl);
    setActiveRemedyTab(0);
    setSaveSuccess(false);

    // Trigger a brief scan animation to simulate analysis
    setIsScanning(true);
    setScanStep('Isolating plant leaf geometry...');
    setTimeout(() => setScanStep('Analyzing chlorotic ring lesions & spore clusters...'), 500);
    setTimeout(() => setScanStep('Querying 50+ pathogen genome profiles...'), 1000);
    setTimeout(() => {
      setIsScanning(false);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCurrentImage(event.target.result as string);
          // Run analysis
          setIsScanning(true);
          setScanStep('Uploading leaf sample from device...');
          setTimeout(() => setScanStep('Segmenting foliage and lesion color channels...'), 700);
          setTimeout(() => setScanStep('Matching spectral signature with field models...'), 1400);
          setTimeout(() => {
            setIsScanning(false);
            // Default to Tomato or first preset for uploaded image
            setSelectedCrop(CROP_PRESETS[0]);
          }, 2100);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlayVoice = () => {
    if (isPlayingVoice) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingVoice(false);
      return;
    }

    const text = selectedCrop.voiceScripts[selectedLanguage];
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (selectedLanguage === 'es') utterance.lang = 'es-ES';
      else if (selectedLanguage === 'hi') utterance.lang = 'hi-IN';
      else if (selectedLanguage === 'sw') utterance.lang = 'sw';
      else utterance.lang = 'en-US';

      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingVoice(true);
    } else {
      // Fallback timer simulation
      setIsPlayingVoice(true);
      setTimeout(() => setIsPlayingVoice(false), 5000);
    }
  };

  const handleSaveDiagnosis = () => {
    const newRecord: FieldHistoryRecord = {
      id: `SCAN-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      crop: selectedCrop.cropName.split(' ')[0],
      plot: plotName,
      diagnosis: selectedCrop.diseaseName,
      severity: selectedCrop.severity,
      status: 'Active Treatment',
      remedyApplied: selectedCrop.organicRemedies[0]?.title || 'Organic Protocol',
      notes: `Identified with ${selectedCrop.confidence}% confidence. ${selectedCrop.affectedArea}. Recommended: ${selectedCrop.organicRemedies[0]?.title}`,
      imageUrl: currentImage,
    };
    onSaveToHistory(newRecord);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Top Banner / Headline */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a3c2b] text-[#c5ecd3] text-[11px] font-bold tracking-wider uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff7d51]"></span>
            <span>DIAGNOSTIC SUITE & REMEDY DISPENSER</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1b1c19] font-bold tracking-tight">
            Crop Leaf Scanner & <span className="italic text-[#a53b13]">Instant Diagnosis</span>
          </h1>
          <p className="text-sm sm:text-base text-[#414843] mt-1 max-w-2xl">
            Diagnose leaf spots, hungry soil, and pests from a single photo. Get organic, low-cost remedies you already own.
          </p>
        </div>

        {/* Offline indicator badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0eee9] border border-[#c1c8c1]/40 text-xs text-[#414843]">
          <span
            className={`w-2 h-2 rounded-full ${
              isOffline ? 'bg-[#ffb77d]' : 'bg-[#2c4e3b] animate-pulse'
            }`}
          ></span>
          <span>{isOffline ? 'Offline Field Queue Ready' : 'Edge Agro-Model v3.8 Active'}</span>
        </div>
      </div>

      {/* Preset Selector Carousel */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#414843] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-[#a53b13]">spa</span>
            Select Sample Field Preset to Test Instant Scan:
          </span>
          <span className="text-xs text-[#727973]">6 presets loaded</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CROP_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`p-2.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col gap-2 ${
                selectedCrop.id === preset.id
                  ? 'bg-[#022617] text-white border-[#022617] shadow-md scale-[1.02]'
                  : 'bg-white text-[#1b1c19] border-[#eae8e3] hover:border-[#82a790] hover:bg-[#fbf9f4]'
              }`}
            >
              <div className="w-full h-20 rounded-xl overflow-hidden relative">
                <img
                  src={preset.sampleImageUrl}
                  alt={preset.diseaseName}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-1 right-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                    preset.severity === 'Severe' || preset.severity === 'High'
                      ? 'bg-[#ba1a1a] text-white'
                      : preset.severity === 'Moderate'
                      ? 'bg-[#ff7d51] text-[#2f1500]'
                      : preset.severity === 'Healthy'
                      ? 'bg-[#2c4e3b] text-[#c5ecd3]'
                      : 'bg-[#ffb77d] text-[#2f1500]'
                  }`}
                >
                  {preset.severity}
                </span>
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold truncate">{preset.cropName.split('(')[0]}</h4>
                <p
                  className={`text-[11px] truncate ${
                    selectedCrop.id === preset.id ? 'text-[#82a790]' : 'text-[#727973]'
                  }`}
                >
                  {preset.diseaseName}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Diagnostic Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Viewfinder & Crop Image (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="bg-white rounded-3xl p-5 shadow-lg border border-[#eae8e3] relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#022617] uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#022617]">document_scanner</span>
                Optical Viewfinder
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#f0eee9] text-[#414843]">
                1080p Macro Lens
              </span>
            </div>

            {/* Viewfinder Canvas */}
            <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-black/90 group shadow-inner">
              <img
                src={currentImage}
                alt="Analyzed leaf specimen"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Viewfinder Targeting Overlays */}
              <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 border-t-2 border-l-2 border-[#ff7d51]"></div>
                  <div className="w-8 h-8 border-t-2 border-r-2 border-[#ff7d51]"></div>
                </div>
                {/* Center crosshair */}
                <div className="self-center flex items-center justify-center w-12 h-12 rounded-full border border-white/40">
                  <div className="w-2 h-2 rounded-full bg-[#ff7d51]"></div>
                </div>
                <div className="flex justify-between items-end">
                  <div className="w-8 h-8 border-b-2 border-l-2 border-[#ff7d51]"></div>
                  <div className="w-8 h-8 border-b-2 border-r-2 border-[#ff7d51]"></div>
                </div>
              </div>

              {/* Holographic Scanning Laser Animation */}
              {isScanning && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#ff7d51] to-transparent shadow-[0_0_15px_#ff7d51] animate-agro-scan pointer-events-none"></div>
              )}

              {/* Scanning status pill overlay */}
              {isScanning && (
                <div className="absolute inset-0 bg-[#022617]/70 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white">
                  <div className="w-12 h-12 rounded-full border-3 border-[#c5ecd3] border-t-transparent animate-spin mb-3"></div>
                  <span className="font-serif text-lg font-semibold text-[#fbf9f4]">
                    AI Agro-Diagnosis Running
                  </span>
                  <span className="text-xs text-[#82a790] mt-1 font-mono">{scanStep}</span>
                </div>
              )}

              {/* Bottom tag on image */}
              <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff7d51] animate-ping"></span>
                  <span className="font-medium truncate max-w-[180px]">{selectedCrop.cropName}</span>
                </div>
                <span className="font-mono text-[#c5ecd3] font-bold">{selectedCrop.confidence}% match</span>
              </div>
            </div>

            {/* Upload or Camera Capture Actions */}
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="py-2.5 px-3 rounded-xl bg-[#f0eee9] hover:bg-[#e4e2dd] text-[#022617] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#c1c8c1]/40"
              >
                <span className="material-symbols-outlined text-base">upload_file</span>
                <span>Upload Leaf Photo</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  fileInputRef.current?.setAttribute('capture', 'environment');
                  fileInputRef.current?.click();
                }}
                className="py-2.5 px-3 rounded-xl bg-[#022617] hover:bg-[#1a3c2b] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-base">photo_camera</span>
                <span>Take Live Photo</span>
              </button>
            </div>

            {/* Quick Field Plot Assignment */}
            <div className="mt-4 pt-4 border-t border-[#eae8e3] flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#414843] flex items-center justify-between">
                <span>Assign to Field Plot:</span>
                <span className="text-[11px] text-[#727973]">Optional</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={plotName}
                  onChange={(e) => setPlotName(e.target.value)}
                  placeholder="e.g. Plot 4A - North Terraces"
                  className="w-full px-3 py-2 rounded-xl bg-[#f0eee9] text-xs text-[#1b1c19] focus:outline-none focus:bg-[#e4e2dd]"
                />
                <button
                  type="button"
                  onClick={handleSaveDiagnosis}
                  className="px-4 py-2 rounded-xl bg-[#a53b13] hover:bg-[#6c1e00] text-white text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">bookmark</span>
                  <span>Save Log</span>
                </button>
              </div>
              {saveSuccess && (
                <div className="text-[11px] text-[#022617] font-semibold flex items-center gap-1 bg-[#c5ecd3]/40 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-sm text-[#022617]">check_circle</span>
                  <span>Successfully logged to Field History!</span>
                </div>
              )}
            </div>
          </div>

          {/* Multi-language Voice-Friendly Output Player Card */}
          <div className="bg-[#022617] text-white rounded-3xl p-5 shadow-lg border border-[#1a3c2b] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ff7d51] text-xl">record_voice_over</span>
                <span className="font-serif text-base font-semibold">Voice-Friendly Output</span>
              </div>
              {/* Language Selector */}
              <div className="flex rounded-full bg-[#1a3c2b] p-0.5 border border-[#82a790]/20">
                {(['en', 'es', 'hi', 'sw'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                        window.speechSynthesis.cancel();
                      }
                      setIsPlayingVoice(false);
                      setSelectedLanguage(lang);
                    }}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase transition-colors cursor-pointer ${
                      selectedLanguage === lang
                        ? 'bg-[#ff7d51] text-[#2f1500]'
                        : 'text-[#eae8e3] hover:text-white'
                    }`}
                  >
                    {lang === 'en' ? 'EN' : lang === 'es' ? 'ES' : lang === 'hi' ? 'HI' : 'SW'}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-[#82a790] leading-relaxed">
              Designed for growers listening while walking rows with soiled hands. Plays the immediate diagnosis and step-by-step organic remedies aloud.
            </p>

            <div className="bg-[#1a3c2b] p-3.5 rounded-2xl flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePlayVoice}
                className={`w-11 h-11 rounded-full flex items-center justify-center text-white transition-transform active:scale-95 cursor-pointer shadow-md shrink-0 ${
                  isPlayingVoice ? 'bg-[#ba1a1a]' : 'bg-[#ff7d51] text-[#2f1500]'
                }`}
              >
                <span className="material-symbols-outlined text-2xl">
                  {isPlayingVoice ? 'stop' : 'volume_up'}
                </span>
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">
                    {isPlayingVoice ? 'Reading Field Remedy Aloud...' : 'Listen to Spoken Diagnosis'}
                  </span>
                  {isPlayingVoice && (
                    <div className="flex items-center gap-0.5 h-3">
                      <span className="w-1 bg-[#ff7d51] h-3 animate-pulse"></span>
                      <span className="w-1 bg-[#ff7d51] h-2 animate-pulse delay-100"></span>
                      <span className="w-1 bg-[#ff7d51] h-4 animate-pulse delay-200"></span>
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-[#eae8e3]/80 truncate mt-0.5">
                  {selectedCrop.voiceScripts[selectedLanguage]}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: In-Depth Agronomic Diagnosis & Organic Remedies (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Main Diagnosis Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-[#eae8e3]">
            {/* Header Badge Row */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#727973]">
                  Diagnostic Report
                </span>
                <span className="text-xs text-[#c1c8c1]">·</span>
                <span className="text-xs font-mono text-[#022617] font-semibold">
                  Ref: {selectedCrop.id.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    selectedCrop.severity === 'Severe' || selectedCrop.severity === 'High'
                      ? 'bg-[#ffdad6] text-[#ba1a1a]'
                      : selectedCrop.severity === 'Moderate'
                      ? 'bg-[#ffdcc3] text-[#a53b13]'
                      : selectedCrop.severity === 'Healthy'
                      ? 'bg-[#c5ecd3] text-[#022617]'
                      : 'bg-[#f0eee9] text-[#414843]'
                  }`}
                >
                  Severity: {selectedCrop.severity}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#1a3c2b] text-[#c5ecd3] text-xs font-bold font-mono">
                  {selectedCrop.confidence}% Confidence
                </span>
              </div>
            </div>

            {/* Disease Titles */}
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1b1c19] font-bold">
              {selectedCrop.diseaseName}
            </h2>
            <p className="font-serif italic text-sm text-[#a53b13] mt-0.5">
              Scientific Identifier: {selectedCrop.scientificName}
            </p>

            {/* Diagnostic Summary */}
            <p className="text-sm sm:text-base text-[#414843] mt-4 leading-relaxed bg-[#fbf9f4] p-4 rounded-2xl border border-[#f0eee9]">
              {selectedCrop.summary}
            </p>

            {/* Symptoms Detected */}
            <div className="mt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#022617] mb-2.5 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#a53b13]">checklist</span>
                Detected Leaf Pathologies:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedCrop.symptoms.map((symptom, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-xl bg-[#f5f3ee] text-xs text-[#1b1c19]"
                  >
                    <span className="material-symbols-outlined text-sm text-[#a53b13] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>{symptom}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Organic Remedies Section: "Organic remedies you already own" */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-[#eae8e3]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-[#eae8e3]">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#a53b13] uppercase tracking-wider mb-1">
                  <span className="material-symbols-outlined text-sm">energy_savings_leaf</span>
                  Organic stewardship protocol
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#1b1c19] font-bold">
                  Organic Remedies You Already Own
                </h3>
              </div>

              {/* Remedy tab buttons */}
              {selectedCrop.organicRemedies.length > 1 && (
                <div className="flex bg-[#f0eee9] p-1 rounded-full">
                  {selectedCrop.organicRemedies.map((rem, idx) => (
                    <button
                      key={rem.id}
                      onClick={() => setActiveRemedyTab(idx)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        activeRemedyTab === idx
                          ? 'bg-white text-[#022617] shadow-sm'
                          : 'text-[#414843] hover:text-[#1b1c19]'
                      }`}
                    >
                      Option {idx + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Remedy Content */}
            {selectedCrop.organicRemedies[activeRemedyTab] && (() => {
              const remedy = selectedCrop.organicRemedies[activeRemedyTab];
              return (
                <div className="mt-6 flex flex-col gap-6">
                  {/* Title & Economics Pill */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#f5f3ee] p-4 rounded-2xl">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#022617]">
                        {remedy.title}
                      </h4>
                      <p className="text-xs text-[#a53b13] font-medium">{remedy.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-[#727973] uppercase font-bold block">
                          Cost Per Acre
                        </span>
                        <span className="text-sm font-bold text-[#022617] font-mono">
                          {remedy.costPerAcre}
                        </span>
                      </div>
                      <div className="h-7 w-[1px] bg-[#c1c8c1]"></div>
                      <div className="text-right">
                        <span className="text-[10px] text-[#727973] uppercase font-bold block">
                          Economics
                        </span>
                        <span className="text-xs font-bold text-[#2c4e3b]">
                          {remedy.savingVsChemical}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Farmstead Ingredients Needed */}
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#022617] mb-3 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-[#ff7d51]">kitchen</span>
                      Ingredients Available from Kitchen & Farmstead:
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {remedy.ingredients.map((ing, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-2xl bg-[#fbf9f4] border border-[#f0eee9] flex flex-col gap-1"
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-xs font-bold text-[#1b1c19]">{ing.item}</span>
                            <span className="text-xs font-mono font-bold text-[#a53b13] bg-[#ffdcc3]/50 px-2 py-0.5 rounded">
                              {ing.amount}
                            </span>
                          </div>
                          {ing.note && (
                            <span className="text-[11px] text-[#727973] leading-tight">{ing.note}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step-by-Step Preparation */}
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#022617] mb-3 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-[#022617]">science</span>
                      Preparation & Spraying Steps:
                    </h5>
                    <div className="flex flex-col gap-2.5">
                      {remedy.steps.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl bg-[#f5f3ee] text-xs text-[#1b1c19] leading-relaxed"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#022617] text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Application Notes & Weather Windows */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-[#ffdcc3]/30 border border-[#ffdbd0] flex flex-col gap-1">
                      <span className="text-xs font-bold text-[#a53b13] flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        Optimal Application Window
                      </span>
                      <p className="text-xs text-[#414843] leading-relaxed">
                        {remedy.applicationNotes}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#c5ecd3]/30 border border-[#a9cfb7] flex flex-col gap-1">
                      <span className="text-xs font-bold text-[#022617] flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">event_repeat</span>
                        Re-Application Frequency
                      </span>
                      <p className="text-xs text-[#414843] leading-relaxed">{remedy.frequency}</p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};
