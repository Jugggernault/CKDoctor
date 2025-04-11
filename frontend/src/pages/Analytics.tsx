"use client"

import { useState } from "react"
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts"
import {
    Download,
    Calendar,
    Filter,
    FileDown,
    BarChart2,
    PieChartIcon,
    TrendingUp,
    Map,
    AlertTriangle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import PageHeader from "@/components/PageHeader"
import { useToast } from "@/hooks/use-toast"

// Mock data for charts
const monthlyPredictions = [
    { month: "Jan", count: 45, stage1: 12, stage2: 15, stage3a: 8, stage3b: 5, stage4: 3, stage5: 2 },
    { month: "Feb", count: 52, stage1: 14, stage2: 18, stage3a: 9, stage3b: 6, stage4: 3, stage5: 2 },
    { month: "Mar", count: 58, stage1: 15, stage2: 20, stage3a: 10, stage3b: 7, stage4: 4, stage5: 2 },
    { month: "Apr", count: 63, stage1: 16, stage2: 22, stage3a: 11, stage3b: 8, stage4: 4, stage5: 2 },
    { month: "May", count: 70, stage1: 18, stage2: 24, stage3a: 12, stage3b: 9, stage4: 5, stage5: 2 },
    { month: "Jun", count: 76, stage1: 20, stage2: 26, stage3a: 13, stage3b: 10, stage4: 5, stage5: 2 },
    { month: "Jul", count: 82, stage1: 22, stage2: 28, stage3a: 14, stage3b: 10, stage4: 6, stage5: 2 },
    { month: "Aug", count: 87, stage1: 23, stage2: 30, stage3a: 15, stage3b: 11, stage4: 6, stage5: 2 },
    { month: "Sep", count: 92, stage1: 24, stage2: 32, stage3a: 16, stage3b: 12, stage4: 6, stage5: 2 },
    { month: "Oct", count: 98, stage1: 26, stage2: 34, stage3a: 17, stage3b: 13, stage4: 6, stage5: 2 },
    { month: "Nov", count: 105, stage1: 28, stage2: 36, stage3a: 18, stage3b: 14, stage4: 7, stage5: 2 },
    { month: "Dec", count: 112, stage1: 30, stage2: 38, stage3a: 19, stage3b: 15, stage4: 8, stage5: 2 },
]

const stageDistribution = [
    { name: "Stage 1", value: 228, color: "#5cb85c" },
    { name: "Stage 2", value: 323, color: "#f0ad4e" },
    { name: "Stage 3a", value: 162, color: "#ff9800" },
    { name: "Stage 3b", value: 120, color: "#ff5722" },
    { name: "Stage 4", value: 63, color: "#d9534f" },
    { name: "Stage 5", value: 24, color: "#c9302c" },
]

const ageDistribution = [
    { age: "18-30", count: 42 },
    { age: "31-40", count: 78 },
    { age: "41-50", count: 130 },
    { age: "51-60", count: 215 },
    { age: "61-70", count: 248 },
    { age: "71-80", count: 156 },
    { age: "81+", count: 51 },
]

const regionData = [
    { region: "North", count: 245, stage1: 65, stage2: 85, stage3a: 45, stage3b: 30, stage4: 15, stage5: 5 },
    { region: "South", count: 312, stage1: 82, stage2: 105, stage3a: 58, stage3b: 40, stage4: 20, stage5: 7 },
    { region: "East", count: 198, stage1: 52, stage2: 68, stage3a: 36, stage3b: 25, stage4: 12, stage5: 5 },
    { region: "West", count: 165, stage1: 43, stage2: 56, stage3a: 30, stage3b: 22, stage4: 10, stage5: 4 },
]

const predictiveTrends = [
    {
        id: 1,
        title: "Rising Stage 3 Cases in South Region",
        description: "15% increase in Stage 3 diagnoses over the past quarter",
        severity: "medium",
    },
    {
        id: 2,
        title: "Improved Outcomes for Patients with Early Intervention",
        description: "Patients receiving treatment in Stage 1-2 show 30% better outcomes",
        severity: "positive",
    },
    {
        id: 3,
        title: "High Risk Patient Group Identified",
        description: "Males 55-65 with hypertension showing accelerated progression",
        severity: "high",
    },
]

const Analytics = () => {
    const { toast } = useToast()
    const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
        from: undefined,
        to: undefined,
    })
    const [ageFilter, setAgeFilter] = useState("all")
    const [stageFilter, setStageFilter] = useState("all")
    const [regionFilter, setRegionFilter] = useState("all")

    const handleExport = (format: string) => {
        toast({
            title: `Exporting as ${format.toUpperCase()}`,
            description: "Your export will be ready in a few moments",
        })
    }

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "high":
                return "bg-red-100 text-red-800 border-red-200"
            case "medium":
                return "bg-amber-100 text-amber-800 border-amber-200"
            case "positive":
                return "bg-green-100 text-green-800 border-green-200"
            default:
                return "bg-ckd-light text-ckd-primary border-ckd-primary/20"
        }
    }

    return (
        <div className="space-y-6">
            <PageHeader
                title="Analytics Dashboard"
                description="Track trends and insights from CKD predictions"
                actions={
                    <div className="flex space-x-3">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    {dateRange.from ? (
                                        dateRange.to ? (
                                            <>
                                                {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                                            </>
                                        ) : (
                                            dateRange.from.toLocaleDateString()
                                        )
                                    ) : (
                                        "Date Range"
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="end">
                                <CalendarComponent
                                    initialFocus
                                    mode="range"
                                    selected={dateRange}
                                    onSelect={(range) => setDateRange(range as { from: Date | undefined; to: Date | undefined })}
                                    numberOfMonths={2}
                                />
                            </PopoverContent>
                        </Popover>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <Download className="mr-2 h-4 w-4" />
                                    Export
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-48">
                                <div className="space-y-2">
                                    <h4 className="font-medium">Export Options</h4>
                                    <Separator />
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start"
                                        onClick={() => handleExport("png")}
                                    >
                                        <FileDown className="mr-2 h-4 w-4" />
                                        PNG Image
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start"
                                        onClick={() => handleExport("pdf")}
                                    >
                                        <FileDown className="mr-2 h-4 w-4" />
                                        PDF Document
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start"
                                        onClick={() => handleExport("csv")}
                                    >
                                        <FileDown className="mr-2 h-4 w-4" />
                                        CSV Data
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                }
            />

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Total Predictions</CardTitle>
                        <CardDescription>All-time prediction count</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">920</div>
                        <p className="text-sm text-green-600 mt-1">↑ 12% from previous period</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Accuracy Rate</CardTitle>
                        <CardDescription>Based on clinical validation</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">94.2%</div>
                        <p className="text-sm text-green-600 mt-1">↑ 2.1% from previous model</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Avg. Risk Score</CardTitle>
                        <CardDescription>Patient population risk level</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">68/100</div>
                        <p className="text-sm text-amber-600 mt-1">↑ 3 points from baseline</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500 mr-2">Filters:</span>
                </div>

                <Select value={ageFilter} onValueChange={setAgeFilter}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Age Group" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Ages</SelectItem>
                        <SelectItem value="18-30">18-30</SelectItem>
                        <SelectItem value="31-50">31-50</SelectItem>
                        <SelectItem value="51-70">51-70</SelectItem>
                        <SelectItem value="71+">71+</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={stageFilter} onValueChange={setStageFilter}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="CKD Stage" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Stages</SelectItem>
                        <SelectItem value="stage1">Stage 1</SelectItem>
                        <SelectItem value="stage2">Stage 2</SelectItem>
                        <SelectItem value="stage3a">Stage 3a</SelectItem>
                        <SelectItem value="stage3b">Stage 3b</SelectItem>
                        <SelectItem value="stage4">Stage 4</SelectItem>
                        <SelectItem value="stage5">Stage 5</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={regionFilter} onValueChange={setRegionFilter}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Region" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        <SelectItem value="north">North</SelectItem>
                        <SelectItem value="south">South</SelectItem>
                        <SelectItem value="east">East</SelectItem>
                        <SelectItem value="west">West</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Main Charts */}
            <Tabs defaultValue="trends" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="trends" className="flex items-center">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Prediction Trends
                    </TabsTrigger>
                    <TabsTrigger value="distribution" className="flex items-center">
                        <PieChartIcon className="mr-2 h-4 w-4" />
                        Stage Distribution
                    </TabsTrigger>
                    <TabsTrigger value="demographics" className="flex items-center">
                        <BarChart2 className="mr-2 h-4 w-4" />
                        Demographics
                    </TabsTrigger>
                    <TabsTrigger value="regional" className="flex items-center">
                        <Map className="mr-2 h-4 w-4" />
                        Regional Analysis
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="trends">
                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Prediction Trends</CardTitle>
                            <CardDescription>Number of predictions over time</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={monthlyPredictions}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="count"
                                            stroke="#03624c"
                                            strokeWidth={2}
                                            dot={{ r: 4 }}
                                            name="Total Predictions"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="distribution">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>CKD Stage Distribution</CardTitle>
                                <CardDescription>Breakdown of predictions by CKD stage</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[400px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={stageDistribution}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={150}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {stageDistribution.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => [`${value} patients`, "Count"]} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Monthly Stage Breakdown</CardTitle>
                                <CardDescription>Stage distribution over time</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[400px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={monthlyPredictions}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="stage1" stackId="a" fill="#5cb85c" name="Stage 1" />
                                            <Bar dataKey="stage2" stackId="a" fill="#f0ad4e" name="Stage 2" />
                                            <Bar dataKey="stage3a" stackId="a" fill="#ff9800" name="Stage 3a" />
                                            <Bar dataKey="stage3b" stackId="a" fill="#ff5722" name="Stage 3b" />
                                            <Bar dataKey="stage4" stackId="a" fill="#d9534f" name="Stage 4" />
                                            <Bar dataKey="stage5" stackId="a" fill="#c9302c" name="Stage 5" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="demographics">
                    <Card>
                        <CardHeader>
                            <CardTitle>Patient Age Distribution</CardTitle>
                            <CardDescription>Breakdown of predictions by patient age group</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={ageDistribution}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="age" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#0073b6" name="Patient Count" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="regional">
                    <Card>
                        <CardHeader>
                            <CardTitle>Regional Analysis</CardTitle>
                            <CardDescription>CKD prediction distribution by region</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={regionData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="region" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="stage1" stackId="a" fill="#5cb85c" name="Stage 1" />
                                        <Bar dataKey="stage2" stackId="a" fill="#f0ad4e" name="Stage 2" />
                                        <Bar dataKey="stage3a" stackId="a" fill="#ff9800" name="Stage 3a" />
                                        <Bar dataKey="stage3b" stackId="a" fill="#ff5722" name="Stage 3b" />
                                        <Bar dataKey="stage4" stackId="a" fill="#d9534f" name="Stage 4" />
                                        <Bar dataKey="stage5" stackId="a" fill="#c9302c" name="Stage 5" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Predictive Trends */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <TrendingUp className="mr-2 h-5 w-5 text-ckd-primary" />
                        Predictive Trends & Insights
                    </CardTitle>
                    <CardDescription>AI-powered insights based on your prediction data</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {predictiveTrends.map((trend) => (
                            <div
                                key={trend.id}
                                className={`p-4 rounded-md border ${getSeverityColor(trend.severity)} flex items-start`}
                            >
                                <AlertTriangle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium mb-1">{trend.title}</h4>
                                    <p className="text-sm">{trend.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                    <div className="text-sm text-gray-500">Last updated: April 10, 2025 at 8:43 PM</div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        AI-Powered Insights
                    </Badge>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Analytics
