import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ReusableCardProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function ReusableCard({ title, description, children, className = "" }: ReusableCardProps) {
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        {description && <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  )
}
