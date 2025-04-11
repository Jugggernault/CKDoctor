"use client"

import { useState } from "react"
import {
    Moon,
    Sun,
    Bell,
    Globe,
    Database,
    Download,
    Trash2,
    Check,
    X,
    Palette,
    Eye,
    EyeOff,
    LogOut,
    Shield,
    RefreshCw,
    Smartphone,
    Laptop,
    Zap,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import PageHeader from "@/components/PageHeader"
import { useToast } from "@/hooks/use-toast"

const Settings = () => {
    const { toast } = useToast()
    const [theme, setTheme] = useState("light")
    const [language, setLanguage] = useState("english")
    const [units, setUnits] = useState("metric")
    const [apiKey, setApiKey] = useState("ckd_pred_api_12345abcdef67890")
    const [showApiKey, setShowApiKey] = useState(false)

    // Notification settings
    const [notifyNewFeatures, setNotifyNewFeatures] = useState(true)
    const [notifyPredictionUpdates, setNotifyPredictionUpdates] = useState(true)
    const [notifyMaintenance, setNotifyMaintenance] = useState(true)
    const [notifyEmail, setNotifyEmail] = useState(true)
    const [notifyInApp, setNotifyInApp] = useState(true)

    // Integration settings
    const [epicIntegration, setEpicIntegration] = useState(false)
    const [cernerIntegration, setCernerIntegration] = useState(true)
    const [allscriptsIntegration, setAllscriptsIntegration] = useState(false)

    const handleSavePreferences = () => {
        toast({
            title: "Preferences saved",
            description: "Your preferences have been updated successfully",
        })
    }

    const handleGenerateApiKey = () => {
        setApiKey("ckd_pred_api_" + Math.random().toString(36).substring(2, 15))
        toast({
            title: "New API key generated",
            description: "Your previous API key has been revoked",
        })
    }

    const handleExportData = () => {
        toast({
            title: "Exporting data",
            description: "Your data export will be ready in a few moments",
        })
    }

    const handleDeleteData = () => {
        toast({
            title: "Data deletion requested",
            description: "Please check your email to confirm data deletion",
            variant: "destructive",
        })
    }

    return (
        <div className="space-y-6">
            <PageHeader title="Settings" description="Manage your account preferences and application settings" />

            <Tabs defaultValue="preferences" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="preferences" className="flex items-center">
                        <Palette className="mr-2 h-4 w-4" />
                        Preferences
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="flex items-center">
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="integrations" className="flex items-center">
                        <Zap className="mr-2 h-4 w-4" />
                        Integrations
                    </TabsTrigger>
                    <TabsTrigger value="data" className="flex items-center">
                        <Database className="mr-2 h-4 w-4" />
                        Data Controls
                    </TabsTrigger>
                </TabsList>

                {/* Preferences Tab */}
                <TabsContent value="preferences">
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance & Localization</CardTitle>
                            <CardDescription>Customize how CKD Predictor looks and works for you</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Theme</h3>
                                <RadioGroup
                                    defaultValue={theme}
                                    onValueChange={setTheme}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                >
                                    <div>
                                        <RadioGroupItem value="light" id="theme-light" className="sr-only" />
                                        <Label
                                            htmlFor="theme-light"
                                            className={`flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer ${
                                                theme === "light" ? "border-ckd-primary" : ""
                                            }`}
                                        >
                                            <Sun className="mb-3 h-6 w-6" />
                                            <span className="text-sm font-medium">Light</span>
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
                                        <Label
                                            htmlFor="theme-dark"
                                            className={`flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer ${
                                                theme === "dark" ? "border-ckd-primary" : ""
                                            }`}
                                        >
                                            <Moon className="mb-3 h-6 w-6" />
                                            <span className="text-sm font-medium">Dark</span>
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="high-contrast" id="theme-high-contrast" className="sr-only" />
                                        <Label
                                            htmlFor="theme-high-contrast"
                                            className={`flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer ${
                                                theme === "high-contrast" ? "border-ckd-primary" : ""
                                            }`}
                                        >
                                            <Eye className="mb-3 h-6 w-6" />
                                            <span className="text-sm font-medium">High Contrast</span>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Language</h3>
                                <Select value={language} onValueChange={setLanguage}>
                                    <SelectTrigger className="w-full md:w-[250px]">
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="english">English</SelectItem>
                                        <SelectItem value="spanish">Spanish</SelectItem>
                                        <SelectItem value="french">French</SelectItem>
                                        <SelectItem value="german">German</SelectItem>
                                        <SelectItem value="chinese">Chinese</SelectItem>
                                        <SelectItem value="japanese">Japanese</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="flex items-center space-x-2 mt-2">
                                    <Globe className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm text-gray-500">
                    This will change the language throughout the application
                  </span>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Measurement Units</h3>
                                <RadioGroup defaultValue={units} onValueChange={setUnits} className="flex space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="metric" id="metric" />
                                        <Label htmlFor="metric">Metric (kg, cm, mmol/L)</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="imperial" id="imperial" />
                                        <Label htmlFor="imperial">Imperial (lb, in, mg/dL)</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Device Preferences</h3>
                                <div className="flex flex-col space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Smartphone className="h-4 w-4" />
                                            <Label htmlFor="mobile-notifications">Enable mobile notifications</Label>
                                        </div>
                                        <Switch id="mobile-notifications" defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Laptop className="h-4 w-4" />
                                            <Label htmlFor="desktop-notifications">Enable desktop notifications</Label>
                                        </div>
                                        <Switch id="desktop-notifications" defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <RefreshCw className="h-4 w-4" />
                                            <Label htmlFor="auto-refresh">Auto-refresh dashboard data</Label>
                                        </div>
                                        <Switch id="auto-refresh" defaultChecked />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-6">
                            <Button variant="outline">Reset to Defaults</Button>
                            <Button onClick={handleSavePreferences}>Save Preferences</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Settings</CardTitle>
                            <CardDescription>Control what notifications you receive and how</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Notification Types</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="notify-features" className="font-medium">
                                                New Features & Updates
                                            </Label>
                                            <p className="text-sm text-gray-500">Get notified about new features and platform updates</p>
                                        </div>
                                        <Switch id="notify-features" checked={notifyNewFeatures} onCheckedChange={setNotifyNewFeatures} />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="notify-predictions" className="font-medium">
                                                Prediction Updates
                                            </Label>
                                            <p className="text-sm text-gray-500">Notifications when prediction models are updated</p>
                                        </div>
                                        <Switch
                                            id="notify-predictions"
                                            checked={notifyPredictionUpdates}
                                            onCheckedChange={setNotifyPredictionUpdates}
                                        />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="notify-maintenance" className="font-medium">
                                                System Maintenance
                                            </Label>
                                            <p className="text-sm text-gray-500">Alerts about scheduled maintenance and downtime</p>
                                        </div>
                                        <Switch
                                            id="notify-maintenance"
                                            checked={notifyMaintenance}
                                            onCheckedChange={setNotifyMaintenance}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Notification Channels</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="notify-email" className="font-medium">
                                                Email Notifications
                                            </Label>
                                            <p className="text-sm text-gray-500">Receive notifications via email</p>
                                        </div>
                                        <Switch id="notify-email" checked={notifyEmail} onCheckedChange={setNotifyEmail} />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="notify-inapp" className="font-medium">
                                                In-App Notifications
                                            </Label>
                                            <p className="text-sm text-gray-500">Receive notifications within the application</p>
                                        </div>
                                        <Switch id="notify-inapp" checked={notifyInApp} onCheckedChange={setNotifyInApp} />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Notification Schedule</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="quiet-hours-start">Quiet Hours Start</Label>
                                        <Select defaultValue="22:00">
                                            <SelectTrigger id="quiet-hours-start">
                                                <SelectValue placeholder="Select time" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="20:00">8:00 PM</SelectItem>
                                                <SelectItem value="21:00">9:00 PM</SelectItem>
                                                <SelectItem value="22:00">10:00 PM</SelectItem>
                                                <SelectItem value="23:00">11:00 PM</SelectItem>
                                                <SelectItem value="00:00">12:00 AM</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="quiet-hours-end">Quiet Hours End</Label>
                                        <Select defaultValue="07:00">
                                            <SelectTrigger id="quiet-hours-end">
                                                <SelectValue placeholder="Select time" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="05:00">5:00 AM</SelectItem>
                                                <SelectItem value="06:00">6:00 AM</SelectItem>
                                                <SelectItem value="07:00">7:00 AM</SelectItem>
                                                <SelectItem value="08:00">8:00 AM</SelectItem>
                                                <SelectItem value="09:00">9:00 AM</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 mt-2">
                                    <Bell className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm text-gray-500">
                    Non-critical notifications will not be sent during quiet hours
                  </span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-6">
                            <Button variant="outline">Reset to Defaults</Button>
                            <Button onClick={handleSavePreferences}>Save Notification Settings</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Integrations Tab */}
                <TabsContent value="integrations">
                    <Card>
                        <CardHeader>
                            <CardTitle>API & Integrations</CardTitle>
                            <CardDescription>Manage API keys and third-party integrations</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">API Access</h3>
                                <div className="space-y-3">
                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="api-key">API Key</Label>
                                        <div className="flex">
                                            <div className="relative flex-grow">
                                                <Input
                                                    id="api-key"
                                                    value={apiKey}
                                                    readOnly
                                                    type={showApiKey ? "text" : "password"}
                                                    className="pr-10"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 h-full"
                                                    onClick={() => setShowApiKey(!showApiKey)}
                                                >
                                                    {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </Button>
                                            </div>
                                            <Button variant="outline" className="ml-2" onClick={handleGenerateApiKey}>
                                                Regenerate
                                            </Button>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            This key grants access to the CKD Predictor API. Keep it secure.
                                        </p>
                                    </div>
                                    <div className="pt-2">
                                        <Alert>
                                            <Shield className="h-4 w-4" />
                                            <AlertTitle>Security Notice</AlertTitle>
                                            <AlertDescription>
                                                Regenerating your API key will invalidate your previous key and may disrupt active integrations.
                                            </AlertDescription>
                                        </Alert>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">EHR Integrations</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center">
                                                <span className="font-bold text-blue-700">E</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">Epic Systems</p>
                                                <p className="text-sm text-gray-500">Connect with Epic EHR</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {epicIntegration ? (
                                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                    <Check className="h-3 w-3 mr-1" /> Connected
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                                                    <X className="h-3 w-3 mr-1" /> Not Connected
                                                </Badge>
                                            )}
                                            <Switch checked={epicIntegration} onCheckedChange={setEpicIntegration} />
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-green-100 rounded-md flex items-center justify-center">
                                                <span className="font-bold text-green-700">C</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">Cerner</p>
                                                <p className="text-sm text-gray-500">Connect with Cerner EHR</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {cernerIntegration ? (
                                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                    <Check className="h-3 w-3 mr-1" /> Connected
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                                                    <X className="h-3 w-3 mr-1" /> Not Connected
                                                </Badge>
                                            )}
                                            <Switch checked={cernerIntegration} onCheckedChange={setCernerIntegration} />
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-purple-100 rounded-md flex items-center justify-center">
                                                <span className="font-bold text-purple-700">A</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">Allscripts</p>
                                                <p className="text-sm text-gray-500">Connect with Allscripts EHR</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {allscriptsIntegration ? (
                                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                    <Check className="h-3 w-3 mr-1" /> Connected
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                                                    <X className="h-3 w-3 mr-1" /> Not Connected
                                                </Badge>
                                            )}
                                            <Switch checked={allscriptsIntegration} onCheckedChange={setAllscriptsIntegration} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Integration Settings</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="auto-sync" className="font-medium">
                                                Automatic Data Synchronization
                                            </Label>
                                            <p className="text-sm text-gray-500">Automatically sync data with connected EHRs</p>
                                        </div>
                                        <Switch id="auto-sync" defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="push-results" className="font-medium">
                                                Push Results to EHR
                                            </Label>
                                            <p className="text-sm text-gray-500">Send prediction results back to the patient's EHR</p>
                                        </div>
                                        <Switch id="push-results" defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="space-y-2">
                                        <Label htmlFor="sync-frequency">Synchronization Frequency</Label>
                                        <Select defaultValue="daily">
                                            <SelectTrigger id="sync-frequency">
                                                <SelectValue placeholder="Select frequency" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="realtime">Real-time</SelectItem>
                                                <SelectItem value="hourly">Hourly</SelectItem>
                                                <SelectItem value="daily">Daily</SelectItem>
                                                <SelectItem value="weekly">Weekly</SelectItem>
                                                <SelectItem value="manual">Manual only</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-6">
                            <Button variant="outline">Test Connections</Button>
                            <Button onClick={handleSavePreferences}>Save Integration Settings</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Data Controls Tab */}
                <TabsContent value="data">
                    <Card>
                        <CardHeader>
                            <CardTitle>Data Management</CardTitle>
                            <CardDescription>Control your data and privacy settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Data Export</h3>
                                <p className="text-sm text-gray-500">
                                    Export all your data including prediction history, patient records, and account information.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Button variant="outline" onClick={handleExportData}>
                                        <Download className="mr-2 h-4 w-4" />
                                        Export All Data
                                    </Button>
                                    <Button variant="outline" onClick={handleExportData}>
                                        <Download className="mr-2 h-4 w-4" />
                                        Export Prediction History
                                    </Button>
                                    <Button variant="outline" onClick={handleExportData}>
                                        <Download className="mr-2 h-4 w-4" />
                                        Export Patient Records
                                    </Button>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Data Retention</h3>
                                <div className="space-y-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="retention-period">Prediction History Retention</Label>
                                        <Select defaultValue="indefinite">
                                            <SelectTrigger id="retention-period">
                                                <SelectValue placeholder="Select retention period" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="30days">30 days</SelectItem>
                                                <SelectItem value="90days">90 days</SelectItem>
                                                <SelectItem value="1year">1 year</SelectItem>
                                                <SelectItem value="3years">3 years</SelectItem>
                                                <SelectItem value="indefinite">Indefinite</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <p className="text-sm text-gray-500">
                                            Predictions older than this period will be automatically deleted
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Privacy Settings</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="anonymize-data" className="font-medium">
                                                Anonymize Patient Data
                                            </Label>
                                            <p className="text-sm text-gray-500">Remove personally identifiable information from exports</p>
                                        </div>
                                        <Switch id="anonymize-data" defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="usage-analytics" className="font-medium">
                                                Usage Analytics
                                            </Label>
                                            <p className="text-sm text-gray-500">
                                                Allow anonymous usage data collection to improve the service
                                            </p>
                                        </div>
                                        <Switch id="usage-analytics" defaultChecked />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Label htmlFor="research-consent" className="font-medium">
                                                Research Consent
                                            </Label>
                                            <p className="text-sm text-gray-500">Allow anonymized data to be used for clinical research</p>
                                        </div>
                                        <Switch id="research-consent" defaultChecked />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
                                <Alert variant="destructive">
                                    <AlertTitle>Warning: These actions cannot be undone</AlertTitle>
                                    <AlertDescription>
                                        Deleting your data or account will permanently remove all associated information.
                                    </AlertDescription>
                                </Alert>
                                <div className="flex flex-wrap gap-3">
                                    <Button variant="destructive" onClick={handleDeleteData}>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete Prediction History
                                    </Button>
                                    <Button variant="destructive" onClick={handleDeleteData}>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete All Data
                                    </Button>
                                    <Button variant="destructive" onClick={handleDeleteData}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Delete Account
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-6">
                            <div className="text-sm text-gray-500">Last data backup: April 10, 2025 at 8:43 PM</div>
                            <Button onClick={handleSavePreferences}>Save Data Settings</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Settings
