import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface JsonDisplayProps {
  data: any
}

export function JsonDisplay({ data }: JsonDisplayProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Project Configuration</h3>
        <Button onClick={copyToClipboard} variant="outline" size="sm" className="flex items-center gap-2">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy JSON"}
        </Button>
      </div>

      <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-auto max-h-96">
        <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  )
}
