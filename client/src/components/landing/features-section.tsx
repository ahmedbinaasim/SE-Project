// import { FileText, Brain, ImageIcon, Users, Calendar, Search, Edit, Share2 } from "lucide-react"

// export function FeaturesSection() {
//   const features = [
//     {
//       icon: <FileText className="h-10 w-10 text-primary" />,
//       title: "Note Management",
//       description: "Upload, organize, and access your notes from anywhere. Support for multiple file formats.",
//     },
//     {
//       icon: <Brain className="h-10 w-10 text-primary" />,
//       title: "AI Summaries",
//       description: "Generate concise summaries of your notes using advanced AI technology.",
//     },
//     {
//       icon: <ImageIcon className="h-10 w-10 text-primary" />,
//       title: "OCR Technology",
//       description: "Extract text from images and scanned documents with optical character recognition.",
//     },
//     {
//       icon: <Users className="h-10 w-10 text-primary" />,
//       title: "Collaboration",
//       description: "Share notes with classmates and colleagues. Control edit permissions and work together.",
//     },
//     {
//       icon: <Search className="h-10 w-10 text-primary" />,
//       title: "Smart Search",
//       description: "Find your notes quickly with powerful search and filtering capabilities.",
//     },
//     {
//       icon: <Edit className="h-10 w-10 text-primary" />,
//       title: "Rich Text Editor",
//       description: "Format your notes with a powerful rich text editor that supports images and attachments.",
//     },
//     {
//       icon: <Calendar className="h-10 w-10 text-primary" />,
//       title: "Study Planner",
//       description: "Organize your study schedule and set reminders for important deadlines.",
//     },
//     {
//       icon: <Share2 className="h-10 w-10 text-primary" />,
//       title: "Export Options",
//       description: "Export your notes and summaries in multiple formats for easy sharing.",
//     },
//   ]

//   return (
//     <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
//       <div className="container px-4 md:px-6">
//         <div className="flex flex-col items-center justify-center space-y-4 text-center">
//           <div className="space-y-2">
//             <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Features</div>
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need for Your Notes</h2>
//             <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
//               NoteGenius combines powerful note management with AI technology to help you study smarter, not harder.
//             </p>
//           </div>
//         </div>
//         <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="flex flex-col items-center space-y-2 rounded-lg border p-4 transition-all hover:bg-accent/10"
//             >
//               {feature.icon}
//               <h3 className="text-xl font-bold">{feature.title}</h3>
//               <p className="text-center text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

import { FileText, Brain, ImageIcon, Users, Calendar, Search, Edit, Share2 } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Note Management",
      description: "Upload, organize, and access your notes from anywhere. Support for multiple file formats.",
    },
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: "AI Summaries",
      description: "Generate concise summaries of your notes using advanced AI technology.",
    },
    {
      icon: <ImageIcon className="h-10 w-10 text-primary" />,
      title: "OCR Technology",
      description: "Extract text from images and scanned documents with optical character recognition.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Collaboration",
      description: "Share notes with classmates and colleagues. Control edit permissions and work together.",
    },
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Smart Search",
      description: "Find your notes quickly with powerful search and filtering capabilities.",
    },
    {
      icon: <Edit className="h-10 w-10 text-primary" />,
      title: "Rich Text Editor",
      description: "Format your notes with a powerful rich text editor that supports images and attachments.",
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Study Planner",
      description: "Organize your study schedule and set reminders for important deadlines.",
    },
    {
      icon: <Share2 className="h-10 w-10 text-primary" />,
      title: "Export Options",
      description: "Export your notes and summaries in multiple formats for easy sharing.",
    },
  ]

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need for Your Notes</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              NoteGenius combines powerful note management with AI technology to help you study smarter, not harder.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex flex-col items-center space-y-2 rounded-lg border p-4 transition-all hover:scale-105 hover:shadow-lg hover:bg-gradient-to-b hover:from-primary/10 hover:to-transparent"
            >
              <div className="transform transition-transform group-hover:animate-bounce">{feature.icon}</div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}