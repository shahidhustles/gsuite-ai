"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogoutButton } from "@/components/logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

interface UserProfileProps {
  compact?: boolean;
}

export function UserProfile({ compact = false }: UserProfileProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    if (compact) {
      return (
        <div className="flex items-center space-x-3 p-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-2 w-16" />
          </div>
        </div>
      );
    }

    return (
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!session?.user) {
    return null;
  }

  const { user } = session;
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.email?.[0]?.toUpperCase() || "?";

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">
              {user.name || "Unknown User"}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {user.email}
            </div>
          </div>
        </div>
        <LogoutButton
          variant="outline"
          size="sm"
          className="w-full h-8 text-xs"
        >
          Sign out
        </LogoutButton>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Profile</CardTitle>
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="font-medium">{user.name || "Unknown User"}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
            <Badge variant="secondary" className="text-xs">
              Google Account
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {session.accessToken && (
          <div className="text-sm text-muted-foreground">
            ✅ Connected to Google services
          </div>
        )}
        <LogoutButton variant="destructive" className="w-full" />
      </CardContent>
    </Card>
  );
}
