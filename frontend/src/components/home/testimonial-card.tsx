import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatarUrl: string
}

export default function TestimonialCard({ quote, author, role, avatarUrl }: TestimonialCardProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-md hover:shadow-primary/10 border border-border/50 bg-card/50 backdrop-blur-sm h-full">
      <CardContent className="pt-6">
        <div className="relative">
          <div className="text-4xl text-primary absolute -top-4 -left-2">&quot;</div>
          <p className="text-muted-foreground relative z-10">{quote}</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-4 pt-4 border-t border-border/50">
        <Avatar>
          <AvatarImage src={avatarUrl} alt={author} />
          <AvatarFallback className="bg-primary/20 text-primary">{author.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardFooter>
    </Card>
  )
}

