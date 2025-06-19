"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FuzzySearchSelect } from "@/components/fuzzy-search-select"
import { useTablesData, useIsSQLDatabase } from "@/store/FormContext"

const commonTableOptions = [
  { value: "users", label: "Users" },
  { value: "roles", label: "Roles" },
  { value: "permissions", label: "Permissions" },
  { value: "user_roles", label: "User Roles (Junction)" },
  { value: "role_permissions", label: "Role Permissions (Junction)" },
  { value: "products", label: "Products" },
  { value: "categories", label: "Categories" },
  { value: "orders", label: "Orders" },
  { value: "order_items", label: "Order Items" },
  { value: "payments", label: "Payments" },
  { value: "sessions", label: "Sessions" },
  { value: "audit_logs", label: "Audit Logs" },
  { value: "notifications", label: "Notifications" },
  { value: "files", label: "Files/Media" },
  { value: "settings", label: "Settings" },
]

export function TablesForm() {
  const { data, updateData } = useTablesData()
  const isSQLDatabase = useIsSQLDatabase()

  const handleUpdate = (field: string, value: any) => {
    updateData({ [field]: value })
  }

  if (!isSQLDatabase) {
    return (
      <div className="space-y-6">
        <div className="text-center p-8 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Non-SQL Database Selected</h3>
          <p className="text-muted-foreground">
            Table selection is only applicable for SQL databases (MySQL/PostgreSQL). MongoDB uses collections instead of
            tables.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Database Structure Notes</Label>
          <Textarea
            id="notes"
            placeholder="Describe your database structure, collections, or document schema..."
            value={data.notes || ""}
            onChange={(e) => handleUpdate("notes", e.target.value)}
            rows={6}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="tables">Database Tables</Label>
        <FuzzySearchSelect
          options={commonTableOptions}
          values={data.tables || []}
          onValuesChange={(values) => handleUpdate("tables", values)}
          placeholder="Select tables to create..."
          searchPlaceholder="Search tables..."
          multiple
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="customTables">Custom Tables</Label>
        <Textarea
          id="customTables"
          placeholder="List any custom tables not in the predefined list (one per line)..."
          value={data.customTables || ""}
          onChange={(e) => handleUpdate("customTables", e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="relationships">Table Relationships</Label>
        <Textarea
          id="relationships"
          placeholder="Describe foreign key relationships between tables..."
          value={data.relationships || ""}
          onChange={(e) => handleUpdate("relationships", e.target.value)}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="indexes">Indexes & Constraints</Label>
        <Textarea
          id="indexes"
          placeholder="Specify any indexes, unique constraints, or performance optimizations..."
          value={data.indexes || ""}
          onChange={(e) => handleUpdate("indexes", e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Database Notes</Label>
        <Textarea
          id="notes"
          placeholder="Any additional database structure requirements..."
          value={data.notes || ""}
          onChange={(e) => handleUpdate("notes", e.target.value)}
          rows={4}
        />
      </div>
    </div>
  )
}
