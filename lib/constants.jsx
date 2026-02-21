
import { LayoutDashboard, Megaphone , Wallet , List, CreditCard, Shield  } from "lucide-react";

export const SidebarOptions = [
    {
        name: "Dashboard",
        icon:LayoutDashboard,
        path : "/dashboard"
    },
    {
        name: "Our Advise",
        icon: Megaphone,
        path : "/our-advise"
    },
    {
        name: "Previous Interviews",
        icon:List,
        path : "/previous-interviews"
    },
    {
        name: "Billing",
        icon:CreditCard,
        path : "/billing"
    },
    {
        name: "Donate",
        icon: Wallet,
        path : "/donate-us"
    },
    {
        name:"Support & Legal",
        icon:Shield,
        path:"/legal"
    },
]

export const QUESTIONS_PROMPT = `
Act as a strict and skeptical U.S. consular officer who is not in a good mood and is very reluctant to issue an F-1 student visa.

You are interviewing the following applicant: {{individualDescription}}

Generate realistic, challenging, and intimidating F-1 visa interview questions that probe the applicant's credibility, academic intent, financial situation, ties to their home country, and likelihood of returning after studies.

The tone must be serious, blunt, and interrogative — as if you are trying to catch inconsistencies or expose weak answers.

Return your response strictly in valid JSON format and nothing else. The JSON must use the key "interviewQuestions" whose value is an array of strings, for example:

{
  "interviewQuestions": [
    "Question 1",
    "Question 2",
    "Question 3"
  ]
}

Generate between 10 and 15 questions. Do not include any explanations, commentary, or extra text outside the JSON.

`
