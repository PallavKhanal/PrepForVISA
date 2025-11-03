import React from "react";
import DashboardProvider from "./Provider";

export default function DashboardLayout({ children }) {
  return (
        <DashboardProvider>
        {children}
        </DashboardProvider>
  );}