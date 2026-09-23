# 🌱 AgriPower.AI

> **The agronomist in your pocket.**[cite: 4]

AgriPower.AI is an AI-powered agricultural web application designed to help farmers diagnose leaf spots, hungry soil, and pests from a single photo[cite: 4]. Our mission is to provide instant, organic, low-cost remedies in your local language — no lab, no jargon, no waiting[cite: 3, 4]. 

## ✨ Key Features

* **Vast Recognition Database**: Identifies 50+ crop diseases accurately[cite: 1, 4].
* **Lightning Fast**: Delivers AI diagnosis in under 5 seconds on average.
* **Actionable Solutions**: Provides 100% organic remedies using materials farmers already own[cite: 1, 4].
* **Accessible Output**: Features multi-language, voice-friendly results[cite: 4].
* **24/7 Availability**: Mobile-ready and always in your pocket[cite: 1, 3].
* **Role-Based Access Control (RBAC)**: Secure separation between standard users and system administrators.

## 🛠️ System Architecture

AgriPower.AI is built with a dual-portal architecture to serve both end-users and platform managers:

### 1. User Portal
A seamless, farmer-focused interface featuring:
* **Smart Scanner**: Upload or capture photos of leaves and soil with optional crop-specific targeting[cite: 2].
* **History & Tips**: Track past diagnoses and learn new agricultural tips[cite: 2].

### 2. Admin Portal
A secure, restricted dashboard for system administrators featuring:
* **User Tracking**: Monitor real-time user activities, uploads, and diagnosis results.
* **Analytics & Reports**: Visualize system usage, common crop diseases, and user growth.

## 🚀 How It Works

1. **01 Snap it**: Take one clear photo of a leaf or the soil[cite: 1].
2. **02 AI reads it**: The AI processes the image and identifies the problem in seconds[cite: 1].
3. **03 Fix it**: Apply the suggested organic remedies immediately[cite: 1].

## 💻 Tech Stack

### Frontend & Core
* **Framework**: React 19 (`react ^19.0.1` / `react-dom ^19.0.1`) for functional component architecture and reactive diagnostic states.
* **Language**: TypeScript (`typescript ^7.0.2`) for strict type safety across agronomic datasets and RBAC.
* **Build Tooling**: Vite 8 (`vite ^8.3.0`) with `@vitejs/plugin-react` for HMR and optimized TSX compilation.

### Styling & Design System
* **CSS Framework**: Tailwind CSS v4 (`tailwindcss ^4.3.3` & `@tailwindcss/vite ^4.3.3`).
* **Color Palette**: Custom earthy editorial brand featuring Deep Botanical Green (`#022617`, `#1a3c2b`), Terracotta Rust (`#a53b13`, `#ff7d51`), and Sun-bleached Cream & Ecru (`#fbf9f4`, `#f5f3ee`, `#f0eee9`).
* **Animations**: Custom CSS keyframes (`animate-agro-scan`) for viewfinder reticles and holographic laser scans.
* **Typography**: Google Fonts Playfair Display (Serif) and Plus Jakarta Sans (Sans-serif).
* **Iconography**: Google Material Symbols Outlined and Lucide React (`lucide-react ^0.546.0`).

### Backend & AI Integration
* **Server**: Node.js with Express (`express ^4.21.2`) and `tsx` for full-stack routing and API proxies.
* **AI Engine**: Google Gen AI SDK (`@google/genai ^2.4.0`) integrated with Gemini multimodal models for dynamic image-based leaf diagnostics.

### Client-Side APIs
* **Web Speech API**: Powers native, low-latency multi-language voice outputs (English, Spanish, Hindi, Swahili).
* **HTML5 File & Media Capture**: Supports direct device gallery uploads and live mobile camera viewfinders.
