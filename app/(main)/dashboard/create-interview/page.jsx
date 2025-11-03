"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import FormContainer from './_components/FormContainer'
import QuestionList from './_components/QuestionList'

const CreateInterview = () => {
  const [formData, setFormData] = useState({})
  const [showQuestions, setShowQuestions] = useState(false)
  const router = useRouter()
  

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const GoToNext = () => {
    if (!formData.country || !formData.description || !formData.duration) {
      alert('Please fill all fields before continuing!')
      return
    }

    console.log('Final Form Data:', formData)
    setShowQuestions(true) 
  }

  return (
    <div className="w-full p-6">
      <div className="flex items-center gap-4">
        <ArrowLeft className="cursor-pointer" onClick={() => router.back()} />
        <h2 className="text-2xl font-bold">Create new Interview</h2>
      </div>


      {!showQuestions ? (
        <FormContainer handleInputChange={handleInputChange} GoToNext={GoToNext} />
      ) : (
        <QuestionList formData={formData} />
      )}
    </div>
  )
}

export default CreateInterview
