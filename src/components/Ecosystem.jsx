import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx'
import { 
  Zap, 
  Trophy, 
  Target, 
  Star,
  Gift,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Flame,
  Award,
  BookOpen,
  Code,
  Palette,
  Database,
  Smartphone,
  Globe,
  Brain,
  Rocket,
  Heart,
  MessageSquare,
  Share2,
  Play,
  Briefcase,
  MapPin,
  Plus
} from 'lucide-react'

// Mock ecosystem data
const mockOpportunityFeed = [
  {
    id: 1,
    type: 'job_match',
    title: 'Perfect Match: Senior React Developer',
    company: 'TechFlow Inc.',
    matchScore: 95,
    description: 'Based on your React and TypeScript skills',
    salary: '$90k - $120k',
    location: 'Remote',
    postedAt: '2 hours ago',
    urgent: true
  },
  {
    id: 2,
    type: 'bounty',
    title: 'Build a Chrome Extension for Productivity',
    reward: '$500',
    difficulty: 'Intermediate',
    description: 'Create a Chrome extension that helps users track their daily habits',
    skills: ['JavaScript', 'Chrome APIs', 'HTML/CSS'],
    deadline: '7 days',
    applicants: 12
  },
  {
    id: 3,
    type: 'collaboration',
    title: 'Looking for UI/UX Designer for Startup',
    author: 'Alex Chen',
    description: 'Building the next generation of productivity tools',
    equity: '0.5% - 2%',
    commitment: 'Part-time',
    postedAt: '1 day ago'
  },
  {
    id: 4,
    type: 'quest',
    title: 'Complete 30-Day Coding Challenge',
    progress: 60,
    reward: 'Advanced Coder Badge',
    description: 'Solve one coding problem every day for 30 days',
    daysLeft: 12,
    participants: 234
  }
]

const mockBounties = [
  {
    id: 1,
    title: 'Build a Real-time Chat Application',
    description: 'Create a scalable chat app with WebSocket support and user authentication',
    reward: '$1,200',
    difficulty: 'Advanced',
    skills: ['Node.js', 'Socket.io', 'React', 'MongoDB'],
    deadline: '14 days',
    applicants: 28,
    featured: true,
    postedBy: 'StartupXYZ',
    category: 'Full-stack Development'
  },
  {
    id: 2,
    title: 'Design a Mobile App UI/UX',
    description: 'Create a complete design system for a fitness tracking mobile application',
    reward: '$800',
    difficulty: 'Intermediate',
    skills: ['Figma', 'UI/UX', 'Mobile Design', 'Prototyping'],
    deadline: '10 days',
    applicants: 15,
    featured: false,
    postedBy: 'FitTech Solutions',
    category: 'Design'
  },
  {
    id: 3,
    title: 'Implement Machine Learning Model',
    description: 'Build and train a recommendation system for e-commerce platform',
    reward: '$2,000',
    difficulty: 'Expert',
    skills: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn'],
    deadline: '21 days',
    applicants: 8,
    featured: true,
    postedBy: 'DataCorp',
    category: 'AI/ML'
  }
]

const mockBadges = [
  {
    id: 1,
    name: 'React Master',
    description: 'Completed 10+ React projects',
    icon: '⚛️',
    rarity: 'Epic',
    progress: 100,
    earned: true,
    earnedDate: '2024-01-15'
  },
  {
    id: 2,
    name: 'Open Source Contributor',
    description: 'Made 50+ contributions to open source projects',
    icon: '🌟',
    rarity: 'Legendary',
    progress: 100,
    earned: true,
    earnedDate: '2024-01-10'
  },
  {
    id: 3,
    name: 'Team Player',
    description: 'Successfully completed 5 collaborative projects',
    icon: '🤝',
    rarity: 'Rare',
    progress: 80,
    earned: false,
    earnedDate: null
  },
  {
    id: 4,
    name: 'Problem Solver',
    description: 'Solved 100 coding challenges',
    icon: '🧩',
    rarity: 'Common',
    progress: 65,
    earned: false,
    earnedDate: null
  }
]

const Ecosystem = () => {
  const [activeTab, setActiveTab] = useState('feed')

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Common': return 'bg-gray-100 text-gray-800'
      case 'Rare': return 'bg-blue-100 text-blue-800'
      case 'Epic': return 'bg-purple-100 text-purple-800'
      case 'Legendary': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-orange-100 text-orange-800'
      case 'Expert': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">The Serendipity Engine</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Your personalized opportunity feed powered by AI. Discover bounties, quests, and collaborations tailored just for you.
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold">1,247</div>
              <div className="text-sm opacity-80">Active Bounties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">$2.4M</div>
              <div className="text-sm opacity-80">Total Rewards</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">89%</div>
              <div className="text-sm opacity-80">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">156</div>
              <div className="text-sm opacity-80">Your Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="feed">Opportunity Feed</TabsTrigger>
            <TabsTrigger value="bounties">Bounties</TabsTrigger>
            <TabsTrigger value="quests">Quests & Badges</TabsTrigger>
            <TabsTrigger value="reverse">Reverse Board</TabsTrigger>
          </TabsList>

          {/* Opportunity Feed Tab */}
          <TabsContent value="feed" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">Personalized for You</h2>
              <Badge className="bg-green-100 text-green-800">
                <Zap className="h-3 w-3 mr-1" />
                AI Powered
              </Badge>
            </div>

            <div className="space-y-4">
              {mockOpportunityFeed.map((item) => (
                <Card key={item.id} className={`hover:shadow-lg transition-shadow ${item.urgent ? 'ring-2 ring-orange-200' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {item.type === 'job_match' && <Briefcase className="h-5 w-5 text-blue-600" />}
                        {item.type === 'bounty' && <Gift className="h-5 w-5 text-purple-600" />}
                        {item.type === 'collaboration' && <Users className="h-5 w-5 text-green-600" />}
                        {item.type === 'quest' && <Trophy className="h-5 w-5 text-yellow-600" />}
                        <div>
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          {item.company && <CardDescription>{item.company}</CardDescription>}
                          {item.author && <CardDescription>by {item.author}</CardDescription>}
                        </div>
                      </div>
                      {item.urgent && <Badge className="bg-orange-100 text-orange-800">Urgent</Badge>}
                      {item.matchScore && (
                        <Badge className="bg-green-100 text-green-800">
                          {item.matchScore}% Match
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                      {item.salary && (
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{item.salary}</span>
                        </div>
                      )}
                      {item.reward && (
                        <div className="flex items-center space-x-1">
                          <Gift className="h-4 w-4" />
                          <span>{item.reward}</span>
                        </div>
                      )}
                      {item.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{item.location}</span>
                        </div>
                      )}
                      {item.deadline && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{item.deadline} left</span>
                        </div>
                      )}
                    </div>

                    {item.skills && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {item.progress && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{item.progress}%</span>
                        </div>
                        <Progress value={item.progress} className="h-2" />
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        {item.postedAt && `Posted ${item.postedAt}`}
                        {item.applicants && `${item.applicants} applicants`}
                        {item.participants && `${item.participants} participants`}
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bounties Tab */}
          <TabsContent value="bounties" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">Active Bounties</h2>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Post Bounty
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {mockBounties.map((bounty) => (
                <Card key={bounty.id} className={`hover:shadow-lg transition-shadow ${bounty.featured ? 'ring-2 ring-purple-200' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className={getDifficultyColor(bounty.difficulty)}>
                        {bounty.difficulty}
                      </Badge>
                      {bounty.featured && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{bounty.title}</CardTitle>
                    <CardDescription>
                      {bounty.category} • by {bounty.postedBy}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{bounty.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {bounty.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <div className="text-2xl font-bold text-green-600">{bounty.reward}</div>
                      <div className="text-right text-sm text-gray-500">
                        <div>{bounty.deadline} left</div>
                        <div>{bounty.applicants} applicants</div>
                      </div>
                    </div>

                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Apply for Bounty
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Quests & Badges Tab */}
          <TabsContent value="quests" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Badges Section */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Badges</h2>
                <div className="grid grid-cols-2 gap-4">
                  {mockBadges.map((badge) => (
                    <Card key={badge.id} className={`text-center p-4 ${badge.earned ? 'bg-gradient-to-br from-yellow-50 to-orange-50' : 'bg-gray-50'}`}>
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <h3 className="font-semibold mb-1">{badge.name}</h3>
                      <Badge className={`mb-2 ${getRarityColor(badge.rarity)}`}>
                        {badge.rarity}
                      </Badge>
                      <p className="text-xs text-gray-600 mb-3">{badge.description}</p>
                      
                      {badge.earned ? (
                        <div className="flex items-center justify-center space-x-1 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Earned</span>
                        </div>
                      ) : (
                        <div>
                          <Progress value={badge.progress} className="h-2 mb-2" />
                          <span className="text-xs text-gray-500">{badge.progress}% complete</span>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>

              {/* Active Quests Section */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Active Quests</h2>
                <div className="space-y-4">
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">30-Day Coding Challenge</h3>
                      <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Solve one coding problem every day for 30 days
                    </p>
                    <Progress value={60} className="h-2 mb-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>18/30 days completed</span>
                      <span>12 days left</span>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Open Source Contributor</h3>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Make 10 meaningful contributions to open source projects
                    </p>
                    <Progress value={30} className="h-2 mb-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>3/10 contributions</span>
                      <span>No deadline</span>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Reverse Board Tab */}
          <TabsContent value="reverse" className="space-y-6">
            <div className="text-center py-12">
              <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Reverse Job Board</h3>
              <p className="text-gray-600 mb-6">
                Let companies find you! Create your talent profile and let opportunities come to you.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Create Talent Profile
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Ecosystem

