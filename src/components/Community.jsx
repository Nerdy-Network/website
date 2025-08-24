import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx'
import { 
  Users, 
  Search, 
  MapPin, 
  Calendar,
  Star,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  MessageCircle,
  Heart,
  Share2,
  BookOpen,
  Trophy,
  Zap,
  Code,
  Palette,
  Database,
  Smartphone,
  Globe,
  UserPlus,
  Filter,
  SortDesc
} from 'lucide-react'

// Mock community data
const mockMembers = [
  {
    id: 1,
    name: "Alex Chen",
    username: "alexchen",
    avatar: "/api/placeholder/64/64",
    location: "San Francisco, CA",
    skills: ["React", "Node.js", "Python"],
    bio: "Full-stack developer passionate about building scalable web applications",
    projects: 12,
    connections: 156,
    joinDate: "2023-01-15",
    verified: true,
    online: true
  },
  {
    id: 2,
    name: "Sarah Johnson",
    username: "sarahj",
    avatar: "/api/placeholder/64/64",
    location: "New York, NY",
    skills: ["UI/UX", "Figma", "React"],
    bio: "Product designer creating beautiful and intuitive user experiences",
    projects: 8,
    connections: 89,
    joinDate: "2023-03-22",
    verified: true,
    online: false
  },
  {
    id: 3,
    name: "Marcus Rodriguez",
    username: "marcusr",
    avatar: "/api/placeholder/64/64",
    location: "Austin, TX",
    skills: ["Python", "Machine Learning", "TensorFlow"],
    bio: "AI/ML engineer working on the future of intelligent systems",
    projects: 15,
    connections: 234,
    joinDate: "2022-11-08",
    verified: true,
    online: true
  },
  {
    id: 4,
    name: "Emily Wang",
    username: "emilyw",
    avatar: "/api/placeholder/64/64",
    location: "Seattle, WA",
    skills: ["Flutter", "Dart", "Firebase"],
    bio: "Mobile developer building cross-platform applications",
    projects: 6,
    connections: 67,
    joinDate: "2023-05-10",
    verified: false,
    online: true
  }
]

const mockProjects = [
  {
    id: 1,
    title: "EcoTracker",
    description: "A mobile app to track and reduce your carbon footprint with gamification elements",
    author: "Alex Chen",
    authorAvatar: "/api/placeholder/40/40",
    image: "/api/placeholder/300/200",
    tags: ["React Native", "Firebase", "Sustainability"],
    likes: 45,
    comments: 12,
    stars: 23,
    createdAt: "2024-01-15",
    featured: true
  },
  {
    id: 2,
    title: "StudyBuddy AI",
    description: "An AI-powered study companion that creates personalized learning paths",
    author: "Sarah Johnson",
    authorAvatar: "/api/placeholder/40/40",
    image: "/api/placeholder/300/200",
    tags: ["Python", "OpenAI", "Education"],
    likes: 67,
    comments: 18,
    stars: 34,
    createdAt: "2024-01-10",
    featured: true
  },
  {
    id: 3,
    title: "CodeCollab",
    description: "Real-time collaborative coding platform for remote teams",
    author: "Marcus Rodriguez",
    authorAvatar: "/api/placeholder/40/40",
    image: "/api/placeholder/300/200",
    tags: ["WebRTC", "Node.js", "Socket.io"],
    likes: 89,
    comments: 25,
    stars: 56,
    createdAt: "2024-01-08",
    featured: false
  },
  {
    id: 4,
    title: "HealthHub",
    description: "Comprehensive health tracking and wellness management platform",
    author: "Emily Wang",
    authorAvatar: "/api/placeholder/40/40",
    image: "/api/placeholder/300/200",
    tags: ["Flutter", "HealthKit", "Analytics"],
    likes: 32,
    comments: 8,
    stars: 19,
    createdAt: "2024-01-05",
    featured: false
  }
]

const Community = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSkill, setSelectedSkill] = useState('all')
  const [filteredMembers, setFilteredMembers] = useState(mockMembers)
  const [activeTab, setActiveTab] = useState('members')

  const skillCategories = [
    { label: 'All Skills', value: 'all', icon: Globe },
    { label: 'Frontend', value: 'frontend', icon: Code },
    { label: 'Backend', value: 'backend', icon: Database },
    { label: 'Mobile', value: 'mobile', icon: Smartphone },
    { label: 'Design', value: 'design', icon: Palette },
    { label: 'AI/ML', value: 'ai', icon: Zap }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Community</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with talented individuals, showcase your projects, and build meaningful relationships
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search members, projects, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">2,847</div>
              <div className="text-sm text-blue-800">Active Members</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">1,234</div>
              <div className="text-sm text-purple-800">Projects Shared</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">567</div>
              <div className="text-sm text-green-800">Collaborations</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">89</div>
              <div className="text-sm text-yellow-800">Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
          </TabsList>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            {/* Skill Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {skillCategories.map((category) => {
                const IconComponent = category.icon
                return (
                  <Button
                    key={category.value}
                    variant={selectedSkill === category.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSkill(category.value)}
                    className="flex items-center space-x-2"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{category.label}</span>
                  </Button>
                )
              })}
            </div>

            {/* Members Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockMembers.map((member) => (
                <Card key={member.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        {member.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <CardTitle className="text-lg">{member.name}</CardTitle>
                          {member.verified && (
                            <Badge className="bg-blue-100 text-blue-800">Verified</Badge>
                          )}
                        </div>
                        <CardDescription className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{member.location}</span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 text-sm">{member.bio}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {member.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                      <span>{member.projects} projects</span>
                      <span>{member.connections} connections</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">Community Projects</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <SortDesc className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {mockProjects.map((project) => (
                <Card key={project.id} className={`hover:shadow-lg transition-shadow ${project.featured ? 'ring-2 ring-blue-200' : ''}`}>
                  <div className="aspect-video bg-gray-200 rounded-t-lg relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    {project.featured && (
                      <Badge className="absolute top-2 right-2 bg-yellow-500">Featured</Badge>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Star className="h-4 w-4" />
                        <span>{project.stars}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={project.authorAvatar} alt={project.author} />
                        <AvatarFallback>{project.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">{project.author}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-400">{project.createdAt}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{project.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{project.comments}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Discussions Tab */}
          <TabsContent value="discussions" className="space-y-6">
            <div className="text-center py-12">
              <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Discussions</h3>
              <p className="text-gray-600 mb-6">
                Join conversations, ask questions, and share knowledge with the community
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Start a Discussion
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Community

