
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContentDraft } from '@/types';
import { Copy, Save, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AIContentStudio = () => {
  const [contentType, setContentType] = useState<string>('');
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('');
  const [length, setLength] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [drafts, setDrafts] = useState<ContentDraft[]>([]);
  const { toast } = useToast();

  const generateContent = async () => {
    if (!contentType || !topic) {
      toast({
        title: "Missing information",
        description: "Please select content type and provide a topic.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockContent = {
      'caption': `🚀 Just discovered something amazing about ${topic}! Here's what you need to know:\n\n✨ Key insight that will blow your mind\n💡 Pro tip that changed everything for me\n🔥 Why this matters for your ${tone} journey\n\nWhat are your thoughts? Drop a comment below! 👇\n\n#${topic.replace(/\s+/g, '')} #ContentCreator #Tips`,
      'tweet': `🧵 Thread about ${topic}\n\n1/ Here's something ${tone} that most people don't realize about ${topic}...\n\n2/ The key insight that changed my perspective:\n\n3/ Here's how you can apply this today:\n\n4/ Bottom line: ${topic} is more important than you think. What's your experience?`,
      'youtube-script': `[INTRO]\nHey everyone! Welcome back to my channel. Today we're diving deep into ${topic}, and I promise this ${tone} approach will completely change how you think about it.\n\n[HOOK]\nBut first, let me ask you this...\n\n[MAIN CONTENT]\nSo here's what most people get wrong about ${topic}...\n\n[CONCLUSION]\nThat's a wrap! If this ${tone} breakdown helped you understand ${topic} better, smash that like button and subscribe for more content like this!`,
      'blog-snippet': `# The Ultimate Guide to ${topic}: A ${tone} Approach\n\nWhen it comes to ${topic}, most people are completely missing the point. After years of research and hands-on experience, I've discovered that the ${tone} approach yields the best results.\n\n## Why ${topic} Matters More Than Ever\n\nIn today's fast-paced world, understanding ${topic} isn't just helpful—it's essential. Here's what you need to know...\n\n## The Game-Changing Strategy\n\nThis ${tone} method has helped thousands of people transform their approach to ${topic}. Here's exactly how it works...`
    };

    setGeneratedContent(mockContent[contentType as keyof typeof mockContent] || 'Generated content will appear here...');
    setIsGenerating(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard.",
    });
  };

  const saveToDrafts = () => {
    if (!generatedContent) return;
    
    const newDraft: ContentDraft = {
      id: Date.now().toString(),
      type: contentType as ContentDraft['type'],
      title: `${contentType} about ${topic}`,
      content: generatedContent,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setDrafts([newDraft, ...drafts]);
    toast({
      title: "Saved!",
      description: "Content saved to drafts.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">AI Content Studio</h2>
        <div className="flex items-center space-x-2">
          <Sparkles className="h-4 w-4 text-purple-600" />
          <span className="text-sm text-gray-600">Powered by AI</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Content Generation Form */}
        <Card>
          <CardHeader>
            <CardTitle>Generate New Content</CardTitle>
            <CardDescription>Fill out the form to generate AI-powered content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contentType">Content Type</Label>
              <Select onValueChange={setContentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="caption">Instagram Caption</SelectItem>
                  <SelectItem value="tweet">Twitter Thread</SelectItem>
                  <SelectItem value="youtube-script">YouTube Script</SelectItem>
                  <SelectItem value="blog-snippet">Blog Snippet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Topic/Subject</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., productivity tips, tech reviews"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="funny">Funny</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="length">Length</Label>
                <Select onValueChange={setLength}>
                  <SelectTrigger>
                    <SelectValue placeholder="Content length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="long">Long</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={generateContent} 
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? 'Generating...' : 'Generate Content'}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Content Display */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Content</CardTitle>
            {generatedContent && (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={saveToDrafts}>
                  <Save className="h-4 w-4 mr-2" />
                  Save to Drafts
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <Textarea
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)}
              placeholder="Generated content will appear here..."
              className="min-h-[300px]"
            />
          </CardContent>
        </Card>
      </div>

      {/* Saved Drafts */}
      {drafts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Saved Drafts ({drafts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {drafts.slice(0, 5).map((draft) => (
                <div key={draft.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">{draft.title}</h4>
                    <p className="text-xs text-gray-500">{draft.createdAt}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIContentStudio;
