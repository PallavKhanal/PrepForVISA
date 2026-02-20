import React from 'react'

const FormContainer = ({ handleInputChange, GoToNext }) => {
  return (
    <div className="p-5">
      {/* Country is hardcoded to USA for F1 visa */}
      <div className="hidden">
        <input
          type="hidden"
          name="country"
          value="USA"
          onChange={() => handleInputChange('country', 'USA')}
        />
      </div>

      <div className="mb-1">
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-600 w-full">
          <span className="font-semibold text-gray-900">Country:</span> United States of America (USA)
          <span className="ml-auto text-xs text-gray-400 font-medium uppercase tracking-wider">F1 Visa</span>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="font-bold my-2">
          Tell us about yourself — your intended major, university, cost of attendance, and how you plan to fund your studies
        </h2>
        <textarea
          className="w-full border px-3 py-2 rounded-md h-[150px]"
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="e.g. I'm applying for an F1 visa to study Computer Science at the University of Texas. My tuition is $25,000/year and my father is sponsoring my studies from his savings account..."
        />
      </div>

      <div className="mt-4">
        <h2 className="font-bold my-2">Interview Duration</h2>
        <select
          className="w-full border px-3 py-2 rounded-md"
          onChange={(e) => handleInputChange('duration', e.target.value)}
        >
          <option value="">Select...</option>
          <option value="2-5 Minutes">2–5 Minutes</option>
          <option value="5-8 Minutes">5–8 Minutes</option>
        </select>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
          onClick={() => {
            handleInputChange('country', 'USA');
            GoToNext();
          }}
        >
          Generate Questions
        </button>
      </div>
    </div>
  )
}

export default FormContainer
