"use client"

import { useState, KeyboardEvent } from "react"
import { Input } from "./input"
import { Badge } from "./badge"
import { X } from "lucide-react"

interface TagInputProps {
  id?: string
  placeholder?: string
  tags: string[]
  setTags: (tags: string[]) => void
  className?: string
}

export function TagInput({ id, placeholder, tags, setTags, className }: TagInputProps) {
  const [inputValue, setInputValue] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Add tag on Enter or comma
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault()
      addTag(inputValue.trim())
    }
    
    // Remove last tag on Backspace if input is empty
    if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1)
    }
  }

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag])
      setInputValue("")
    }
  }

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2 border rounded-md p-2 min-h-10">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="gap-1 px-2 py-1">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-1"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {tag}</span>
            </button>
          </Badge>
        ))}
        <Input
          id={id}
          type="text"
          placeholder={tags.length === 0 ? placeholder : ""}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="flex-1 min-w-[120px] border-0 p-0 focus-visible:ring-0 text-sm"
        />
      </div>
    </div>
  )
}