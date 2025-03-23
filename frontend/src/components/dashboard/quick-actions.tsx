import { FileUp, FileText, Camera, Sparkles } from "lucide-react"

export default function QuickActions() {
  const actions = [
    {
      icon: <FileUp className="h-6 w-6" />,
      title: "Upload New Note",
      description: "Upload PDF, DOCX, or TXT files",
      href: "/dashboard/notes/upload",
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Create Note",
      description: "Start writing a new note",
      href: "/dashboard/notes/create",
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Scan Handwritten Note",
      description: "Convert handwritten notes to text",
      href: "/dashboard/notes/scan",
      color: "bg-green-500/10 text-green-500 border-green-500/20",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Generate AI Summary",
      description: "Summarize your existing notes",
      href: "/dashboard/notes/summarize",
      color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    },
  ]

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Quick Actions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <a
            key={index}
            href={action.href}
            className="flex flex-col items-center text-center p-6 bg-card/50 border border-border/40 rounded-lg hover:shadow-md hover:shadow-primary/5 transition-all hover:translate-y-[-2px] backdrop-blur-sm"
          >
            <div className={`p-3 rounded-full ${action.color} mb-4`}>{action.icon}</div>
            <h3 className="font-medium">{action.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

