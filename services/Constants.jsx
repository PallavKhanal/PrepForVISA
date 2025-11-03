
import { LayoutDashboard, Calendar, List, CreditCard, Settings } from "lucide-react";

export const SidebarOptions = [
    {
        name: "Dashboard",
        icon:LayoutDashboard,
        path : "/dashboard"
    },
    {
        name: "scheduled Interviews",
        icon:Calendar,
        path : "/scheduled-interviews"
    },
    {
        name: "All Interviews",
        icon:List,
        path : "/all-interviews"
    },
    {
        name: "Billing",
        icon:CreditCard,
        path : "/billing"
    },
    {
        name: "Settings",
        icon:Settings,
        path : "/settings"
    }

]

export const QUESTIONS_PROMPT = `
Act as a strict and skeptical visa officer from {{theTargetCountry}} who is not in a good mood and is very reluctant to issue any visa.

You are conducting an F1 student VISA interview for {{individualDescription}}, and the interview will last approximately {{duration}}.

Generate realistic, challenging, and intimidating visa interview questions that such an officer would ask to test the applicant’s credibility, honesty, intentions, financial situation, academic or travel purpose, and ties to their home country.

The tone must be serious, blunt, and interrogative, as if you are trying to catch inconsistencies or expose weak answers.

Return your response strictly in valid JSON format and nothing else. The JSON must use the key "interviewQuestions" whose value is an array of strings, for example:

{
  "interviewQuestions": [
    "Question 1",
    "Question 2",
    "Question 3"
  ]
}

Generate between 10 and 15 questions that feel tense, realistic, and country-appropriate. Do not include any explanations, commentary, or extra text outside the JSON.
 
`