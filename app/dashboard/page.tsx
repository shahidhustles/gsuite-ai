import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Dashboard = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth");
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back!</CardTitle>
            <CardDescription>
              Hello, {session.user.name || session.user.email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You are successfully authenticated with Google OAuth.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Google Services</CardTitle>
            <CardDescription>API Access Status</CardDescription>
          </CardHeader>
          <CardContent>
            {session.accessToken ? (
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 dark:text-green-400">
                  Connected
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-red-600 dark:text-red-400">
                  Disconnected
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Available API Features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span>📧</span>
                <span>Gmail API</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>Calendar API</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Main Dashboard</CardTitle>
          <CardDescription>
            Your main application content goes here
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[400px] flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-4xl">🚀</div>
            <h3 className="text-lg font-semibold">Ready to Build!</h3>
            <p className="text-muted-foreground max-w-md">
              This boilerplate includes authentication, database setup, and
              Google API access. Start building your application features here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
