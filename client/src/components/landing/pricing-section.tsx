import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

export function PricingSection() {
  const plans = [
    {
      name: "Free",
      description: "Basic features for students",
      price: "$0",
      period: "forever",
      features: ["Up to 50 notes", "Basic AI summaries", "OCR (5 pages/month)", "Limited collaboration"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      description: "Advanced features for serious students",
      price: "$9.99",
      period: "per month",
      features: [
        "Unlimited notes",
        "Advanced AI summaries",
        "OCR (100 pages/month)",
        "Full collaboration features",
        "Priority support",
        "Export in multiple formats",
      ],
      cta: "Upgrade to Pro",
      popular: true,
    },
    {
      name: "Team",
      description: "For study groups and research teams",
      price: "$19.99",
      period: "per month",
      features: [
        "Everything in Pro",
        "Team management",
        "Advanced permissions",
        "Unlimited OCR",
        "API access",
        "Dedicated support",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Pricing</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Choose the Perfect Plan for Your Needs</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Select a plan that works for you, from individual students to research teams.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Card key={index} className={`flex flex-col ${plan.popular ? "border-accent shadow-lg" : ""}`}>
              {plan.popular && (
                <div className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                  Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="ml-1 text-sm text-muted-foreground">/{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-accent" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/register" className="w-full">
                  <Button
                    className={`w-full ${plan.popular ? "bg-accent hover:bg-accent/90 text-accent-foreground" : ""}`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
