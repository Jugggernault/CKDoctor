"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PageHeader from "@/components/PageHeader"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Download, Search, Filter, Plus, ArrowUpDown, ChevronDown, BarChart2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock prediction data
const predictionData = [
  { id: "P-1001", date: "2025-04-10", patientId: "PT-234-567", stage: "2", egfr: 75, notes: "Follow-up in 6 months" },
  { id: "P-1002", date: "2025-04-09", patientId: "PT-234-568", stage: "3a", egfr: 54, notes: "Referral to nephrology" },
  { id: "P-1003", date: "2025-04-08", patientId: "PT-234-569", stage: "3b", egfr: 42, notes: "Medication adjustment" },
  { id: "P-1004", date: "2025-04-07", patientId: "PT-234-570", stage: "1", egfr: 98, notes: "Annual screening" },
  {
    id: "P-1005",
    date: "2025-04-06",
    patientId: "PT-234-571",
    stage: "4",
    egfr: 24,
    notes: "Urgent nephrology consultation",
  },
  { id: "P-1006", date: "2025-04-05", patientId: "PT-234-572", stage: "2", egfr: 68, notes: "Monitor BP closely" },
  { id: "P-1007", date: "2025-04-04", patientId: "PT-234-573", stage: "3a", egfr: 58, notes: "Dietary counseling" },
  {
    id: "P-1008",
    date: "2025-04-03",
    patientId: "PT-234-574",
    stage: "1",
    egfr: 92,
    notes: "Continue current management",
  },
  { id: "P-1009", date: "2025-04-02", patientId: "PT-234-575", stage: "3b", egfr: 38, notes: "Consider ACE inhibitor" },
  { id: "P-1010", date: "2025-04-01", patientId: "PT-234-576", stage: "5", egfr: 12, notes: "Prepare for RRT" },
]

// Filter options
const stageOptions = ["All Stages", "Stage 1", "Stage 2", "Stage 3a", "Stage 3b", "Stage 4", "Stage 5"]
const dateOptions = ["All Time", "Last 7 Days", "Last 30 Days", "Last 90 Days", "Last Year"]

const PredictionHistory = () => {
  const [search, setSearch] = useState("")
  const [selectedStage, setSelectedStage] = useState("All Stages")
  const [selectedDate, setSelectedDate] = useState("All Time")

  const getStageClass = (stage: string) => {
    switch (stage) {
      case "1":
        return "stage-1"
      case "2":
        return "stage-2"
      case "3a":
        return "stage-3a"
      case "3b":
        return "stage-3b"
      case "4":
        return "stage-4"
      case "5":
        return "stage-5"
      default:
        return "bg-gray-500"
    }
  }

  // Filter predictions based on search and filters
  const filteredPredictions = predictionData.filter((prediction) => {
    // Search filter
    const searchMatch =
        search === "" ||
        prediction.patientId.toLowerCase().includes(search.toLowerCase()) ||
        prediction.id.toLowerCase().includes(search.toLowerCase()) ||
        prediction.notes.toLowerCase().includes(search.toLowerCase())

    // Stage filter
    const stageMatch = selectedStage === "All Stages" || `Stage ${prediction.stage}` === selectedStage

    // Date filter - simplified for demo purposes
    // In a real app, you'd check actual dates against filter
    const dateMatch = true

    return searchMatch && stageMatch && dateMatch
  })

  return (
      <div className="space-y-6">
        <PageHeader
            title="Prediction History"
            description="Browse and analyze your past CKD predictions"
            actions={
              <div className="flex space-x-3">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Link to="/prediction/new">
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    New Prediction
                  </Button>
                </Link>
              </div>
            }
        />

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                    placeholder="Search predictions..."
                    className="pl-8"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      {selectedStage}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Filter by Stage</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {stageOptions.map((option) => (
                        <DropdownMenuItem
                            key={option}
                            onClick={() => setSelectedStage(option)}
                            className={selectedStage === option ? "bg-gray-100" : ""}
                        >
                          {option}
                        </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      {selectedDate}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Filter by Date</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {dateOptions.map((option) => (
                        <DropdownMenuItem
                            key={option}
                            onClick={() => setSelectedDate(option)}
                            className={selectedDate === option ? "bg-gray-100" : ""}
                        >
                          {option}
                        </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="outline">
                  <BarChart2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-md border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                  <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center cursor-pointer">
                      ID <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center cursor-pointer">
                      Date <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Patient ID
                  </th>
                  <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center cursor-pointer">
                      Stage <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center cursor-pointer">
                      eGFR <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </th>
                  <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Notes
                  </th>
                  <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {filteredPredictions.map((prediction) => (
                    <tr key={prediction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{prediction.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prediction.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prediction.patientId}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`stage-indicator ${getStageClass(prediction.stage)}`}>
                        Stage {prediction.stage}
                      </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prediction.egfr} mL/min</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                        {prediction.notes}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/predictions/${prediction.id}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t p-6">
            <div className="text-sm text-gray-500">
              Showing {filteredPredictions.length} of {predictionData.length} predictions
            </div>

            <div className="flex justify-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-ckd-primary text-white">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
  )
}

export default PredictionHistory
