"use client"
import { FormWizard } from "@/components/form-wizard"

export default function Forms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Project Setup Wizard</h1>
          <p className="text-slate-600">Configure your full-stack application step by step</p>
        </div>
        <FormWizard />
      </div>
    </div>
  )
}
