import React, { useState } from 'react';
import { FieldHistoryRecord } from '../types';

interface FieldHistoryProps {
  history: FieldHistoryRecord[];
  onUpdateStatus: (id: string, newStatus: 'Active Treatment' | 'Resolved' | 'Monitoring') => void;
  onNavigateToScanner: () => void;
}

export const FieldHistory: React.FC<FieldHistoryProps> = ({
  history,
  onUpdateStatus,
  onNavigateToScanner,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistory = history.filter((item) => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch =
      item.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.plot.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a3c2b] text-[#c5ecd3] text-[11px] font-bold tracking-wider uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5ecd3]"></span>
            <span>GROWER FIELD LOGS</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1b1c19] font-bold tracking-tight">
            Field History & <span className="italic text-[#a53b13]">Diagnostic Archive</span>
          </h1>
          <p className="text-sm text-[#414843] mt-1 max-w-2xl">
            Track recovery progress, organic remedy efficacy, and crop vitality across your designated farm plots.
          </p>
        </div>

        <button
          onClick={onNavigateToScanner}
          className="px-5 py-2.5 rounded-full bg-[#a53b13] hover:bg-[#6c1e00] text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-base">add_a_photo</span>
          <span>New Leaf Scan</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 mb-8 shadow-sm border border-[#eae8e3] flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {(['all', 'Active Treatment', 'Resolved', 'Monitoring'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filterStatus === tab
                  ? 'bg-[#022617] text-white'
                  : 'bg-[#f0eee9] text-[#414843] hover:bg-[#e4e2dd]'
              }`}
            >
              {tab === 'all' ? 'All Logs' : tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#727973] text-base pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crop, plot or disease..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#f0eee9] text-xs text-[#1b1c19] focus:outline-none focus:bg-[#e4e2dd]"
          />
        </div>
      </div>

      {/* History Grid */}
      {filteredHistory.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#eae8e3] shadow-sm">
          <span className="material-symbols-outlined text-4xl text-[#82a790] mb-2">nature</span>
          <h3 className="font-serif text-lg font-bold text-[#1b1c19]">No logs match your filter</h3>
          <p className="text-xs text-[#414843] mt-1 mb-4">
            Try adjusting your search criteria or conduct a new leaf scan.
          </p>
          <button
            onClick={onNavigateToScanner}
            className="px-4 py-2 rounded-full bg-[#022617] text-white text-xs font-semibold"
          >
            Scan a Leaf Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-[#eae8e3] flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                {/* Top Row: Plot & Date */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-[#022617] bg-[#f0eee9] px-2.5 py-1 rounded-md">
                    {item.plot}
                  </span>
                  <span className="text-xs text-[#727973]">{item.date}</span>
                </div>

                {/* Crop & Image Thumbnail */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-[#eae8e3] relative">
                    <img
                      src={item.imageUrl}
                      alt={item.crop}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg font-bold text-[#1b1c19] truncate">
                      {item.crop}
                    </h3>
                    <p className="text-xs font-semibold text-[#a53b13] mt-0.5">{item.diagnosis}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          item.severity === 'Severe' || item.severity === 'High'
                            ? 'bg-[#ba1a1a] text-white'
                            : item.severity === 'Moderate'
                            ? 'bg-[#ff7d51] text-[#2f1500]'
                            : item.severity === 'Healthy'
                            ? 'bg-[#2c4e3b] text-[#c5ecd3]'
                            : 'bg-[#ffb77d] text-[#2f1500]'
                        }`}
                      >
                        {item.severity}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          item.status === 'Resolved'
                            ? 'bg-[#c5ecd3] text-[#022617]'
                            : item.status === 'Active Treatment'
                            ? 'bg-[#ffdcc3] text-[#a53b13]'
                            : 'bg-[#eae8e3] text-[#414843]'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Applied Remedy Box */}
                <div className="p-3 rounded-2xl bg-[#fbf9f4] border border-[#f0eee9] text-xs mb-3">
                  <span className="font-bold text-[#022617] block mb-0.5">Applied Remedy:</span>
                  <span className="text-[#414843]">{item.remedyApplied}</span>
                </div>

                {/* Notes */}
                <p className="text-xs text-[#727973] leading-relaxed mb-4">{item.notes}</p>
              </div>

              {/* Status Update Actions */}
              <div className="pt-3 border-t border-[#eae8e3] flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-[#414843]">Update Status:</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => onUpdateStatus(item.id, 'Active Treatment')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold cursor-pointer transition-colors ${
                      item.status === 'Active Treatment'
                        ? 'bg-[#a53b13] text-white'
                        : 'bg-[#f0eee9] text-[#414843] hover:bg-[#e4e2dd]'
                    }`}
                  >
                    Treating
                  </button>
                  <button
                    onClick={() => onUpdateStatus(item.id, 'Resolved')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold cursor-pointer transition-colors ${
                      item.status === 'Resolved'
                        ? 'bg-[#022617] text-[#c5ecd3]'
                        : 'bg-[#f0eee9] text-[#414843] hover:bg-[#e4e2dd]'
                    }`}
                  >
                    Resolved ✓
                  </button>
                  <button
                    onClick={() => onUpdateStatus(item.id, 'Monitoring')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold cursor-pointer transition-colors ${
                      item.status === 'Monitoring'
                        ? 'bg-[#414843] text-white'
                        : 'bg-[#f0eee9] text-[#414843] hover:bg-[#e4e2dd]'
                    }`}
                  >
                    Monitor
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
