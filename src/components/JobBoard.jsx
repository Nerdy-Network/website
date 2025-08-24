import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Star, 
  Bookmark, 
  BookmarkCheck,
  Building,
  DollarSign,
  Users,
  Calendar,
  ExternalLink,
  ChevronDown,
  SlidersHorizontal
} from 'lucide-react'

// Mock job data - in real app this would come from API endpoints
const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Internship",
    duration: "3 months",
    salary: "$25/hour",
    tags: ["React", "TypeScript", "Node.js"],
    description: "Join our dynamic frontend team and work on cutting-edge web applications...",
    posted: "2 days ago",
    applicants: 45,
    featured: true,
    remote: false
  },
  {
    id: 2,
    title: "AI/ML Engineer",
    company: "InnovateLab",
    location: "Remote",
    type: "Full-time",
    duration: "Permanent",
    salary: "$80k - $120k",
    tags: ["Python", "TensorFlow", "PyTorch"],
    description: "Work on groundbreaking AI projects that will shape the future...",
    posted: "1 week ago",
    applicants: 128,
    featured: true,
    remote: true
  },
  {
    id: 3,
    title: "Mobile App Developer",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Project",
    duration: "6 months",
    salary: "$60k - $80k",
    tags: ["React Native", "Flutter", "Firebase"],
    description: "Help us build the next generation mobile app for our growing startup...",
    posted: "3 days ago",
    applicants: 67,
    featured: false,
    remote: false
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "DataFlow Systems",
    location: "Austin, TX",
    type: "Full-time",
    duration: "Permanent",
    salary: "$70k - $100k",
    tags: ["Node.js", "PostgreSQL", "AWS"],
    description: "Build scalable backend systems for our enterprise clients...",
    posted: "5 days ago",
    applicants: 89,
    featured: false,
    remote: true
  },
  {
    id: 5,
    title: "UX/UI Designer Intern",
    company: "DesignStudio Pro",
    location: "Los Angeles, CA",
    type: "Internship",
    duration: "4 months",
    salary: "$20/hour",
    tags: ["Figma", "Adobe XD", "Prototyping"],
    description: "Create beautiful and intuitive user experiences for our clients...",
    posted: "1 day ago",
    applicants: 23,
    featured: false,
    remote: false
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Seattle, WA",
    type: "Full-time",
    duration: "Permanent",
    salary: "$90k - $130k",
    tags: ["Docker", "Kubernetes", "AWS"],
    description: "Manage and optimize our cloud infrastructure and deployment pipelines...",
    posted: "4 days ago",
    applicants: 156,
    featured: true,
    remote: true
  }
]

const JobBoard = () => {
  const [jobs, setJobs] = useState(mockJobs)
  const [filteredJobs, setFilteredJobs] = useState(mockJobs)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set())
  const [showFilters, setShowFilters] = useState(false)

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = jobs

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(job => job.type === selectedType)
    }

    // Location filter
    if (selectedLocation !== 'all') {
      if (selectedLocation === 'remote') {
        filtered = filtered.filter(job => job.remote)
      } else {
        filtered = filtered.filter(job => job.location.includes(selectedLocation))
      }
    }

    setFilteredJobs(filtered)
  }, [searchTerm, selectedType, selectedLocation, jobs])

  const toggleBookmark = (jobId) => {
    const newBookmarked = new Set(bookmarkedJobs)
    if (newBookmarked.has(jobId)) {
      newBookmarked.delete(jobId)
    } else {
      newBookmarked.add(jobId)
    }
    setBookmarkedJobs(newBookmarked)
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'Internship': return 'bg-blue-100 text-blue-800'
      case 'Full-time': return 'bg-purple-100 text-purple-800'
      case 'Project': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 pt-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Job Board</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover hand-curated opportunities from top companies and innovative startups
            </p>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="flex flex-wrap gap-4 justify-center p-4 bg-gray-50 rounded-lg">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Project">Project</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="San Francisco">San Francisco</SelectItem>
                    <SelectItem value="New York">New York</SelectItem>
                    <SelectItem value="Austin">Austin</SelectItem>
                    <SelectItem value="Seattle">Seattle</SelectItem>
                    <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'opportunity' : 'opportunities'} found
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Updated 2 hours ago</span>
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className={`hover:shadow-lg transition-shadow ${job.featured ? 'ring-2 ring-blue-200' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getTypeColor(job.type)}>{job.type}</Badge>
                      {job.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                      {job.remote && <Badge variant="outline">Remote</Badge>}
                    </div>
                    <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
                    <CardDescription className="flex items-center space-x-4 text-base">
                      <div className="flex items-center space-x-1">
                        <Building className="h-4 w-4" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleBookmark(job.id)}
                    className="text-gray-400 hover:text-blue-600"
                  >
                    {bookmarkedJobs.has(job.id) ? (
                      <BookmarkCheck className="h-5 w-5" />
                    ) : (
                      <Bookmark className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{job.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{job.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{job.applicants} applicants</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Posted {job.posted}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {filteredJobs.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Opportunities
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No opportunities found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find more opportunities.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('')
                setSelectedType('all')
                setSelectedLocation('all')
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default JobBoard
