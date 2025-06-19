import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { FuzzySearchSelect } from "@/components/fuzzy-search-select"
import { useAdminControlData } from "@/store/FormContext"

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

export function AdminControlForm() {
  const { data, updateData } = useAdminControlData()

  const handleUpdate = (field: string, value: any) => {
    updateData({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="enabled"
          checked={data.enabled || false}
          onCheckedChange={(checked) => handleUpdate("enabled", checked)}
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
              onValuesChange={(values) => handleUpdate("adminFeatures", values)}
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
              onValuesChange={(values) => handleUpdate("userControlFeatures", values)}
              placeholder="Select user control features..."
              searchPlaceholder="Search user features..."
              multiple
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="separateAdminApp"
              checked={data.separateAdminApp || false}
              onCheckedChange={(checked) => handleUpdate("separateAdminApp", checked)}
            />
            <Label htmlFor="separateAdminApp">Separate Admin Application</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Admin Control Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional admin and user control requirements..."
              value={data.notes || ""}
              onChange={(e) => handleUpdate("notes", e.target.value)}
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
