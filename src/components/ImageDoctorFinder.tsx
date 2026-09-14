import React, { useState } from 'react';
import { api } from '../services/apiService';
import { AIInterpretationResult } from '../services/aiService';

interface Props {
  onApply: (r: AIInterpretationResult) => void;
}

export const ImageDoctorFinder: React.FC<Props> = ({ onApply }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyze = async () => {
    if (!file) return;

    setLoading(true);
    setResult(null);

    try {
      const r = await api.analyzeImage(file);

      setResult(r);

      if (r.suggestedSpecialty) {
        onApply({
          specialty: r.suggestedSpecialty,
          gender: 'No Preference',
          date: 'Tomorrow',
          time: 'Anytime',
          location: 'All local facilities',
          rawSymptoms: r.concern || 'Image input',
          language: 'English',
          explanation:
            r.explanation ||
            r.message ||
            'Suggested a specialty for care navigation.',
          matchedKeywords: r.concern ? [r.concern] : []
        });
      }
    } catch (error: any) {
      const message = String(
        error?.message || error || ''
      ).toLowerCase();

      if (
        message.includes('credit') ||
        message.includes('quota') ||
        message.includes('billing') ||
        message.includes('insufficient') ||
        message.includes('429')
      ) {
        setResult({
          type: 'billing',
          message:
            'AI image analysis is temporarily unavailable because the AI service has reached its usage limit.',
          detail:
            'You can still use CareFlow to search for doctors manually by specialty, location, and gender.'
        });
      } else {
        setResult({
          type: 'error',
          message:
            'We could not analyze this image right now.',
          detail:
            'Please try another image or continue by searching for a doctor manually.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <i className="fa-solid fa-camera text-xl" />
        </div>

        <div className="flex-1">
          <h3 className="text-base font-bold text-slate-900">
            Upload a picture to find the right doctor
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Skin photos, visible eye/ear/throat concerns,
            dental photos, injury images and other healthcare
            images can be submitted for navigation. This is
            not a diagnosis.
          </p>

          <input
            className="mt-4 block w-full text-sm"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              setResult(null);
            }}
          />

          <button
            disabled={!file || loading}
            onClick={analyze}
            className="mt-4 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm disabled:bg-slate-300"
          >
            {loading
              ? 'Analyzing image...'
              : 'Analyze & Suggest Doctor'}
          </button>

          {result && (
            <div
              className={`mt-4 p-4 rounded-2xl border ${
                result.type === 'billing'
                  ? 'bg-amber-50 border-amber-200'
                  : result.type === 'error'
                  ? 'bg-red-50 border-red-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              {result.type === 'billing' ? (
                <>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-circle-info text-amber-600" />
                    <b className="text-amber-900">
                      AI analysis temporarily unavailable
                    </b>
                  </div>

                  <p className="text-sm text-amber-800 mt-2">
                    {result.message}
                  </p>

                  <p className="text-sm text-slate-600 mt-2">
                    {result.detail}
                  </p>
                </>
              ) : result.type === 'error' ? (
                <>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-triangle-exclamation text-red-600" />
                    <b className="text-red-900">
                      Analysis unavailable
                    </b>
                  </div>

                  <p className="text-sm text-red-800 mt-2">
                    {result.message}
                  </p>

                  <p className="text-sm text-slate-600 mt-2">
                    {result.detail}
                  </p>
                </>
              ) : (
                <>
                  <b className="text-slate-900">
                    {result.concern || 'Image received'}
                  </b>

                  <p className="text-slate-600 mt-1 text-sm">
                    {result.explanation || result.message}
                  </p>

                  {result.suggestedSpecialty && (
                    <p className="mt-2 font-semibold text-teal-700">
                      Suggested specialty:{' '}
                      {result.suggestedSpecialty}
                    </p>
                  )}

                  {result.confidence && (
                    <p className="mt-1 text-xs text-slate-500">
                      Confidence: {result.confidence}
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};