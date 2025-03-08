'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, ChartBar, FileText, Newspaper, Search, Info, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedTab, setSelectedTab] = useState('politicians');

  // Mock data for demonstration purposes
  const mockResults = {
    politicians: [
      { 
        name: 'Jane Smith', 
        alignment: 78, 
        party: 'Democratic', 
        topics: [
          { name: 'Healthcare', stance: 92 },
          { name: 'Economy', stance: 76 },
          { name: 'Climate', stance: 89 }
        ] 
      },
      { 
        name: 'Robert Johnson', 
        alignment: 45, 
        party: 'Republican', 
        topics: [
          { name: 'Defense', stance: 87 },
          { name: 'Taxation', stance: 79 },
          { name: 'Immigration', stance: 92 }
        ] 
      },
      { 
        name: 'Maria Garcia', 
        alignment: 62, 
        party: 'Independent', 
        topics: [
          { name: 'Education', stance: 81 },
          { name: 'Housing', stance: 68 },
          { name: 'Infrastructure', stance: 75 }
        ] 
      },
    ],
    media: [
      { 
        name: 'National News Network', 
        alignment: 72, 
        bias: 'Left-leaning', 
        topicAlignments: [
          { topic: 'Healthcare', score: 85 },
          { topic: 'Climate', score: 78 }
        ]
      },
      { 
        name: 'Freedom Press', 
        alignment: 38, 
        bias: 'Right-leaning', 
        topicAlignments: [
          { topic: 'Economy', score: 82 },
          { topic: 'Defense', score: 76 }
        ]
      },
      { 
        name: 'Central Media Group', 
        alignment: 55, 
        bias: 'Moderate', 
        topicAlignments: [
          { topic: 'Education', score: 68 },
          { topic: 'Technology', score: 71 }
        ]
      },
    ]
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setHasSearched(true);
    }
  };

  // Function to determine color based on alignment score
  const getAlignmentColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <main className="flex-1">
      {/* Hero Section with Search */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            Political Viewpoint{' '}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Alignment Analysis
            </span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Discover how politicians' stances on topics align with media coverage. 
            Analyze the relationship between political viewpoints and media narratives.
          </p>
          
          {/* Prominent Search Bar */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      placeholder="Enter a politician name, media outlet, or specific topic..."
                      className="pr-10 h-12 text-base"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-12 w-12 text-muted-foreground">
                            <Info className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>Search for politicians, media outlets, or topics to see alignment scores. Try examples like "AOC", "Fox News", or "healthcare".</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Button type="submit" size="lg" className="ml-2 px-6">
                    <Search className="mr-2 h-5 w-5" />
                    Analyze
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  <AlertCircle className="inline mr-1 h-4 w-4" />
                  Quick search without login. Create an account for advanced features and saved results.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results Section - Shows when searched or displays sample data initially */}
      <section className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">{hasSearched ? `Results for "${searchQuery}"` : "Sample Alignment Scores"}</h2>
              <p className="text-muted-foreground">
                {hasSearched ? "Based on recent statements and coverage" : "Explore how our alignment analysis works with these examples"}
              </p>
            </div>
            
            {/* What is Alignment Score explanation */}
            <Card className="mt-4 md:mt-0 md:w-72">
              <CardContent className="p-4">
                <h3 className="flex items-center text-sm font-medium">
                  <Info className="mr-2 h-4 w-4" />
                  What is an Alignment Score?
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Scores range from 0-100 and represent three types of alignment: politician-topic, politician-media outlet, and media outlet-topic. Higher scores indicate stronger alignment.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Tabs for Results */}
          <Tabs defaultValue="politicians" value={selectedTab} onValueChange={setSelectedTab} className="mb-12">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="politicians">Politicians</TabsTrigger>
              <TabsTrigger value="media">Media Outlets</TabsTrigger>
            </TabsList>
            
            {/* Politicians Tab */}
            <TabsContent value="politicians">
              <div className="space-y-4">
                {mockResults.politicians.map((politician, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-1 p-6">
                        <h3 className="text-xl font-bold">{politician.name}</h3>
                        <p className="text-sm text-muted-foreground">{politician.party}</p>
                        <div className="mt-4">
                          <p className="text-sm font-medium mb-2">Topic Stances:</p>
                          <div className="space-y-2">
                            {politician.topics.map((topic, i) => (
                              <div key={i} className="flex items-center justify-between">
                                <span className="text-xs">{topic.name}</span>
                                <div className="flex items-center gap-2">
                                  <div className="h-2 w-20 bg-secondary rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full ${topic.stance >= 70 ? 'bg-green-500' : topic.stance >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                                      style={{ width: `${topic.stance}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs">{topic.stance}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center border-t md:border-l md:border-t-0 p-6 bg-muted/30">
                        <div className="text-center">
                          <div className="mb-2 text-sm font-medium">Overall Alignment Score</div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center justify-center cursor-help">
                                  <div className={`flex h-16 w-16 items-center justify-center rounded-full ${getAlignmentColor(politician.alignment)} text-white`}>
                                    <span className="text-2xl font-bold">{politician.alignment}</span>
                                  </div>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>This score represents how closely this politician's statements align with their stances on topics and with media coverage of those topics.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Media Tab */}
            <TabsContent value="media">
              <div className="space-y-4">
                {mockResults.media.map((outlet, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-1 p-6">
                        <h3 className="text-xl font-bold">{outlet.name}</h3>
                        <p className="text-sm text-muted-foreground">{outlet.bias}</p>
                        <div className="mt-4">
                          <p className="text-sm font-medium mb-2">Topic Coverage:</p>
                          <div className="space-y-2">
                            {outlet.topicAlignments.map((topic, i) => (
                              <div key={i} className="flex items-center justify-between">
                                <span className="text-xs">{topic.topic}</span>
                                <div className="flex items-center gap-2">
                                  <div className="h-2 w-20 bg-secondary rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full ${topic.score >= 70 ? 'bg-green-500' : topic.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                                      style={{ width: `${topic.score}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs">{topic.score}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center border-t md:border-l md:border-t-0 p-6 bg-muted/30">
                        <div className="text-center">
                          <div className="mb-2 text-sm font-medium">Overall Alignment Score</div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center justify-center cursor-help">
                                  <div className={`flex h-16 w-16 items-center justify-center rounded-full ${getAlignmentColor(outlet.alignment)} text-white`}>
                                    <span className="text-2xl font-bold">{outlet.alignment}</span>
                                  </div>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p>This score represents how closely this outlet's coverage aligns with the topics they cover and with politicians' stances on those topics.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Analysis Methods Section - Moved below search results for better flow */}
      <section className="container mx-auto px-4 py-12 bg-muted/30">
        <h2 className="mb-8 text-center text-3xl font-bold">How It Works</h2>
        <Tabs defaultValue="similarity" className="mx-auto max-w-4xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="similarity">Document Similarity</TabsTrigger>
            <TabsTrigger value="sentiment">Topic-Based Sentiment</TabsTrigger>
          </TabsList>
          <TabsContent value="similarity">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  Document Similarity Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">How it Works</h4>
                    <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                      <li>Generate embeddings for politician statements on specific topics</li>
                      <li>Generate embeddings for media coverage of those topics</li>
                      <li>Compute similarity scores between politician-topic and media-topic pairs</li>
                      <li>Aggregate results to determine overall alignment</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-muted p-6">
                    <Brain className="mx-auto mb-4 h-12 w-12 text-primary" />
                    <p className="text-center text-sm text-muted-foreground">
                      Using state-of-the-art embedding techniques to ensure accurate
                      comparison between politician statements on topics and media coverage of those topics.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sentiment">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChartBar className="h-6 w-6" />
                  Topic-Based Sentiment Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Key Features</h4>
                    <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                      <li>Identify politician stances on specific topics</li>
                      <li>Analyze media sentiment on the same topics</li>
                      <li>Compare alignment between politicians and media on topics</li>
                      <li>Track stance and coverage changes over time</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-muted p-6">
                    <Newspaper className="mx-auto mb-4 h-12 w-12 text-primary" />
                    <p className="text-center text-sm text-muted-foreground">
                      Sophisticated sentiment analysis algorithms process both
                      politician statements on topics and media coverage of those topics in real-time.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Optional Account Creation CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl rounded-xl bg-card p-8 shadow-lg">
          <h2 className="mb-6 text-center text-3xl font-bold">
            Get More with an Account
          </h2>
          <p className="mb-8 text-center text-lg text-muted-foreground">
            While basic analysis is always free, create an account to unlock additional features.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Brain className="mx-auto mb-4 h-8 w-8 text-primary" />
                  <h3 className="mb-2 font-semibold">Track Alignment Changes</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor how alignment between politicians, topics, and media changes over time
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <ChartBar className="mx-auto mb-4 h-8 w-8 text-primary" />
                  <h3 className="mb-2 font-semibold">Topic Alerts</h3>
                  <p className="text-sm text-muted-foreground">
                    Get notified when alignment shifts on topics you care about
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Newspaper className="mx-auto mb-4 h-8 w-8 text-primary" />
                  <h3 className="mb-2 font-semibold">Custom Reports</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate detailed alignment reports focused on specific topics or politicians
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg">Sign Up for Free</Button>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>
        </div>
      </section>
    </main>
  );
}