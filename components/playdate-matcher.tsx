"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Heart, X, Sparkles, Phone, Calendar, CheckCircle, History } from "lucide-react"

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

interface PlayDateMatcherProps {
  friends: Friend[]
  onBack: () => void
  onMarkPlayDate: (friendId: number, notes: string) => void
}

export function PlayDateMatcher({ friends, onBack, onMarkPlayDate }: PlayDateMatcherProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [matches, setMatches] = useState<Friend[]>([])
  const [showMatch, setShowMatch] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [playDateDialog, setPlayDateDialog] = useState<{ isOpen: boolean; friendId: number | null; notes: string }>({
    isOpen: false,
    friendId: null,
    notes: "",
  })

  const currentFriend = friends[currentIndex]

  const handleLike = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setMatches([...matches, currentFriend])
    setShowMatch(true)

    setTimeout(() => {
      setShowMatch(false)
      nextFriend()
    }, 1500)
  }

  const handlePass = () => {
    if (isAnimating) return
    setIsAnimating(true)
    nextFriend()
  }

  const nextFriend = () => {
    setTimeout(() => {
      if (currentIndex < friends.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        setCurrentIndex(0)
      }
      setIsAnimating(false)
    }, 300)
  }

  const handleMarkPlayDate = () => {
    if (playDateDialog.friendId) {
      onMarkPlayDate(playDateDialog.friendId, playDateDialog.notes)
      setPlayDateDialog({ isOpen: false, friendId: null, notes: "" })
    }
  }

  if (!currentFriend) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/30 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">All done!</h2>
          <p className="text-muted-foreground mb-4">You've seen all your friends</p>
          <Button onClick={onBack} className="rounded-full">
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/30 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 pt-4">
          <Button onClick={onBack} variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground flex-1">Find Play Dates</h1>
          <Badge variant="secondary" className="bg-secondary/20">
            {currentIndex + 1} / {friends.length}
          </Badge>
        </div>

        {/* Match Notification */}
        {showMatch && (
          <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="p-8 text-center bg-card border-2 border-primary shadow-2xl animate-bounce">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-primary mb-2">It's a Match!</h2>
              <p className="text-muted-foreground">Perfect playmate found!</p>
            </Card>
          </div>
        )}

        {/* Friend Card */}
        <div className="relative mb-8">
          <Card
            className={`p-6 bg-card/90 backdrop-blur-sm border-2 shadow-xl transition-all duration-300 ${
              isAnimating ? "scale-95 opacity-50" : "scale-100 opacity-100"
            }`}
          >
            <div className="text-center mb-6">
              <img
                src={currentFriend.avatar || "/placeholder.svg"}
                alt={currentFriend.name}
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-primary/20 shadow-lg"
              />
              <h2 className="text-3xl font-bold text-card-foreground mb-2">{currentFriend.name}</h2>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Badge variant="secondary" className="text-lg px-4 py-1">
                  Age {currentFriend.age}
                </Badge>
                <Badge variant="outline" className="bg-accent/30">
                  {currentFriend.relationshipTag}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-card-foreground mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentFriend.interests.map((interest) => (
                    <Badge key={interest} variant="outline" className="bg-accent/50">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{currentFriend.parentContact}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Last play date: {currentFriend.lastPlayDate}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <History className="w-4 h-4" />
                  <span>{currentFriend.playDateHistory.length} total play dates</span>
                </div>
              </div>

              <div className="text-center p-4 bg-primary/10 rounded-xl">
                <Button
                  onClick={() => setPlayDateDialog({ isOpen: true, friendId: currentFriend.id, notes: "" })}
                  variant="outline"
                  className="rounded-full"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Play Date
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={handlePass}
            size="lg"
            variant="outline"
            className="w-16 h-16 rounded-full border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-transparent"
            disabled={isAnimating}
          >
            <X className="w-8 h-8" />
          </Button>

          <Button
            onClick={handleLike}
            size="lg"
            className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 pulse-glow"
            disabled={isAnimating}
          >
            <Heart className="w-8 h-8" />
          </Button>
        </div>

        {/* Matches Counter */}
        {matches.length > 0 && (
          <div className="mt-8 text-center">
            <Badge variant="secondary" className="bg-primary/20 text-primary px-4 py-2">
              {matches.length} match{matches.length !== 1 ? "es" : ""} found! 🎉
            </Badge>
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
