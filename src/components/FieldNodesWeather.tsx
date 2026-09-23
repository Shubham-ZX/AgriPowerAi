import React, { useState } from 'react';
import { FieldNode } from '../types';

interface FieldNodesWeatherProps {
  nodes: FieldNode[];
  onPingNode: (nodeId: string) => void;
}

export const FieldNodesWeather: React.FC<FieldNodesWeatherProps> = ({ nodes, onPingNode }) => {
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [pingingId, setPingingId] = useState<string | null>(null);

  const handlePing = (id: string) => {
    setPingingId(id);
    setTimeout(() => {
      onPingNode(id);
      setPingingId(null);
    }, 800);
  };

  const filteredNodes = nodes.filter((node) => {
    if (selectedZone === 'all') return true;
    if (selectedZone === 'warning') return node.status === 'warning';
    if (selectedZone === 'high_risk') return node.sporeRiskLevel === 'High' || node.sporeRiskLevel === 'Severe';
    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a3c2b] text-[#c5ecd3] text-[11px] font-bold tracking-wider uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5ecd3] animate-pulse"></span>
            <span>TELEMETRY GROUND ARRAY</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1b1c19] font-bold tracking-tight">
            Field Node Network · <span className="italic text-[#a53b13]">14 Active Zones</span>
          </h1>
          <p className="text-sm text-[#414843] mt-1 max-w-2xl">
            Real-time micro-climate sensors measuring leaf surface wetness, spore multiplication risk, and soil hydration to forecast fungal outbreaks before symptoms manifest.
          </p>
        </div>

        {/* Global summary pill */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#eae8e3] shadow-sm">
          <div className="text-right">
            <span className="text-[10px] text-[#727973] uppercase font-bold block">Telemetry Fleet</span>
            <span className="text-sm font-bold text-[#022617] font-mono">14 / 14 Reporting</span>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#2c4e3b] animate-ping"></div>
        </div>
      </div>

      {/* Micro-Climate & Spore Forecast Banner */}
      <div className="bg-[#022617] text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl border border-[#1a3c2b] relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#ff7d51]/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-2 text-[#c5ecd3] text-xs font-semibold">
              <span className="material-symbols-outlined text-sm">wb_cloudy</span>
              <span>Regional Agronomic Micro-Climate Broadcast</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-semibold">
              Optimal Spraying Window: Tomorrow 05:45 AM – 09:15 AM
            </h2>
            <p className="text-sm text-[#82a790] mt-2 max-w-2xl leading-relaxed">
              Relative humidity will drop from 88% down to 62% by 07:00 AM. Low thermal wind shear (&lt; 4 knots) ensures complete droplet adhesion on leaf surfaces with zero drift. Fungal spore discharge peaks when dew lingers past 10:00 AM.
            </p>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#1a3c2b]/80 border border-[#82a790]/20 text-center">
              <span className="text-[11px] text-[#82a790] uppercase font-bold block">Avg Humidity</span>
              <span className="text-2xl font-bold font-mono text-[#c5ecd3]">68.4%</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#1a3c2b]/80 border border-[#82a790]/20 text-center">
              <span className="text-[11px] text-[#82a790] uppercase font-bold block">Leaf Wetness</span>
              <span className="text-2xl font-bold font-mono text-[#ffdcc3]">4.2 hrs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedZone('all')}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
            selectedZone === 'all'
              ? 'bg-[#022617] text-white shadow-xs'
              : 'bg-white text-[#414843] border border-[#eae8e3] hover:bg-[#f0eee9]'
          }`}
        >
          All 14 Nodes
        </button>
        <button
          onClick={() => setSelectedZone('warning')}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
            selectedZone === 'warning'
              ? 'bg-[#ba1a1a] text-white shadow-xs'
              : 'bg-white text-[#414843] border border-[#eae8e3] hover:bg-[#f0eee9]'
          }`}
        >
          Elevated Alerts (Zone 4)
        </button>
        <button
          onClick={() => setSelectedZone('high_risk')}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
            selectedZone === 'high_risk'
              ? 'bg-[#a53b13] text-white shadow-xs'
              : 'bg-white text-[#414843] border border-[#eae8e3] hover:bg-[#f0eee9]'
          }`}
        >
          High Spore Risk Zones
        </button>
      </div>

      {/* 14 Field Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredNodes.map((node) => (
          <div
            key={node.id}
            className={`bg-white rounded-3xl p-5 shadow-sm border transition-all hover:shadow-md ${
              node.status === 'warning' ? 'border-[#ff7d51]' : 'border-[#eae8e3]'
            }`}
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    node.status === 'warning' ? 'bg-[#ff7d51] animate-ping' : 'bg-[#2c4e3b]'
                  }`}
                ></span>
                <span className="font-mono text-xs font-bold text-[#022617]">{node.id}</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  node.sporeRiskLevel === 'Severe'
                    ? 'bg-[#ffdad6] text-[#ba1a1a]'
                    : node.sporeRiskLevel === 'High'
                    ? 'bg-[#ffdcc3] text-[#a53b13]'
                    : node.sporeRiskLevel === 'Moderate'
                    ? 'bg-[#f0eee9] text-[#727973]'
                    : 'bg-[#c5ecd3] text-[#022617]'
                }`}
              >
                Spore: {node.sporeRiskLevel}
              </span>
            </div>

            <h3 className="font-serif text-base font-bold text-[#1b1c19] truncate">{node.name}</h3>
            <p className="text-xs text-[#727973] truncate mb-4">{node.zone}</p>

            {/* Metrics 4-cell matrix */}
            <div className="grid grid-cols-2 gap-2 bg-[#fbf9f4] p-3 rounded-2xl border border-[#f0eee9] mb-4">
              <div>
                <span className="text-[10px] text-[#727973] uppercase font-bold block">
                  Soil Moisture
                </span>
                <span className="text-sm font-bold font-mono text-[#022617]">
                  {node.soilMoisture}%
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#727973] uppercase font-bold block">
                  Temp & Humidity
                </span>
                <span className="text-sm font-bold font-mono text-[#022617]">
                  {node.airTemp}°C · {node.humidity}%
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#727973] uppercase font-bold block">
                  Leaf Wetness
                </span>
                <span className="text-sm font-bold font-mono text-[#a53b13]">
                  {node.leafWetnessHours}h dew
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#727973] uppercase font-bold block">Battery</span>
                <span className="text-sm font-bold font-mono text-[#2c4e3b]">
                  {node.battery}% solar
                </span>
              </div>
            </div>

            {/* Footer action */}
            <div className="flex items-center justify-between pt-2 border-t border-[#eae8e3]">
              <span className="text-[11px] text-[#727973]">Last ping: {node.lastPing}</span>
              <button
                type="button"
                onClick={() => handlePing(node.id)}
                disabled={pingingId === node.id}
                className="text-xs font-semibold text-[#022617] hover:text-[#a53b13] flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-sm">
                  {pingingId === node.id ? 'sync' : 'network_ping'}
                </span>
                <span>{pingingId === node.id ? 'Pinging...' : 'Ping Node'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
