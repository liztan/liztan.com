"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { ChildFriendsList } from "@/components/child-friends-list"
import { AddChildForm } from "@/components/add-child-form"
import { AddFriendForm } from "@/components/add-friend-form"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

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

export default function PlayDateFinder() {
  const [currentView, setCurrentView] = useState<"home" | "child-friends" | "add-child" | "add-friend">("home")
  const [selectedChildId, setSelectedChildId] = useState<number | null>(null)
  const [childToDelete, setChildToDelete] = useState<number | null>(null)

  const [children, setChildren] = useState<Child[]>([
    {
      id: 1,
      name: "Daisy",
      age: 7,
      avatar: "👦",
      friends: [
        {
          id: 1,
          name: "Emma",
          age: 7,
          interests: ["Art", "Dancing", "Books"],
          avatar: "👧",
          parentName: "Sarah",
          parentPhone: "555-0123",
          location: "Downtown",
          tags: ["school", "art class"],
          notes: "Loves creative activities",
          lastPlayDate: "2 weeks ago",
          isFavorite: true,
          playDateHistory: [
            { date: "2024-01-15", notes: "Art project at the park" },
            { date: "2024-01-01", notes: "New Year's party" },
          ],
        },
        {
          id: 2,
          name: "Liam",
          age: 6,
          interests: ["Soccer", "Legos", "Video Games"],
          avatar: "👦",
          parentName: "Mike",
          parentPhone: "555-0456",
          location: "Same neighborhood",
          tags: ["neighbor", "soccer"],
          notes: "Great at building things",
          lastPlayDate: "1 week ago",
          isFavorite: false,
          playDateHistory: [{ date: "2024-01-20", notes: "Soccer practice together" }],
        },
      ],
    },
    {
      id: 2,
      name: "Coco",
      age: 5,
      avatar: "👧",
      friends: [
        {
          id: 3,
          name: "Zoe",
          age: 5,
          interests: ["Science", "Crafts", "Animals"],
          avatar: "👧",
          parentName: "Lisa",
          parentPhone: "555-0789",
          location: "Across town",
          tags: ["family friend", "science club"],
          notes: "Very curious about everything",
          lastPlayDate: "3 days ago",
          isFavorite: true,
          playDateHistory: [
            { date: "2024-01-25", notes: "Science museum visit" },
            { date: "2024-01-10", notes: "Craft afternoon" },
          ],
        },
        {
          id: 4,
          name: "Max",
          age: 5,
          interests: ["Basketball", "Music", "Cooking"],
          avatar: "👦",
          parentName: "Tom",
          parentPhone: "555-0321",
          location: "Same neighborhood",
          tags: ["daycare", "music class"],
          notes: "Loves to help in the kitchen",
          lastPlayDate: "Never",
          isFavorite: false,
          playDateHistory: [],
        },
      ],
    },
  ])

  const selectedChild = children.find((child) => child.id === selectedChildId)

  const addChild = (newChild: Omit<Child, "id" | "friends">) => {
    const child: Child = {
      ...newChild,
      id: children.length + 1,
      friends: [],
    }
    setChildren([...children, child])
    setCurrentView("home")
  }

  const deleteChild = (childId: number) => {
    setChildren(children.filter((child) => child.id !== childId))
    setChildToDelete(null)
  }

  const updateChildFriends = (childId: number, updatedFriends: Friend[]) => {
    setChildren(children.map((child) => (child.id === childId ? { ...child, friends: updatedFriends } : child)))
  }

  const addFriendToChildren = (childIds: number[], friend: Omit<Friend, "id">) => {
    const newFriend = {
      ...friend,
      id: Date.now(), // Simple unique ID
      isFavorite: false,
      playDateHistory: [],
    }

    setChildren(
      children.map((child) => {
        if (childIds.includes(child.id)) {
          return {
            ...child,
            friends: [...child.friends, newFriend],
          }
        }
        return child
      }),
    )
    setCurrentView("home")
  }

  if (currentView === "home") {
    return (
      <>
        <div className="geometric-accent-1" />
        <div className="geometric-accent-2" />

        <div className="min-h-screen bg-background p-6 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-16 pt-8">
              <h1 className="text-5xl font-bold text-foreground tracking-tight">Playdate</h1>
              <Button
                onClick={() => setCurrentView("add-friend")}
                size="icon"
                className="w-14 h-14 bg-foreground hover:bg-foreground/90 text-background rounded-full"
                disabled={children.length === 0}
              >
                <Plus className="w-6 h-6" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {children.map((child) => (
                <div key={child.id} className="relative group/card">
                  <button
                    className="bg-card border-2 border-foreground p-10 hover:bg-foreground hover:text-background transition-all cursor-pointer text-left rounded-2xl group w-full"
                    onClick={() => {
                      setSelectedChildId(child.id)
                      setCurrentView("child-friends")
                    }}
                  >
                    <h2 className="text-4xl font-bold mb-3">{child.name}</h2>
                    <div className="text-lg font-mono text-muted-foreground group-hover:text-background/70">
                      {child.friends.length} {child.friends.length === 1 ? "friend" : "friends"}
                    </div>
                  </button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      setChildToDelete(child.id)
                    }}
                    size="icon"
                    variant="ghost"
                    className="absolute top-3 right-3 w-10 h-10 opacity-0 group-hover/card:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {children.length === 0 && (
              <div className="text-center py-20 bg-card border-2 border-foreground rounded-2xl p-12">
                <h2 className="text-3xl font-bold mb-6">Add your first child</h2>
                <Button
                  onClick={() => setCurrentView("add-child")}
                  className="bg-foreground hover:bg-foreground/90 text-background text-lg px-10 py-6 rounded-full"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Child
                </Button>
              </div>
            )}
          </div>
        </div>

        <AlertDialog open={childToDelete !== null} onOpenChange={() => setChildToDelete(null)}>
          <AlertDialogContent className="bg-card border-2 border-foreground rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-bold">Delete Child?</AlertDialogTitle>
              <AlertDialogDescription className="text-lg">
                This will permanently delete {children.find((c) => c.id === childToDelete)?.name} and all their friends.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-2 border-foreground rounded-full px-6">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => childToDelete && deleteChild(childToDelete)}
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-full px-6"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }

  if (currentView === "add-child") {
    return <AddChildForm onBack={() => setCurrentView("home")} onAddChild={addChild} />
  }

  if (currentView === "add-friend") {
    return (
      <AddFriendForm
        onBack={() => setCurrentView("home")}
        onAddFriend={addFriendToChildren}
        availableChildren={children}
      />
    )
  }

  if (currentView === "child-friends" && selectedChild) {
    return (
      <ChildFriendsList
        child={selectedChild}
        onBack={() => setCurrentView("home")}
        onUpdateFriends={(updatedFriends) => updateChildFriends(selectedChild.id, updatedFriends)}
      />
    )
  }

  return null
}
