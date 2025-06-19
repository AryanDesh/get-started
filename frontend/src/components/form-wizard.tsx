import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ReusableCard } from "@/components/reusable-card"
import { DatabaseForm } from "@/components/forms/database-form"
import { AuthenticationForm } from "@/components/forms/authentication-form"
import { BackendForm } from "@/components/forms/backend-form"
import { AdminControlForm } from "@/components/forms/admin-control-form"
import { RBACForm } from "@/components/forms/rbac-form"
import { TablesForm } from "@/components/forms/tables-form"
import { GithubForm } from "@/components/forms/github-form"
import { JsonDisplay } from "@/components/json-display"
import { useCurrentStep, useShowJson, useConfiguredSteps } from "@/store/FormContext"

const steps = [
  { id: "database", title: "Database Configuration", component: DatabaseForm },
  { id: "authentication", title: "Authentication Setup", component: AuthenticationForm },
  { id: "backend", title: "NestJS Backend", component: BackendForm },
  { id: "adminControl", title: "Admin/User Control", component: AdminControlForm },
  { id: "rbac", title: "Role-Based Access Control", component: RBACForm },
  { id: "tables", title: "Database Tables", component: TablesForm },
  { id: "github", title: "GitHub Integration", component: GithubForm },
]

export function FormWizard() {
  const { currentStep, setCurrentStep } = useCurrentStep()
  const { showJson, setShowJson } = useShowJson()
  const configuredSteps = useConfiguredSteps()

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100
  const CurrentFormComponent = steps[currentStep].component

  if (showJson) {
    return (
      <div className="space-y-6">
        <ReusableCard title="Configuration Summary" description="Your complete project configuration in JSON format">
          <JsonDisplay />
          <div className="flex gap-4 pt-4">
            <Button onClick={() => setShowJson(false)} variant="outline">
              Back to Wizard
            </Button>
          </div>
        </ReusableCard>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <ReusableCard
        title={`Step ${currentStep + 1} of ${steps.length}: ${steps[currentStep].title}`}
        description={`Complete each step to configure your project (${configuredSteps}/${steps.length} configured)`}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          <div className="min-h-[400px]">
            <CurrentFormComponent />
          </div>

          <div className="flex justify-between pt-4">
            <Button onClick={prevStep} disabled={currentStep === 0} variant="outline">
              Previous
            </Button>

            <div className="flex gap-2">
              <Button onClick={() => setShowJson(true)} variant="secondary">
                View JSON
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button onClick={() => setShowJson(true)}>Complete Setup</Button>
              ) : (
                <Button onClick={nextStep}>Next</Button>
              )}
            </div>
          </div>
        </div>
      </ReusableCard>
    </div>
  )
}
