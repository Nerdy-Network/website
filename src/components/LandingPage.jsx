import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Lightbulb, Users, Rocket, ArrowRight, Briefcase, Code, Search, Trophy, Zap, MapPin, Clock, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="bg-background text-text font-sans">
      {/* Hero Section */}
      <section className="pt-32 pb-24 text-center bg-gradient-to-b from-white to-gray-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            Where <span className="text-primary">Nerdy</span> Meets <span className="text-accent">Opportunity</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            The ultimate collaboration hub for students and young innovators. Connect, build, and launch your next big idea with like-minded creators.
          </p>
          <div className="flex gap-4 justify-center items-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-3 rounded-full">
                Get Started
              </Button>
            </Link>
            <Link to="/community">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 rounded-full border-gray-medium hover:bg-gray-light">
                Join the Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Our Vision</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building the future of collaboration, one connection at a time
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center bg-white shadow-lg border-none rounded-2xl p-6">
              <CardHeader>
                <Lightbulb className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle className="text-2xl">Innovation First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We believe every student has the potential to create something amazing. Our platform nurtures innovation and turns ideas into reality.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg border-none rounded-2xl p-6">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-2xl">Connected Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Building meaningful connections between talented individuals who share a passion for technology and innovation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg border-none rounded-2xl p-6">
              <CardHeader>
                <Rocket className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <CardTitle className="text-2xl">Launch Together</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  From concept to deployment, we provide the tools and community support needed to bring your projects to life.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">What We Do</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive platform that evolves with your journey
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Curated Opportunities</h3>
                  <p className="text-gray-600">
                    Access hand-picked internships, jobs, and project opportunities tailored for students and young professionals.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Community Building</h3>
                  <p className="text-gray-600">
                    Connect with like-minded individuals, form teams, and collaborate on exciting projects that matter.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Project Collaboration</h3>
                  <p className="text-gray-600">
                    Built-in tools for project management, code collaboration, and deployment to bring your ideas to life.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Building?</h3>
              <p className="mb-6 opacity-90">
                Join thousands of students and young innovators who are already part of The Nerdy Network community.
              </p>
              <Link to="/dashboard">
                <Button className="bg-white text-primary hover:bg-gray-100">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring Preview Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Opportunities Await</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover hand-curated opportunities from top companies and startups
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Job Card 1 */}
            <Card className="bg-white shadow-lg border-none rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-100 text-blue-800">Internship</Badge>
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
                <CardTitle className="text-lg pt-2">Frontend Developer Intern</CardTitle>
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
                  <Badge variant="outline" className="text-xs border-gray-medium">React</Badge>
                  <Badge variant="outline" className="text-xs border-gray-medium">TypeScript</Badge>
                  <Badge variant="outline" className="text-xs border-gray-medium">Node.js</Badge>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  View Details
                </Button>
              </CardContent>
            </Card>

            {/* Job Card 2 */}
            <Card className="bg-white shadow-lg border-none rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-purple-100 text-purple-800">Full-time</Badge>
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
                <CardTitle className="text-lg pt-2">AI/ML Engineer</CardTitle>
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
                  <Badge variant="outline" className="text-xs border-gray-medium">Python</Badge>
                  <Badge variant="outline" className="text-xs border-gray-medium">TensorFlow</Badge>
                  <Badge variant="outline" className="text-xs border-gray-medium">PyTorch</Badge>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  View Details
                </Button>
              </CardContent>
            </Card>

            {/* Job Card 3 */}
            <Card className="bg-white shadow-lg border-none rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-100 text-green-800">Project</Badge>
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
                <CardTitle className="text-lg pt-2">Mobile App Developer</CardTitle>
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
                  <Badge variant="outline" className="text-xs border-gray-medium">React Native</Badge>
                  <Badge variant="outline" className="text-xs border-gray-medium">Flutter</Badge>
                  <Badge variant="outline" className="text-xs border-gray-medium">Firebase</Badge>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/jobs">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                View All Opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 bg-gray-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Join The Network?</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Be part of a community that's shaping the future of collaboration and innovation.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-10 py-4 rounded-full">
              Sign Up Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default LandingPage