import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface PricingCardProps {
  title: string
  price: string
  period?: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: "default" | "outline" | "secondary"
  popular?: boolean
}

export default function PricingCard({
  title,
  price,
  period = "",
  description,
  features,
  buttonText,
  buttonVariant,
  popular = false,
}: PricingCardProps) {
  return (
    <Card
      className={`flex flex-col transition-all duration-300 hover:shadow-md hover:shadow-primary/10 border ${popular ? "border-primary shadow-md relative" : "border-border/50"} bg-card/50 backdrop-blur-sm h-full`}
    >
      {popular && (
        <div className="absolute -top-3 left-0 right-0 mx-auto w-fit px-3 py-1 text-xs font-medium text-primary-foreground bg-primary rounded-full pulse-glow">
          Most Popular
        </div>
      )}
      <CardHeader className={popular ? "pt-8" : ""}>
        <CardTitle>{title}</CardTitle>
        <div className="flex items-baseline mt-2">
          <span className="text-3xl font-bold gradient-text">{price}</span>
          {period && <span className="ml-1 text-muted-foreground">{period}</span>}
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          variant={buttonVariant}
          className={`w-full ${popular ? "pulse-glow" : "hover:shadow-sm hover:shadow-primary/20"}`}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}

