import React, { useState, useEffect } from 'react';
import {
  interpretNaturalLanguageQuery,
  AIInterpretationResult
} from '../services/aiService';

interface AISearchInterpreterModalProps {
  initialQuery: string;
  onApplyInterpretation: (result: AIInterpretationResult) => void;
  onCancel: () => void;
}

export const AISearchInterpreterModal: React.FC<
  AISearchInterpreterModalProps
> = ({
  initialQuery,
  onApplyInterpretation,
  onCancel
}) => {
  const [step, setStep] = useState<number>(1);
  const [interpreted, setInterpreted] =
    useState<AIInterpretationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const runAI = async () => {
      try {
        // Step 1: Analyze
        setStep(1);
        setLoading(true);

        // Move to step 2 after a short delay
        const stepTimer = setTimeout(() => {
          if (isMounted) {
            setStep(2);
          }
        }, 700);

        // Run the NLP interpretation
        const res = await interpretNaturalLanguageQuery(initialQuery);

        clearTimeout(stepTimer);

        if (isMounted) {
          setInterpreted(res);
          setStep(3);
          setLoading(false);
        }
      } catch (error) {
        console.error('AI interpretation failed:', error);

        if (isMounted) {
          setLoading(false);
          setStep(3);
        }
      }
    };

    runAI();

    return () => {
      isMounted = false;
    };
  }, [initialQuery]);

  const handleCancel = (
    event?: React.MouseEvent<HTMLButtonElement>
  ) => {
    event?.preventDefault();
    event?.stopPropagation();

    console.log('CareFlow: Cancel button clicked');

    onCancel();
  };

  const handleApply = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    console.log('CareFlow: View Matching Doctors & Slots clicked');

    if (!interpreted) {
      console.warn('CareFlow: No interpretation available yet.');
      return;
    }

    onApplyInterpretation(interpreted);
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="careflow-ai-modal-title"
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-slate-100"
        onClick={(event) => event.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <i className="fa-solid fa-wand-magic-sparkles text-lg animate-pulse"></i>
            </div>

            <div>
              <h3
                id="careflow-ai-modal-title"
                className="text-xl font-bold text-slate-900"
              >
                CareFlow AI Navigation
              </h3>

              <p className="text-sm text-slate-500">
                Understanding your symptoms using CareFlow local NLP
              </p>
            </div>
          </div>

          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={handleCancel}
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        {/* USER REQUEST */}
        <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-200">
          <span className="text-xs font-semibold text-teal-700 uppercase tracking-wider block mb-1">
            Your Request
          </span>

          <p className="text-slate-800 font-medium italic">
            "{initialQuery}"
          </p>
        </div>

        {/* PROGRESS STEPS */}
        <div className="space-y-3 mb-6">

          {/* STEP 1 */}
          <div className="flex items-center space-x-3 text-sm">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step >= 1
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {step > 1 ? (
                <i className="fa-solid fa-check"></i>
              ) : (
                '1'
              )}
            </div>

            <span
              className={
                step >= 1
                  ? 'font-medium text-slate-900'
                  : 'text-slate-400'
              }
            >
              Analyzing symptoms and care requirements
            </span>
          </div>

          {/* STEP 2 */}
          <div className="flex items-center space-x-3 text-sm">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step >= 2
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {step > 2 ? (
                <i className="fa-solid fa-check"></i>
              ) : (
                '2'
              )}
            </div>

            <span
              className={
                step >= 2
                  ? 'font-medium text-slate-900'
                  : 'text-slate-400'
              }
            >
              Matching symptoms with suitable medical specialties
            </span>
          </div>

          {/* STEP 3 */}
          <div className="flex items-center space-x-3 text-sm">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step >= 3
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {step >= 3 ? (
                <i className="fa-solid fa-check"></i>
              ) : (
                '3'
              )}
            </div>

            <span
              className={
                step >= 3
                  ? 'font-medium text-slate-900'
                  : 'text-slate-400'
              }
            >
              Preparing your doctor recommendation
            </span>
          </div>
        </div>

        {/* INTERPRETATION */}
        {interpreted && (
          <div className="bg-teal-50/70 border border-teal-100 rounded-2xl p-5 mb-6">

            <h4 className="text-sm font-bold text-teal-900 mb-3 flex items-center">
              <i className="fa-solid fa-circle-check text-teal-600 mr-2"></i>
              CareFlow NLP Interpretation
            </h4>

            <div className="grid grid-cols-2 gap-3 text-sm">

              {/* SPECIALTY */}
              <div className="bg-white p-2.5 rounded-xl border border-teal-100">
                <span className="text-xs text-slate-400 block font-medium">
                  Specialty Needed
                </span>

                <span className="font-semibold text-slate-800">
                  {interpreted.specialty}
                </span>
              </div>

              {/* LANGUAGE */}
              <div className="bg-white p-2.5 rounded-xl border border-teal-100">
                <span className="text-xs text-slate-400 block font-medium">
                  Language Detected
                </span>

                <span className="font-semibold text-slate-800">
                  {interpreted.language}
                </span>
              </div>

              {/* GENDER */}
              <div className="bg-white p-2.5 rounded-xl border border-teal-100">
                <span className="text-xs text-slate-400 block font-medium">
                  Doctor Gender
                </span>

                <span className="font-semibold text-slate-800">
                  {interpreted.gender}
                </span>
              </div>

              {/* DATE */}
              <div className="bg-white p-2.5 rounded-xl border border-teal-100">
                <span className="text-xs text-slate-400 block font-medium">
                  Preferred Date
                </span>

                <span className="font-semibold text-slate-800">
                  {interpreted.date}
                </span>
              </div>

              {/* TIME */}
              <div className="bg-white p-2.5 rounded-xl border border-teal-100">
                <span className="text-xs text-slate-400 block font-medium">
                  Time Preference
                </span>

                <span className="font-semibold text-slate-800">
                  {interpreted.time}
                </span>
              </div>

            </div>

            {/* EXPLANATION */}
            <p className="text-xs text-teal-800 mt-3">
              {interpreted.explanation}
            </p>

            {/* MATCHED KEYWORDS */}
            {interpreted.matchedKeywords &&
              interpreted.matchedKeywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {interpreted.matchedKeywords.map(
                    (keyword) => (
                      <span
                        key={keyword}
                        className="px-2 py-1 rounded-full bg-white border border-teal-100 text-[11px] text-teal-700"
                      >
                        {keyword}
                      </span>
                    )
                  )}
                </div>
              )}
          </div>
        )}

        {/* LOADING MESSAGE */}
        {loading && (
          <div className="mb-6 text-center text-sm text-slate-500">
            <i className="fa-solid fa-spinner fa-spin mr-2"></i>
            Processing your request...
          </div>
        )}

        {/* DISCLAIMER */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 text-xs text-amber-800 flex items-start space-x-2">
          <i className="fa-solid fa-triangle-exclamation text-amber-600 mt-0.5"></i>

          <div>
            <span className="font-semibold">
              Disclaimer:
            </span>{' '}
            AI assists with care navigation only. It does not
            diagnose medical conditions or prescribe medication.
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end space-x-3">

          {/* CANCEL */}
          <button
            type="button"
            onClick={handleCancel}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-50 active:bg-slate-100 transition-all cursor-pointer"
          >
            Cancel
          </button>

          {/* VIEW DOCTORS */}
          <button
            type="button"
            disabled={step < 3 || !interpreted}
            onClick={handleApply}
            className={`px-6 py-2.5 rounded-xl font-medium text-sm text-white shadow-md transition-all ${
              step < 3 || !interpreted
                ? 'bg-teal-400 cursor-not-allowed'
                : 'bg-teal-600 hover:bg-teal-700 active:bg-teal-800 shadow-teal-600/25 cursor-pointer'
            }`}
          >
            View Matching Doctors & Slots
            <i className="fa-solid fa-arrow-right ml-1"></i>
          </button>

        </div>
      </div>
    </div>
  );
};