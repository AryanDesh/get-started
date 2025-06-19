import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FuzzySearchSelect } from "@/components/fuzzy-search-select"
import { useDatabaseData } from "@/store/FormContext"

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

export function DatabaseForm() {
  const { data, updateData } = useDatabaseData()

  const handleUpdate = (field: string, value: any) => {
    updateData({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="database">Database Type</Label>
        <FuzzySearchSelect
          options={databaseOptions}
          value={data.database || ""}
          onValueChange={(value) => handleUpdate("database", value)}
          placeholder="Select database type..."
          searchPlaceholder="Search databases..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="orm">ORM/Query Builder</Label>
        <FuzzySearchSelect
          options={ormOptions}
          value={data.orm || ""}
          onValueChange={(value) => handleUpdate("orm", value)}
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
          onChange={(e) => handleUpdate("connectionString", e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          placeholder="Any additional database configuration notes..."
          value={data.notes || ""}
          onChange={(e) => handleUpdate("notes", e.target.value)}
          rows={4}
        />
      </div>
    </div>
  )
}
