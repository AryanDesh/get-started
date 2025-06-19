"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

// Type definitions
export interface DatabaseData {
  database: string
  orm: string
  connectionString: string
  notes: string
}

export interface AuthenticationData {
  authMethod: string
  oauthProviders: string[]
  thirdPartyService: string
  jwtSecret: string
  sessionConfig: string
  notes: string
}

export interface BackendData {
  modules: string[]
  middleware: string[]
  port: string
  apiPrefix: string
  swaggerEnabled: boolean
  notes: string
}

export interface AdminControlData {
  enabled: boolean
  adminFeatures: string[]
  userControlFeatures: string[]
  separateAdminApp: boolean
  notes: string
}

export interface RBACData {
  enabled: boolean
  roles: string[]
  customRoles: string[]
  rolePermissions: Record<string, string[]>
  hierarchical: boolean
  notes: string
}

export interface TablesData {
  tables: string[]
  customTables: string
  relationships: string
  indexes: string
  notes: string
}

export interface GithubData {
  repositoryName: string
  description: string
  private: boolean
  workflows: string[]
  branchingStrategy: string
  protectedBranches: boolean
  issueTemplates: boolean
  prTemplates: boolean
  notes: string
}

export interface FormData {
  database: DatabaseData
  authentication: AuthenticationData
  backend: BackendData
  adminControl: AdminControlData
  rbac: RBACData
  tables: TablesData
  github: GithubData
}

export interface FormState {
  currentStep: number
  showJson: boolean
  formData: FormData
}

// Action types
type FormAction =
  | { type: "SET_CURRENT_STEP"; payload: number }
  | { type: "SET_SHOW_JSON"; payload: boolean }
  | { type: "UPDATE_DATABASE_DATA"; payload: Partial<DatabaseData> }
  | { type: "UPDATE_AUTHENTICATION_DATA"; payload: Partial<AuthenticationData> }
  | { type: "UPDATE_BACKEND_DATA"; payload: Partial<BackendData> }
  | { type: "UPDATE_ADMIN_CONTROL_DATA"; payload: Partial<AdminControlData> }
  | { type: "UPDATE_RBAC_DATA"; payload: Partial<RBACData> }
  | { type: "UPDATE_TABLES_DATA"; payload: Partial<TablesData> }
  | { type: "UPDATE_GITHUB_DATA"; payload: Partial<GithubData> }
  | { type: "RESET_FORM" }

// Initial state
const initialState: FormState = {
  currentStep: 0,
  showJson: false,
  formData: {
    database: {
      database: "",
      orm: "",
      connectionString: "",
      notes: "",
    },
    authentication: {
      authMethod: "",
      oauthProviders: [],
      thirdPartyService: "",
      jwtSecret: "",
      sessionConfig: "",
      notes: "",
    },
    backend: {
      modules: [],
      middleware: [],
      port: "3000",
      apiPrefix: "api/v1",
      swaggerEnabled: true,
      notes: "",
    },
    adminControl: {
      enabled: false,
      adminFeatures: [],
      userControlFeatures: [],
      separateAdminApp: false,
      notes: "",
    },
    rbac: {
      enabled: false,
      roles: [],
      customRoles: [],
      rolePermissions: {},
      hierarchical: false,
      notes: "",
    },
    tables: {
      tables: [],
      customTables: "",
      relationships: "",
      indexes: "",
      notes: "",
    },
    github: {
      repositoryName: "",
      description: "",
      private: true,
      workflows: [],
      branchingStrategy: "",
      protectedBranches: true,
      issueTemplates: false,
      prTemplates: false,
      notes: "",
    },
  },
}

// Reducer
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_CURRENT_STEP":
      return { ...state, currentStep: action.payload }
    case "SET_SHOW_JSON":
      return { ...state, showJson: action.payload }
    case "UPDATE_DATABASE_DATA":
      return {
        ...state,
        formData: {
          ...state.formData,
          database: { ...state.formData.database, ...action.payload },
        },
      }
    case "UPDATE_AUTHENTICATION_DATA":
      return {
        ...state,
        formData: {
          ...state.formData,
          authentication: { ...state.formData.authentication, ...action.payload },
        },
      }
    case "UPDATE_BACKEND_DATA":
      return {
        ...state,
        formData: {
          ...state.formData,
          backend: { ...state.formData.backend, ...action.payload },
        },
      }
    case "UPDATE_ADMIN_CONTROL_DATA":
      return {
        ...state,
        formData: {
          ...state.formData,
          adminControl: { ...state.formData.adminControl, ...action.payload },
        },
      }
    case "UPDATE_RBAC_DATA":
      return {
        ...state,
        formData: {
          ...state.formData,
          rbac: { ...state.formData.rbac, ...action.payload },
        },
      }
    case "UPDATE_TABLES_DATA":
      return {
        ...state,
        formData: {
          ...state.formData,
          tables: { ...state.formData.tables, ...action.payload },
        },
      }
    case "UPDATE_GITHUB_DATA":
      return {
        ...state,
        formData: {
          ...state.formData,
          github: { ...state.formData.github, ...action.payload },
        },
      }
    case "RESET_FORM":
      return initialState
    default:
      return state
  }
}

// Context
const FormContext = createContext<{
  state: FormState
  dispatch: React.Dispatch<FormAction>
} | null>(null)

// Provider component
export function FormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(formReducer, initialState)

  return <FormContext.Provider value={{ state, dispatch }}>{children}</FormContext.Provider>
}

// Custom hooks
export function useFormContext() {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider")
  }
  return context
}

export function useCurrentStep() {
  const { state, dispatch } = useFormContext()
  return {
    currentStep: state.currentStep,
    setCurrentStep: (step: number) => dispatch({ type: "SET_CURRENT_STEP", payload: step }),
  }
}

export function useShowJson() {
  const { state, dispatch } = useFormContext()
  return {
    showJson: state.showJson,
    setShowJson: (show: boolean) => dispatch({ type: "SET_SHOW_JSON", payload: show }),
  }
}

export function useDatabaseData() {
  const { state, dispatch } = useFormContext()
  return {
    data: state.formData.database,
    updateData: (data: Partial<DatabaseData>) => dispatch({ type: "UPDATE_DATABASE_DATA", payload: data }),
  }
}

export function useAuthenticationData() {
  const { state, dispatch } = useFormContext()
  return {
    data: state.formData.authentication,
    updateData: (data: Partial<AuthenticationData>) => dispatch({ type: "UPDATE_AUTHENTICATION_DATA", payload: data }),
  }
}

export function useBackendData() {
  const { state, dispatch } = useFormContext()
  return {
    data: state.formData.backend,
    updateData: (data: Partial<BackendData>) => dispatch({ type: "UPDATE_BACKEND_DATA", payload: data }),
  }
}

export function useAdminControlData() {
  const { state, dispatch } = useFormContext()
  return {
    data: state.formData.adminControl,
    updateData: (data: Partial<AdminControlData>) => dispatch({ type: "UPDATE_ADMIN_CONTROL_DATA", payload: data }),
  }
}

export function useRBACData() {
  const { state, dispatch } = useFormContext()
  return {
    data: state.formData.rbac,
    updateData: (data: Partial<RBACData>) => dispatch({ type: "UPDATE_RBAC_DATA", payload: data }),
  }
}

export function useTablesData() {
  const { state, dispatch } = useFormContext()
  return {
    data: state.formData.tables,
    updateData: (data: Partial<TablesData>) => dispatch({ type: "UPDATE_TABLES_DATA", payload: data }),
  }
}

export function useGithubData() {
  const { state, dispatch } = useFormContext()
  return {
    data: state.formData.github,
    updateData: (data: Partial<GithubData>) => dispatch({ type: "UPDATE_GITHUB_DATA", payload: data }),
  }
}

export function useFormData() {
  const { state } = useFormContext()
  return state.formData
}

export function useConfiguredSteps() {
  const { state } = useFormContext()
  const formData = state.formData
  let count = 0

  if (formData.database.database) count++
  if (formData.authentication.authMethod) count++
  if (formData.backend.modules?.length > 0) count++
  if (formData.adminControl.enabled) count++
  if (formData.rbac.enabled) count++
  if (formData.tables.tables?.length > 0 || formData.tables.notes) count++
  if (formData.github.repositoryName) count++

  return count
}

export function useIsSQLDatabase() {
  const { state } = useFormContext()
  const databaseType = state.formData.database.database
  return databaseType === "mysql" || databaseType === "postgresql"
}
