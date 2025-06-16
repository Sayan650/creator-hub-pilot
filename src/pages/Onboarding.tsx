
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Zap } from 'lucide-react';

const Onboarding = () => {
  const [contentTypes, setContentTypes] = useState<string[]>([]);
  const [niche, setNiche] = useState('');
  const [audienceSize, setAudienceSize] = useState('');
  const [youtubeRate, setYoutubeRate] = useState('');
  const [instagramRate, setInstagramRate] = useState('');
  const [twitterRate, setTwitterRate] = useState('');
  
  const { updateProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContentTypeChange = (platform: string, checked: boolean) => {
    if (checked) {
      setContentTypes([...contentTypes, platform]);
    } else {
      setContentTypes(contentTypes.filter(type => type !== platform));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const baseRates: any = {};
    if (contentTypes.includes('youtube') && youtubeRate) {
      baseRates.youtube = parseFloat(youtubeRate);
    }
    if (contentTypes.includes('instagram') && instagramRate) {
      baseRates.instagram = parseFloat(instagramRate);
    }
    if (contentTypes.includes('twitter') && twitterRate) {
      baseRates.twitter = parseFloat(twitterRate);
    }

    updateProfile({
      contentTypes: contentTypes as ('youtube' | 'instagram' | 'twitter')[],
      niche,
      audienceSize: parseInt(audienceSize),
      baseRates,
      isOnboarded: true
    });

    toast({
      title: "Profile setup complete!",
      description: "Welcome to your Creator Dashboard.",
    });

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4">
      <Card className="w-full max-w-2xl bg-gray-800/50 backdrop-blur-sm border-gray-700">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="h-8 w-8 text-primary neon-text" />
            <span className="text-2xl font-bold text-white neon-text">CreatorFlow</span>
          </div>
          <CardTitle className="text-2xl font-bold text-white">Set Up Your Profile</CardTitle>
          <CardDescription className="text-gray-400">Tell us about your content creation journey</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-medium text-white">Content Platforms</Label>
              <div className="space-y-2">
                {[
                  { id: 'youtube', label: 'YouTube' },
                  { id: 'instagram', label: 'Instagram' },
                  { id: 'twitter', label: 'Twitter/X' }
                ].map((platform) => (
                  <div key={platform.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={platform.id}
                      checked={contentTypes.includes(platform.id)}
                      onCheckedChange={(checked) => 
                        handleContentTypeChange(platform.id, checked as boolean)
                      }
                      className="border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label htmlFor={platform.id} className="text-white">{platform.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="niche" className="text-white">Your Niche</Label>
                <Input
                  id="niche"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g., Tech, Fashion, Gaming"
                  required
                  className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="audienceSize" className="text-white">Total Audience Size</Label>
                <Input
                  id="audienceSize"
                  type="number"
                  value={audienceSize}
                  onChange={(e) => setAudienceSize(e.target.value)}
                  placeholder="e.g., 10000"
                  required
                  className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium text-white">Base Rates (per post/video)</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {contentTypes.includes('youtube') && (
                  <div className="space-y-2">
                    <Label htmlFor="youtubeRate" className="text-white">YouTube ($)</Label>
                    <Input
                      id="youtubeRate"
                      type="number"
                      value={youtubeRate}
                      onChange={(e) => setYoutubeRate(e.target.value)}
                      placeholder="500"
                      className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary"
                    />
                  </div>
                )}
                {contentTypes.includes('instagram') && (
                  <div className="space-y-2">
                    <Label htmlFor="instagramRate" className="text-white">Instagram ($)</Label>
                    <Input
                      id="instagramRate"
                      type="number"
                      value={instagramRate}
                      onChange={(e) => setInstagramRate(e.target.value)}
                      placeholder="200"
                      className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary"
                    />
                  </div>
                )}
                {contentTypes.includes('twitter') && (
                  <div className="space-y-2">
                    <Label htmlFor="twitterRate" className="text-white">Twitter ($)</Label>
                    <Input
                      id="twitterRate"
                      type="number"
                      value={twitterRate}
                      onChange={(e) => setTwitterRate(e.target.value)}
                      placeholder="100"
                      className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary"
                    />
                  </div>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full gradient-neon text-black font-semibold hover:opacity-90" disabled={contentTypes.length === 0}>
              Complete Setup
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
