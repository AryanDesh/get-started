import { useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { FuzzySearchSelect } from "@/components/fuzzy-search-select"

const adminFeatureOptions = [
  { value: "dashboard", label: "Admin Dashboard" },
  { value: "userManagement", label: "User Management" },
  { value: "contentManagement", label: "Content Management" },
  { value: "analytics", label: "Analytics & Reports" },
  { value: "systemSettings", label: "System Settings" },
  { value: "auditLogs", label: "Audit Logs" },
  { value: "backupRestore", label: "Backup & Restore" },
  { value: "notifications", label: "Admin Notifications" },
]

const userControlOptions = [
  { value: "profile", label: "User Profile Management" },
  { value: "preferences", label: "User Preferences" },
  { value: "security", label: "Security Settings" },
  { value: "subscriptions", label: "Subscription Management" },
  { value: "billing", label: "Billing & Payments" },
  { value: "support", label: "Support Tickets" },
]

interface AdminControlFormProps {
  data: any
  onDataChange: (data: any) => void
  allData: any
}

export function AdminControlForm({ data, onDataChange }: AdminControlFormProps) {
  const updateData = (field: string, value: any) => {
    const newData = { ...data, [field]: value }
    onDataChange(newData)
  }

  useEffect(() => {
    if (data.enabled === undefined) {
      onDataChange({
        enabled: false,
        adminFeatures: [],
        userControlFeatures: [],
        separateAdminApp: false,
        notes: "",
      })
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="enabled"
          checked={data.enabled || false}
          onCheckedChange={(checked) => updateData("enabled", checked)}
        />
        <Label htmlFor="enabled">Enable Admin/User Control (Optional)</Label>
      </div>

      {data.enabled && (
        <>
          <div className="space-y-2">
            <Label htmlFor="adminFeatures">Admin Features</Label>
            <FuzzySearchSelect
              options={adminFeatureOptions}
              values={data.adminFeatures || []}
              onValuesChange={(values) => updateData("adminFeatures", values)}
              placeholder="Select admin features..."
              searchPlaceholder="Search admin features..."
              multiple
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="userControlFeatures">User Control Features</Label>
            <FuzzySearchSelect
              options={userControlOptions}
              values={data.userControlFeatures || []}
              onValuesChange={(values) => updateData("userControlFeatures", values)}
              placeholder="Select user control features..."
              searchPlaceholder="Search user features..."
              multiple
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="separateAdminApp"
              checked={data.separateAdminApp || false}
              onCheckedChange={(checked) => updateData("separateAdminApp", checked)}
            />
            <Label htmlFor="separateAdminApp">Separate Admin Application</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Admin Control Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional admin and user control requirements..."
              value={data.notes || ""}
              onChange={(e) => updateData("notes", e.target.value)}
              rows={4}
            />
          </div>
        </>
      )}

      {!data.enabled && (
        <div className="text-sm text-muted-foreground p-4 bg-muted rounded-lg">
          Admin/User Control is optional. Enable it if you need administrative features or user management capabilities.
        </div>
      )}
    </div>
  )
}
