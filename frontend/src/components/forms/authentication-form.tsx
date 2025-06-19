import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { FuzzySearchSelect } from "@/components/fuzzy-search-select"
import { useAuthenticationData } from "@/store/FormContext"

const authMethodOptions = [
  { value: "jwt", label: "JWT (JSON Web Tokens)" },
  { value: "session", label: "Session-based" },
  { value: "oauth", label: "OAuth Only" },
  { value: "hybrid", label: "Hybrid (JWT + OAuth)" },
]

const oauthProviderOptions = [
  { value: "google", label: "Google" },
  { value: "github", label: "GitHub" },
  { value: "facebook", label: "Facebook" },
  { value: "twitter", label: "Twitter/X" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "discord", label: "Discord" },
  { value: "microsoft", label: "Microsoft" },
]

const thirdPartyOptions = [
  { value: "clerk", label: "Clerk" },
  { value: "auth0", label: "Auth0" },
  { value: "firebase", label: "Firebase Auth" },
  { value: "supabase", label: "Supabase Auth" },
  { value: "nextauth", label: "NextAuth.js" },
]

export function AuthenticationForm() {
  const { data, updateData } = useAuthenticationData()

  const handleUpdate = (field: string, value: any) => {
    updateData({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="authMethod">Authentication Method</Label>
        <FuzzySearchSelect
          options={authMethodOptions}
          value={data.authMethod || ""}
          onValueChange={(value) => handleUpdate("authMethod", value)}
          placeholder="Select authentication method..."
          searchPlaceholder="Search auth methods..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="oauthProviders">OAuth Providers</Label>
        <FuzzySearchSelect
          options={oauthProviderOptions}
          values={data.oauthProviders || []}
          onValuesChange={(values) => handleUpdate("oauthProviders", values)}
          placeholder="Select OAuth providers..."
          searchPlaceholder="Search providers..."
          multiple
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="thirdPartyService">Third-Party Authentication Service</Label>
        <FuzzySearchSelect
          options={thirdPartyOptions}
          value={data.thirdPartyService || ""}
          onValueChange={(value) => handleUpdate("thirdPartyService", value)}
          placeholder="Select third-party service (optional)..."
          searchPlaceholder="Search services..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="jwtSecret">JWT Secret Key</Label>
        <Input
          id="jwtSecret"
          type="password"
          placeholder="Enter JWT secret key..."
          value={data.jwtSecret || ""}
          onChange={(e) => handleUpdate("jwtSecret", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sessionConfig">Session Configuration</Label>
        <Textarea
          id="sessionConfig"
          placeholder="Session timeout, storage method, etc..."
          value={data.sessionConfig || ""}
          onChange={(e) => handleUpdate("sessionConfig", e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Authentication Notes</Label>
        <Textarea
          id="notes"
          placeholder="Additional authentication configuration notes..."
          value={data.notes || ""}
          onChange={(e) => handleUpdate("notes", e.target.value)}
          rows={4}
        />
      </div>
    </div>
  )
}
