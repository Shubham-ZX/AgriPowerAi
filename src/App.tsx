/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveScreen, FieldHistoryRecord, FieldNode, UserRole } from './types';
import { INITIAL_FIELD_HISTORY, INITIAL_FIELD_NODES } from './data/agroData';
import { AuthScreen } from './components/AuthScreen';
import { Navigation } from './components/Navigation';
import { CropScanner } from './components/CropScanner';
import { FieldHistory } from './components/FieldHistory';
import { RemedyCompendium } from './components/RemedyCompendium';
import { FieldNodesWeather } from './components/FieldNodesWeather';
import { AdminConsole } from './components/AdminConsole';
import { ForgotPasswordModal, CreateAccountModal } from './components/Modals';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('auth');
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [userEmail, setUserEmail] = useState<string>('farmer@agripower.ai');
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [nodes, setNodes] = useState<FieldNode[]>(INITIAL_FIELD_NODES);
  const [history, setHistory] = useState<FieldHistoryRecord[]>(INITIAL_FIELD_HISTORY);

  // Modals
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);

  const handleLogin = (role: UserRole, email: string) => {
    setUserRole(role);
    setUserEmail(email);
    setIsAuthenticated(true);
    if (role === 'admin') {
      setCurrentScreen('admin');
    } else {
      setCurrentScreen('scanner');
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setCurrentScreen('auth');
  };

  const handleSaveToHistory = (newRecord: FieldHistoryRecord) => {
    setHistory([newRecord, ...history]);
  };

  const handleUpdateHistoryStatus = (
    id: string,
    newStatus: 'Active Treatment' | 'Resolved' | 'Monitoring'
  ) => {
    setHistory((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, status: newStatus } : rec))
    );
  };

  const handlePingNode = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === nodeId
          ? {
              ...n,
              lastPing: 'Just now',
              soilMoisture: Math.min(100, Math.max(20, n.soilMoisture + Math.floor(Math.random() * 3 - 1))),
            }
          : n
      )
    );
  };

  const handlePingAllNodes = () => {
    setNodes((prev) =>
      prev.map((n) => ({
        ...n,
        lastPing: 'Just now',
      }))
    );
  };

  const handleBroadcastAlert = (alertText: string) => {
    // Flag Zone 4 node as warning
    setNodes((prev) =>
      prev.map((n) => (n.id === 'NODE-04' ? { ...n, status: 'warning', sporeRiskLevel: 'Severe' } : n))
    );
  };

  return (
    <div className="min-h-screen bg-[#fbf9f4] text-[#1b1c19] flex flex-col font-sans selection:bg-[#ff7d51]/20 selection:text-[#a53b13]">
      {/* Quick Screen Switcher Toolbar (helpful for evaluating all screens at any time) */}
      <div className="bg-[#1a3c2b] text-white text-[11px] py-1.5 px-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#022617] select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff7d51]"></span>
          <span className="font-bold tracking-wider uppercase text-[#c5ecd3]">
            AgriPower.AI Screen Navigator:
          </span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => {
              setCurrentScreen('auth');
              setIsAuthenticated(false);
            }}
            className={`px-2.5 py-0.5 rounded-full cursor-pointer transition-colors ${
              currentScreen === 'auth' && !isAuthenticated
                ? 'bg-[#ff7d51] text-[#2f1500] font-bold'
                : 'text-[#c5ecd3] hover:bg-[#022617]'
            }`}
          >
            1. Welcome / Auth Screen
          </button>
          <button
            onClick={() => {
              setIsAuthenticated(true);
              setUserRole('user');
              setCurrentScreen('scanner');
            }}
            className={`px-2.5 py-0.5 rounded-full cursor-pointer transition-colors ${
              currentScreen === 'scanner' && isAuthenticated
                ? 'bg-[#ff7d51] text-[#2f1500] font-bold'
                : 'text-[#c5ecd3] hover:bg-[#022617]'
            }`}
          >
            2. Crop Leaf Scanner
          </button>
          <button
            onClick={() => {
              setIsAuthenticated(true);
              setCurrentScreen('history');
            }}
            className={`px-2.5 py-0.5 rounded-full cursor-pointer transition-colors ${
              currentScreen === 'history'
                ? 'bg-[#ff7d51] text-[#2f1500] font-bold'
                : 'text-[#c5ecd3] hover:bg-[#022617]'
            }`}
          >
            3. Field History
          </button>
          <button
            onClick={() => {
              setIsAuthenticated(true);
              setCurrentScreen('remedies');
            }}
            className={`px-2.5 py-0.5 rounded-full cursor-pointer transition-colors ${
              currentScreen === 'remedies'
                ? 'bg-[#ff7d51] text-[#2f1500] font-bold'
                : 'text-[#c5ecd3] hover:bg-[#022617]'
            }`}
          >
            4. Organic Remedies
          </button>
          <button
            onClick={() => {
              setIsAuthenticated(true);
              setCurrentScreen('nodes');
            }}
            className={`px-2.5 py-0.5 rounded-full cursor-pointer transition-colors ${
              currentScreen === 'nodes'
                ? 'bg-[#ff7d51] text-[#2f1500] font-bold'
                : 'text-[#c5ecd3] hover:bg-[#022617]'
            }`}
          >
            5. 14 Field Nodes
          </button>
          <button
            onClick={() => {
              setIsAuthenticated(true);
              setUserRole('admin');
              setUserEmail('admin@agripower.ai');
              setCurrentScreen('admin');
            }}
            className={`px-2.5 py-0.5 rounded-full cursor-pointer transition-colors ${
              currentScreen === 'admin'
                ? 'bg-[#ff7d51] text-[#2f1500] font-bold'
                : 'text-[#ffdbd0] hover:bg-[#022617]'
            }`}
          >
            6. Admin RBAC Command
          </button>
        </div>
      </div>

      {/* Main Authenticated Header Navigation */}
      {isAuthenticated && currentScreen !== 'auth' && (
        <Navigation
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
          userRole={userRole}
          userEmail={userEmail}
          isOffline={isOffline}
          onToggleOffline={() => setIsOffline(!isOffline)}
          onSignOut={handleSignOut}
        />
      )}

      {/* Screen Views */}
      <main className="flex-1 flex flex-col">
        {!isAuthenticated || currentScreen === 'auth' ? (
          <AuthScreen
            onLogin={handleLogin}
            onOpenForgotPassword={() => setIsForgotPasswordOpen(true)}
            onOpenCreateAccount={() => setIsCreateAccountOpen(true)}
          />
        ) : currentScreen === 'scanner' ? (
          <CropScanner onSaveToHistory={handleSaveToHistory} isOffline={isOffline} />
        ) : currentScreen === 'history' ? (
          <FieldHistory
            history={history}
            onUpdateStatus={handleUpdateHistoryStatus}
            onNavigateToScanner={() => setCurrentScreen('scanner')}
          />
        ) : currentScreen === 'remedies' ? (
          <RemedyCompendium />
        ) : currentScreen === 'nodes' ? (
          <FieldNodesWeather nodes={nodes} onPingNode={handlePingNode} />
        ) : currentScreen === 'admin' ? (
          <AdminConsole
            nodes={nodes}
            onPingAllNodes={handlePingAllNodes}
            onBroadcastAlert={handleBroadcastAlert}
            onSwitchToFarmer={() => {
              setUserRole('user');
              setCurrentScreen('scanner');
            }}
          />
        ) : null}
      </main>

      {/* Modals */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        defaultEmail={userEmail}
      />
      <CreateAccountModal
        isOpen={isCreateAccountOpen}
        onClose={() => setIsCreateAccountOpen(false)}
        onSuccess={(email) => {
          handleLogin('user', email);
        }}
      />
    </div>
  );
}
