import React, { useState, useEffect } from 'react'
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
  Smile,
  Loader2
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useHubProjects, useProjectChat, useProjectTasks } from '../hooks/useFirestore.js'
import { 
  createHubProject, 
  getProjectFiles, 
  updateFileContent, 
  createTask, 
  sendChatMessage 
} from '../services/api.js'

const HubFirebase = () => {
  const { currentUser } = useAuth()
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileContent, setFileContent] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [projectFiles, setProjectFiles] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch user's hub projects
  const { data: projects, loading: projectsLoading } = useHubProjects(currentUser?.uid)
  
  // Fetch chat messages for selected project
  const { messages } = useProjectChat(selectedProject?.id)
  
  // Fetch tasks for selected project
  const { tasks } = useProjectTasks(selectedProject?.id)

  // Load project files when a project is selected
  useEffect(() => {
    const loadProjectFiles = async () => {
      if (selectedProject) {
        try {
          setLoading(true)
          const files = await getProjectFiles(selectedProject.id)
          setProjectFiles(files)
        } catch (error) {
          console.error('Error loading project files:', error)
        } finally {
          setLoading(false)
        }
      }
    }
    loadProjectFiles()
  }, [selectedProject])

  // Handle creating a new project
  const handleCreateProject = async (projectData) => {
    try {
      const projectId = await createHubProject(projectData, currentUser.uid)
      console.log('Project created:', projectId)
    } catch (error) {
      console.error('Error creating project:', error)
    }
  }

  // Handle saving file content
  const handleSaveFile = async () => {
    if (selectedFile && selectedProject) {
      try {
        await updateFileContent(selectedProject.id, selectedFile.id, fileContent)
        console.log('File saved successfully')
      } catch (error) {
        console.error('Error saving file:', error)
      }
    }
  }

  // Handle sending chat message
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (newMessage.trim() && selectedProject && currentUser) {
      try {
        await sendChatMessage(selectedProject.id, newMessage, currentUser.uid)
        setNewMessage('')
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }
  }

  // Handle creating a new task
  const handleCreateTask = async (e) => {
    e.preventDefault()
    if (newTaskTitle.trim() && selectedProject) {
      try {
        await createTask(selectedProject.id, {
          title: newTaskTitle,
          status: 'todo',
          assigneeId: currentUser.uid
        })
        setNewTaskTitle('')
      } catch (error) {
        console.error('Error creating task:', error)
      }
    }
  }

  if (projectsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Network Hub</h1>
            {selectedProject && (
              <div className="flex items-center gap-2">
                <span className="text-gray-400">/</span>
                <span className="text-blue-400">{selectedProject.name}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Project
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-screen">
        {/* Sidebar - Project List */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Your Projects</h2>
            <Button 
              className="w-full" 
              variant="outline" 
              size="sm"
              onClick={() => handleCreateProject({ name: 'New Project' })}
            >
              <Plus className="h-4 w-4 mr-1" />
              Create Project
            </Button>
          </div>
          
          <div className="space-y-2">
            {projects.map((project) => (
              <Card 
                key={project.id} 
                className={`cursor-pointer transition-colors ${
                  selectedProject?.id === project.id 
                    ? 'bg-blue-600 border-blue-500' 
                    : 'bg-gray-700 hover:bg-gray-600 border-gray-600'
                }`}
                onClick={() => setSelectedProject(project)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4" />
                    <span className="font-medium truncate">{project.name}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Updated {new Date(project.createdAt?.toDate()).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {selectedProject ? (
            <>
              {/* Code Editor Area */}
              <div className="flex-1 flex flex-col">
                {/* File Tabs */}
                <div className="bg-gray-800 border-b border-gray-700 px-4 py-2">
                  <div className="flex items-center gap-2">
                    {projectFiles.slice(0, 5).map((file) => (
                      <Button
                        key={file.id}
                        variant={selectedFile?.id === file.id ? "default" : "ghost"}
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          setSelectedFile(file)
                          setFileContent(file.content || '')
                        }}
                      >
                        {file.name}
                        <X className="h-3 w-3 ml-1" />
                      </Button>
                    ))}
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Code Editor */}
                <div className="flex-1 p-4">
                  {selectedFile ? (
                    <div className="h-full">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">{selectedFile.name}</h3>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={handleSaveFile}>
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button size="sm" variant="outline">
                            <Play className="h-4 w-4 mr-1" />
                            Run
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        value={fileContent}
                        onChange={(e) => setFileContent(e.target.value)}
                        className="h-96 font-mono text-sm bg-gray-900 border-gray-600"
                        placeholder="Start coding..."
                      />
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <Code2 className="h-12 w-12 mx-auto mb-4" />
                        <p>Select a file to start editing</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Terminal */}
                <div className="h-48 bg-black border-t border-gray-700 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="h-4 w-4" />
                    <span className="text-sm font-semibold">Terminal</span>
                  </div>
                  <div className="font-mono text-sm text-green-400">
                    <div>$ npm start</div>
                    <div>Starting development server...</div>
                    <div className="text-blue-400">Local: http://localhost:3000</div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Chat & Tasks */}
              <div className="w-80 bg-gray-800 border-l border-gray-700">
                <Tabs defaultValue="chat" className="h-full">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-700">
                    <TabsTrigger value="chat" className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      Chat
                    </TabsTrigger>
                    <TabsTrigger value="tasks" className="flex items-center gap-1">
                      <CheckSquare className="h-4 w-4" />
                      Tasks
                    </TabsTrigger>
                  </TabsList>

                  {/* Chat Tab */}
                  <TabsContent value="chat" className="flex flex-col h-full p-0">
                    <div className="flex-1 p-4 overflow-y-auto">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div key={message.id} className="flex gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {message.authorId?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-xs text-gray-400">
                                {message.authorId} • {new Date(message.createdAt?.toDate()).toLocaleTimeString()}
                              </div>
                              <div className="text-sm">{message.content}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
                      <div className="flex gap-2">
                        <Input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="bg-gray-700 border-gray-600"
                        />
                        <Button type="submit" size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </TabsContent>

                  {/* Tasks Tab */}
                  <TabsContent value="tasks" className="flex flex-col h-full p-0">
                    <div className="flex-1 p-4 overflow-y-auto">
                      <div className="space-y-2">
                        {tasks.map((task) => (
                          <Card key={task.id} className="bg-gray-700 border-gray-600">
                            <CardContent className="p-3">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="font-medium text-sm">{task.title}</div>
                                  <div className="text-xs text-gray-400 mt-1">
                                    {task.status}
                                  </div>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {task.status}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                    <form onSubmit={handleCreateTask} className="p-4 border-t border-gray-700">
                      <div className="flex gap-2">
                        <Input
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          placeholder="Add a task..."
                          className="bg-gray-700 border-gray-600"
                        />
                        <Button type="submit" size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          ) : (
            /* No Project Selected */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <Rocket className="h-16 w-16 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Welcome to Network Hub</h2>
                <p className="mb-6">Select a project from the sidebar or create a new one to get started</p>
                <Button onClick={() => handleCreateProject({ name: 'My First Project' })}>
                  <Plus className="h-4 w-4 mr-1" />
                  Create Your First Project
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HubFirebase
