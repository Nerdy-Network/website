import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  Code2, 
  Terminal, 
  MessageSquare, 
  CheckSquare,
  Rocket,
  Users,
  FolderOpen,
  Play,
  Settings,
  Share2,
  Download,
  Upload,
  GitBranch,
  Save,
  RefreshCw,
  Zap,
  Cloud,
  Monitor,
  Smartphone,
  Globe,
  Database,
  Server,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Plus,
  X,
  Maximize2,
  Minimize2,
  MoreHorizontal,
  Clock,
  Calendar,
  Star,
  Heart,
  Send,
  Paperclip,
  Smile
} from 'lucide-react'

// Mock data for the Hub
const mockProjects = [
  {
    id: 1,
    name: 'EcoTracker Mobile App',
    description: 'Sustainability tracking app with gamification',
    status: 'active',
    progress: 75,
    members: [
      { id: 1, name: 'Alex Chen', avatar: '/api/placeholder/32/32', role: 'Lead Developer' },
      { id: 2, name: 'Sarah Johnson', avatar: '/api/placeholder/32/32', role: 'UI/UX Designer' },
      { id: 3, name: 'Marcus Rodriguez', avatar: '/api/placeholder/32/32', role: 'Backend Developer' }
    ],
    tech: ['React Native', 'Node.js', 'MongoDB'],
    lastActivity: '2 hours ago',
    dueDate: '2024-02-15',
    tasks: { completed: 18, total: 24 }
  },
  {
    id: 2,
    name: 'AI Study Assistant',
    description: 'Personalized learning platform with AI recommendations',
    status: 'planning',
    progress: 25,
    members: [
      { id: 4, name: 'Emily Wang', avatar: '/api/placeholder/32/32', role: 'AI Engineer' },
      { id: 1, name: 'Alex Chen', avatar: '/api/placeholder/32/32', role: 'Frontend Developer' }
    ],
    tech: ['Python', 'TensorFlow', 'React'],
    lastActivity: '1 day ago',
    dueDate: '2024-03-01',
    tasks: { completed: 3, total: 12 }
  }
]

const mockMessages = [
  {
    id: 1,
    user: 'Alex Chen',
    avatar: '/api/placeholder/32/32',
    message: 'Just pushed the latest changes to the authentication module. Ready for testing!',
    timestamp: '10:30 AM',
    type: 'message'
  },
  {
    id: 2,
    user: 'Sarah Johnson',
    avatar: '/api/placeholder/32/32',
    message: 'Great work! The new UI components look amazing. 🎨',
    timestamp: '10:32 AM',
    type: 'message'
  },
  {
    id: 3,
    user: 'System',
    avatar: null,
    message: 'Marcus Rodriguez deployed to staging environment',
    timestamp: '10:35 AM',
    type: 'system'
  }
]

const mockTasks = [
  {
    id: 1,
    title: 'Implement user authentication',
    assignee: 'Alex Chen',
    status: 'completed',
    priority: 'high',
    dueDate: '2024-01-20'
  },
  {
    id: 2,
    title: 'Design onboarding flow',
    assignee: 'Sarah Johnson',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2024-01-25'
  },
  {
    id: 3,
    title: 'Set up CI/CD pipeline',
    assignee: 'Marcus Rodriguez',
    status: 'todo',
    priority: 'high',
    dueDate: '2024-01-30'
  }
]

const Hub = () => {
  const [activeProject, setActiveProject] = useState(mockProjects[0])
  const [activeTab, setActiveTab] = useState('overview')
  const [codeContent, setCodeContent] = useState(`// Welcome to The Nerdy Network Hub IDE
import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <h1>Hello, Nerdy Network!</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default App;`)
  const [newMessage, setNewMessage] = useState('')

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'planning': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-purple-100 text-purple-800'
      case 'on-hold': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTaskStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'todo': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Network Hub</h1>
              <p className="text-gray-600">Your ultimate collaboration workspace</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Rocket className="h-4 w-4 mr-2" />
                Deploy
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Projects */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Projects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockProjects.map((project) => (
                  <div
                    key={project.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      activeProject.id === project.id 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveProject(project)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-sm">{project.name}</h3>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex -space-x-1">
                        {project.members.slice(0, 3).map((member) => (
                          <Avatar key={member.id} className="h-6 w-6 border-2 border-white">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="text-xs">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        {project.members.length} members
                      </span>
                    </div>
                    <Progress value={project.progress} className="h-1" />
                    <div className="text-xs text-gray-500 mt-1">
                      {project.progress}% complete
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="deploy">Deploy</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{activeProject.name}</CardTitle>
                        <CardDescription>{activeProject.description}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(activeProject.status)}>
                        {activeProject.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h3 className="font-semibold mb-3">Progress</h3>
                        <Progress value={activeProject.progress} className="h-3 mb-2" />
                        <p className="text-sm text-gray-600">{activeProject.progress}% complete</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-3">Team</h3>
                        <div className="space-y-2">
                          {activeProject.members.map((member) => (
                            <div key={member.id} className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback className="text-xs">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="text-sm font-medium">{member.name}</div>
                                <div className="text-xs text-gray-500">{member.role}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-3">Tech Stack</h3>
                        <div className="flex flex-wrap gap-1">
                          {activeProject.tech.map((tech, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div className="text-sm">
                            <span className="font-medium">Alex Chen</span> pushed new commits
                            <div className="text-gray-500">2 hours ago</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div className="text-sm">
                            <span className="font-medium">Sarah Johnson</span> updated designs
                            <div className="text-gray-500">4 hours ago</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <div className="text-sm">
                            <span className="font-medium">Marcus Rodriguez</span> deployed to staging
                            <div className="text-gray-500">1 day ago</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Tasks Completed</span>
                          <span className="font-semibold">{activeProject.tasks.completed}/{activeProject.tasks.total}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Due Date</span>
                          <span className="font-semibold">{activeProject.dueDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Last Activity</span>
                          <span className="font-semibold">{activeProject.lastActivity}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Code Tab */}
              <TabsContent value="code" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">In-Browser IDE</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4 mr-2" />
                          Run
                        </Button>
                        <Button size="sm" variant="outline">
                          <GitBranch className="h-4 w-4 mr-2" />
                          Commit
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                      <div className="flex items-center justify-between mb-4 text-gray-400">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="text-xs">src/App.js</div>
                      </div>
                      <Textarea
                        value={codeContent}
                        onChange={(e) => setCodeContent(e.target.value)}
                        className="bg-transparent border-none text-green-400 font-mono text-sm resize-none min-h-[400px] focus:ring-0"
                        placeholder="Start coding..."
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">File Explorer</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <FolderOpen className="h-4 w-4" />
                          <span>src/</span>
                        </div>
                        <div className="flex items-center space-x-2 ml-4 text-blue-600">
                          <Code2 className="h-4 w-4" />
                          <span>App.js</span>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Code2 className="h-4 w-4" />
                          <span>index.js</span>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Code2 className="h-4 w-4" />
                          <span>components/</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <FolderOpen className="h-4 w-4" />
                          <span>public/</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Terminal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-black rounded p-3 font-mono text-sm text-green-400">
                        <div>$ npm start</div>
                        <div className="text-gray-500">Starting development server...</div>
                        <div className="text-green-400">✓ Server running on http://localhost:3000</div>
                        <div className="flex items-center">
                          <span>$ </span>
                          <div className="w-2 h-4 bg-green-400 ml-1 animate-pulse"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Tasks Tab */}
              <TabsContent value="tasks" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Task Board</CardTitle>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Task
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockTasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <CheckSquare className="h-5 w-5 text-gray-400" />
                            <div>
                              <div className="font-medium">{task.title}</div>
                              <div className="text-sm text-gray-500">
                                Assigned to {task.assignee} • Due {task.dueDate}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority}
                            </Badge>
                            <Badge className={getTaskStatusColor(task.status)}>
                              {task.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Chat Tab */}
              <TabsContent value="chat" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Team Chat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                      {mockMessages.map((message) => (
                        <div key={message.id} className="flex items-start space-x-3">
                          {message.avatar ? (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={message.avatar} alt={message.user} />
                              <AvatarFallback className="text-xs">
                                {message.user.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <Settings className="h-4 w-4 text-gray-500" />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm">{message.user}</span>
                              <span className="text-xs text-gray-500">{message.timestamp}</span>
                            </div>
                            <div className={`text-sm ${message.type === 'system' ? 'text-gray-600 italic' : 'text-gray-900'}`}>
                              {message.message}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1"
                      />
                      <Button size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Deploy Tab */}
              <TabsContent value="deploy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">One-Click Deploy</CardTitle>
                    <CardDescription>
                      Deploy your project to production with a single click
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                        <Cloud className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">Vercel</h3>
                        <p className="text-sm text-gray-600 mb-4">Deploy to Vercel's global CDN</p>
                        <Button size="sm" className="w-full">Deploy</Button>
                      </Card>
                      
                      <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                        <Server className="h-12 w-12 text-orange-500 mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">Netlify</h3>
                        <p className="text-sm text-gray-600 mb-4">Deploy to Netlify's platform</p>
                        <Button size="sm" className="w-full">Deploy</Button>
                      </Card>
                      
                      <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                        <Database className="h-12 w-12 text-green-500 mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">Railway</h3>
                        <p className="text-sm text-gray-600 mb-4">Deploy full-stack applications</p>
                        <Button size="sm" className="w-full">Deploy</Button>
                      </Card>
                    </div>

                    <div className="mt-8">
                      <h3 className="font-semibold mb-4">Deployment History</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div>
                              <div className="font-medium">Production Deploy</div>
                              <div className="text-sm text-gray-500">v1.2.3 • 2 hours ago</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-800">Live</Badge>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <div>
                              <div className="font-medium">Staging Deploy</div>
                              <div className="text-sm text-gray-500">v1.2.2 • 1 day ago</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-blue-100 text-blue-800">Staging</Badge>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hub

