
import React from 'react';

interface InputFormProps {
  businessType: string;
  setBusinessType: (value: string) => void;
  problem: string;
  setProblem: (value: string) => void;
  solution: string;
  setSolution: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({
  businessType,
  setBusinessType,
  problem,
  setProblem,
  solution,
  setSolution,
  onSubmit,
  isLoading,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
      <div>
        <label htmlFor="businessType" className="block text-sm font-medium text-cyan-400 mb-2">
          Business Type
        </label>
        <textarea
          id="businessType"
          rows={3}
          className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
          placeholder="e.g., An online platform for teaching coding to kids in India."
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="problem" className="block text-sm font-medium text-cyan-400 mb-2">
          Problem
        </label>
        <textarea
          id="problem"
          rows={4}
          className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
          placeholder="e.g., Parents struggle to find quality, affordable, and engaging coding classes for their children that are tailored to the Indian curriculum."
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="solution" className="block text-sm font-medium text-cyan-400 mb-2">
          Solution
        </label>
        <textarea
          id="solution"
          rows={4}
          className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
          placeholder="e.g., We provide live, interactive online coding classes with expert instructors using a project-based learning approach, at a competitive price point."
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-50 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? 'Generating...' : 'Generate Deep Dive'}
      </button>
    </div>
  );
};
