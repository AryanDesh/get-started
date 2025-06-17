import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FuzzySearchSelect } from "@/components/fuzzy-search-select"
import { Trash2, Plus } from "lucide-react"

const roleOptions = [
  { value: "admin", label: "Administrator" },
  { value: "moderator", label: "Moderator" },
  { value: "editor", label: "Editor" },
  { value: "user", label: "Regular User" },
  { value: "guest", label: "Guest" },
  { value: "manager", label: "Manager" },
  { value: "support", label: "Support Agent" },
]

const permissionOptions = [
  { value: "create", label: "Create" },
  { value: "read", label: "Read" },
  { value: "update", label: "Update" },
  { value: "delete", label: "Delete" },
  { value: "publish", label: "Publish" },
  { value: "moderate", label: "Moderate" },
  { value: "manage_users", label: "Manage Users" },
  { value: "manage_roles", label: "Manage Roles" },
  { value: "view_analytics", label: "View Analytics" },
  { value: "system_config", label: "System Configuration" },
  { value: "export_data", label: "Export Data" },
  { value: "import_data", label: "Import Data" },
  { value: "backup_restore", label: "Backup & Restore" },
  { value: "audit_logs", label: "View Audit Logs" },
  { value: "manage_content", label: "Manage Content" },
  { value: "approve_content", label: "Approve Content" },
  { value: "manage_payments", label: "Manage Payments" },
  { value: "view_reports", label: "View Reports" },
]

interface RBACFormProps {
  data: any
  onDataChange: (data: any) => void
  allData: any
}

export function RBACForm({ data, onDataChange }: RBACFormProps) {
  const [newCustomRole, setNewCustomRole] = useState("")

  const updateData = (field: string, value: any) => {
    const newData = { ...data, [field]: value }
    onDataChange(newData)
  }

  const getAllRoles = () => {
    const predefinedRoles = data.roles || []
    const customRoles = data.customRoles || []
    return [...predefinedRoles, ...customRoles]
  }

  const updateRolePermissions = (role: string, permissions: string[]) => {
    const newRolePermissions = {
      ...data.rolePermissions,
      [role]: permissions,
    }
    updateData("rolePermissions", newRolePermissions)
  }

  const addCustomRole = () => {
    if (newCustomRole.trim() && !getAllRoles().includes(newCustomRole.trim())) {
      const customRoles = [...(data.customRoles || []), newCustomRole.trim()]
      const newRolePermissions = {
        ...(data.rolePermissions || {}),
        [newCustomRole.trim()]: [],
      }

      // Update both customRoles and rolePermissions at once
      onDataChange({
        ...data,
        customRoles,
        rolePermissions: newRolePermissions,
      })
      setNewCustomRole("")
    }
  }

  const removeCustomRole = (roleToRemove: string) => {
    const customRoles = (data.customRoles || []).filter((role: string) => role !== roleToRemove)
    updateData("customRoles", customRoles)

    // Remove permissions for the deleted role
    const newRolePermissions = { ...data.rolePermissions }
    delete newRolePermissions[roleToRemove]
    updateData("rolePermissions", newRolePermissions)
  }

  const copyPermissionsFromRole = (fromRole: string, toRole: string) => {
    const fromPermissions = data.rolePermissions?.[fromRole] || []
    updateRolePermissions(toRole, [...fromPermissions])
  }

  useEffect(() => {
    if (data.enabled === undefined) {
      onDataChange({
        enabled: false,
        roles: [],
        customRoles: [],
        rolePermissions: {},
        hierarchical: false,
        notes: "",
      })
    }
  }, [])

  // Update role permissions when roles change
  useEffect(() => {
    if (data.enabled && (data.roles || data.customRoles)) {
      const currentRolePermissions = data.rolePermissions || {}
      const newRolePermissions = { ...currentRolePermissions }

      // Add permissions object for predefined roles
      if (data.roles) {
        data.roles.forEach((role: string) => {
          if (!newRolePermissions[role]) {
            newRolePermissions[role] = []
          }
        })
      }

      // Add permissions object for custom roles
      if (data.customRoles) {
        data.customRoles.forEach((role: string) => {
          if (!newRolePermissions[role]) {
            newRolePermissions[role] = []
          }
        })
      }

      // Remove permissions for roles that are no longer selected
      Object.keys(newRolePermissions).forEach((role) => {
        const isInPredefined = (data.roles || []).includes(role)
        const isInCustom = (data.customRoles || []).includes(role)
        if (!isInPredefined && !isInCustom) {
          delete newRolePermissions[role]
        }
      })

      updateData("rolePermissions", newRolePermissions)
    }
  }, [data.roles, data.customRoles, data.enabled])

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="enabled"
          checked={data.enabled || false}
          onCheckedChange={(checked) => updateData("enabled", checked)}
        />
        <Label htmlFor="enabled">Enable Role-Based Access Control (Optional)</Label>
      </div>

      {data.enabled && (
        <>
          <div className="space-y-2">
            <Label htmlFor="roles">Predefined User Roles</Label>
            <FuzzySearchSelect
              options={roleOptions}
              values={data.roles || []}
              onValuesChange={(values) => updateData("roles", values)}
              placeholder="Select predefined roles..."
              searchPlaceholder="Search roles..."
              multiple
            />
          </div>

          <div className="space-y-4">
            <Label>Custom Roles</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter custom role name..."
                value={newCustomRole}
                onChange={(e) => setNewCustomRole(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addCustomRole()}
              />
              <Button onClick={addCustomRole} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>

            {data.customRoles && data.customRoles.length > 0 && (
              <div className="space-y-2">
                {data.customRoles.map((role: string) => (
                  <div key={role} className="flex items-center justify-between bg-muted p-2 rounded">
                    <span className="font-medium">{role}</span>
                    <Button
                      onClick={() => removeCustomRole(role)}
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {getAllRoles().length > 0 && (
            <>
              <Separator />
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Role Permissions Configuration</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Define specific permissions for each role. You can copy permissions from one role to another.
                  </p>
                </div>

                {getAllRoles().map((role: string) => (
                  <div key={role} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-base capitalize">{role} Permissions</h4>
                      {getAllRoles().length > 1 && (
                        <div className="flex gap-2">
                          <Label className="text-sm text-muted-foreground">Copy from:</Label>
                          <FuzzySearchSelect
                            options={getAllRoles()
                              .filter((r) => r !== role)
                              .map((r) => ({ value: r, label: r }))}
                            value=""
                            onValueChange={(fromRole) => copyPermissionsFromRole(fromRole, role)}
                            placeholder="Select role..."
                            searchPlaceholder="Search roles..."
                          />
                        </div>
                      )}
                    </div>

                    <FuzzySearchSelect
                      options={permissionOptions}
                      values={data.rolePermissions?.[role] || []}
                      onValuesChange={(permissions) => updateRolePermissions(role, permissions)}
                      placeholder={`Select permissions for ${role}...`}
                      searchPlaceholder="Search permissions..."
                      multiple
                    />

                    {data.rolePermissions?.[role] && data.rolePermissions[role].length > 0 && (
                      <div className="text-sm text-muted-foreground">
                        {data.rolePermissions[role].length} permission
                        {data.rolePermissions[role].length !== 1 ? "s" : ""} assigned
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="hierarchical"
              checked={data.hierarchical || false}
              onCheckedChange={(checked) => updateData("hierarchical", checked)}
            />
            <Label htmlFor="hierarchical">Hierarchical Role Structure</Label>
          </div>

          {data.hierarchical && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Hierarchical Roles</h4>
              <p className="text-sm text-blue-800">
                In hierarchical mode, higher-level roles automatically inherit permissions from lower-level roles.
                Typical hierarchy: Guest → User → Editor → Moderator → Manager → Admin
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">RBAC Configuration Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional RBAC requirements, role descriptions, permission explanations..."
              value={data.notes || ""}
              onChange={(e) => updateData("notes", e.target.value)}
              rows={4}
            />
          </div>
        </>
      )}

      {!data.enabled && (
        <div className="text-sm text-muted-foreground p-4 bg-muted rounded-lg">
          RBAC is optional but recommended for applications with multiple user types and complex permission
          requirements. Enable it to define detailed role-based access controls.
        </div>
      )}
    </div>
  )
}
