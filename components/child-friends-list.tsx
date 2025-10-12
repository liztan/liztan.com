"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, Shuffle, CheckCircle, ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react"
import { AddFriendForm } from "@/components/add-friend-form"

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
  parentName: string
  parentPhone: string
  location: string
  tags: string[]
  notes: string
  lastPlayDate: string
  isFavorite: boolean
  playDateHistory: PlayDate[]
}

interface Child {
  id: number
  name: string
  age: number
  avatar: string
  friends: Friend[]
}

interface ChildFriendsListProps {
  child: Child
  onBack: () => void
  onUpdateFriends: (friends: Friend[]) => void
}

export function ChildFriendsList({ child, onBack, onUpdateFriends }: ChildFriendsListProps) {
  const [currentView, setCurrentView] = useState<"random-pick" | "library" | "add-friend">("random-pick")
  const [currentFriend, setCurrentFriend] = useState<Friend | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false)
  const [editingFriend, setEditingFriend] = useState<Friend | null>(null)
  const [deletingFriendId, setDeletingFriendId] = useState<number | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editFormData, setEditFormData] = useState({
    name: "",
    parentName: "",
    parentPhone: "",
    location: "",
    notes: "",
  })
  const [playDateDialog, setPlayDateDialog] = useState<{
    isOpen: boolean
    friendId: number | null
    date: string
    notes: string
  }>({
    isOpen: false,
    friendId: null,
    date: new Date().toISOString().split("T")[0],
    notes: "",
  })

  const getRandomFriend = () => {
    if (child.friends.length === 0) return null
    const randomIndex = Math.floor(Math.random() * child.friends.length)
    return child.friends[randomIndex]
  }

  useEffect(() => {
    setCurrentFriend(getRandomFriend())
  }, [child.friends])

  const addFriend = (newFriend: any) => {
    const friend: Friend = {
      ...newFriend,
      id: Math.max(0, ...child.friends.map((f) => f.id)) + 1,
      lastPlayDate: "Never",
      isFavorite: false,
      playDateHistory: [],
    }
    onUpdateFriends([...child.friends, friend])
    setCurrentView("library")
  }

  const markPlayDate = (friendId: number, date: string, notes = "") => {
    const updatedFriends = child.friends.map((friend) => {
      if (friend.id === friendId) {
        const newPlayDate = { date, notes }
        return {
          ...friend,
          playDateHistory: [newPlayDate, ...friend.playDateHistory],
          lastPlayDate: date === new Date().toISOString().split("T")[0] ? "Today" : date,
        }
      }
      return friend
    })
    onUpdateFriends(updatedFriends)
  }

  const deleteFriend = (friendId: number) => {
    const updatedFriends = child.friends.filter((friend) => friend.id !== friendId)
    onUpdateFriends(updatedFriends)
    setDeletingFriendId(null)
    if (currentFriend?.id === friendId) {
      setCurrentFriend(getRandomFriend())
    }
  }

  const saveEditedFriend = () => {
    if (!editingFriend) return

    const updatedFriends = child.friends.map((friend) =>
      friend.id === editingFriend.id
        ? {
            ...friend,
            name: editFormData.name,
            parentName: editFormData.parentName,
            parentPhone: editFormData.parentPhone,
            location: editFormData.location,
            notes: editFormData.notes,
          }
        : friend,
    )
    onUpdateFriends(updatedFriends)
    setEditingFriend(null)
    setIsEditMode(false)

    if (currentFriend?.id === editingFriend.id) {
      setCurrentFriend(updatedFriends.find((f) => f.id === editingFriend.id) || null)
    }
  }

  const startEditingFriend = (friend: Friend) => {
    setEditingFriend(friend)
    setEditFormData({
      name: friend.name,
      parentName: friend.parentName,
      parentPhone: friend.parentPhone,
      location: friend.location,
      notes: friend.notes,
    })
    setIsEditMode(true)
    setCurrentView("random-pick")
    setCurrentFriend(friend)
  }

  const handleRandomPick = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentFriend(getRandomFriend())
      setIsAnimating(false)
    }, 300)
  }

  const handleMarkPlayDate = () => {
    if (playDateDialog.friendId) {
      markPlayDate(playDateDialog.friendId, playDateDialog.date, playDateDialog.notes)
      setPlayDateDialog({ isOpen: false, friendId: null, date: new Date().toISOString().split("T")[0], notes: "" })
    }
  }

  if (currentView === "library") {
    return (
      <>
        <div className="geometric-accent-1" />
        <div className="geometric-accent-2" />

        <div className="min-h-screen bg-background p-6 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-10 pt-8">
              <Button
                onClick={() => setCurrentView("random-pick")}
                size="icon"
                className="w-14 h-14 bg-foreground hover:bg-foreground/90 text-background rounded-full"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <div className="flex-1">
                <h1 className="text-4xl font-bold">All Friends</h1>
              </div>
              <Button
                onClick={() => setCurrentView("add-friend")}
                size="icon"
                className="w-14 h-14 bg-foreground hover:bg-foreground/90 text-background rounded-full"
              >
                <Plus className="w-6 h-6" />
              </Button>
            </div>

            <div className="space-y-4">
              {child.friends.map((friend) => (
                <div
                  key={friend.id}
                  className="bg-card border-2 border-foreground rounded-2xl p-6 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{friend.name}</h3>
                    <div className="text-sm text-muted-foreground font-mono">
                      {friend.parentName} - {friend.parentPhone}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => startEditingFriend(friend)}
                      size="icon"
                      variant="outline"
                      className="w-10 h-10 border-2 border-foreground rounded-full"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => setDeletingFriendId(friend.id)}
                      size="icon"
                      variant="outline"
                      className="w-10 h-10 border-2 border-foreground rounded-full hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Dialog open={deletingFriendId !== null} onOpenChange={() => setDeletingFriendId(null)}>
          <DialogContent className="max-w-md mx-auto border-2 border-foreground rounded-2xl p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Delete Friend?</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete this friend? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setDeletingFriendId(null)}
                className="flex-1 border-2 border-foreground rounded-full"
              >
                Cancel
              </Button>
              <Button
                onClick={() => deletingFriendId && deleteFriend(deletingFriendId)}
                className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-full"
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  if (currentView === "add-friend") {
    return (
      <>
        <div className="geometric-accent-1" />
        <div className="geometric-accent-2" />

        <div className="min-h-screen bg-background p-6 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-10 pt-8">
              <Button
                onClick={() => setCurrentView("random-pick")}
                size="icon"
                className="w-14 h-14 bg-foreground hover:bg-foreground/90 text-background rounded-full"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <div className="flex-1">
                <h1 className="text-4xl font-bold">Add Friend</h1>
              </div>
            </div>

            <div className="bg-card border-2 border-foreground rounded-2xl p-8">
              <AddFriendForm
                onSubmit={addFriend}
                onCancel={() => setCurrentView("random-pick")}
                availableChildren={[child]}
                initialData={{ childIds: [child.id] }}
              />
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="geometric-accent-1" />
      <div className="geometric-accent-2" />

      <div className="min-h-screen bg-background p-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-10 pt-8">
            <Button
              onClick={() => {
                if (isEditMode) {
                  setIsEditMode(false)
                  setEditingFriend(null)
                  setCurrentFriend(getRandomFriend())
                } else {
                  onBack()
                }
              }}
              size="icon"
              className="w-14 h-14 bg-foreground hover:bg-foreground/90 text-background rounded-full"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="flex-1">
              <h1 className="text-4xl font-bold">{isEditMode ? "Edit Friend" : child.name}</h1>
            </div>
            {!isEditMode && (
              <Button
                onClick={handleRandomPick}
                size="icon"
                className="w-14 h-14 bg-foreground hover:bg-foreground/90 text-background rounded-full"
                disabled={isAnimating}
              >
                <Shuffle className="w-6 h-6" />
              </Button>
            )}
          </div>

          {child.friends.length === 0 ? (
            <div className="text-center py-20 bg-card border-2 border-foreground rounded-2xl p-12">
              <h2 className="text-3xl font-bold mb-6">No friends yet</h2>
              <Button
                onClick={() => setCurrentView("add-friend")}
                className="bg-foreground hover:bg-foreground/90 text-background text-lg px-10 py-6 rounded-full"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Friend
              </Button>
            </div>
          ) : (
            <>
              {currentFriend && (
                <div className="space-y-4">
                  <div
                    className={`bg-card border-2 border-foreground rounded-2xl shadow-lg p-10 transition-all duration-300 ${
                      isAnimating ? "scale-95 opacity-50" : "scale-100 opacity-100"
                    }`}
                  >
                    <div className="text-center mb-10">
                      {isEditMode ? (
                        <Input
                          value={editFormData.name}
                          onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                          className="text-5xl font-bold text-center border-2 border-foreground rounded-xl h-20 px-4"
                        />
                      ) : (
                        <h2 className="text-5xl font-bold">{currentFriend.name}</h2>
                      )}
                    </div>

                    <div className="space-y-8">
                      <div className="border-t-2 border-foreground pt-8">
                        <div className="space-y-6 font-mono text-sm">
                          <div>
                            <div className="font-bold mb-2 uppercase tracking-wide">Contact</div>
                            {isEditMode ? (
                              <div className="space-y-2">
                                <Input
                                  placeholder="Parent Name"
                                  value={editFormData.parentName}
                                  onChange={(e) => setEditFormData({ ...editFormData, parentName: e.target.value })}
                                  className="border-2 border-foreground rounded-xl"
                                />
                                <Input
                                  placeholder="Parent Phone"
                                  value={editFormData.parentPhone}
                                  onChange={(e) => setEditFormData({ ...editFormData, parentPhone: e.target.value })}
                                  className="border-2 border-foreground rounded-xl"
                                />
                              </div>
                            ) : (
                              <div className="text-muted-foreground">
                                {currentFriend.parentName} - {currentFriend.parentPhone}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold mb-2 uppercase tracking-wide">Location</div>
                            {isEditMode ? (
                              <Input
                                placeholder="Location"
                                value={editFormData.location}
                                onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                                className="border-2 border-foreground rounded-xl"
                              />
                            ) : (
                              <div className="text-muted-foreground">{currentFriend.location}</div>
                            )}
                          </div>
                          {!isEditMode && (
                            <div>
                              <button
                                onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
                                className="w-full text-left flex items-center justify-between hover:opacity-70 transition-opacity"
                              >
                                <div className="font-bold uppercase tracking-wide">Last Playdate</div>
                                {currentFriend.playDateHistory.length > 0 && (
                                  <div className="text-muted-foreground">
                                    {isHistoryExpanded ? (
                                      <ChevronUp className="w-4 h-4" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4" />
                                    )}
                                  </div>
                                )}
                              </button>
                              <div className="text-muted-foreground mt-2">{currentFriend.lastPlayDate}</div>
                              {isHistoryExpanded && currentFriend.playDateHistory.length > 0 && (
                                <div className="mt-4 space-y-3 pl-4 border-l-2 border-foreground">
                                  {currentFriend.playDateHistory.map((playDate, index) => (
                                    <div key={index} className="text-sm">
                                      <div className="font-semibold">{playDate.date}</div>
                                      {playDate.notes && (
                                        <div className="text-muted-foreground mt-1">{playDate.notes}</div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                          {isEditMode && (
                            <div>
                              <div className="font-bold mb-2 uppercase tracking-wide">Notes</div>
                              <Textarea
                                placeholder="Add notes..."
                                value={editFormData.notes}
                                onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
                                className="min-h-[100px] border-2 border-foreground rounded-xl"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-6">
                        {isEditMode ? (
                          <div className="flex gap-3">
                            <Button
                              onClick={() => {
                                setIsEditMode(false)
                                setEditingFriend(null)
                                setCurrentFriend(getRandomFriend())
                              }}
                              variant="outline"
                              className="flex-1 border-2 border-foreground rounded-full text-lg py-7"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={saveEditedFriend}
                              className="flex-1 bg-foreground hover:bg-foreground/90 text-background rounded-full text-lg py-7"
                            >
                              Save Changes
                            </Button>
                          </div>
                        ) : (
                          <Button
                            onClick={() =>
                              setPlayDateDialog({
                                isOpen: true,
                                friendId: currentFriend.id,
                                date: new Date().toISOString().split("T")[0],
                                notes: "",
                              })
                            }
                            className="w-full bg-foreground hover:bg-foreground/90 text-background text-lg py-7 rounded-full"
                          >
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Mark Playdate
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {!isEditMode && (
                    <div className="text-center">
                      <button
                        onClick={() => setCurrentView("library")}
                        className="text-sm text-muted-foreground hover:text-foreground underline transition-colors"
                      >
                        see all friends
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Dialog
        open={playDateDialog.isOpen}
        onOpenChange={(open) => setPlayDateDialog({ ...playDateDialog, isOpen: open })}
      >
        <DialogContent className="max-w-md mx-auto border-2 border-foreground rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Mark Playdate</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Date</label>
              <Input
                type="date"
                value={playDateDialog.date}
                onChange={(e) => setPlayDateDialog({ ...playDateDialog, date: e.target.value })}
                className="w-full max-w-full border-2 border-foreground rounded-xl h-12 px-4 text-base box-border"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Notes (Optional)</label>
              <Textarea
                placeholder="Add notes about the playdate..."
                value={playDateDialog.notes}
                onChange={(e) => setPlayDateDialog({ ...playDateDialog, notes: e.target.value })}
                className="min-h-[100px] border-2 border-foreground rounded-xl"
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() =>
                  setPlayDateDialog({
                    isOpen: false,
                    friendId: null,
                    date: new Date().toISOString().split("T")[0],
                    notes: "",
                  })
                }
                className="flex-1 border-2 border-foreground rounded-full"
              >
                Cancel
              </Button>
              <Button
                onClick={handleMarkPlayDate}
                className="flex-1 bg-foreground hover:bg-foreground/90 text-background rounded-full"
              >
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
