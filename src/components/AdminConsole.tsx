import React, { useState } from 'react';
import { FieldNode, RegionalOutbreakAlert } from '../types';
import { REGIONAL_OUTBREAK_ALERTS } from '../data/agroData';

interface AdminConsoleProps {
  nodes: FieldNode[];
  onPingAllNodes: () => void;
  onBroadcastAlert: (alertText: string) => void;
  onSwitchToFarmer: () => void;
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({
  nodes,
  onPingAllNodes,
  onBroadcastAlert,
  onSwitchToFarmer,
}) => {
  const [alerts, setAlerts] = useState<RegionalOutbreakAlert[]>(REGIONAL_OUTBREAK_ALERTS);
  const [newAdvisoryText, setNewAdvisoryText] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [pingStatus, setPingStatus] = useState<string | null>(null);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdvisoryText.trim()) return;

    const newAlert: RegionalOutbreakAlert = {
      id: `ALERT-${Date.now().toString().slice(-4)}`,
      disease: 'Emergency Regional Spore Alert',
      zone: 'All 14 Monitored Sectors',
      crop: 'Regional Horticultural Crops',
      incidentCount: 52,
      riskTrend: 'rising',
      advisory: newAdvisoryText,
      time: 'Just now'
    };

    setAlerts([newAlert, ...alerts]);
    onBroadcastAlert(newAdvisoryText);
    setNewAdvisoryText('');
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 3000);
  };

  const handleTriggerPingAll = () => {
    setPingStatus('Pinging all 14 node telemetry antennas...');
    onPingAllNodes();
    setTimeout(() => {
      setPingStatus('All 14 nodes replied in 142ms. Fleet synchronized.');
      setTimeout(() => setPingStatus(null), 3000);
    }, 1200);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#361900] text-[#ffdcc3] text-[11px] font-bold tracking-wider uppercase mb-2">
            <span className="material-symbols-outlined text-xs text-[#ff7d51]">security</span>
            <span>ROLE-BASED ACCESS CONTROL (RBAC) · FLEET HEADQUARTERS</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1b1c19] font-bold tracking-tight">
            Regional Fleet & <span className="italic text-[#a53b13]">Outbreak Command</span>
          </h1>
          <p className="text-sm text-[#414843] mt-1 max-w-2xl">
            Supervisory dashboard for agronomists, cooperative leaders, and agricultural researchers monitoring regional pathogen vectors and node network health.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSwitchToFarmer}
            className="px-4 py-2 rounded-full bg-white border border-[#eae8e3] hover:bg-[#f0eee9] text-[#022617] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-sm">potted_plant</span>
            <span>Switch to Farmer View</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Telemetry Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-3xl border border-[#eae8e3] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#727973] uppercase">Active Growers</span>
            <span className="material-symbols-outlined text-[#022617] text-xl">groups</span>
          </div>
          <div>
            <span className="text-3xl font-serif font-bold text-[#022617]">4,892</span>
            <span className="text-xs text-[#2c4e3b] font-medium block mt-1">
              ↑ +184 verified this month
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#eae8e3] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#727973] uppercase">Scans Processed</span>
            <span className="material-symbols-outlined text-[#a53b13] text-xl">
              document_scanner
            </span>
          </div>
          <div>
            <span className="text-3xl font-serif font-bold text-[#022617]">14,210</span>
            <span className="text-xs text-[#727973] font-medium block mt-1">
              96.4% diagnostic accuracy
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#eae8e3] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#727973] uppercase">Organic Recovery Rate</span>
            <span className="material-symbols-outlined text-[#2c4e3b] text-xl">eco</span>
          </div>
          <div>
            <span className="text-3xl font-serif font-bold text-[#022617]">89.4%</span>
            <span className="text-xs text-[#2c4e3b] font-medium block mt-1">
              Suppressed without synthetics
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#eae8e3] shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#727973] uppercase">Grower Cost Savings</span>
            <span className="material-symbols-outlined text-[#eb851c] text-xl">savings</span>
          </div>
          <div>
            <span className="text-3xl font-serif font-bold text-[#022617] font-mono">$142,500</span>
            <span className="text-xs text-[#414843] font-medium block mt-1">
              Saved vs chemical fungicides
            </span>
          </div>
        </div>
      </div>

      {/* Two-Column Command Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Outbreak Alerts & Advisory Dispatch (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Outbreak Feed */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#eae8e3]">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1b1c19]">
                  Live Outbreak Feeds & Pathogen Surveillance
                </h3>
                <p className="text-xs text-[#727973] mt-0.5">
                  Automated triangulation of farmer scan clusters and node spore indices.
                </p>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff7d51] animate-ping"></span>
            </div>

            <div className="flex flex-col gap-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 rounded-2xl bg-[#fbf9f4] border border-[#f0eee9] flex flex-col gap-2 hover:border-[#82a790] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#a53b13] bg-[#ffdcc3]/50 px-2.5 py-0.5 rounded-md">
                      {alert.zone}
                    </span>
                    <span className="text-[11px] text-[#727973]">{alert.time}</span>
                  </div>

                  <h4 className="font-serif text-base font-bold text-[#022617]">{alert.disease}</h4>

                  <p className="text-xs text-[#414843] leading-relaxed">{alert.advisory}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#f0eee9] text-[11px]">
                    <span className="text-[#727973]">Affected Crop: {alert.crop}</span>
                    <span className="font-bold text-[#361900]">
                      {alert.incidentCount} incidents reported (Trend: {alert.riskTrend})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Broadcast Regional Advisory to Farmers Form */}
          <div className="bg-[#022617] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#1a3c2b]">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#ff7d51]">campaign</span>
              <h3 className="font-serif text-xl font-bold">Broadcast Urgent Agronomy Advisory</h3>
            </div>
            <p className="text-xs text-[#82a790] mb-4">
              Push notifications directly to connected mobile handsets of growers in high-risk zones.
            </p>

            <form onSubmit={handleBroadcast} className="flex flex-col gap-3">
              <textarea
                rows={3}
                value={newAdvisoryText}
                onChange={(e) => setNewAdvisoryText(e.target.value)}
                placeholder="e.g. Warning: Relative humidity exceeding 85% in Zone 4. Spray milk foliar barrier before tomorrow afternoon..."
                className="w-full p-3.5 rounded-2xl bg-[#1a3c2b] text-white text-xs border border-[#82a790]/30 focus:outline-none focus:border-[#ff7d51]"
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#82a790]">
                  Target audience: 4,892 active farmer handsets
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#ff7d51] hover:bg-[#ffb59d] text-[#2f1500] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                  <span>Dispatch Push Advisory</span>
                </button>
              </div>
              {broadcastSent && (
                <div className="p-2.5 rounded-xl bg-[#c5ecd3] text-[#002112] text-xs font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Advisory transmitted to all field mobile nodes!</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right Column: Fleet Telemetry & Calibration (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Fleet Array Health */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#eae8e3]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl font-bold text-[#1b1c19]">
                14-Node Telemetry Fleet
              </h3>
              <button
                type="button"
                onClick={handleTriggerPingAll}
                className="px-3 py-1.5 rounded-full bg-[#f0eee9] hover:bg-[#e4e2dd] text-[#022617] text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-sm">sync</span>
                <span>Ping Fleet</span>
              </button>
            </div>

            {pingStatus && (
              <div className="mb-4 p-2.5 rounded-xl bg-[#c5ecd3]/50 text-[#022617] text-xs font-mono font-medium">
                {pingStatus}
              </div>
            )}

            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {nodes.map((node) => (
                <div
                  key={node.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#fbf9f4] border border-[#f0eee9] text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        node.status === 'warning' ? 'bg-[#ff7d51] animate-ping' : 'bg-[#2c4e3b]'
                      }`}
                    ></span>
                    <div className="truncate">
                      <span className="font-bold text-[#022617] block truncate">{node.name}</span>
                      <span className="text-[11px] text-[#727973] font-mono">{node.zone.split('-')[0]}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono font-bold text-[#022617]">{node.soilMoisture}% moist</span>
                    <span className="text-[10px] text-[#727973] block">{node.battery}% battery</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Threshold Rule Settings */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#eae8e3]">
            <h3 className="font-serif text-xl font-bold text-[#1b1c19] mb-2">
              Automated Agronomic Rules
            </h3>
            <p className="text-xs text-[#727973] mb-4">
              Preset environmental trigger thresholds that alert field agronomists.
            </p>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#f5f3ee]">
                <div>
                  <span className="font-bold text-[#022617] block">Late Blight Spore Trigger</span>
                  <span className="text-[11px] text-[#727973]">Leaf wetness &gt; 6h AND humidity &gt; 80%</span>
                </div>
                <span className="font-bold text-[#2c4e3b]">ACTIVE</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#f5f3ee]">
                <div>
                  <span className="font-bold text-[#022617] block">Spider Mite Dry Heat Surge</span>
                  <span className="text-[11px] text-[#727973]">Air temp &gt; 30°C AND humidity &lt; 40%</span>
                </div>
                <span className="font-bold text-[#2c4e3b]">ACTIVE</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#f5f3ee]">
                <div>
                  <span className="font-bold text-[#022617] block">Soil Waterlogged Anaerobic Warning</span>
                  <span className="text-[11px] text-[#727973]">Volumetric water content &gt; 65% for 48h</span>
                </div>
                <span className="font-bold text-[#2c4e3b]">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
