
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MessageSquare, Users, Heart, Settings, User, Calendar, Flame, ThumbsUp, MessageCircle, PlusCircle, Search, BrainCircuit } from 'lucide-react'

// Mock Data
const user = {
  name: 'Gilfoyle',
  avatar: 'https://github.com/shadcn.png',
  house: 'Gryffindor',
  bio: 'Senior Software Engineer @ Pied Piper. Building the future of the decentralized internet.',
  projects: [
    { id: 1, title: 'Decentralized Internet', description: 'Building a new internet from the ground up.', progress: 69, streak: 42, tags: ['React', 'Web3', 'Rust'], link: '#' },
    { id: 2, title: 'Anton (The AI)', description: 'A sophisticated AI for server management.', progress: 85, streak: 12, tags: ['Python', 'AI', 'ML'], link: '#' },
  ],
  streak: 42,
};

const feedProjects = [
  { id: 3, user: { name: 'Dinesh', avatar: 'https://github.com/shadcn.png' }, title: 'Pakistani Tea App', description: 'An app to find the best tea in Pakistan.', progress: 90, streak: 120, link: '#' },
  { id: 4, user: { name: 'Richard', avatar: 'https://github.com/shadcn.png' }, title: 'Pied Piper', description: 'A new compression algorithm that will change the world.', progress: 50, streak: 5, link: '#' },
];

const leaderboard = [
  { name: 'Gavin Belson', streak: 150 },
  { name: 'Peter Gregory', streak: 130 },
  { name: 'Laurie Bream', streak: 110 },
  { name: 'Ron LaFlamme', streak: 90 },
  { name: 'Jian-Yang', streak: 60 },
];

// Components
const Sidebar = ({ setActiveView }) => (
    <aside className="w-64 bg-black text-white p-6 flex flex-col justify-between rounded-r-2xl">
        <div>
            <div className="mb-12 flex items-center space-x-2">
                <BrainCircuit className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">The Nerdy Network</span>
            </div>
            <nav>
                <ul>
                    <li className="mb-3"><Button variant="ghost" onClick={() => setActiveView('dashboard')} className="w-full justify-start bg-gray-800 text-white rounded-lg">Dashboard</Button></li>
                    <li className="mb-3"><Button variant="ghost" onClick={() => setActiveView('profile')} className="w-full justify-start hover:bg-gray-800 hover:text-white rounded-lg"><User className="mr-2" /> User Profile</Button></li>
                    <li className="mb-3"><Button variant="ghost" className="w-full justify-start hover:bg-gray-800 hover:text-white rounded-lg"><MessageSquare className="mr-2" /> Messages</Button></li>
                    <li className="mb-3"><Button variant="ghost" className="w-full justify-start hover:bg-gray-800 hover:text-white rounded-lg"><Users className="mr-2" /> Matchmaking</Button></li>
                </ul>
            </nav>
        </div>
        <div>
            <Button variant="ghost" className="w-full justify-start hover:bg-gray-800 hover:text-white rounded-lg"><Settings className="mr-2" /> Settings</Button>
        </div>
    </aside>
);

const ProjectCard = ({ project }) => (
    <Card className="mb-4 bg-white border-none shadow-sm rounded-2xl">
        <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle className="text-text">{project.title}</CardTitle>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <PlusCircle className="h-5 w-5 text-gray-400 hover:text-primary" />
                </a>
            </div>
            <CardDescription className="text-gray-500">{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                    <Flame className="h-5 w-5 text-orange-500 mr-1" /> {project.streak} days
                </div>
                <div>{project.progress}% complete</div>
            </div>
            <div className="w-full bg-gray-light rounded-full h-2.5 mt-2">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
            </div>
            <div className="flex items-center justify-end mt-4">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-primary"><ThumbsUp className="h-4 w-4 mr-1" /> Like</Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-primary"><MessageCircle className="h-4 w-4 mr-1" /> Comment</Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-primary"><Heart className="h-4 w-4 mr-1" /> Collab</Button>
            </div>
        </CardContent>
    </Card>
);


const ProjectsFeed = () => (
  <div>
    <h2 className="text-3xl font-bold mb-6 text-text">Projects Feed</h2>
    {feedProjects.map(project => (
      <div key={project.id} className="flex items-start mb-6">
        <Avatar className="h-10 w-10 mr-4">
          <AvatarImage src={project.user.avatar} alt={project.user.name} />
          <AvatarFallback>{project.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="w-full">
          <ProjectCard project={project} />
        </div>
      </div>
    ))}
  </div>
);

const StreaksWidget = () => (
  <Card className="bg-white border-none shadow-sm rounded-2xl">
    <CardHeader>
      <CardTitle className="text-text">Your Streaks</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center mb-4">
        <Flame className="h-10 w-10 text-orange-500 mr-3" />
        <span className="text-3xl font-bold text-text">{user.streak} days</span>
      </div>
      <h3 className="font-bold mb-2 text-text">Leaderboard</h3>
      <ul>
        {leaderboard.map((person, index) => (
          <li key={index} className="flex justify-between text-gray-500 py-1">
            <span>{person.name}</span>
            <span>{person.streak} days</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const UserProfile = () => (
    <div className="text-text">
        <div className="flex items-center mb-10">
            <Avatar className="h-28 w-28 mr-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <h2 className="text-4xl font-bold">{user.name}</h2>
                <p className="text-gray-500 text-lg">{user.house} House</p>
                <p className="mt-2 max-w-xl">{user.bio}</p>
            </div>
        </div>

        <div>
            <h3 className="text-3xl font-bold mb-6">My Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.projects.map(project => (
                    <Card key={project.id} className="bg-white border-none shadow-sm rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-text">{project.title}</CardTitle>
                            <div className="text-sm text-gray-500 space-x-2 mt-2">
                                {project.tags.map(tag => <span key={tag} className="bg-gray-light px-3 py-1 rounded-full text-xs font-medium">{tag}</span>)}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">{project.description}</p>
                            <div className="mt-4">
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Progress</span>
                                    <span>{project.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-light rounded-full h-2.5 mt-1">
                                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

        <div className="mt-10">
            <h3 className="text-3xl font-bold mb-6">Streak Calendar</h3>
            <Card className="bg-white border-none shadow-sm rounded-2xl">
                <CardContent className="p-4">
                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: 35 }, (_, i) => {
                            const day = i - 5;
                            const active = day > 0 && day <= user.streak;
                            return (
                                <TooltipProvider key={i}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className={`w-12 h-12 rounded-lg ${active ? 'bg-green-500' : 'bg-gray-light'}`}></div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Day {day}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
);


const Dashboard = () => {
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard' or 'profile'

  return (
    <div className="flex h-screen bg-background text-text font-sans">
      <Sidebar setActiveView={setActiveView} />
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
            <div>
                <h1 className="text-4xl font-bold">Good morning, {user.name}</h1>
                <p className="text-gray-500 mt-2 text-lg">Ready to make some progress on your projects today?</p>
            </div>
            <div className="flex items-center space-x-6">
                <Search className="text-gray-500"/>
            </div>
        </header>

        {activeView === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ProjectsFeed />
            </div>
            <div>
              <StreaksWidget />
            </div>
          </div>
        )}
        {activeView === 'profile' && <UserProfile />}
      </main>
    </div>
  );
};

export default Dashboard;
