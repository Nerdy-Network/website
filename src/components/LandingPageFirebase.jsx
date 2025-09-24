import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Lightbulb, Users, Rocket, ArrowRight, Briefcase, Code, Search, Trophy, Zap, MapPin, Clock, Star, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { getStats, submitContactForm, subscribeToNewsletter } from '../services/api.js'

const LandingPageFirebase = () => {
  const { currentUser } = useAuth()
  const [stats, setStats] = useState({ members: 0, projects: 0, collaborations: 0, countries: 0 })
  const [loading, setLoading] = useState(true)
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Load platform stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        const platformStats = await getStats()
        setStats(platformStats)
      } catch (error) {
        console.error('Error loading stats:', error)
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault()
    if (!contactForm.name || !contactForm.email || !contactForm.message) return
    
    try {
      setSubmitting(true)
      await submitContactForm(contactForm)
      setContactForm({ name: '', email: '', message: '' })
      alert('Message sent successfully!')
    } catch (error) {
      console.error('Error submitting contact form:', error)
      alert('Error sending message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // Handle newsletter subscription
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    if (!newsletterEmail) return
    
    try {
      setSubmitting(true)
      await subscribeToNewsletter(newsletterEmail)
      setNewsletterEmail('')
      alert('Successfully subscribed to newsletter!')
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
      alert('Error subscribing. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-background text-text font-sans">
      {/* Hero Section */}
      <section className="pt-32 pb-24 text-center bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            Where <span className="text-blue-600">Nerdy</span> Meets <span className="text-purple-600">Opportunity</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            The ultimate collaboration hub for students and young innovators. Connect, build, and launch your next big idea with like-minded creators.
          </p>
          <div className="flex gap-4 justify-center items-center">
            {currentUser ? (
              <Link to="/hub">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-full">
                  Go to Hub
                </Button>
              </Link>
            ) : (
              <Link to="/dashboard">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-full">
                  Get Started
                </Button>
              </Link>
            )}
            <Link to="/community">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 rounded-full border-gray-400 hover:bg-gray-50">
                Join the Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Join a Growing Community</h2>
            <p className="text-xl text-gray-600">Real numbers from real creators making real impact</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stats.members.toLocaleString()}</div>
                <div className="text-gray-600">Active Members</div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-4xl font-bold text-purple-600 mb-2">{stats.projects.toLocaleString()}</div>
                <div className="text-gray-600">Projects Built</div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-4xl font-bold text-green-600 mb-2">{stats.collaborations.toLocaleString()}</div>
                <div className="text-gray-600">Collaborations</div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-4xl font-bold text-orange-600 mb-2">{stats.countries}</div>
                <div className="text-gray-600">Countries</div>
              </div>
            </div>
          )}
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
                  We believe every student has the potential to create something amazing. Our platform provides the tools and community to turn ideas into reality.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg border-none rounded-2xl p-6">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-2xl">Community Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Connect with like-minded creators, share knowledge, and build lasting relationships that extend beyond individual projects.
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
                  From concept to deployment, we provide the infrastructure and support needed to bring your projects to life and share them with the world.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From community connections to professional opportunities, we've built a complete ecosystem for your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/community" className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 group-hover:scale-105 bg-white border-none rounded-2xl">
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <CardTitle className="text-xl">Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Connect with talented creators and showcase your projects to a supportive community
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/ecosystem" className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 group-hover:scale-105 bg-white border-none rounded-2xl">
                <CardHeader className="text-center">
                  <Trophy className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <CardTitle className="text-xl">Ecosystem</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Discover opportunities, complete quests, and earn rewards through our AI-powered platform
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/hub" className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 group-hover:scale-105 bg-white border-none rounded-2xl">
                <CardHeader className="text-center">
                  <Code className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <CardTitle className="text-xl">Hub</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Collaborate in real-time with built-in IDE, project management, and deployment tools
                  </p>
                </CardContent>
              </Card>
            </Link>

            <div className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 group-hover:scale-105 bg-white border-none rounded-2xl">
                <CardHeader className="text-center">
                  <Zap className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <CardTitle className="text-xl">AI-Powered</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Smart recommendations and serendipitous connections powered by advanced AI algorithms
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">
              Have questions or want to learn more? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white shadow-lg border-none rounded-2xl p-8">
              <CardHeader>
                <CardTitle className="text-2xl mb-4">Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    required
                  />
                  <Textarea
                    placeholder="Your Message"
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    required
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={submitting}
                  >
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg border-none rounded-2xl p-8">
              <CardHeader>
                <CardTitle className="text-2xl mb-4">Stay Updated</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6">
                  Get the latest updates on new features, community highlights, and opportunities delivered to your inbox.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-white text-blue-600 hover:bg-gray-100"
                    disabled={submitting}
                  >
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Subscribe to Newsletter
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Build Something Amazing?</h2>
          <p className="text-xl mb-10 text-blue-100">
            Join thousands of creators who are already building the future together
          </p>
          <div className="flex gap-4 justify-center">
            {currentUser ? (
              <Link to="/hub">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-full">
                  Go to Your Hub
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/dashboard">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-full">
                  Start Building Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPageFirebase
