
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">Set Up Your Profile</CardTitle>
          <CardDescription>Tell us about your content creation journey</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-medium">Content Platforms</Label>
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
                    />
                    <Label htmlFor={platform.id}>{platform.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="niche">Your Niche</Label>
                <Input
                  id="niche"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g., Tech, Fashion, Gaming"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="audienceSize">Total Audience Size</Label>
                <Input
                  id="audienceSize"
                  type="number"
                  value={audienceSize}
                  onChange={(e) => setAudienceSize(e.target.value)}
                  placeholder="e.g., 10000"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">Base Rates (per post/video)</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {contentTypes.includes('youtube') && (
                  <div className="space-y-2">
                    <Label htmlFor="youtubeRate">YouTube ($)</Label>
                    <Input
                      id="youtubeRate"
                      type="number"
                      value={youtubeRate}
                      onChange={(e) => setYoutubeRate(e.target.value)}
                      placeholder="500"
                    />
                  </div>
                )}
                {contentTypes.includes('instagram') && (
                  <div className="space-y-2">
                    <Label htmlFor="instagramRate">Instagram ($)</Label>
                    <Input
                      id="instagramRate"
                      type="number"
                      value={instagramRate}
                      onChange={(e) => setInstagramRate(e.target.value)}
                      placeholder="200"
                    />
                  </div>
                )}
                {contentTypes.includes('twitter') && (
                  <div className="space-y-2">
                    <Label htmlFor="twitterRate">Twitter ($)</Label>
                    <Input
                      id="twitterRate"
                      type="number"
                      value={twitterRate}
                      onChange={(e) => setTwitterRate(e.target.value)}
                      placeholder="100"
                    />
                  </div>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={contentTypes.length === 0}>
              Complete Setup
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
