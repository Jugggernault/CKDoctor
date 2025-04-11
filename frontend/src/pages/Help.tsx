"use client"

import type React from "react"

import { useState } from "react"
import {
    Search,
    ChevronRight,
    Play,
    FileText,
    MessageSquare,
    LifeBuoy,
    AlertCircle,
    CheckCircle,
    Clock,
    Users,
    BookOpen,
    Video,
    ImageIcon,
    PlusCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import PageHeader from "@/components/PageHeader"
import { useToast } from "@/hooks/use-toast"

// Mock FAQ data
const faqCategories = [
    {
        id: "technical",
        name: "Technical Issues",
        icon: AlertCircle,
        questions: [
            {
                id: "tech-1",
                question: "How do I reset my password?",
                answer:
                    "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions sent to your email to create a new password.",
                hasVideo: false,
            },
            {
                id: "tech-2",
                question: "Why am I experiencing slow performance?",
                answer:
                    "Slow performance can be caused by several factors including internet connection issues, browser cache, or high server load. Try clearing your browser cache, checking your internet connection, or trying again later.",
                hasVideo: false,
            },
            {
                id: "tech-3",
                question: "How do I export my prediction data?",
                answer:
                    "You can export your prediction data from the Prediction History page. Click on the 'Export' button in the top right corner and select your preferred format (CSV, PDF, or Excel).",
                hasVideo: true,
                videoUrl: "#",
            },
            {
                id: "tech-4",
                question: "Can I use CKD Predictor on mobile devices?",
                answer:
                    "Yes, CKD Predictor is fully responsive and works on smartphones and tablets. Simply access the website from your mobile browser. We also have native apps available for iOS and Android.",
                hasVideo: false,
            },
        ],
    },
    {
        id: "clinical",
        name: "Clinical Guidelines",
        icon: FileText,
        questions: [
            {
                id: "clinical-1",
                question: "How accurate is the CKD stage prediction?",
                answer:
                    "Our model has been validated with a 94.2% accuracy rate when compared to clinical diagnoses. The prediction is based on multiple biomarkers and patient factors, following the latest KDIGO guidelines.",
                hasVideo: false,
            },
            {
                id: "clinical-2",
                question: "What clinical parameters are used in the prediction model?",
                answer:
                    "The model uses several parameters including serum creatinine, eGFR, urea, albumin, blood pressure, age, gender, and comorbidities such as diabetes and hypertension. The full list can be found in our methodology documentation.",
                hasVideo: false,
            },
            {
                id: "clinical-3",
                question: "How should I interpret the prediction results?",
                answer:
                    "The prediction results show the most likely CKD stage based on the input data, along with a probability distribution across all stages. This should be used as a clinical decision support tool, not as a definitive diagnosis.",
                hasVideo: true,
                videoUrl: "#",
            },
            {
                id: "clinical-4",
                question: "How often should predictions be updated for a patient?",
                answer:
                    "We recommend updating predictions whenever new lab results are available, or at least every 3-6 months for stable patients and more frequently for those with rapidly progressing disease or recent medication changes.",
                hasVideo: false,
            },
        ],
    },
    {
        id: "account",
        name: "Account Management",
        icon: Users,
        questions: [
            {
                id: "account-1",
                question: "How do I update my professional credentials?",
                answer:
                    "You can update your professional credentials in the Account Profile section. Go to your profile, click on 'Edit Profile', and update your credentials. You may need to provide verification documents.",
                hasVideo: true,
                videoUrl: "#",
            },
            {
                id: "account-2",
                question: "Can I have multiple users under one institution?",
                answer:
                    "Yes, we offer institutional accounts that allow multiple users under one billing account. Contact our sales team for more information on institutional licensing.",
                hasVideo: false,
            },
            {
                id: "account-3",
                question: "How do I cancel my subscription?",
                answer:
                    "To cancel your subscription, go to Account Settings > Billing > Manage Subscription. Follow the prompts to cancel. Note that you'll retain access until the end of your current billing period.",
                hasVideo: false,
            },
        ],
    },
    {
        id: "data",
        name: "Data Privacy & Security",
        icon: LifeBuoy,
        questions: [
            {
                id: "data-1",
                question: "Is patient data secure and HIPAA compliant?",
                answer:
                    "Yes, CKD Predictor is fully HIPAA compliant. All data is encrypted both in transit and at rest. We use industry-standard security measures and undergo regular security audits.",
                hasVideo: false,
            },
            {
                id: "data-2",
                question: "How long is patient data stored?",
                answer:
                    "Patient data is stored according to your institutional policies and applicable regulations. You can configure data retention periods in the Settings > Data Management section.",
                hasVideo: false,
            },
            {
                id: "data-3",
                question: "Can I anonymize patient data?",
                answer:
                    "Yes, there's an option to anonymize patient data for research purposes. This can be configured in Settings > Data Management > Anonymization Options.",
                hasVideo: true,
                videoUrl: "#",
            },
        ],
    },
]

// Mock support tickets
const supportTickets = [
    {
        id: "TICKET-1042",
        subject: "Unable to generate prediction",
        status: "open",
        priority: "high",
        created: "2025-04-08T14:32:00",
        lastUpdate: "2025-04-09T10:15:00",
    },
    {
        id: "TICKET-1036",
        subject: "Question about integration with Epic EHR",
        status: "in-progress",
        priority: "medium",
        created: "2025-04-05T09:18:00",
        lastUpdate: "2025-04-09T08:45:00",
    },
    {
        id: "TICKET-1028",
        subject: "Billing inquiry for institutional account",
        status: "resolved",
        priority: "low",
        created: "2025-04-01T11:24:00",
        lastUpdate: "2025-04-03T16:30:00",
    },
]

// Mock community discussions
const communityDiscussions = [
    {
        id: 1,
        title: "Best practices for monitoring Stage 3a patients",
        author: {
            name: "Dr. Sarah Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        replies: 12,
        views: 156,
        lastActivity: "2 hours ago",
    },
    {
        id: 2,
        title: "Using CKD Predictor in a rural healthcare setting",
        author: {
            name: "Dr. Michael Chen",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        replies: 8,
        views: 94,
        lastActivity: "1 day ago",
    },
    {
        id: 3,
        title: "Integrating prediction results with patient education",
        author: {
            name: "Dr. Emily Rodriguez",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        replies: 15,
        views: 210,
        lastActivity: "3 days ago",
    },
]

const Help = () => {
    const { toast } = useToast()
    const [searchQuery, setSearchQuery] = useState("")
    const [ticketSubject, setTicketSubject] = useState("")
    const [ticketDescription, setTicketDescription] = useState("")

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        toast({
            title: "Searching for help",
            description: `Finding results for "${searchQuery}"`,
        })
    }

    const handleSubmitTicket = (e: React.FormEvent) => {
        e.preventDefault()
        toast({
            title: "Support ticket submitted",
            description: "We'll respond to your inquiry as soon as possible",
        })
        setTicketSubject("")
        setTicketDescription("")
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "open":
                return "bg-blue-100 text-blue-800 border-blue-200"
            case "in-progress":
                return "bg-amber-100 text-amber-800 border-amber-200"
            case "resolved":
                return "bg-green-100 text-green-800 border-green-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high":
                return "bg-red-100 text-red-800 border-red-200"
            case "medium":
                return "bg-amber-100 text-amber-800 border-amber-200"
            case "low":
                return "bg-green-100 text-green-800 border-green-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    return (
        <div className="space-y-6">
            <PageHeader title="Help & Support" description="Find answers, get help, and connect with the community" />

            {/* Smart Search */}
            <Card className="bg-gradient-to-r from-ckd-light to-ckd-light/50">
                <CardContent className="pt-6">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold text-center mb-2">How can we help you today?</h2>
                        <p className="text-center text-gray-600 mb-6">Search our knowledge base, tutorials, and community forums</p>
                        <form onSubmit={handleSearch} className="relative">
                            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input
                                className="pl-10 h-12 bg-white"
                                placeholder="Search for answers, tutorials, or topics..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button type="submit" className="absolute right-1 top-1 h-10">
                                Search
                            </Button>
                        </form>
                        <div className="flex flex-wrap justify-center gap-2 mt-4">
                            <Badge variant="outline" className="bg-white cursor-pointer hover:bg-gray-50">
                                Password Reset
                            </Badge>
                            <Badge variant="outline" className="bg-white cursor-pointer hover:bg-gray-50">
                                Data Export
                            </Badge>
                            <Badge variant="outline" className="bg-white cursor-pointer hover:bg-gray-50">
                                Prediction Accuracy
                            </Badge>
                            <Badge variant="outline" className="bg-white cursor-pointer hover:bg-gray-50">
                                EHR Integration
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="faq" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="faq" className="flex items-center">
                        <BookOpen className="mr-2 h-4 w-4" />
                        FAQ & Guides
                    </TabsTrigger>
                    <TabsTrigger value="support" className="flex items-center">
                        <LifeBuoy className="mr-2 h-4 w-4" />
                        Support Tickets
                    </TabsTrigger>
                    <TabsTrigger value="community" className="flex items-center">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Community
                    </TabsTrigger>
                </TabsList>

                {/* FAQ Tab */}
                <TabsContent value="faq">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="md:col-span-1">
                            <div className="space-y-2 sticky top-20">
                                <h3 className="font-medium text-lg mb-3">Categories</h3>
                                {faqCategories.map((category) => (
                                    <Button
                                        key={category.id}
                                        variant="ghost"
                                        className="w-full justify-start"
                                        onClick={() => document.getElementById(category.id)?.scrollIntoView({ behavior: "smooth" })}
                                    >
                                        <category.icon className="mr-2 h-4 w-4" />
                                        {category.name}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-3 space-y-8">
                            {faqCategories.map((category) => (
                                <div key={category.id} id={category.id}>
                                    <h2 className="text-xl font-bold mb-4 flex items-center">
                                        <category.icon className="mr-2 h-5 w-5 text-ckd-primary" />
                                        {category.name}
                                    </h2>
                                    <Accordion type="single" collapsible className="w-full">
                                        {category.questions.map((question) => (
                                            <AccordionItem key={question.id} value={question.id}>
                                                <AccordionTrigger className="text-left">
                                                    <div className="flex items-start">
                                                        <ChevronRight className="h-5 w-5 mr-2 flex-shrink-0 transform transition-transform duration-200" />
                                                        <span>{question.question}</span>
                                                        {question.hasVideo && (
                                                            <Badge variant="outline" className="ml-2 bg-red-50 text-red-700 border-red-200">
                                                                <Video className="h-3 w-3 mr-1" /> Video
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="pl-7">
                                                    <p className="mb-4">{question.answer}</p>
                                                    {question.hasVideo && (
                                                        <div className="bg-gray-100 rounded-md p-4 flex items-center justify-center">
                                                            <Button variant="outline" className="flex items-center">
                                                                <Play className="mr-2 h-4 w-4" />
                                                                Watch Tutorial Video
                                                            </Button>
                                                        </div>
                                                    )}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            ))}
                        </div>
                    </div>
                </TabsContent>

                {/* Support Tickets Tab */}
                <TabsContent value="support">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Your Support Tickets</CardTitle>
                                    <CardDescription>Track and manage your support requests</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {supportTickets.length > 0 ? (
                                        <div className="space-y-4">
                                            {supportTickets.map((ticket) => (
                                                <div key={ticket.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                                                        <div className="flex items-center">
                                                            <span className="font-mono text-sm text-gray-500 mr-2">{ticket.id}</span>
                                                            <h4 className="font-medium">{ticket.subject}</h4>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Badge variant="outline" className={getStatusColor(ticket.status)}>
                                                                {ticket.status === "open" && <Clock className="h-3 w-3 mr-1" />}
                                                                {ticket.status === "in-progress" && <Clock className="h-3 w-3 mr-1" />}
                                                                {ticket.status === "resolved" && <CheckCircle className="h-3 w-3 mr-1" />}
                                                                {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1).replace("-", " ")}
                                                            </Badge>
                                                            <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                                                                {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                                        <span>Created: {new Date(ticket.created).toLocaleString()}</span>
                                                        <span>Last update: {new Date(ticket.lastUpdate).toLocaleString()}</span>
                                                    </div>
                                                    <div className="mt-3 flex justify-end">
                                                        <Button variant="ghost" size="sm">
                                                            View Details
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <LifeBuoy className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                                            <h3 className="text-lg font-medium mb-1">No support tickets</h3>
                                            <p className="text-gray-500 mb-4">You don't have any active support tickets</p>
                                        </div>
                                    )}
                                </CardContent>
                                <CardFooter className="flex justify-between border-t pt-4">
                                    <div className="text-sm text-gray-500">Showing {supportTickets.length} tickets</div>
                                    <Button variant="outline" size="sm">
                                        View All Tickets
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>

                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Submit a New Ticket</CardTitle>
                                    <CardDescription>Get help from our support team</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmitTicket} className="space-y-4">
                                        <div className="space-y-2">
                                            <label htmlFor="subject" className="text-sm font-medium">
                                                Subject
                                            </label>
                                            <Input
                                                id="subject"
                                                placeholder="Brief description of your issue"
                                                value={ticketSubject}
                                                onChange={(e) => setTicketSubject(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="description" className="text-sm font-medium">
                                                Description
                                            </label>
                                            <textarea
                                                id="description"
                                                className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="Please provide details about your issue"
                                                value={ticketDescription}
                                                onChange={(e) => setTicketDescription(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Priority</label>
                                            <div className="flex gap-4">
                                                <label className="flex items-center">
                                                    <input type="radio" name="priority" value="low" className="mr-2" defaultChecked />
                                                    Low
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="radio" name="priority" value="medium" className="mr-2" />
                                                    Medium
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="radio" name="priority" value="high" className="mr-2" />
                                                    High
                                                </label>
                                            </div>
                                        </div>
                                        <div className="pt-2">
                                            <Button type="submit" className="w-full">
                                                Submit Ticket
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>

                            <Card className="mt-6">
                                <CardHeader className="pb-3">
                                    <CardTitle>Support Status</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between mb-1 text-sm">
                                                <span>Average Response Time</span>
                                                <span className="font-medium">4 hours</span>
                                            </div>
                                            <Progress value={80} className="h-2" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-1 text-sm">
                                                <span>Support Team Availability</span>
                                                <span className="font-medium">Online</span>
                                            </div>
                                            <Progress value={100} className="h-2" />
                                        </div>
                                        <div className="pt-2">
                                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                <CheckCircle className="h-3 w-3 mr-1" /> All Systems Operational
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Community Tab */}
                <TabsContent value="community">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>Community Discussions</CardTitle>
                                        <CardDescription>Connect with other healthcare professionals</CardDescription>
                                    </div>
                                    <Button>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        New Discussion
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {communityDiscussions.map((discussion) => (
                                            <div key={discussion.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                                <div className="flex items-start gap-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                                                        <AvatarFallback>
                                                            {discussion.author.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <h4 className="font-medium mb-1">{discussion.title}</h4>
                                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                                                            <span>{discussion.author.name}</span>
                                                            <span>{discussion.replies} replies</span>
                                                            <span>{discussion.views} views</span>
                                                            <span>Last activity: {discussion.lastActivity}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between border-t pt-4">
                                    <div className="text-sm text-gray-500">Showing {communityDiscussions.length} of 24 discussions</div>
                                    <Button variant="outline" size="sm">
                                        View All Discussions
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>

                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Community Resources</CardTitle>
                                    <CardDescription>Helpful guides and tutorials</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-blue-100 p-2 rounded-md">
                                                    <Video className="h-5 w-5 text-blue-700" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-sm">Getting Started with CKD Predictor</h4>
                                                    <p className="text-xs text-gray-500">5 min video tutorial</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-green-100 p-2 rounded-md">
                                                    <FileText className="h-5 w-5 text-green-700" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-sm">Clinical Interpretation Guide</h4>
                                                    <p className="text-xs text-gray-500">PDF guide for healthcare professionals</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-amber-100 p-2 rounded-md">
                                                    <ImageIcon className="h-5 w-5 text-amber-700" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-sm">EHR Integration Walkthrough</h4>
                                                    <p className="text-xs text-gray-500">Step-by-step guide with screenshots</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="mt-6">
                                <CardHeader>
                                    <CardTitle>Community Stats</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">Active Members</span>
                                            <span className="font-medium">1,245</span>
                                        </div>
                                        <Separator />
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">Discussions</span>
                                            <span className="font-medium">3,872</span>
                                        </div>
                                        <Separator />
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">Knowledge Base Articles</span>
                                            <span className="font-medium">156</span>
                                        </div>
                                        <Separator />
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">Video Tutorials</span>
                                            <span className="font-medium">42</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Help
