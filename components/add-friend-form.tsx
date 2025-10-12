"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

interface AddFriendFormProps {
  onBack: () => void
  onAddFriend: (childIds: number[], friend: any) => void
  availableChildren: Array<{ id: number; name: string; avatar: string }>
}

export function AddFriendForm({ onBack, onAddFriend, availableChildren }: AddFriendFormProps) {
  const [selectedChildren, setSelectedChildren] = useState<number[]>([])
  const [formData, setFormData] = useState({
    name: "",
    parentName: "",
    parentPhone: "",
    location: "",
    notes: "",
  })

  const toggleChildSelection = (childId: number) => {
    setSelectedChildren((prev) => (prev.includes(childId) ? prev.filter((id) => id !== childId) : [...prev, childId]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      formData.name &&
      formData.parentName &&
      formData.parentPhone &&
      formData.location &&
      selectedChildren.length > 0
    ) {
      const newFriend = {
        ...formData,
      }
      onAddFriend(selectedChildren, newFriend)
    }
  }

  return (
    <>
      <div className="geometric-accent-1" />
      <div className="geometric-accent-2" />

      <div className="min-h-screen bg-background p-4 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6 pt-4">
            <Button onClick={onBack} variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground flex-1">Add Friend</h1>
          </div>

          <Card className="p-6 bg-card/90 backdrop-blur-sm border-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Friend for which child? (Select all that apply) */}
              <div>
                <Label className="text-sm font-medium text-card-foreground mb-3 block">
                  Friend for which child? (Select all that apply)
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {availableChildren.map((child) => (
                    <Button
                      key={child.id}
                      type="button"
                      onClick={() => toggleChildSelection(child.id)}
                      variant={selectedChildren.includes(child.id) ? "default" : "outline"}
                      className="h-20 text-lg font-semibold rounded-xl border-2 transition-all hover:scale-105"
                    >
                      {child.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-card-foreground">
                    Friend's Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter friend's name"
                    className="mt-1 rounded-xl border-2 focus:border-primary/50"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="parentName" className="text-sm font-medium text-card-foreground">
                    Parent Name
                  </Label>
                  <Input
                    id="parentName"
                    value={formData.parentName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, parentName: e.target.value }))}
                    placeholder="Parent's name"
                    className="mt-1 rounded-xl border-2 focus:border-primary/50"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="parentPhone" className="text-sm font-medium text-card-foreground">
                    Parent Phone
                  </Label>
                  <Input
                    id="parentPhone"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, parentPhone: e.target.value }))}
                    placeholder="Phone number"
                    className="mt-1 rounded-xl border-2 focus:border-primary/50"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="text-sm font-medium text-card-foreground">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="Neighborhood or area"
                    className="mt-1 rounded-xl border-2 focus:border-primary/50"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="notes" className="text-sm font-medium text-card-foreground">
                    Notes (Optional)
                  </Label>
                  <Input
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any additional notes"
                    className="mt-1 rounded-xl border-2 focus:border-primary/50"
                  />
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                disabled={
                  !formData.name ||
                  !formData.parentName ||
                  !formData.parentPhone ||
                  !formData.location ||
                  selectedChildren.length === 0
                }
              >
                Add Friend
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </>
  )
}
