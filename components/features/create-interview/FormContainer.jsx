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
        <div className="flex items-center gap-2 px-3 py-2 bg-muted border border-border rounded-md text-sm text-muted-foreground w-full">
          <span className="font-semibold text-foreground">Country:</span> United States of America (USA)
          <span className="ml-auto text-xs text-muted-foreground font-medium uppercase tracking-wider">F1 Visa</span>
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

      <div className="mt-4 flex justify-end">
        <button
          className="bg-foreground text-background px-4 py-2 rounded-md hover:opacity-90 transition-colors cursor-pointer"
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
