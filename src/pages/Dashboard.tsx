
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import BrandInvites from '@/components/BrandInvites';
import AIContentStudio from '@/components/AIContentStudio';
import FinanceTracker from '@/components/FinanceTracker';
import { Button } from '@/components/ui/button';
import { LogOut, User, Zap } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-primary neon-text" />
                <span className="text-xl font-bold text-white neon-text">CreatorFlow</span>
              </div>
              <div className="ml-6">
                <h1 className="text-xl font-semibold text-white">Creator Dashboard</h1>
                <p className="text-sm text-gray-400">Welcome back, {user.name}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-700 hover:text-primary">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button variant="outline" size="sm" onClick={logout} className="border-gray-600 text-white hover:bg-gray-700 hover:text-primary">
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
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400">Active Invites</CardDescription>
              <CardTitle className="text-2xl text-white">3</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-400">2 new this week</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400">Content Drafts</CardDescription>
              <CardTitle className="text-2xl text-white">12</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-400">5 created today</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400">This Month's Earnings</CardDescription>
              <CardTitle className="text-2xl text-primary neon-text">$2,450</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-secondary">+15% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="invites" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border-gray-700">
            <TabsTrigger value="invites" className="data-[state=active]:bg-primary data-[state=active]:text-black text-white">Brand Invites</TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-primary data-[state=active]:text-black text-white">AI Content Studio</TabsTrigger>
            <TabsTrigger value="finance" className="data-[state=active]:bg-primary data-[state=active]:text-black text-white">Finance Tracker</TabsTrigger>
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
