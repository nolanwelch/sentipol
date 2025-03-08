'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  ChevronDown, 
  ExternalLink, 
  FileText, 
  Filter, 
  Globe, 
  PieChart, 
  Radio, 
  Search, 
  SlidersHorizontal, 
  TrendingUp,
  Clock,
  Bookmark,
  Share2,
  ListFilter,
  Info
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Mock media outlet data
const mediaOutlets = [
  {
    id: 1,
    name: 'National News Network',
    type: 'Television',
    bias: 'Left-leaning',
    alignment: 72, // Overall alignment score
    trend: 'up',
    logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    website: 'www.nnn.com',
    focus: [
      { topic: 'Policy', stance: 76 },
      { topic: 'Social Issues', stance: 82 },
      { topic: 'International', stance: 68 }
    ],
    recentCoverage: 'Healthcare bill, Climate summit, Economic forecast',
    politicianAlignments: [
      { politician: 'Jane Smith (D)', score: 82, topics: ['Healthcare', 'Climate'] },
      { politician: 'Michael Thompson (D)', score: 71, topics: ['Environment', 'Education'] },
      { politician: 'Sarah Chen (R)', score: 43, topics: ['Healthcare'] }
    ],
    audienceReach: '45M',
    founded: 1982
  },
  {
    id: 2,
    name: 'Freedom Press',
    type: 'Newspaper',
    bias: 'Right-leaning',
    alignment: 38,
    trend: 'stable',
    logo: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    website: 'www.freedompress.org',
    focus: [
      { topic: 'Economy', stance: 85 },
      { topic: 'Defense', stance: 79 },
      { topic: 'Traditional Values', stance: 87 }
    ],
    recentCoverage: 'Border security, Defense spending, Tax policy',
    politicianAlignments: [
      { politician: 'Robert Johnson (R)', score: 79, topics: ['Defense', 'Immigration'] },
      { politician: 'Sarah Chen (R)', score: 68, topics: ['Economy', 'Security'] },
      { politician: 'Jane Smith (D)', score: 31, topics: ['Economy'] }
    ],
    audienceReach: '28M',
    founded: 1965
  },
  {
    id: 3,
    name: 'Central Media Group',
    type: 'Online News',
    bias: 'Moderate',
    alignment: 55,
    trend: 'down',
    logo: 'https://images.unsplash.com/photo-1560472355-109703aa3edc?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    website: 'www.cmg.media',
    focus: [
      { topic: 'General News', stance: 62 },
      { topic: 'Analysis', stance: 68 },
      { topic: 'Technology', stance: 71 }
    ],
    recentCoverage: 'Tech regulation, Economic trends, Political analysis',
    politicianAlignments: [
      { politician: 'Maria Garcia (I)', score: 68, topics: ['Education', 'Infrastructure'] },
      { politician: 'James Wilson (D)', score: 65, topics: ['Technology'] },
      { politician: 'Robert Johnson (R)', score: 52, topics: ['Taxation'] }
    ],
    audienceReach: '32M',
    founded: 2001
  },
  {
    id: 4,
    name: 'West Coast Tribune',
    type: 'Newspaper',
    bias: 'Left-leaning',
    alignment: 68,
    trend: 'up',
    logo: 'https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    website: 'www.westcoasttribune.com',
    focus: [
      { topic: 'Environment', stance: 88 },
      { topic: 'Technology', stance: 72 },
      { topic: 'Social Issues', stance: 76 }
    ],
    recentCoverage: 'Climate policy, Tech innovation, Housing crisis',
    politicianAlignments: [
      { politician: 'Jane Smith (D)', score: 75, topics: ['Healthcare', 'Economy'] },
      { politician: 'Maria Garcia (I)', score: 64, topics: ['Education'] },
      { politician: 'Robert Johnson (R)', score: 38, topics: ['Immigration'] }
    ],
    audienceReach: '18M',
    founded: 1954
  },
  {
    id: 5,
    name: 'Heartland Herald',
    type: 'Radio/Podcast',
    bias: 'Right-leaning',
    alignment: 42,
    trend: 'stable',
    logo: 'https://images.unsplash.com/photo-1598550873468-4d5b3660b5f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    website: 'www.heartlandherald.net',
    focus: [
      { topic: 'Rural Issues', stance: 83 },
      { topic: 'Economy', stance: 76 },
      { topic: 'Traditional Values', stance: 81 }
    ],
    recentCoverage: 'Agricultural policy, Small business, Community values',
    politicianAlignments: [
      { politician: 'Robert Johnson (R)', score: 74, topics: ['Defense', 'Immigration'] },
      { politician: 'Sarah Chen (R)', score: 65, topics: ['Economy', 'Security'] },
      { politician: 'James Wilson (D)', score: 36, topics: ['Labor'] }
    ],
    audienceReach: '12M',
    founded: 1972
  },
  {
    id: 6,
    name: 'Digital Dispatch',
    type: 'Online News',
    bias: 'Moderate',
    alignment: 61,
    trend: 'up',
    logo: 'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    website: 'www.digitaldispatch.com',
    focus: [
      { topic: 'Technology', stance: 75 },
      { topic: 'Science', stance: 82 },
      { topic: 'Analysis', stance: 68 }
    ],
    recentCoverage: 'Tech policy, Scientific research, Data analysis',
    politicianAlignments: [
      { politician: 'James Wilson (D)', score: 69, topics: ['Technology', 'Foreign Policy'] },
      { politician: 'Maria Garcia (I)', score: 63, topics: ['Education', 'Housing'] },
      { politician: 'Sarah Chen (R)', score: 52, topics: ['Economy'] }
    ],
    audienceReach: '25M',
    founded: 2010
  }
];

// Helper function to determine color based on alignment score
const getAlignmentColor = (score: number) => {
  if (score >= 70) return 'bg-green-500';
  if (score >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
};

// Helper function to determine trend icon
const getTrendIcon = (trend: string) => {
  if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
  if (trend === 'down') return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
  return <TrendingUp className="h-4 w-4 text-yellow-500 rotate-90" />;
};

// Helper function to determine bias color
const getBiasColor = (bias: string) => {
  if (bias === 'Left-leaning') return 'text-blue-600';
  if (bias === 'Right-leaning') return 'text-red-600';
  return 'text-purple-600';
};

export default function MediaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBias, setSelectedBias] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('alignment');
  const [viewType, setViewType] = useState('detailed');
  
  // Filter media outlets based on search and filters
  const filteredOutlets = mediaOutlets.filter(outlet => {
    const matchesSearch = outlet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          outlet.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          outlet.focus.some(topic => topic.topic.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesBias = selectedBias === 'all' || outlet.bias === selectedBias;
    const matchesType = selectedType === 'all' || outlet.type === selectedType;
    
    return matchesSearch && matchesBias && matchesType;
  });
  
  // Sort media outlets based on selected sort
  const sortedOutlets = [...filteredOutlets].sort((a, b) => {
    if (sortBy === 'alignment') return b.alignment - a.alignment;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'bias') return a.bias.localeCompare(b.bias);
    if (sortBy === 'audience') return parseInt(b.audienceReach) - parseInt(a.audienceReach);
    return 0;
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Media Outlets</h1>
        <p className="text-muted-foreground text-lg">
          Analyze how media coverage aligns with political topics and politician viewpoints.
        </p>
      </div>
      
      {/* Search and Filter Section */}
      <div className="bg-card rounded-lg p-6 mb-8 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, type, or topics..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Political Bias</label>
            <Select value={selectedBias} onValueChange={setSelectedBias}>
              <SelectTrigger>
                <SelectValue placeholder="All Biases" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Biases</SelectItem>
                <SelectItem value="Left-leaning">Left-leaning</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="Right-leaning">Right-leaning</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Media Type</label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Television">Television</SelectItem>
                <SelectItem value="Newspaper">Newspaper</SelectItem>
                <SelectItem value="Online News">Online News</SelectItem>
                <SelectItem value="Radio/Podcast">Radio/Podcast</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alignment">Overall Alignment Score</SelectItem>
                <SelectItem value="name">Outlet Name</SelectItem>
                <SelectItem value="bias">Political Bias</SelectItem>
                <SelectItem value="audience">Audience Reach</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-muted-foreground">
            {filteredOutlets.length} media outlets found
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewType === 'detailed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewType('detailed')}
            >
              <SlidersHorizontal className="h-4 w-4 mr-1" />
              Detailed
            </Button>
            <Button
              variant={viewType === 'compact' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewType('compact')}
            >
              <Filter className="h-4 w-4 mr-1" />
              Compact
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content - View Tabs */}
      <Tabs defaultValue="outlets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="outlets" className="flex items-center gap-2">
            <Radio className="h-4 w-4" />
            Media Outlets
          </TabsTrigger>
          <TabsTrigger value="coverage" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Coverage Analysis
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Media Trends
          </TabsTrigger>
        </TabsList>
        
        {/* Outlets View Tab */}
        <TabsContent value="outlets" className="space-y-6">
          {viewType === 'detailed' ? (
            sortedOutlets.map(outlet => (
              <Card key={outlet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:flex md:w-1/4 p-6 flex-col justify-center items-center bg-muted/30">
                    <div className="h-24 w-24 rounded-lg overflow-hidden mb-4 bg-white p-2 flex items-center justify-center">
                      <img
                        src={outlet.logo}
                        alt={outlet.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="text-center">
                      <p className={`text-lg font-bold ${getBiasColor(outlet.bias)}`}>
                        {outlet.bias}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {outlet.type}
                      </p>
                      <Button variant="link" size="sm" className="mt-2 p-0 h-auto flex items-center">
                        <Globe className="h-3 w-3 mr-1" />
                        <span className="text-xs">{outlet.website}</span>
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{outlet.name}</h3>
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex gap-1 items-center">
                            {getTrendIcon(outlet.trend)}
                            <span className="text-sm">{outlet.trend === 'stable' ? 'Stable' : `Trending ${outlet.trend}`}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>Est. {outlet.founded}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <BarChart3 className="h-4 w-4" />
                            <span>{outlet.audienceReach} audience reach</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="mb-1 text-sm font-medium">Overall Alignment Score</div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center justify-center cursor-help">
                                <div className={`flex h-14 w-14 items-center justify-center rounded-full ${getAlignmentColor(outlet.alignment)} text-white`}>
                                  <span className="text-xl font-bold">{outlet.alignment}</span>
                                </div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs p-4">
                              <p>This score represents how closely this outlet's coverage aligns with the topics they cover and with politicians' stances on those topics.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <ListFilter className="h-4 w-4 mr-1" />
                          Topic Coverage & Stance
                        </h4>
                        <div className="space-y-2">
                          {outlet.focus.map((topic, i) => (
                            <div key={i} className="mb-2">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium">{topic.topic}</span>
                                <span className={`text-xs font-medium ${topic.stance >= 70 ? 'text-green-600' : topic.stance >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                                  {topic.stance}% coverage intensity
                                </span>
                              </div>
                              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${getAlignmentColor(topic.stance)}`} 
                                  style={{ width: `${topic.stance}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <h4 className="font-semibold mt-4 mb-2 flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          Recent Coverage
                        </h4>
                        <p className="text-sm text-muted-foreground">{outlet.recentCoverage}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Politician Viewpoint Alignment</h4>
                        {outlet.politicianAlignments.map((alignment, i) => (
                          <div key={i} className="mb-3 last:mb-0">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">{alignment.politician}</span>
                              <span className={`text-sm font-medium ${alignment.score >= 70 ? 'text-green-600' : alignment.score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                                {alignment.score}
                              </span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${getAlignmentColor(alignment.score)}`} 
                                style={{ width: `${alignment.score}%` }}
                              ></div>
                            </div>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {alignment.topics.map((topic, idx) => (
                                <span key={idx} className="inline-flex text-xs bg-muted px-2 py-0.5 rounded-full">
                                  {topic}
                                </span>
                              ))}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Aligned on {alignment.topics.join(', ')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t flex justify-between">
                      <div className="flex gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Bookmark className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Save outlet</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Share analysis</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div>
                        <Button variant="outline" size="sm" className="mr-2">Topic Analysis</Button>
                        <Button size="sm">Compare with Politicians</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedOutlets.map(outlet => (
                <Card key={outlet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg overflow-hidden mr-3 bg-white p-1 flex items-center justify-center">
                          <img
                            src={outlet.logo}
                            alt={outlet.name}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-base">{outlet.name}</CardTitle>
                          <CardDescription>
                            {outlet.type}
                          </CardDescription>
                        </div>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${getAlignmentColor(outlet.alignment)} text-white cursor-help`}>
                              <span className="text-sm font-bold">{outlet.alignment}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Overall alignment score across topics and politicians</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`rounded-full px-2 py-1 text-xs ${getBiasColor(outlet.bias)} bg-muted`}>
                        {outlet.bias}
                      </span>
                      {outlet.focus.slice(0, 2).map((topic, i) => (
                        <span key={i} className="rounded-full bg-secondary px-2 py-1 text-xs">
                          {topic.topic}
                        </span>
                      ))}
                      {outlet.focus.length > 2 && (
                        <span className="rounded-full bg-secondary px-2 py-1 text-xs">
                          +{outlet.focus.length - 2}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span>{outlet.audienceReach} audience reach</span>
                      <p className="mt-1 text-xs">
                        <span>Top aligned politician: </span>
                        <span className={outlet.politicianAlignments[0].score >= 70 ? 'text-green-600' : outlet.politicianAlignments[0].score >= 50 ? 'text-yellow-600' : 'text-red-600'}>
                          {outlet.politicianAlignments[0].politician.split(' ')[0]} ({outlet.politicianAlignments[0].score})
                        </span>
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                      View Analysis
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Coverage Analysis Tab */}
        <TabsContent value="coverage">
          <Card>
            <CardHeader>
              <CardTitle>Coverage Analysis</CardTitle>
              <CardDescription>
                How media outlets cover specific political topics and align with politician viewpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="healthcare">
                <TabsList className="w-full max-w-md mx-auto mb-6">
                  <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
                  <TabsTrigger value="economy">Economy</TabsTrigger>
                  <TabsTrigger value="climate">Climate</TabsTrigger>
                  <TabsTrigger value="immigration">Immigration</TabsTrigger>
                </TabsList>
                
                <TabsContent value="healthcare" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Healthcare Topic Coverage Distribution</h3>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="aspect-square relative flex items-center justify-center">
                          <PieChart className="absolute h-1/3 w-1/3 text-muted-foreground opacity-10" />
                          <div className="text-center">
                            <div className="text-4xl font-bold">68%</div>
                            <div className="text-sm text-muted-foreground">Topic-Outlet alignment</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                            <span className="text-xs">Left-leaning (42%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                            <span className="text-xs">Moderate (31%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                            <span className="text-xs">Right-leaning (27%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-gray-300 mr-2"></div>
                            <span className="text-xs">Neutral (10%)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Key Narratives</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">Universal Coverage</span>
                            <span className="text-xs text-blue-600">48% of coverage</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Primarily covered by left-leaning outlets with emphasis on accessibility and equity.
                          </p>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">Cost Concerns</span>
                            <span className="text-xs text-red-600">32% of coverage</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Dominated by right-leaning outlets focusing on taxation and sustainability concerns.
                          </p>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">Implementation Challenges</span>
                            <span className="text-xs text-purple-600">20% of coverage</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Balanced coverage across outlet types examining practical challenges.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <span>Media-Politician Alignment on Healthcare Topic</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="ml-2 h-4 w-4 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>How closely media coverage aligns with politician statements on the topic of healthcare</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">National News Network</span>
                            <span className="text-sm text-green-600">82% alignment with Democratic statements</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-green-500" style={{ width: "82%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Freedom Press</span>
                            <span className="text-sm text-red-600">28% alignment with Democratic statements</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-red-500" style={{ width: "28%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Central Media Group</span>
                            <span className="text-sm text-yellow-600">65% alignment with Democratic statements</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500" style={{ width: "65%" }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="economy" className="text-center p-8">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Economy Topic Coverage Analysis</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Analysis of how media outlets cover economic topics and how their coverage aligns with politician stances on taxation, regulation, and market policy.
                  </p>
                </TabsContent>
                
                <TabsContent value="climate" className="text-center p-8">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Climate Policy Coverage</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Analysis of how different media outlets cover climate change policies and how their coverage aligns with politician stances on environmental regulations.
                  </p>
                </TabsContent>
                
                <TabsContent value="immigration" className="text-center p-8">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Immigration Policy Coverage</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Analysis of immigration topic coverage comparing media narratives against official policy statements from politicians.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Media Trends Tab */}
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Media Reporting Trends</CardTitle>
              <CardDescription>
                How media coverage and topic alignment has changed over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Topic-Media Alignment Trend (Last 6 Months)</h3>
                  <div className="h-64 bg-muted/30 rounded-lg p-4 flex items-end gap-2">
                    {[35, 42, 48, 45, 52, 57].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-blue-500/70 rounded-t-sm" style={{ height: `${height}%` }}></div>
                        <span className="text-xs mt-2">Mar</span>
                      </div>
                    ))}
                    {[42, 47, 53, 56, 58, 62].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-purple-500/70 rounded-t-sm" style={{ height: `${height}%` }}></div>
                        <span className="text-xs mt-2">Apr</span>
                      </div>
                    ))}
                    {[38, 35, 42, 48, 46, 45].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-red-500/70 rounded-t-sm" style={{ height: `${height}%` }}></div>
                        <span className="text-xs mt-2">May</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-4">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-blue-500/70 mr-2"></div>
                      <span>Left-leaning outlets</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-purple-500/70 mr-2"></div>
                      <span>Moderate outlets</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-red-500/70 mr-2"></div>
                      <span>Right-leaning outlets</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Topic Coverage Shifts</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Healthcare</span>
                          <span className="text-sm text-green-600">+18% coverage</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: "68%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Economy</span>
                          <span className="text-sm text-yellow-600">+4% coverage</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500" style={{ width: "54%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Immigration</span>
                          <span className="text-sm text-red-600">-8% coverage</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-red-500" style={{ width: "42%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Climate</span>
                          <span className="text-sm text-green-600">+12% coverage</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: "62%" }}></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Coverage shifts compared to previous 6-month period
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Topic-Politician Narrative Alignment</h3>
                    <div className="bg-muted/30 p-4 rounded-lg h-[180px] flex flex-col justify-center">
                      <div className="text-center space-y-4">
                        <div>
                          <span className="text-3xl font-bold text-primary">76%</span>
                          <p className="text-sm text-muted-foreground">
                            of media outlets have shifted their narrative framing on key topics compared to politician stances
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
                          <div className="bg-card p-2 rounded text-center">
                            <span className="block text-lg font-bold">+12%</span>
                            <span className="text-xs text-muted-foreground">Policy Focus</span>
                          </div>
                          <div className="bg-card p-2 rounded text-center">
                            <span className="block text-lg font-bold">-8%</span>
                            <span className="text-xs text-muted-foreground">Personality</span>
                          </div>
                          <div className="bg-card p-2 rounded text-center">
                            <span className="block text-lg font-bold">+15%</span>
                            <span className="text-xs text-muted-foreground">Analysis</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}