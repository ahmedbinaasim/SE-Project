// import { Avatar, AvatarFallback } from "../ui/avatar"
// import { Card, CardContent, CardHeader } from "../ui/card"

// export function TestimonialsSection() {
//   const testimonials = [
//     {
//       name: "Alex Johnson",
//       role: "Medical Student",
//       content:
//         "NoteGenius has transformed how I study for med school. The AI summaries help me review complex topics quickly, and the OCR feature lets me digitize my handwritten notes.",
//       avatar: "AJ",
//     },
//     {
//       name: "Sarah Chen",
//       role: "Computer Science Major",
//       content:
//         "The collaboration features are amazing! My study group uses NoteGenius to share notes and work together on projects. The AI summaries save us hours of review time.",
//       avatar: "SC",
//     },
//     {
//       name: "Michael Rodriguez",
//       role: "Law Student",
//       content:
//         "As a law student, I have mountains of case notes. NoteGenius helps me organize everything and quickly find what I need. The summaries are surprisingly accurate.",
//       avatar: "MR",
//     },
//     {
//       name: "Emily Taylor",
//       role: "PhD Researcher",
//       content:
//         "The OCR functionality is a game-changer for my research. I can scan old documents and instantly have searchable text. This tool has accelerated my PhD work significantly.",
//       avatar: "ET",
//     },
//   ]

//   return (
//     <section className="w-full py-12 md:py-24 lg:py-32">
//       <div className="container px-4 md:px-6">
//         <div className="flex flex-col items-center justify-center space-y-4 text-center">
//           <div className="space-y-2">
//             <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
//               Testimonials
//             </div>
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Loved by Students and Researchers</h2>
//             <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
//               See what our users are saying about how NoteGenius has improved their study and research workflow.
//             </p>
//           </div>
//         </div>
//         <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
//           {testimonials.map((testimonial, index) => (
//             <Card key={index} className="border-0 bg-muted/50">
//               <CardHeader>
//                 <div className="flex items-center gap-4">
//                   <Avatar>
//                     <AvatarFallback>{testimonial.avatar}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <h3 className="text-lg font-bold">{testimonial.name}</h3>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-500 dark:text-gray-400">&quot;{testimonial.content}&quot;</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Card, CardContent, CardHeader } from "../ui/card"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Medical Student",
      content:
        "NoteGenius has transformed how I study for med school. The AI summaries help me review complex topics quickly, and the OCR feature lets me digitize my handwritten notes.",
      avatar: "AJ",
    },
    {
      name: "Sarah Chen",
      role: "Computer Science Major",
      content:
        "The collaboration features are amazing! My study group uses NoteGenius to share notes and work together on projects. The AI summaries save us hours of review time.",
      avatar: "SC",
    },
    {
      name: "Michael Rodriguez",
      role: "Law Student",
      content:
        "As a law student, I have mountains of case notes. NoteGenius helps me organize everything and quickly find what I need. The summaries are surprisingly accurate.",
      avatar: "MR",
    },
    {
      name: "Emily Taylor",
      role: "PhD Researcher",
      content:
        "The OCR functionality is a game-changer for my research. I can scan old documents and instantly have searchable text. This tool has accelerated my PhD work significantly.",
      avatar: "ET",
    },
  ]

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Loved by Students and Researchers</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              See what our users are saying about how NoteGenius has improved their study and research workflow.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group border-0 bg-muted/50 flex flex-col space-y-2 rounded-lg p-4 transition-all hover:scale-105 hover:shadow-lg hover:bg-gradient-to-b hover:from-primary/10 hover:to-transparent"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="transform transition-transform group-hover:animate-bounce">
                    <Avatar>
                      <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400">&quot;{testimonial.content}&quot;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}