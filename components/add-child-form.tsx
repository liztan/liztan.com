"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

interface Child {
  name: string
  age: number
  avatar: string
}

interface AddChildFormProps {
  onBack: () => void
  onAddChild: (child: Child) => void
}

export function AddChildForm({ onBack, onAddChild }: AddChildFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.age) {
      const childEmojis = ["👦", "👧", "🧒", "👶"]
      const randomEmoji = childEmojis[Math.floor(Math.random() * childEmojis.length)]

      onAddChild({
        name: formData.name,
        age: Number.parseInt(formData.age),
        avatar: randomEmoji,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/30 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-6 pt-4">
          <Button onClick={onBack} variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Add Child</h1>
        </div>

        <Card className="p-6 bg-card/80 backdrop-blur-sm border-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-card-foreground">
                Child's Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter child's name"
                className="rounded-xl border-2 focus:border-primary/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-medium text-card-foreground">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                min="1"
                max="18"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="Enter age"
                className="rounded-xl border-2 focus:border-primary/50"
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onBack} className="flex-1 rounded-full bg-transparent">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 rounded-full">
                Add Child
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
