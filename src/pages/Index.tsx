
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, TrendingUp, DollarSign } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <Zap className="h-8 w-8 text-primary neon-text" />
          <span className="text-2xl font-bold text-white neon-text">CreatorFlow</span>
        </div>
        <div className="space-x-4">
          <Link to="/login">
            <Button variant="ghost" className="text-white hover:text-primary">
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button className="gradient-neon text-black font-semibold hover:opacity-90">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Your Ultimate
            <span className="gradient-neon bg-clip-text text-transparent"> Creator Hub</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Streamline brand collaborations, generate AI-powered content, and track your creator finances all in one powerful platform.
          </p>
          <Link to="/register">
            <Button size="lg" className="gradient-neon text-black font-bold text-lg px-8 py-4 neon-glow hover:opacity-90 transition-all">
              Launch Your Creator Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-primary/50 transition-all group">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-all">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Brand Collaborations</h3>
            <p className="text-gray-400">
              Manage brand invitations, track partnerships, and automate contract generation with ease.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-secondary/50 transition-all group">
            <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/30 transition-all">
              <Zap className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">AI Content Studio</h3>
            <p className="text-gray-400">
              Generate viral captions, tweets, YouTube scripts, and blog content powered by advanced AI.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-primary/50 transition-all group">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-all">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Finance Tracker</h3>
            <p className="text-gray-400">
              Monitor your creator income, track expenses, and generate detailed financial reports.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-800/30 border-t border-gray-700 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Creator Business?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join thousands of creators who are scaling their influence with CreatorFlow.
          </p>
          <Link to="/register">
            <Button size="lg" className="gradient-neon text-black font-bold text-lg px-8 py-4 neon-glow hover:opacity-90 transition-all">
              Start Building Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
