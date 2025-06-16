
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import BrandInvites from '@/components/BrandInvites';
import AIContentStudio from '@/components/AIContentStudio';
import FinanceTracker from '@/components/FinanceTracker';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Creator Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back, {user.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Invites</CardDescription>
              <CardTitle className="text-2xl">3</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">2 new this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Content Drafts</CardDescription>
              <CardTitle className="text-2xl">12</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">5 created today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>This Month's Earnings</CardDescription>
              <CardTitle className="text-2xl">$2,450</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="invites" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="invites">Brand Invites</TabsTrigger>
            <TabsTrigger value="content">AI Content Studio</TabsTrigger>
            <TabsTrigger value="finance">Finance Tracker</TabsTrigger>
          </TabsList>
          
          <TabsContent value="invites">
            <BrandInvites />
          </TabsContent>
          
          <TabsContent value="content">
            <AIContentStudio />
          </TabsContent>
          
          <TabsContent value="finance">
            <FinanceTracker />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
