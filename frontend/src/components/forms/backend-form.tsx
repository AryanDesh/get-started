"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { FuzzySearchSelect } from "@/components/fuzzy-search-select"
import { useBackendData } from "@/store/FormContext"

const moduleOptions = [
  { value: "auth", label: "Authentication Module" },
  { value: "users", label: "Users Module" },
  { value: "products", label: "Products Module" },
  { value: "orders", label: "Orders Module" },
  { value: "payments", label: "Payments Module" },
  { value: "notifications", label: "Notifications Module" },
  { value: "files", label: "File Upload Module" },
  { value: "email", label: "Email Module" },
  { value: "logging", label: "Logging Module" },
  { value: "cache", label: "Cache Module" },
  { value: "queue", label: "Queue Module" },
  { value: "websocket", label: "WebSocket Module" },
  { value: "chat", label: "Chat Module" },
  { value: "search", label: "Search Module" },
  { value: "analytics", label: "Analytics Module" },
  { value: "reporting", label: "Reporting Module" },
  { value: "inventory", label: "Inventory Module" },
  { value: "cms", label: "Content Management Module" },
  { value: "blog", label: "Blog Module" },
  { value: "comments", label: "Comments Module" },
]

const middlewareOptions = [
  { value: "cors", label: "CORS" },
  { value: "helmet", label: "Helmet (Security)" },
  { value: "ratelimit", label: "Rate Limiting" },
  { value: "compression", label: "Compression" },
  { value: "logging", label: "Request Logging" },
  { value: "validation", label: "Validation Pipes" },
  { value: "auth", label: "Authentication Guard" },
  { value: "transform", label: "Transform Interceptor" },
  { value: "timeout", label: "Timeout Interceptor" },
  { value: "cache", label: "Cache Interceptor" },
  { value: "throttle", label: "Throttle Guard" },
  { value: "roles", label: "Roles Guard" },
]

export function BackendForm() {
  const { data, updateData } = useBackendData()

  const handleUpdate = (field: string, value: any) => {
    updateData({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="modules">NestJS Modules (Select Multiple)</Label>
        <FuzzySearchSelect
          options={moduleOptions}
          values={data.modules || []}
          onValuesChange={(values) => handleUpdate("modules", values)}
          placeholder="Select modules to include (multiple allowed)..."
          searchPlaceholder="Search modules..."
          multiple
        />
        {data.modules && data.modules.length > 0 && (
          <div className="text-sm text-muted-foreground">
            Selected: {data.modules.length} module{data.modules.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="middleware">Middleware (Select Multiple)</Label>
        <FuzzySearchSelect
          options={middlewareOptions}
          values={data.middleware || []}
          onValuesChange={(values) => handleUpdate("middleware", values)}
          placeholder="Select middleware (multiple allowed)..."
          searchPlaceholder="Search middleware..."
          multiple
        />
        {data.middleware && data.middleware.length > 0 && (
          <div className="text-sm text-muted-foreground">
            Selected: {data.middleware.length} middleware{data.middleware.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="port">Server Port</Label>
          <Input
            id="port"
            placeholder="3000"
            value={data.port || ""}
            onChange={(e) => handleUpdate("port", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="apiPrefix">API Prefix</Label>
          <Input
            id="apiPrefix"
            placeholder="api/v1"
            value={data.apiPrefix || ""}
            onChange={(e) => handleUpdate("apiPrefix", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Backend Configuration Notes</Label>
        <Textarea
          id="notes"
          placeholder="Additional backend configuration details..."
          value={data.notes || ""}
          onChange={(e) => handleUpdate("notes", e.target.value)}
          rows={4}
        />
      </div>
    </div>
  )
}
