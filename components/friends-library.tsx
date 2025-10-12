"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Search, Heart, Phone, Calendar, CheckCircle, History } from "lucide-react"

interface PlayDate {
  date: string
  notes: string
}

interface Friend {
  id: number
  name: string
  age: number
  interests: string[]
  avatar: string
  parentContact: string
  lastPlayDate: string
  isFavorite: boolean
  relationshipTag: string
  playDateHistory: PlayDate[]
}

interface FriendsLibraryProps {
  friends: Friend[]
  onBack: () => void
  onAddFriend: () => void
  onToggleFavorite: (friendId: number) => void
  onMarkPlayDate: (friendId: number, notes: string) => void
}

export function FriendsLibrary({
  friends,
  onBack,
  onAddFriend,
  onToggleFavorite,
  onMarkPlayDate,
}: FriendsLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [playDateDialog, setPlayDateDialog] = useState<{ isOpen: boolean; friendId: number | null; notes: string }>({
    isOpen: false,
    friendId: null,
    notes: "",
  })

  const allInterests = Array.from(new Set(friends.flatMap((friend) => friend.interests)))

  const filteredFriends = friends.filter((friend) => {
    const matchesSearch = friend.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesInterest = !selectedInterest || friend.interests.includes(selectedInterest)
    const matchesFavorites = !showFavoritesOnly || friend.isFavorite
    return matchesSearch && matchesInterest && matchesFavorites
  })

  const handleMarkPlayDate = () => {
    if (playDateDialog.friendId) {
      onMarkPlayDate(playDateDialog.friendId, playDateDialog.notes)
      setPlayDateDialog({ isOpen: false, friendId: null, notes: "" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/30 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 pt-4">
          <Button onClick={onBack} variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground flex-1">Friends Library</h1>
          <Button onClick={onAddFriend} size="icon" className="rounded-full bg-primary hover:bg-primary/90 shadow-lg">
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search friends..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl border-2 focus:border-primary/50"
          />
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-6">
          <div className="flex gap-2">
            <Button
              variant={showFavoritesOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className="rounded-full"
            >
              <Heart className={`w-4 h-4 mr-1 ${showFavoritesOnly ? "fill-current" : ""}`} />
              Favorites
            </Button>
          </div>

          {/* Interest Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedInterest === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedInterest(null)}
              className="rounded-full whitespace-nowrap"
            >
              All
            </Button>
            {allInterests.map((interest) => (
              <Button
                key={interest}
                variant={selectedInterest === interest ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedInterest(selectedInterest === interest ? null : interest)}
                className="rounded-full whitespace-nowrap"
              >
                {interest}
              </Button>
            ))}
          </div>
        </div>

        {/* Friends List */}
        <div className="space-y-4">
          {filteredFriends.map((friend) => (
            <Card
              key={friend.id}
              className="p-4 bg-card/80 backdrop-blur-sm border-2 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-start gap-4">
                <img
                  src={friend.avatar || "/placeholder.svg"}
                  alt={friend.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-card-foreground">{friend.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      Age {friend.age}
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-accent/30">
                      {friend.relationshipTag}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {friend.interests.map((interest) => (
                      <Badge key={interest} variant="outline" className="text-xs bg-accent/50">
                        {interest}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      <span>{friend.parentContact}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>Last play date: {friend.lastPlayDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <History className="w-3 h-3" />
                      <span>{friend.playDateHistory.length} total play dates</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setPlayDateDialog({ isOpen: true, friendId: friend.id, notes: "" })}
                      className="rounded-full text-xs"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Mark Play Date
                    </Button>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onToggleFavorite(friend.id)}
                  className="rounded-full hover:bg-primary/10"
                >
                  <Heart
                    className={`w-5 h-5 ${friend.isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                  />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredFriends.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No friends found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
            <Button onClick={onAddFriend} className="rounded-full">
              <Plus className="w-4 h-4 mr-2" />
              Add New Friend
            </Button>
          </div>
        )}

        <Dialog
          open={playDateDialog.isOpen}
          onOpenChange={(open) => setPlayDateDialog({ ...playDateDialog, isOpen: open })}
        >
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle>Mark Play Date</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Record a play date that happened today with{" "}
                {playDateDialog.friendId ? friends.find((f) => f.id === playDateDialog.friendId)?.name : ""}
              </p>
              <Textarea
                placeholder="Add notes about the play date (optional)"
                value={playDateDialog.notes}
                onChange={(e) => setPlayDateDialog({ ...playDateDialog, notes: e.target.value })}
                className="min-h-[80px]"
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPlayDateDialog({ isOpen: false, friendId: null, notes: "" })}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button onClick={handleMarkPlayDate} className="flex-1">
                  Mark Complete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
