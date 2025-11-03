import React from 'react'

const FormContainer = ({ handleInputChange, GoToNext }) => {
  return (
    <div className="p-5">
      <div>
        <h2 className="font-bold my-2">Select the Country that you are applying for</h2>
        <select
          className="w-full border px-3 py-2 rounded-md"
          name="country"
          onChange={(e) => handleInputChange('country', e.target.value)}
        >
          <option value="">Select...</option>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="UK">UK</option>
          <option value="Australia">Australia</option>
          <option value="Germany">Germany</option>
          <option value="France">France</option>
          <option value="Japan">Japan</option>
          <option value="South Korea">South Korea</option>
          <option value="India">India</option>
          <option value="China">China</option>
        </select>
      </div>

      <div>
        <h2 className="font-bold my-2">
          Give us a short description of your intended major, cost of attendance, and university, as well as how you’re going to sponsor your studies
        </h2>
        <textarea
          className="w-full border px-3 py-2 rounded-md h-[150px]"
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Enter description"
        />
      </div>

      <div>
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
          onClick={GoToNext} 
        >
          Generate Questions
        </button>
      </div>
    </div>
  )
}

export default FormContainer
