'use client';

import React from 'react';
import { RiskPredictionResponse } from '@/types';
import { AlertTriangle, CheckCircle, ShieldAlert, Clock, Stethoscope } from 'lucide-react';

interface Props {
  result: RiskPredictionResponse | null;
}

export default function RiskResultsCard({ result }: Props) {
  if (!result) {
    return (
      <div className="bg-slate-50 border border-dashed border-slate-300 p-8 rounded-xl flex flex-col items-center justify-center text-center text-slate-500 h-full">
        <Stethoscope className="w-10 h-10 mb-2 text-slate-400" />
        <p className="text-sm font-medium">Submit a patient clinical profile to generate risk stratification.</p>
      </div>
    );
  }

  // Tier Color Configs
  const tierConfig = {
    0: {
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      icon: CheckCircle,
      accent: 'text-emerald-600',
      bar: 'bg-emerald-500',
    },
    1: {
      badge: 'bg-amber-100 text-amber-800 border-amber-300',
      icon: AlertTriangle,
      accent: 'text-amber-600',
      bar: 'bg-amber-500',
    },
    2: {
      badge: 'bg-rose-100 text-rose-800 border-rose-300',
      icon: ShieldAlert,
      accent: 'text-rose-600',
      bar: 'bg-rose-500',
    },
  }[result.risk_tier_code] || {
    badge: 'bg-slate-100 text-slate-800 border-slate-300',
    icon: CheckCircle,
    accent: 'text-slate-600',
    bar: 'bg-slate-500',
  };

  const IconComponent = tierConfig.icon;
  const defaultPercentage = (result.overall_default_probability * 100).toFixed(1);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-5">
      {/* Risk Badge Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <IconComponent className={`w-6 h-6 ${tierConfig.accent}`} />
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${tierConfig.badge}`}>
            {result.risk_tier_name}
          </span>
        </div>
        <span className="text-xs text-slate-400">Tier Code: {result.risk_tier_code}</span>
      </div>

      {/* Default Probability Bar */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold text-slate-600">Predicted Default Probability</span>
          <span className="text-sm font-bold text-slate-800">{defaultPercentage}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full ${tierConfig.bar} transition-all duration-500`}
            style={{ width: `${defaultPercentage}%` }}
          />
        </div>
      </div>

      {/* Interruption Window Card */}
      <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 flex items-start space-x-3">
        <Clock className="w-5 h-5 text-slate-500 mt-0.5 shrink-0" />
        <div>
          <h4 className="text-xs font-semibold text-slate-700">Estimated Interruption Window</h4>
          <p className="text-sm text-slate-800 font-medium">{result.estimated_interruption_window}</p>
        </div>
      </div>

      {/* Recommended Clinical Action */}
      <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
        <h4 className="text-xs font-bold text-teal-900 uppercase tracking-wider mb-1">
          Recommended Clinical Triage Action
        </h4>
        <p className="text-sm text-teal-800 font-medium leading-relaxed">{result.recommended_clinical_action}</p>
      </div>
    </div>
  );
}