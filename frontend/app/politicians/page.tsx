'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Award, 
  ChevronDown, 
  Filter, 
  Search, 
  SlidersHorizontal, 
  TrendingUp, 
  UserCircle2, 
  Clock, 
  RefreshCw,
  BarChart3,
  Map,
  MessageSquare
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

// Mock politician data
const politicians = [
  {
    id: 1,
    name: 'Jane Smith',
    position: 'Senator',
    party: 'Democratic',
    state: 'California',
    alignment: 78, // Overall alignment score based on all statements across topics
    trend: 'up',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    topics: [
      { name: 'Healthcare', stance: 92 },
      { name: 'Economy', stance: 76 },
      { name: 'Climate', stance: 89 }
    ],
    recentActivity: 'Healthcare bill speech (2 days ago)',
    mediaAlignments: [
      { outlet: 'National News Network', score: 82, topics: ['Healthcare', 'Climate'] },
      { outlet: 'West Coast Tribune', score: 75, topics: ['Healthcare', 'Economy'] },
      { outlet: 'Freedom Press', score: 43, topics: ['Economy'] }
    ]
  },
  {
    id: 2,
    name: 'Robert Johnson',
    position: 'Representative',
    party: 'Republican',
    state: 'Texas',
    alignment: 45,
    trend: 'down',
    imageUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    topics: [
      { name: 'Defense', stance: 87 },
      { name: 'Taxation', stance: 79 },
      { name: 'Immigration', stance: 92 }
    ],
    recentActivity: 'Border security press conference (1 day ago)',
    mediaAlignments: [
      { outlet: 'Freedom Press', score: 79, topics: ['Defense', 'Immigration'] },
      { outlet: 'Central Media Group', score: 52, topics: ['Taxation'] },
      { outlet: 'National News Network', score: 31, topics: ['Immigration'] }
    ]
  },
  {
    id: 3,
    name: 'Maria Garcia',
    position: 'Governor',
    party: 'Independent',
    state: 'New York',
    alignment: 62,
    trend: 'stable',
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    topics: [
      { name: 'Education', stance: 81 },
      { name: 'Housing', stance: 68 },
      { name: 'Infrastructure', stance: 75 }
    ],
    recentActivity: 'Education reform proposal (3 days ago)',
    mediaAlignments: [
      { outlet: 'Central Media Group', score: 68, topics: ['Education', 'Infrastructure'] },
      { outlet: 'National News Network', score: 59, topics: ['Education'] },
      { outlet: 'Freedom Press', score: 47, topics: ['Housing'] }
    ]
  },
  {
    id: 4,
    name: 'James Wilson',
    position: 'Senator',
    party: 'Democratic',
    state: 'Massachusetts',
    alignment: 71,
    trend: 'up',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    topics: [
      { name: 'Technology', stance: 78 },
      { name: 'Foreign Policy', stance: 69 },
      { name: 'Labor', stance: 85 }
    ],
    recentActivity: 'Tech regulation hearing (5 days ago)',
    mediaAlignments: [
      { outlet: 'National News Network', score: 76, topics: ['Labor', 'Technology'] },
      { outlet: 'Central Media Group', score: 65, topics: ['Technology'] },
      { outlet: 'Freedom Press', score: 41, topics: ['Foreign Policy'] }
    ]
  },
  {
    id: 5,
    name: 'Sarah Chen',
    position: 'Representative',
    party: 'Republican',
    state: 'Florida',
    alignment: 52,
    trend: 'stable',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    topics: [
      { name: 'Economy', stance: 67 },
      { name: 'Security', stance: 83 },
      { name: 'Healthcare', stance: 42 }
    ],
    recentActivity: 'Economic policy statement (1 day ago)',
    mediaAlignments: [
      { outlet: 'Freedom Press', score: 68, topics: ['Economy', 'Security'] },
      { outlet: 'Central Media Group', score: 54, topics: ['Economy'] },
      { outlet: 'National News Network', score: 43, topics: ['Healthcare'] }
    ]
  },
  {
    id: 6,
    name: 'Michael Thompson',
    position: 'Governor',
    party: 'Democratic',
    state: 'Illinois',
    alignment: 65,
    trend: 'up',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    topics: [
      { name: 'Environment', stance: 82 },
      { name: 'Transportation', stance: 71 },
      { name: 'Education', stance: 68 }
    ],
    recentActivity: 'Climate initiative launch (4 days ago)',
    mediaAlignments: [
      { outlet: 'National News Network', score: 71, topics: ['Environment', 'Education'] },
      { outlet: 'Central Media Group', score: 63, topics: ['Transportation'] },
      { outlet: 'Freedom Press', score: 39, topics: ['Environment'] }
    ]
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

// Helper function to determine party color
const getPartyColor = (party: string) => {
  if (party === 'Democratic') return 'text-blue-600';
  if (party === 'Republican') return 'text-red-600';
  return 'text-purple-600';
};

export default function PoliticiansPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParty, setSelectedParty] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [sortBy, setSortBy] = useState('alignment');
  const [viewType, setViewType] = useState('detailed');
  
  // Filter politicians based on search and filters
  const filteredPoliticians = politicians.filter(politician => {
    const matchesSearch = politician.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          politician.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          politician.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          politician.topics.some(topic => topic.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesParty = selectedParty === 'all' || politician.party === selectedParty;
    const matchesState = selectedState === 'all' || politician.state === selectedState;
    
    return matchesSearch && matchesParty && matchesState;
  });
  
  // Sort politicians based on selected sort
  const sortedPoliticians = [...filteredPoliticians].sort((a, b) => {
    if (sortBy === 'alignment') return b.alignment - a.alignment;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'party') return a.party.localeCompare(b.party);
    if (sortBy === 'state') return a.state.localeCompare(b.state);
    return 0;
  });
  
  // Get unique states for filter
  const states = Array.from(new Set(politicians.map(p => p.state)));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Politicians</h1>
        <p className="text-muted-foreground text-lg">
          Analyze how political statements align with topics and media coverage.
        </p>
      </div>
      
      {/* Search and Filter Section */}
      <div className="bg-card rounded-lg p-6 mb-8 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, position, or topics..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Party</label>
            <Select value={selectedParty} onValueChange={setSelectedParty}>
              <SelectTrigger>
                <SelectValue placeholder="All Parties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Parties</SelectItem>
                <SelectItem value="Democratic">Democratic</SelectItem>
                <SelectItem value="Republican">Republican</SelectItem>
                <SelectItem value="Independent">Independent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">State</label>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger>
                <SelectValue placeholder="All States" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {states.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
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
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="party">Party</SelectItem>
                <SelectItem value="state">State</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-muted-foreground">
            {filteredPoliticians.length} politicians found
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
      <Tabs defaultValue="list" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <UserCircle2 className="h-4 w-4" />
            List View
          </TabsTrigger>
          <TabsTrigger value="map" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            Map View
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>
        
        {/* List View Tab */}
        <TabsContent value="list" className="space-y-6">
          {viewType === 'detailed' ? (
            sortedPoliticians.map(politician => (
              <Card key={politician.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:flex md:w-1/4 p-6 flex-col justify-center items-center bg-muted/30">
                    <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4">
                      <img
                        src={politician.imageUrl}
                        alt={politician.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <p className={`text-lg font-bold ${getPartyColor(politician.party)}`}>
                        {politician.party}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {politician.position}, {politician.state}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{politician.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1 items-center">
                            {getTrendIcon(politician.trend)}
                            <span className="text-sm">{politician.trend === 'stable' ? 'Stable' : `Trending ${politician.trend}`}</span>
                          </div>
                          <Clock className="h-4 w-4 ml-2 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Updated 2h ago</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="mb-1 text-sm font-medium">Overall Alignment Score</div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center justify-center cursor-help">
                                <div className={`flex h-14 w-14 items-center justify-center rounded-full ${getAlignmentColor(politician.alignment)} text-white`}>
                                  <span className="text-xl font-bold">{politician.alignment}</span>
                                </div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs p-4">
                              <p>This is an aggregate score reflecting how closely this politician's statements align with their stances on various topics and how media outlets cover those topics.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Award className="h-4 w-4 mr-1" />
                          Topic Stances
                        </h4>
                        <div className="space-y-2">
                          {politician.topics.map((topic, i) => (
                            <div key={i} className="mb-2">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium">{topic.name}</span>
                                <span className={`text-xs font-medium ${topic.stance >= 70 ? 'text-green-600' : topic.stance >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                                  {topic.stance}% conviction
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
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Recent Activity
                        </h4>
                        <p className="text-sm text-muted-foreground">{politician.recentActivity}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Media Outlet Alignment</h4>
                        {politician.mediaAlignments.map((alignment, i) => (
                          <div key={i} className="mb-3 last:mb-0">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">{alignment.outlet}</span>
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
                    
                    <div className="mt-6 pt-4 border-t flex justify-end">
                      <Button variant="outline" size="sm" className="mr-2">Analyze Statements</Button>
                      <Button size="sm">Compare with Media</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedPoliticians.map(politician => (
                <Card key={politician.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                          <img
                            src={politician.imageUrl}
                            alt={politician.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-base">{politician.name}</CardTitle>
                          <CardDescription>
                            {politician.position}, {politician.state}
                          </CardDescription>
                        </div>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${getAlignmentColor(politician.alignment)} text-white cursor-help`}>
                              <span className="text-sm font-bold">{politician.alignment}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Overall alignment score across topics and media</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`rounded-full px-2 py-1 text-xs ${getPartyColor(politician.party)} bg-muted`}>
                        {politician.party}
                      </span>
                      {politician.topics.slice(0, 2).map((topic, i) => (
                        <span key={i} className="rounded-full bg-secondary px-2 py-1 text-xs">
                          {topic.name}
                        </span>
                      ))}
                      {politician.topics.length > 2 && (
                        <span className="rounded-full bg-secondary px-2 py-1 text-xs">
                          +{politician.topics.length - 2}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <span>Media alignment: </span>
                      {politician.mediaAlignments.slice(0, 1).map((alignment, i) => (
                        <span key={i} className={alignment.score >= 70 ? 'text-green-600' : alignment.score >= 50 ? 'text-yellow-600' : 'text-red-600'}>
                          {alignment.outlet} ({alignment.score})
                        </span>
                      ))}
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
        
        {/* Map View Tab */}
        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>
                View politicians by state and regional alignment with topics and media
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center bg-muted/30">
              <div className="text-center p-6">
                <Map className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">US Political Map</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Interactive map showing political stance by state, regional influence, and correlation between politician statements on topics and local media coverage of those topics.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Politician Alignment Analytics</CardTitle>
              <CardDescription>
                Insights on how politicians' stances align with topics and media coverage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Politician-Topic Alignment Distribution</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      How strongly politicians express their stances on various topics
                    </p>
                    <div className="h-48 flex items-end gap-2 mt-4">
                      <div className="flex-1 bg-red-500 h-[15%]" title="0-20 score"></div>
                      <div className="flex-1 bg-red-400 h-[25%]" title="20-40 score"></div>
                      <div className="flex-1 bg-yellow-500 h-[45%]" title="40-60 score"></div>
                      <div className="flex-1 bg-green-400 h-[70%]" title="60-80 score"></div>
                      <div className="flex-1 bg-green-500 h-[35%]" title="80-100 score"></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>0-20</span>
                      <span>20-40</span>
                      <span>40-60</span>
                      <span>60-80</span>
                      <span>80-100</span>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Party-Media Alignment</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      How closely media outlets align with each political party's stances
                    </p>
                    <div className="space-y-4 mt-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-blue-600">Democratic</span>
                          <span className="text-sm">71.3 avg.</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: "71.3%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-red-600">Republican</span>
                          <span className="text-sm">48.5 avg.</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-red-500" style={{ width: "48.5%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-purple-600">Independent</span>
                          <span className="text-sm">62.0 avg.</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500" style={{ width: "62%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Topic Coverage Correlation</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      How closely politician stances on topics align with media coverage
                    </p>
                    <div className="space-y-3">
                      {['Healthcare', 'Economy', 'Immigration', 'Climate', 'Education'].map((topic, i) => (
                        <div key={i}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">{topic}</span>
                            <span className="text-sm">{85 - i * 12}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary/80" 
                              style={{ width: `${85 - i * 12}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Alignment Trend Analysis</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      How politician-topic and politician-media alignment changes over time
                    </p>
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      <div className="bg-card p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-500">+4.2</div>
                        <div className="text-xs text-muted-foreground">Rising</div>
                      </div>
                      <div className="bg-card p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-yellow-500">0.8</div>
                        <div className="text-xs text-muted-foreground">Stable</div>
                      </div>
                      <div className="bg-card p-3 rounded-lg text-center">
                        <div className="text-2xl font-bold text-red-500">-3.5</div>
                        <div className="text-xs text-muted-foreground">Falling</div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Average alignment score change over the past 30 days
                    </p>
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