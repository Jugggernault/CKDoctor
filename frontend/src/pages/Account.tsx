"use client"

import type React from "react"

import { useState } from "react"
import {
    User,
    Shield,
    Key,
    LogOut,
    Clock,
    AlertTriangle,
    Check,
    Camera,
    Upload,
    Smartphone,
    Laptop,
    Globe,
    Lock,
    FileText,
    Eye,
    EyeOff,
    RefreshCw,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import PageHeader from "@/components/PageHeader"
import { useToast } from "@/hooks/use-toast"

// Mock user data
const userData = {
    name: "Dr. Michael Smith",
    title: "Nephrologist",
    email: "dr.smith@hospital.org",
    phone: "+1 (555) 123-4567",
    organization: "Central Hospital",
    address: "123 Medical Center Blvd, New York, NY 10001",
    avatar: "/placeholder.svg?height=128&width=128",
    lastLogin: "April 10, 2025 at 8:43 PM",
    accountCreated: "January 15, 2024",
    twoFactorEnabled: true,
    sessions: [
        {
            id: 1,
            device: "Chrome on Windows",
            ip: "192.168.1.1",
            location: "New York, USA",
            lastActive: "Current session",
            isCurrent: true,
        },
        {
            id: 2,
            device: "Safari on iPhone",
            ip: "192.168.1.2",
            location: "New York, USA",
            lastActive: "2 hours ago",
            isCurrent: false,
        },
        {
            id: 3,
            device: "Firefox on MacOS",
            ip: "192.168.1.3",
            location: "Boston, USA",
            lastActive: "Yesterday at 3:45 PM",
            isCurrent: false,
        },
    ],
    activity: [
        {
            id: 1,
            action: "Prediction created",
            details: "Created prediction for Patient #234-567",
            timestamp: "Today at 10:23 AM",
        },
        {
            id: 2,
            action: "Prediction viewed",
            details: "Viewed prediction results for Patient #234-568",
            timestamp: "Yesterday at 2:45 PM",
        },
        {
            id: 3,
            action: "Account settings updated",
            details: "Changed notification preferences",
            timestamp: "April 8, 2025 at 11:30 AM",
        },
        {
            id: 4,
            action: "Password changed",
            details: "Successfully changed account password",
            timestamp: "April 5, 2025 at 9:15 AM",
        },
        {
            id: 5,
            action: "Logged in",
            details: "Successful login from Chrome on Windows",
            timestamp: "April 5, 2025 at 9:10 AM",
        },
    ],
}

const Account = () => {
    const { toast } = useToast()
    const [firstName, setFirstName] = useState("Michael")
    const [lastName, setLastName] = useState("Smith")
    const [email, setEmail] = useState(userData.email)
    const [title, setTitle] = useState(userData.title)
    const [organization, setOrganization] = useState(userData.organization)
    const [phone, setPhone] = useState(userData.phone)
    const [address, setAddress] = useState(userData.address)
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [dataSharing, setDataSharing] = useState(true)
    const [anonymousUsage, setAnonymousUsage] = useState(true)
    const [marketingEmails, setMarketingEmails] = useState(false)

    const handleSaveProfile = () => {
        toast({
            title: "Profile updated",
            description: "Your profile information has been updated successfully",
        })
    }

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault()
        if (newPassword !== confirmPassword) {
            toast({
                title: "Passwords don't match",
                description: "New password and confirmation must match",
                variant: "destructive",
            })
            return
        }

        toast({
            title: "Password changed",
            description: "Your password has been updated successfully",
        })
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
    }

    const handleAvatarUpload = () => {
        toast({
            title: "Avatar upload",
            description: "This would open a file picker in a real implementation",
        })
    }

    const handleEnableTwoFactor = () => {
        toast({
            title: "Two-factor authentication",
            description: "Setup wizard would appear here in a real implementation",
        })
    }

    const handleTerminateSession = (id: number) => {
        toast({
            title: "Session terminated",
            description: `Session #${id} has been terminated successfully`,
        })
    }

    const handleSavePrivacy = () => {
        toast({
            title: "Privacy settings saved",
            description: "Your privacy preferences have been updated",
        })
    }

    return (
        <div className="space-y-6">
            <PageHeader title="Account Profile" description="Manage your personal information and account settings" />

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center">
                        <Shield className="mr-2 h-4 w-4" />
                        Security
                    </TabsTrigger>
                    <TabsTrigger value="activity" className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        Activity
                    </TabsTrigger>
                    <TabsTrigger value="privacy" className="flex items-center">
                        <Lock className="mr-2 h-4 w-4" />
                        Privacy
                    </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>Update your personal and professional details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <div className="flex">
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="flex-grow"
                                        />
                                        <Button variant="outline" className="ml-2">
                                            Verify
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="title">Professional Title</Label>
                                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="organization">Organization/Hospital</Label>
                                    <Input id="organization" value={organization} onChange={(e) => setOrganization(e.target.value)} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="specialty">Medical Specialty</Label>
                                        <Select defaultValue="nephrology">
                                            <SelectTrigger id="specialty">
                                                <SelectValue placeholder="Select specialty" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="nephrology">Nephrology</SelectItem>
                                                <SelectItem value="cardiology">Cardiology</SelectItem>
                                                <SelectItem value="endocrinology">Endocrinology</SelectItem>
                                                <SelectItem value="internal">Internal Medicine</SelectItem>
                                                <SelectItem value="family">Family Medicine</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio">Professional Bio</Label>
                                    <textarea
                                        id="bio"
                                        className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Tell us about your professional background and interests"
                                        defaultValue="Board-certified nephrologist with 15 years of experience specializing in chronic kidney disease management and prevention."
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between border-t pt-6">
                                <Button variant="outline">Cancel</Button>
                                <Button onClick={handleSaveProfile}>Save Changes</Button>
                            </CardFooter>
                        </Card>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile Picture</CardTitle>
                                    <CardDescription>Update your profile photo</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center">
                                    <Avatar className="h-32 w-32 mb-4">
                                        <AvatarImage src={userData.avatar} alt={userData.name} />
                                        <AvatarFallback>MS</AvatarFallback>
                                    </Avatar>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={handleAvatarUpload}>
                                            <Upload className="mr-2 h-4 w-4" />
                                            Upload
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={handleAvatarUpload}>
                                            <Camera className="mr-2 h-4 w-4" />
                                            Take Photo
                                        </Button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-4 text-center">
                                        Recommended: Square image, at least 300x300px
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Account Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                            <span className="text-sm text-gray-500">Member Since</span>
                                        </div>
                                        <span className="text-sm font-medium">{userData.accountCreated}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <Shield className="h-4 w-4 mr-2 text-gray-500" />
                                            <span className="text-sm text-gray-500">Account Type</span>
                                        </div>
                                        <Badge>Professional</Badge>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <Globe className="h-4 w-4 mr-2 text-gray-500" />
                                            <span className="text-sm text-gray-500">Language</span>
                                        </div>
                                        <span className="text-sm font-medium">English (US)</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <FileText className="h-4 w-4 mr-2 text-gray-500" />
                                            <span className="text-sm text-gray-500">License Verified</span>
                                        </div>
                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                            <Check className="h-3 w-3 mr-1" /> Verified
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Change Password</CardTitle>
                                <CardDescription>Update your account password</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleChangePassword} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="current-password">Current Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="current-password"
                                                type={showCurrentPassword ? "text" : "password"}
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                required
                                                className="pr-10"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-0 top-0 h-full"
                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            >
                                                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="new-password">New Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="new-password"
                                                type={showNewPassword ? "text" : "password"}
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                required
                                                className="pr-10"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-0 top-0 h-full"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                            >
                                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </Button>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            Password must be at least 8 characters with uppercase, lowercase, number, and special character
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="confirm-password"
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                                className="pr-10"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-0 top-0 h-full"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </Button>
                                        </div>
                                    </div>

                                    <Button type="submit" className="mt-2">
                                        Change Password
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Two-Factor Authentication</CardTitle>
                                    <CardDescription>Add an extra layer of security</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Two-Factor Authentication</p>
                                            <p className="text-sm text-gray-500">
                                                {userData.twoFactorEnabled
                                                    ? "Currently enabled for your account"
                                                    : "Not enabled for your account"}
                                            </p>
                                        </div>
                                        <Switch checked={userData.twoFactorEnabled} />
                                    </div>

                                    {userData.twoFactorEnabled ? (
                                        <Button variant="outline" className="w-full" onClick={handleEnableTwoFactor}>
                                            <RefreshCw className="mr-2 h-4 w-4" />
                                            Reconfigure 2FA
                                        </Button>
                                    ) : (
                                        <Button className="w-full" onClick={handleEnableTwoFactor}>
                                            <Shield className="mr-2 h-4 w-4" />
                                            Enable 2FA
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Account Security</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                            <span className="text-sm text-gray-500">Last Login</span>
                                        </div>
                                        <span className="text-sm font-medium">{userData.lastLogin}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <Key className="h-4 w-4 mr-2 text-gray-500" />
                                            <span className="text-sm text-gray-500">Password Last Changed</span>
                                        </div>
                                        <span className="text-sm font-medium">March 15, 2025</span>
                                    </div>
                                    <Separator />
                                    <Button variant="outline" className="w-full">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Sign Out All Devices
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Active Sessions</CardTitle>
                            <CardDescription>Manage your active login sessions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {userData.sessions.map((session) => (
                                    <div key={session.id} className="flex items-center justify-between border rounded-lg p-4">
                                        <div className="flex items-start gap-4">
                                            {session.device.includes("Chrome") && <Laptop className="h-8 w-8 text-gray-500" />}
                                            {session.device.includes("Safari") && <Smartphone className="h-8 w-8 text-gray-500" />}
                                            {session.device.includes("Firefox") && <Laptop className="h-8 w-8 text-gray-500" />}
                                            <div>
                                                <p className="font-medium">{session.device}</p>
                                                <div className="text-sm text-gray-500 space-y-1">
                                                    <p>
                                                        IP: {session.ip} • {session.location}
                                                    </p>
                                                    <p>Last active: {session.lastActive}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {session.isCurrent && (
                                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                    Current
                                                </Badge>
                                            )}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleTerminateSession(session.id)}
                                                disabled={session.isCurrent}
                                            >
                                                {session.isCurrent ? "Active" : "Terminate"}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Activity Tab */}
                <TabsContent value="activity">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Activity</CardTitle>
                            <CardDescription>Recent actions and events on your account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {userData.activity.map((activity, index) => (
                                    <div key={activity.id} className="relative pl-6">
                                        {index < userData.activity.length - 1 && (
                                            <div className="absolute top-2 left-[9px] bottom-[-30px] w-[2px] bg-gray-200"></div>
                                        )}
                                        <div className="absolute top-2 left-0 w-[18px] h-[18px] rounded-full bg-ckd-light border-2 border-ckd-primary"></div>
                                        <div>
                                            <h4 className="font-medium">{activity.action}</h4>
                                            <p className="text-sm text-gray-500">{activity.details}</p>
                                            <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-6">
                            <div className="text-sm text-gray-500">Showing recent activity only</div>
                            <Button variant="outline" size="sm">
                                View Full History
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Privacy Tab */}
                <TabsContent value="privacy">
                    <Card>
                        <CardHeader>
                            <CardTitle>Privacy Settings</CardTitle>
                            <CardDescription>Control how your data is used and shared</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Data Sharing</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="data-sharing" className="font-medium">
                                                Data Sharing for Research
                                            </Label>
                                            <p className="text-sm text-gray-500">
                                                Allow anonymized data to be used for clinical research and model improvement
                                            </p>
                                        </div>
                                        <Switch id="data-sharing" checked={dataSharing} onCheckedChange={setDataSharing} />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="anonymous-usage" className="font-medium">
                                                Anonymous Usage Statistics
                                            </Label>
                                            <p className="text-sm text-gray-500">
                                                Share anonymous usage data to help improve the application
                                            </p>
                                        </div>
                                        <Switch id="anonymous-usage" checked={anonymousUsage} onCheckedChange={setAnonymousUsage} />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="marketing-emails" className="font-medium">
                                                Marketing Communications
                                            </Label>
                                            <p className="text-sm text-gray-500">Receive emails about new features, updates, and offers</p>
                                        </div>
                                        <Switch id="marketing-emails" checked={marketingEmails} onCheckedChange={setMarketingEmails} />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Data Visibility</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="profile-visibility" className="font-medium">
                                                Profile Visibility
                                            </Label>
                                            <p className="text-sm text-gray-500">Control who can see your profile information</p>
                                        </div>
                                        <Select defaultValue="organization">
                                            <SelectTrigger id="profile-visibility" className="w-[180px]">
                                                <SelectValue placeholder="Select visibility" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="private">Private</SelectItem>
                                                <SelectItem value="organization">Organization Only</SelectItem>
                                                <SelectItem value="public">Public</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="prediction-visibility" className="font-medium">
                                                Prediction Visibility
                                            </Label>
                                            <p className="text-sm text-gray-500">Control who can see your prediction history</p>
                                        </div>
                                        <Select defaultValue="private">
                                            <SelectTrigger id="prediction-visibility" className="w-[180px]">
                                                <SelectValue placeholder="Select visibility" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="private">Private</SelectItem>
                                                <SelectItem value="team">Team Only</SelectItem>
                                                <SelectItem value="organization">Organization</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <Alert>
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Privacy Notice</AlertTitle>
                                <AlertDescription>
                                    Your data is protected in accordance with HIPAA regulations and our privacy policy. We never share
                                    personally identifiable information without your explicit consent.
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-6">
                            <Button variant="outline">Reset to Defaults</Button>
                            <Button onClick={handleSavePrivacy}>Save Privacy Settings</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Account
