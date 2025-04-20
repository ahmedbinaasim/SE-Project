// // // "use client"

// // // import { useState } from "react"
// // // import { Button } from "../ui/button"
// // // import { Input } from "../ui/input"
// // // import { Label } from "../ui/label"
// // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
// // // import { Slider } from "../ui/slider"
// // // import { Switch } from "../ui/switch"
// // // import { cn } from "../../lib/utils"
// // // import { Search, SlidersHorizontal, X } from "lucide-react"
// // // import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"

// // // interface NotesFiltersProps {
// // //   className?: string
// // // }

// // // export function NotesFilters({ className }: NotesFiltersProps) {
// // //   const [searchTerm, setSearchTerm] = useState("")
// // //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
// // //   const [showFilters, setShowFilters] = useState(false)
// // //   const [subject, setSubject] = useState("all")
// // //   const [dateRange, setDateRange] = useState<[number]>([30])
// // //   const [showFavorites, setShowFavorites] = useState(false)

// // //   const clearFilters = () => {
// // //     setSearchTerm("")
// // //     setSubject("all")
// // //     setDateRange([30])
// // //     setShowFavorites(false)
// // //   }

// // //   return (
// // //     <div className={cn("space-y-4", className)}>
// // //       <div className="flex items-center gap-2">
// // //         <div className="relative flex-1">
// // //           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
// // //           <Input
// // //             type="search"
// // //             placeholder="Search notes..."
// // //             className="pl-8"
// // //             value={searchTerm}
// // //             onChange={(e) => setSearchTerm(e.target.value)}
// // //           />
// // //           {searchTerm && (
// // //             <Button
// // //               variant="ghost"
// // //               size="icon"
// // //               className="absolute right-0 top-0 h-9 w-9"
// // //               onClick={() => setSearchTerm("")}
// // //             >
// // //               <X className="h-4 w-4" />
// // //               <span className="sr-only">Clear search</span>
// // //             </Button>
// // //           )}
// // //         </div>
// // //         <Sheet>
// // //           <SheetTrigger asChild>
// // //             <Button variant="outline" size="icon" className="shrink-0 md:hidden">
// // //               <SlidersHorizontal className="h-4 w-4" />
// // //               <span className="sr-only">Filters</span>
// // //             </Button>
// // //           </SheetTrigger>
// // //           <SheetContent side="right">
// // //             <SheetHeader>
// // //               <SheetTitle>Filters</SheetTitle>
// // //               <SheetDescription>Filter your notes by subject, date, and more.</SheetDescription>
// // //             </SheetHeader>
// // //             <div className="mt-4 space-y-4">
// // //               <MobileFilters
// // //                 subject={subject}
// // //                 setSubject={setSubject}
// // //                 dateRange={dateRange}
// // //                 setDateRange={setDateRange}
// // //                 showFavorites={showFavorites}
// // //                 setShowFavorites={setShowFavorites}
// // //                 clearFilters={clearFilters}
// // //               />
// // //             </div>
// // //           </SheetContent>
// // //         </Sheet>
// // //       </div>

// // //       <div className="hidden space-y-4 rounded-lg border p-4 md:block">
// // //         <div className="space-y-2">
// // //           <h3 className="font-medium">Filters</h3>
// // //           <Separator />
// // //         </div>
// // //         <div className="space-y-4">
// // //           <div className="space-y-2">
// // //             <Label htmlFor="subject">Subject</Label>
// // //             <Select value={subject} onValueChange={setSubject}>
// // //               <SelectTrigger id="subject">
// // //                 <SelectValue placeholder="Select subject" />
// // //               </SelectTrigger>
// // //               <SelectContent>
// // //                 <SelectItem value="all">All Subjects</SelectItem>
// // //                 <SelectItem value="math">Mathematics</SelectItem>
// // //                 <SelectItem value="science">Science</SelectItem>
// // //                 <SelectItem value="history">History</SelectItem>
// // //                 <SelectItem value="literature">Literature</SelectItem>
// // //                 <SelectItem value="cs">Computer Science</SelectItem>
// // //               </SelectContent>
// // //             </Select>
// // //           </div>
// // //           <div className="space-y-2">
// // //             <div className="flex items-center justify-between">
// // //               <Label htmlFor="date-range">Date Range</Label>
// // //               <span className="text-xs text-muted-foreground">Last {dateRange[0]} days</span>
// // //             </div>
// // //             <Slider id="date-range" min={7} max={90} step={1} value={dateRange} onValueChange={setDateRange as never} />
// // //           </div>
// // //           <div className="flex items-center space-x-2">
// // //             <Switch id="favorites" checked={showFavorites} onCheckedChange={setShowFavorites} />
// // //             <Label htmlFor="favorites">Show favorites only</Label>
// // //           </div>
// // //           <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
// // //             Clear Filters
// // //           </Button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // function MobileFilters({
// // //   subject,
// // //   setSubject,
// // //   dateRange,
// // //   setDateRange,
// // //   showFavorites,
// // //   setShowFavorites,
// // //   clearFilters,
// // // }: {
// // //   subject: string
// // //   setSubject: (value: string) => void
// // //   dateRange: [number]
// // //   setDateRange: (value: [number]) => void
// // //   showFavorites: boolean
// // //   setShowFavorites: (value: boolean) => void
// // //   clearFilters: () => void
// // // }) {
// // //   return (
// // //     <div className="space-y-4">
// // //       <div className="space-y-2">
// // //         <Label htmlFor="subject-mobile">Subject</Label>
// // //         <Select value={subject} onValueChange={setSubject}>
// // //           <SelectTrigger id="subject-mobile">
// // //             <SelectValue placeholder="Select subject" />
// // //           </SelectTrigger>
// // //           <SelectContent>
// // //             <SelectItem value="all">All Subjects</SelectItem>
// // //             <SelectItem value="math">Mathematics</SelectItem>
// // //             <SelectItem value="science">Science</SelectItem>
// // //             <SelectItem value="history">History</SelectItem>
// // //             <SelectItem value="literature">Literature</SelectItem>
// // //             <SelectItem value="cs">Computer Science</SelectItem>
// // //           </SelectContent>
// // //         </Select>
// // //       </div>
// // //       <div className="space-y-2">
// // //         <div className="flex items-center justify-between">
// // //           <Label htmlFor="date-range-mobile">Date Range</Label>
// // //           <span className="text-xs text-muted-foreground">Last {dateRange[0]} days</span>
// // //         </div>
// // //         <Slider
// // //           id="date-range-mobile"
// // //           min={7}
// // //           max={90}
// // //           step={1}
// // //           value={dateRange}
// // //           onValueChange={setDateRange as never}
// // //         />
// // //       </div>
// // //       <div className="flex items-center space-x-2">
// // //         <Switch id="favorites-mobile" checked={showFavorites} onCheckedChange={setShowFavorites} />
// // //         <Label htmlFor="favorites-mobile">Show favorites only</Label>
// // //       </div>
// // //       <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
// // //         Clear Filters
// // //       </Button>
// // //     </div>
// // //   )
// // // }

// // // function Separator() {
// // //   return <div className="h-px w-full bg-border" />
// // // }

// // "use client"

// // import { useState, useEffect } from "react"
// // import { Button } from "../ui/button"
// // import { Input } from "../ui/input"
// // import { Label } from "../ui/label"
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
// // import { Slider } from "../ui/slider"
// // import { Switch } from "../ui/switch"
// // import { cn } from "../../lib/utils"
// // import { Search, SlidersHorizontal, X } from "lucide-react"
// // import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"

// // interface NotesFiltersProps {
// //   className?: string;
// //   onFilterChange: (filters: {
// //     search: string;
// //     subject: string;
// //     days: number;
// //     favorites: boolean;
// //   }) => void;
// // }

// // export function NotesFilters({ className, onFilterChange }: NotesFiltersProps) {
// //   const [searchTerm, setSearchTerm] = useState("")
// //   const [subject, setSubject] = useState("all")
// //   const [dateRange, setDateRange] = useState<[number]>([30])
// //   const [showFavorites, setShowFavorites] = useState(false)

// //   // Apply filters whenever they change
// //   useEffect(() => {
// //     onFilterChange({
// //       search: searchTerm,
// //       subject: subject,
// //       days: dateRange[0],
// //       favorites: showFavorites
// //     });
// //   }, [searchTerm, subject, dateRange, showFavorites, onFilterChange]);

// //   const clearFilters = () => {
// //     setSearchTerm("")
// //     setSubject("all")
// //     setDateRange([30])
// //     setShowFavorites(false)
// //   }

// //   return (
// //     <div className={cn("space-y-4", className)}>
// //       <div className="flex items-center gap-2">
// //         <div className="relative flex-1">
// //           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
// //           <Input
// //             type="search"
// //             placeholder="Search notes..."
// //             className="pl-8"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //           />
// //           {searchTerm && (
// //             <Button
// //               variant="ghost"
// //               size="icon"
// //               className="absolute right-0 top-0 h-9 w-9"
// //               onClick={() => setSearchTerm("")}
// //             >
// //               <X className="h-4 w-4" />
// //               <span className="sr-only">Clear search</span>
// //             </Button>
// //           )}
// //         </div>
// //         <Sheet>
// //           <SheetTrigger asChild>
// //             <Button variant="outline" size="icon" className="shrink-0 md:hidden">
// //               <SlidersHorizontal className="h-4 w-4" />
// //               <span className="sr-only">Filters</span>
// //             </Button>
// //           </SheetTrigger>
// //           <SheetContent side="right">
// //             <SheetHeader>
// //               <SheetTitle>Filters</SheetTitle>
// //               <SheetDescription>Filter your notes by subject, date, and more.</SheetDescription>
// //             </SheetHeader>
// //             <div className="mt-4 space-y-4">
// //               <MobileFilters
// //                 subject={subject}
// //                 setSubject={setSubject}
// //                 dateRange={dateRange}
// //                 setDateRange={setDateRange}
// //                 showFavorites={showFavorites}
// //                 setShowFavorites={setShowFavorites}
// //                 clearFilters={clearFilters}
// //               />
// //             </div>
// //           </SheetContent>
// //         </Sheet>
// //       </div>

// //       <div className="hidden space-y-4 rounded-lg border p-4 md:block">
// //         <div className="space-y-2">
// //           <h3 className="font-medium">Filters</h3>
// //           <Separator />
// //         </div>
// //         <div className="space-y-4">
// //           <div className="space-y-2">
// //             <Label htmlFor="subject">Subject</Label>
// //             <Select value={subject} onValueChange={setSubject}>
// //               <SelectTrigger id="subject">
// //                 <SelectValue placeholder="Select subject" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="all">All Subjects</SelectItem>
// //                 <SelectItem value="math">Mathematics</SelectItem>
// //                 <SelectItem value="science">Science</SelectItem>
// //                 <SelectItem value="history">History</SelectItem>
// //                 <SelectItem value="literature">Literature</SelectItem>
// //                 <SelectItem value="cs">Computer Science</SelectItem>
// //               </SelectContent>
// //             </Select>
// //           </div>
// //           <div className="space-y-2">
// //             <div className="flex items-center justify-between">
// //               <Label htmlFor="date-range">Date Range</Label>
// //               <span className="text-xs text-muted-foreground">Last {dateRange[0]} days</span>
// //             </div>
// //             <Slider 
// //               id="date-range" 
// //               min={1} 
// //               max={90} 
// //               step={1} 
// //               value={dateRange} 
// //               onValueChange={setDateRange as never} 
// //             />
// //           </div>
// //           <div className="flex items-center space-x-2">
// //             <Switch id="favorites" checked={showFavorites} onCheckedChange={setShowFavorites} />
// //             <Label htmlFor="favorites">Show favorites only</Label>
// //           </div>
// //           <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
// //             Clear Filters
// //           </Button>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // function MobileFilters({
// //   subject,
// //   setSubject,
// //   dateRange,
// //   setDateRange,
// //   showFavorites,
// //   setShowFavorites,
// //   clearFilters,
// // }: {
// //   subject: string
// //   setSubject: (value: string) => void
// //   dateRange: [number]
// //   setDateRange: (value: [number]) => void
// //   showFavorites: boolean
// //   setShowFavorites: (value: boolean) => void
// //   clearFilters: () => void
// // }) {
// //   return (
// //     <div className="space-y-4">
// //       <div className="space-y-2">
// //         <Label htmlFor="subject-mobile">Subject</Label>
// //         <Select value={subject} onValueChange={setSubject}>
// //           <SelectTrigger id="subject-mobile">
// //             <SelectValue placeholder="Select subject" />
// //           </SelectTrigger>
// //           <SelectContent>
// //             <SelectItem value="all">All Subjects</SelectItem>
// //             <SelectItem value="math">Mathematics</SelectItem>
// //             <SelectItem value="science">Science</SelectItem>
// //             <SelectItem value="history">History</SelectItem>
// //             <SelectItem value="literature">Literature</SelectItem>
// //             <SelectItem value="cs">Computer Science</SelectItem>
// //           </SelectContent>
// //         </Select>
// //       </div>
// //       <div className="space-y-2">
// //         <div className="flex items-center justify-between">
// //           <Label htmlFor="date-range-mobile">Date Range</Label>
// //           <span className="text-xs text-muted-foreground">Last {dateRange[0]} days</span>
// //         </div>
// //         <Slider
// //           id="date-range-mobile"
// //           min={1}
// //           max={90}
// //           step={1}
// //           value={dateRange}
// //           onValueChange={setDateRange as never}
// //         />
// //       </div>
// //       <div className="flex items-center space-x-2">
// //         <Switch id="favorites-mobile" checked={showFavorites} onCheckedChange={setShowFavorites} />
// //         <Label htmlFor="favorites-mobile">Show favorites only</Label>
// //       </div>
// //       <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
// //         Clear Filters
// //       </Button>
// //     </div>
// //   )
// // }

// // function Separator() {
// //   return <div className="h-px w-full bg-border" />
// // }
// "use client"

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { useState, useCallback } from "react"
// import { Button } from "../ui/button"
// import { Input } from "../ui/input"
// import { Label } from "../ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
// import { Slider } from "../ui/slider"
// import { Switch } from "../ui/switch"
// import { cn } from "../../lib/utils"
// import { Search, SlidersHorizontal, X } from "lucide-react"
// import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"

// interface NotesFiltersProps {
//   className?: string;
//   onFilterChange: (filters: {
//     search: string;
//     subject: string;
//     days: number;
//     favorites: boolean;
//   }) => void;
// }

// export function NotesFilters({ className, onFilterChange }: NotesFiltersProps) {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [subject, setSubject] = useState("all")
//   const [dateRange, setDateRange] = useState<[number]>([30])
//   const [showFavorites, setShowFavorites] = useState(false)

//   // This approach avoids the infinite update by manually calling onFilterChange
//   // only when a filter value changes, not in a useEffect hook
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newSearchTerm = e.target.value;
//     setSearchTerm(newSearchTerm);
//     onFilterChange({
//       search: newSearchTerm,
//       subject,
//       days: dateRange[0],
//       favorites: showFavorites
//     });
//   };

//   const handleSubjectChange = (newSubject: string) => {
//     setSubject(newSubject);
//     onFilterChange({
//       search: searchTerm,
//       subject: newSubject,
//       days: dateRange[0],
//       favorites: showFavorites
//     });
//   };

//   const handleDateRangeChange = (newDateRange: [number]) => {
//     setDateRange(newDateRange);
//     onFilterChange({
//       search: searchTerm,
//       subject,
//       days: newDateRange[0],
//       favorites: showFavorites
//     });
//   };

//   const handleFavoritesChange = (showFavs: boolean) => {
//     setShowFavorites(showFavs);
//     onFilterChange({
//       search: searchTerm,
//       subject,
//       days: dateRange[0],
//       favorites: showFavs
//     });
//   };

//   const clearFilters = () => {
//     setSearchTerm("");
//     setSubject("all");
//     setDateRange([30]);
//     setShowFavorites(false);
//     onFilterChange({
//       search: "",
//       subject: "all",
//       days: 30,
//       favorites: false
//     });
//   };

//   return (
//     <div className={cn("space-y-4", className)}>
//       <div className="flex items-center gap-2">
//         <div className="relative flex-1">
//           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             type="search"
//             placeholder="Search notes..."
//             className="pl-8"
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//           {searchTerm && (
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute right-0 top-0 h-9 w-9"
//               onClick={() => {
//                 setSearchTerm("");
//                 onFilterChange({
//                   search: "",
//                   subject,
//                   days: dateRange[0],
//                   favorites: showFavorites
//                 });
//               }}
//             >
//               <X className="h-4 w-4" />
//               <span className="sr-only">Clear search</span>
//             </Button>
//           )}
//         </div>
//         <Sheet>
//           <SheetTrigger asChild>
//             <Button variant="outline" size="icon" className="shrink-0 md:hidden">
//               <SlidersHorizontal className="h-4 w-4" />
//               <span className="sr-only">Filters</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="right">
//             <SheetHeader>
//               <SheetTitle>Filters</SheetTitle>
//               <SheetDescription>Filter your notes by subject, date, and more.</SheetDescription>
//             </SheetHeader>
//             <div className="mt-4 space-y-4">
//               <MobileFilters
//                 subject={subject}
//                 setSubject={handleSubjectChange}
//                 dateRange={dateRange}
//                 setDateRange={handleDateRangeChange}
//                 showFavorites={showFavorites}
//                 setShowFavorites={handleFavoritesChange}
//                 clearFilters={clearFilters}
//               />
//             </div>
//           </SheetContent>
//         </Sheet>
//       </div>

//       <div className="hidden space-y-4 rounded-lg border p-4 md:block">
//         <div className="space-y-2">
//           <h3 className="font-medium">Filters</h3>
//           <Separator />
//         </div>
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="subject">Subject</Label>
//             <Select value={subject} onValueChange={handleSubjectChange}>
//               <SelectTrigger id="subject">
//                 <SelectValue placeholder="Select subject" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Subjects</SelectItem>
//                 <SelectItem value="math">Mathematics</SelectItem>
//                 <SelectItem value="science">Science</SelectItem>
//                 <SelectItem value="history">History</SelectItem>
//                 <SelectItem value="literature">Literature</SelectItem>
//                 <SelectItem value="cs">Computer Science</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <Label htmlFor="date-range">Date Range</Label>
//               <span className="text-xs text-muted-foreground">Last {dateRange[0]} days</span>
//             </div>
//             <Slider 
//               id="date-range" 
//               min={1} 
//               max={90} 
//               step={1} 
//               value={dateRange} 
//               onValueChange={handleDateRangeChange} 
//             />
//           </div>
//           <div className="flex items-center space-x-2">
//             <Switch id="favorites" checked={showFavorites} onCheckedChange={handleFavoritesChange} />
//             <Label htmlFor="favorites">Show favorites only</Label>
//           </div>
//           <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
//             Clear Filters
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// function MobileFilters({
//   subject,
//   setSubject,
//   dateRange,
//   setDateRange,
//   showFavorites,
//   setShowFavorites,
//   clearFilters,
// }: {
//   subject: string
//   setSubject: (value: string) => void
//   dateRange: [number]
//   setDateRange: (value: [number]) => void
//   showFavorites: boolean
//   setShowFavorites: (value: boolean) => void
//   clearFilters: () => void
// }) {
//   return (
//     <div className="space-y-4">
//       <div className="space-y-2">
//         <Label htmlFor="subject-mobile">Subject</Label>
//         <Select value={subject} onValueChange={setSubject}>
//           <SelectTrigger id="subject-mobile">
//             <SelectValue placeholder="Select subject" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Subjects</SelectItem>
//             <SelectItem value="math">Mathematics</SelectItem>
//             <SelectItem value="science">Science</SelectItem>
//             <SelectItem value="history">History</SelectItem>
//             <SelectItem value="literature">Literature</SelectItem>
//             <SelectItem value="cs">Computer Science</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//       <div className="space-y-2">
//         <div className="flex items-center justify-between">
//           <Label htmlFor="date-range-mobile">Date Range</Label>
//           <span className="text-xs text-muted-foreground">Last {dateRange[0]} days</span>
//         </div>
//         <Slider
//           id="date-range-mobile"
//           min={1}
//           max={90}
//           step={1}
//           value={dateRange}
//           onValueChange={setDateRange}
//         />
//       </div>
//       <div className="flex items-center space-x-2">
//         <Switch id="favorites-mobile" checked={showFavorites} onCheckedChange={setShowFavorites} />
//         <Label htmlFor="favorites-mobile">Show favorites only</Label>
//       </div>
//       <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
//         Clear Filters
//       </Button>
//     </div>
//   )
// }

// function Separator() {
//   return <div className="h-px w-full bg-border" />
// }
"use client"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect, useCallback } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Slider } from "../ui/slider"
import { Switch } from "../ui/switch"
import { cn } from "../../lib/utils"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { getAllFolders } from "../../services/notes-service"

interface NotesFiltersProps {
  className?: string;
  onFilterChange: (filters: {
    search: string;
    folder: string;
    days: number;
    favorites: boolean;
  }) => void;
}

export function NotesFilters({ className, onFilterChange }: NotesFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [folder, setFolder] = useState("all")
  const [dateRange, setDateRange] = useState<[number]>([30])
  const [showFavorites, setShowFavorites] = useState(false)
  const [folders, setFolders] = useState<{ id: string; name: string }[]>([])

  // Fetch folders on mount
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const fetchedFolders = await getAllFolders()
        setFolders(fetchedFolders)
      } catch (error) {
        console.error("Error fetching folders:", error)
      }
    }
    fetchFolders()
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onFilterChange({
      search: newSearchTerm,
      folder,
      days: dateRange[0],
      favorites: showFavorites
    });
  };

  const handleFolderChange = (newFolder: string) => {
    setFolder(newFolder);
    onFilterChange({
      search: searchTerm,
      folder: newFolder,
      days: dateRange[0],
      favorites: showFavorites
    });
  };

  const handleDateRangeChange = (newDateRange: [number]) => {
    setDateRange(newDateRange);
    onFilterChange({
      search: searchTerm,
      folder,
      days: newDateRange[0],
      favorites: showFavorites
    });
  };

  const handleFavoritesChange = (showFavs: boolean) => {
    setShowFavorites(showFavs);
    onFilterChange({
      search: searchTerm,
      folder,
      days: dateRange[0],
      favorites: showFavs
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFolder("all");
    setDateRange([30]);
    setShowFavorites(false);
    onFilterChange({
      search: "",
      folder: "all",
      days: 30,
      favorites: false
    });
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search notes..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-9 w-9"
              onClick={() => {
                setSearchTerm("");
                onFilterChange({
                  search: "",
                  folder,
                  days: dateRange[0],
                  favorites: showFavorites
                });
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">Filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Filter your notes by folder, date, and more.</SheetDescription>
            </SheetHeader>
            <div className="mt-4 space-y-4">
              <MobileFilters
                folder={folder}
                setFolder={handleFolderChange}
                dateRange={dateRange}
                setDateRange={handleDateRangeChange}
                showFavorites={showFavorites}
                setShowFavorites={handleFavoritesChange}
                clearFilters={clearFilters}
                folders={folders}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden space-y-4 rounded-lg border p-4 md:block">
        <div className="space-y-2">
          <h3 className="font-medium">Filters</h3>
          <Separator />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="folder">Folder</Label>
            <Select value={folder} onValueChange={handleFolderChange}>
              <SelectTrigger id="folder">
                <SelectValue placeholder="Select folder" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Folders</SelectItem>
                <SelectItem value="none">No Folder</SelectItem>
                {folders.map((f) => (
                  <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="date-range">Date Range</Label>
              <span className="text-xs text-muted-foreground">Last {dateRange[0]} days</span>
            </div>
            <Slider 
              id="date-range" 
              min={1} 
              max={90} 
              step={1} 
              value={dateRange} 
              onValueChange={handleDateRangeChange} 
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="favorites" checked={showFavorites} onCheckedChange={handleFavoritesChange} />
            <Label htmlFor="favorites">Show favorites only</Label>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  )
}

function MobileFilters({
  folder,
  setFolder,
  dateRange,
  setDateRange,
  showFavorites,
  setShowFavorites,
  clearFilters,
  folders,
}: {
  folder: string
  setFolder: (value: string) => void
  dateRange: [number]
  setDateRange: (value: [number]) => void
  showFavorites: boolean
  setShowFavorites: (value: boolean) => void
  clearFilters: () => void
  folders: { id: string; name: string }[]
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="folder-mobile">Folder</Label>
        <Select value={folder} onValueChange={setFolder}>
          <SelectTrigger id="folder-mobile">
            <SelectValue placeholder="Select folder" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Folders</SelectItem>
            <SelectItem value="none">No Folder</SelectItem>
            {folders.map((f) => (
              <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="date-range-mobile">Date Range</Label>
          <span className="text-xs text-muted-foreground">Last {dateRange[0]} days</span>
        </div>
        <Slider
          id="date-range-mobile"
          min={1}
          max={90}
          step={1}
          value={dateRange}
          onValueChange={setDateRange}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="favorites-mobile" checked={showFavorites} onCheckedChange={setShowFavorites} />
        <Label htmlFor="favorites-mobile">Show favorites only</Label>
      </div>
      <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  )
}

function Separator() {
  return <div className="h-px w-full bg-border" />
}