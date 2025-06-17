import { useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FuzzySearchSelect } from "@/components/fuzzy-search-select"

const databaseOptions = [
  { value: "mysql", label: "MySQL" },
  { value: "postgresql", label: "PostgreSQL" },
  { value: "mongodb", label: "MongoDB" },
]

const ormOptions = [
  { value: "prisma", label: "Prisma" },
  { value: "typeorm", label: "TypeORM" },
  { value: "sequelize", label: "Sequelize" },
  { value: "knex", label: "Knex.js" },
  { value: "mongoose", label: "Mongoose (MongoDB)" },
]

interface DatabaseFormProps {
  data: any
  onDataChange: (data: any) => void
  allData: any
}

export function DatabaseForm({ data, onDataChange }: DatabaseFormProps) {
  const updateData = (field: string, value: any) => {
    const newData = { ...data, [field]: value }
    onDataChange(newData)
  }

  useEffect(() => {
    if (!data.database) {
      onDataChange({
        database: "",
        orm: "",
        connectionString: "",
        notes: "",
      })
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="database">Database Type</Label>
        <FuzzySearchSelect
          options={databaseOptions}
          value={data.database || ""}
          onValueChange={(value) => updateData("database", value)}
          placeholder="Select database type..."
          searchPlaceholder="Search databases..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="orm">ORM/Query Builder</Label>
        <FuzzySearchSelect
          options={ormOptions}
          value={data.orm || ""}
          onValueChange={(value) => updateData("orm", value)}
          placeholder="Select ORM or query builder..."
          searchPlaceholder="Search ORMs..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="connectionString">Connection String</Label>
        <Textarea
          id="connectionString"
          placeholder="Enter your database connection string..."
          value={data.connectionString || ""}
          onChange={(e) => updateData("connectionString", e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          placeholder="Any additional database configuration notes..."
          value={data.notes || ""}
          onChange={(e) => updateData("notes", e.target.value)}
          rows={4}
        />
      </div>
    </div>
  )
}
