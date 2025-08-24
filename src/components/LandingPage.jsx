import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Rocket, 
  Users, 
  Briefcase, 
  Code, 
  Lightbulb, 
  Network, 
  ArrowRight, 
  Github, 
  Linkedin, 
  Twitter,
  Search,
  Filter,
  MapPin,
  Clock,
  Star,
  BookOpen,
  Trophy,
  Zap
} from 'lucide-react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Where <span className="text-blue-600">Nerdy</span> Meets
              <br />
              <span className="text-purple-600">Opportunity</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The ultimate collaboration hub for students and young innovators. 
              Connect, build, and launch your next big idea with like-minded creators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/community">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                  <Rocket className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
              </Link>
              <Link to="/community">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                  <Users className="mr-2 h-5 w-5" />
                  Join the Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building the future of collaboration, one connection at a time
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Lightbulb className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle>Innovation First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We believe every student has the potential to create something amazing. 
                  Our platform nurtures innovation and turns ideas into reality.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Network className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle>Connected Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Building meaningful connections between talented individuals who share 
                  a passion for technology and innovation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Rocket className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <CardTitle>Launch Together</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  From concept to deployment, we provide the tools and community 
                  support needed to bring your projects to life.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive platform that evolves with your journey
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Curated Opportunities</h3>
                  <p className="text-gray-600">
                    Access hand-picked internships, jobs, and project opportunities 
                    tailored for students and young professionals.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Building</h3>
                  <p className="text-gray-600">
                    Connect with like-minded individuals, form teams, and collaborate 
                    on exciting projects that matter.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Code className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Project Collaboration</h3>
                  <p className="text-gray-600">
                    Built-in tools for project management, code collaboration, 
                    and deployment to bring your ideas to life.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Building?</h3>
              <p className="mb-6 opacity-90">
                Join thousands of students and young innovators who are already 
                part of The Nerdy Network community.
              </p>
              <Link to="/jobs">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Network Hub Teaser */}
      <section id="network-hub" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800">Coming Soon</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Network Hub</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your personalized dashboard for opportunities, connections, and collaboration
            </p>
          </div>

          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Experience the Future of Networking</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Search className="h-5 w-5 text-blue-400" />
                    <span>Smart opportunity matching</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-purple-400" />
                    <span>Intelligent team formation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Trophy className="h-5 w-5 text-yellow-400" />
                    <span>Skill verification & badges</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-green-400" />
                    <span>Real-time collaboration tools</span>
                  </div>
                </div>
                <Link to="/hub">
                  <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                    Join the Waitlist
                  </Button>
                </Link>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Hub Preview</h4>
                  <Badge variant="outline" className="text-green-400 border-green-400">Live</Badge>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-700 rounded p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-sm">Frontend Developer Intern</span>
                    </div>
                    <Badge className="bg-blue-600">New</Badge>
                  </div>
                  <div className="bg-gray-700 rounded p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-sm">AI/ML Project Collaborator</span>
                    </div>
                    <Badge className="bg-purple-600">Match</Badge>
                  </div>
                  <div className="bg-gray-700 rounded p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm">Startup Co-founder</span>
                    </div>
                    <Badge className="bg-green-600">Hot</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring Preview Section */}
      <section id="hiring" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Opportunities Await</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover hand-curated opportunities from top companies and startups
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Job Card 1 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-100 text-blue-800">Internship</Badge>
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
                <CardTitle className="text-lg">Frontend Developer Intern</CardTitle>
                <CardDescription>TechCorp Inc.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>3 months</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  <Badge variant="outline" className="text-xs">React</Badge>
                  <Badge variant="outline" className="text-xs">TypeScript</Badge>
                  <Badge variant="outline" className="text-xs">Node.js</Badge>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  View Details
                </Button>
              </CardContent>
            </Card>

            {/* Job Card 2 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-purple-100 text-purple-800">Full-time</Badge>
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
                <CardTitle className="text-lg">AI/ML Engineer</CardTitle>
                <CardDescription>InnovateLab</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Remote</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Full-time</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  <Badge variant="outline" className="text-xs">Python</Badge>
                  <Badge variant="outline" className="text-xs">TensorFlow</Badge>
                  <Badge variant="outline" className="text-xs">PyTorch</Badge>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  View Details
                </Button>
              </CardContent>
            </Card>

            {/* Job Card 3 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-100 text-green-800">Project</Badge>
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
                <CardTitle className="text-lg">Mobile App Developer</CardTitle>
                <CardDescription>StartupXYZ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>New York, NY</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>6 months</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  <Badge variant="outline" className="text-xs">React Native</Badge>
                  <Badge variant="outline" className="text-xs">Flutter</Badge>
                  <Badge variant="outline" className="text-xs">Firebase</Badge>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/jobs">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                View All Opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Join The Network?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Be part of a community that's shaping the future of collaboration and innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/community">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
                <Users className="mr-2 h-5 w-5" />
                Join as Student
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
              <Briefcase className="mr-2 h-5 w-5" />
              Partner with Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage

