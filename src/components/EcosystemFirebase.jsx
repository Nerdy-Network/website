import React, { useState, useEffect } from 'react'
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
  Plus,
  Loader2
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useBounties } from '../hooks/useFirestore.js'
import { getBounties, getQuests, getBadges, createBounty } from '../services/api.js'

const EcosystemFirebase = () => {
  const { currentUser } = useAuth()
  const [quests, setQuests] = useState([])
  const [badges, setBadges] = useState([])
  const [userBadges, setUserBadges] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Fetch bounties with filters
  const bountyFilters = {
    ...(selectedDifficulty !== 'all' && { difficulty: selectedDifficulty }),
    ...(selectedCategory !== 'all' && { category: selectedCategory }),
    limit: 20
  }
  const { data: bounties, loading: bountiesLoading } = useBounties(bountyFilters)

  // Load quests and badges
  useEffect(() => {
    const loadData = async () => {
      try {
        const [questsData, badgesData] = await Promise.all([
          getQuests(currentUser?.uid),
          getBadges()
        ])
        setQuests(questsData)
        setBadges(badgesData)
      } catch (error) {
        console.error('Error loading ecosystem data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [currentUser])

  // Mock opportunity feed data (would be personalized based on user profile)
  const opportunityFeed = [
    {
      id: 1,
      type: 'bounty_match',
      title: 'Perfect Match: React Component Library',
      matchScore: 95,
      description: 'Based on your React and TypeScript skills',
      reward: '$500',
      difficulty: 'Intermediate',
      postedAt: '2 hours ago',
      tags: ['React', 'TypeScript', 'UI/UX']
    },
    {
      id: 2,
      type: 'collaboration',
      title: 'Join AI Startup Team',
      matchScore: 88,
      description: 'Looking for frontend developers',
      reward: 'Equity + Salary',
      difficulty: 'Advanced',
      postedAt: '5 hours ago',
      tags: ['AI', 'Frontend', 'Startup']
    },
    {
      id: 3,
      type: 'quest_suggestion',
      title: 'Complete "API Master" Quest',
      matchScore: 92,
      description: 'Build 3 REST APIs to earn the API Master badge',
      reward: '500 XP + Badge',
      difficulty: 'Intermediate',
      postedAt: '1 day ago',
      tags: ['API', 'Backend', 'Node.js']
    }
  ]

  const difficultyOptions = ['all', 'Beginner', 'Intermediate', 'Advanced', 'Expert']
  const categoryOptions = ['all', 'Frontend', 'Backend', 'Mobile', 'AI/ML', 'Design', 'DevOps']

  if (loading || bountiesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              The <span className="text-yellow-300">Serendipity</span> Engine
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Discover opportunities, complete quests, earn rewards, and let AI connect you with your next big break
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300">{bounties.length}</div>
              <div className="text-purple-100">Active Bounties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300">{quests.length}</div>
              <div className="text-purple-100">Available Quests</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300">{badges.length}</div>
              <div className="text-purple-100">Badges to Earn</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-300">$50k+</div>
              <div className="text-purple-100">Total Rewards</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="feed" className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-8">
              <TabsTrigger value="feed" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Feed
              </TabsTrigger>
              <TabsTrigger value="bounties" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Bounties
              </TabsTrigger>
              <TabsTrigger value="quests" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Quests
              </TabsTrigger>
              <TabsTrigger value="badges" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Badges
              </TabsTrigger>
            </TabsList>

            {/* Opportunity Feed */}
            <TabsContent value="feed">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Your Personalized Feed</h2>
                <p className="text-gray-600 mb-6">AI-curated opportunities based on your skills and interests</p>
              </div>

              <div className="space-y-6">
                {opportunityFeed.map((opportunity) => (
                  <Card key={opportunity.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-green-100 text-green-800">
                              {opportunity.matchScore}% Match
                            </Badge>
                            <Badge variant="outline">{opportunity.type.replace('_', ' ')}</Badge>
                          </div>
                          <CardTitle className="text-xl mb-2">{opportunity.title}</CardTitle>
                          <CardDescription>{opportunity.description}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">{opportunity.reward}</div>
                          <div className="text-sm text-gray-500">{opportunity.postedAt}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {opportunity.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{opportunity.difficulty}</Badge>
                        <Button>
                          <ArrowRight className="h-4 w-4 mr-1" />
                          Take Action
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Bounties */}
            <TabsContent value="bounties">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-bold">Active Bounties</h2>
                  <Button>
                    <Plus className="h-4 w-4 mr-1" />
                    Post Bounty
                  </Button>
                </div>
                <p className="text-gray-600 mb-6">Earn rewards by completing challenges and projects</p>

                {/* Filters */}
                <div className="flex gap-4 mb-6">
                  <div className="flex gap-2">
                    <span className="text-sm font-medium">Difficulty:</span>
                    {difficultyOptions.map(difficulty => (
                      <Badge
                        key={difficulty}
                        variant={selectedDifficulty === difficulty ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedDifficulty(difficulty)}
                      >
                        {difficulty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bounties.map((bounty) => (
                  <Card key={bounty.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{bounty.title}</CardTitle>
                          <CardDescription className="line-clamp-2">
                            {bounty.description}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600">${bounty.reward}</div>
                          <Badge variant="secondary" className="text-xs">{bounty.difficulty}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {bounty.tags?.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {bounty.deadline}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {bounty.applicants || 0} applied
                        </span>
                      </div>

                      <Button className="w-full">
                        Apply for Bounty
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Quests */}
            <TabsContent value="quests">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Available Quests</h2>
                <p className="text-gray-600 mb-6">Complete challenges to level up your skills and earn badges</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quests.map((quest) => (
                  <Card key={quest.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Target className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{quest.title}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{quest.category}</Badge>
                            <Badge variant="secondary">{quest.difficulty}</Badge>
                          </div>
                        </div>
                      </div>
                      <CardDescription>{quest.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{quest.progress || 0}%</span>
                        </div>
                        <Progress value={quest.progress || 0} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {quest.xp} XP
                        </span>
                        <span className="flex items-center gap-1">
                          <Trophy className="h-4 w-4" />
                          {quest.badge}
                        </span>
                      </div>

                      <Button className="w-full" variant={quest.progress > 0 ? "default" : "outline"}>
                        {quest.progress > 0 ? "Continue Quest" : "Start Quest"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Badges */}
            <TabsContent value="badges">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Achievement Badges</h2>
                <p className="text-gray-600 mb-6">Showcase your skills and accomplishments</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {badges.map((badge) => (
                  <Card key={badge.id} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mx-auto mb-4">
                        <div className={`p-4 rounded-full ${badge.earned ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                          <Trophy className={`h-8 w-8 ${badge.earned ? 'text-yellow-600' : 'text-gray-400'}`} />
                        </div>
                      </div>
                      <CardTitle className="text-lg">{badge.name}</CardTitle>
                      <CardDescription>{badge.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-gray-500 mb-4">
                        {badge.earned ? 'Earned!' : `${badge.progress || 0}% Complete`}
                      </div>
                      {!badge.earned && (
                        <Progress value={badge.progress || 0} className="h-2 mb-4" />
                      )}
                      <Badge variant={badge.earned ? "default" : "outline"} className="text-xs">
                        {badge.category}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}

export default EcosystemFirebase
