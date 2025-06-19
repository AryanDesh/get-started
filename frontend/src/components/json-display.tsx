"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check, Download } from "lucide-react"
import { useFormData } from "@/store/FormContext"

export function JsonDisplay() {
  const [copied, setCopied] = useState(false)
  const formData = useFormData()

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(formData, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const downloadJson = () => {
    const dataStr = JSON.stringify(formData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "project-config.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Project Configuration</h3>
        <div className="flex gap-2">
          <Button onClick={copyToClipboard} variant="outline" size="sm" className="flex items-center gap-2">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy JSON"}
          </Button>
          <Button onClick={downloadJson} variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-auto max-h-96">
        <pre className="text-sm">{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  )
}
