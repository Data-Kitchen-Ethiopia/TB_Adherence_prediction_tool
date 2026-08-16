'use client';

import React, { useState } from 'react';
import { PatientFeaturesPayload } from '@/types';
import { Activity, Loader2 } from 'lucide-react';

interface Props {
  onSubmit: (data: PatientFeaturesPayload) => void;
  isLoading: boolean;
}

export default function PatientForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = useState<PatientFeaturesPayload>({
    age: 38,
    gender: 'Male',
    hiv_status: 'Positive',
    smear_result: 'Positive',
    treatment_category: 'Category I',
    distance_to_clinic_km: 12.5,
    alcohol_use: 'Yes',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
      <div className="flex items-center space-x-2 border-b pb-3 mb-2">
        <Activity className="w-5 h-5 text-teal-600" />
        <h2 className="text-lg font-semibold text-slate-800">Patient Clinical Profile</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 uppercase mb-1">Age (Years)</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 uppercase mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 uppercase mb-1">HIV Status</label>
          <select
            name="hiv_status"
            value={formData.hiv_status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="Negative">Negative</option>
            <option value="Positive">Positive</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 uppercase mb-1">Smear Result</label>
          <select
            name="smear_result"
            value={formData.smear_result}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="Positive">Positive</option>
            <option value="Negative">Negative</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 uppercase mb-1">Distance to Clinic (km)</label>
          <input
            type="number"
            step="0.1"
            name="distance_to_clinic_km"
            value={formData.distance_to_clinic_km}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 uppercase mb-1">Alcohol Use</label>
          <select
            name="alcohol_use"
            value={formData.alcohol_use}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Evaluating Risk...
          </>
        ) : (
          'Calculate Adherence Risk'
        )}
      </button>
    </form>
  );
}