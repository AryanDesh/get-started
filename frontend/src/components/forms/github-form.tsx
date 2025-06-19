"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { FuzzySearchSelect } from "@/components/fuzzy-search-select"
import { useGithubData } from "@/store/FormContext"

const workflowOptions = [
  { value: "ci", label: "Continuous Integration" },
  { value: "cd", label: "Continuous Deployment" },
  { value: "testing", label: "Automated Testing" },
  { value: "linting", label: "Code Linting" },
  { value: "security", label: "Security Scanning" },
  { value: "dependency", label: "Dependency Updates" },
  { value: "release", label: "Release Automation" },
]

const branchingOptions = [
  { value: "gitflow", label: "Git Flow" },
  { value: "github", label: "GitHub Flow" },
  { value: "gitlab", label: "GitLab Flow" },
  { value: "custom", label: "Custom Strategy" },
]

export function GithubForm() {
  const { data, updateData } = useGithubData()

  const handleUpdate = (field: string, value: any) => {
    updateData({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="repositoryName">Repository Name</Label>
        <Input
          id="repositoryName"
          placeholder="my-awesome-project"
          value={data.repositoryName || ""}
          onChange={(e) => handleUpdate("repositoryName", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Repository Description</Label>
        <Textarea
          id="description"
          placeholder="A brief description of your project..."
          value={data.description || ""}
          onChange={(e) => handleUpdate("description", e.target.value)}
          rows={3}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="private"
          checked={data.private || false}
          onCheckedChange={(checked) => handleUpdate("private", checked)}
        />
        <Label htmlFor="private">Private Repository</Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="workflows">GitHub Actions Workflows</Label>
        <FuzzySearchSelect
          options={workflowOptions}
          values={data.workflows || []}
          onValuesChange={(values) => handleUpdate("workflows", values)}
          placeholder="Select workflows to set up..."
          searchPlaceholder="Search workflows..."
          multiple
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="branchingStrategy">Branching Strategy</Label>
        <FuzzySearchSelect
          options={branchingOptions}
          value={data.branchingStrategy || ""}
          onValueChange={(value) => handleUpdate("branchingStrategy", value)}
          placeholder="Select branching strategy..."
          searchPlaceholder="Search strategies..."
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="protectedBranches"
            checked={data.protectedBranches || false}
            onCheckedChange={(checked) => handleUpdate("protectedBranches", checked)}
          />
          <Label htmlFor="protectedBranches">Protected Branches (main/develop)</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="issueTemplates"
            checked={data.issueTemplates || false}
            onCheckedChange={(checked) => handleUpdate("issueTemplates", checked)}
          />
          <Label htmlFor="issueTemplates">Issue Templates</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="prTemplates"
            checked={data.prTemplates || false}
            onCheckedChange={(checked) => handleUpdate("prTemplates", checked)}
          />
          <Label htmlFor="prTemplates">Pull Request Templates</Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">GitHub Configuration Notes</Label>
        <Textarea
          id="notes"
          placeholder="Additional GitHub setup requirements, team access, etc..."
          value={data.notes || ""}
          onChange={(e) => handleUpdate("notes", e.target.value)}
          rows={4}
        />
      </div>
    </div>
  )
}
