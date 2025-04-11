import { Link } from "react-router-dom"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, History, Settings, TrendingUp, Users, AlertCircle, ArrowRight } from "lucide-react"
import PageHeader from "@/components/PageHeader"

const recentPredictions = [
  { id: "P-1001", date: "2025-04-10", patientId: "234-567", stage: "2", egfr: 75, probability: 0.85 },
  { id: "P-1002", date: "2025-04-09", patientId: "234-568", stage: "3a", egfr: 54, probability: 0.92 },
  { id: "P-1003", date: "2025-04-08", patientId: "234-569", stage: "3b", egfr: 42, probability: 0.78 },
  { id: "P-1004", date: "2025-04-07", patientId: "234-570", stage: "1", egfr: 98, probability: 0.95 },
]

const monthlyData = [
  { name: "Jan", predictions: 12 },
  { name: "Feb", predictions: 19 },
  { name: "Mar", predictions: 25 },
  { name: "Apr", predictions: 32 },
  { name: "May", predictions: 28 },
  { name: "Jun", predictions: 35 },
]

const egfrData = [
  { name: "Jan", average: 65 },
  { name: "Feb", average: 67 },
  { name: "Mar", average: 69 },
  { name: "Apr", average: 63 },
  { name: "May", average: 60 },
  { name: "Jun", average: 62 },
]

const Dashboard = () => {
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

  return (
      <div className="space-y-6">
        <PageHeader
            title="Dashboard"
            description="Welcome back, Dr. Smith"
            actions={
              <Link to="/prediction/new">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Prediction
                </Button>
              </Link>
            }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">New Prediction</CardTitle>
              <CardDescription>Start a new CKD prediction</CardDescription>
            </CardHeader>
            <CardContent className="pb-2 pt-0">
              <div className="h-12 w-12 bg-ckd-light rounded-lg flex items-center justify-center mb-2">
                <PlusCircle className="text-ckd-primary h-6 w-6" />
              </div>
              <p className="text-sm text-gray-500">Enter patient data to generate a CKD stage prediction</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Link to="/prediction/new" className="w-full">
                <Button variant="default" className="w-full">
                  Start
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Prediction History</CardTitle>
              <CardDescription>View past predictions</CardDescription>
            </CardHeader>
            <CardContent className="pb-2 pt-0">
              <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center mb-2">
                <History className="text-ckd-primary h-6 w-6" />
              </div>
              <p className="text-sm text-gray-500">Access and analyze your previous CKD predictions</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Link to="/predictions" className="w-full">
                <Button variant="outline" className="w-full">
                  View History
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Settings</CardTitle>
              <CardDescription>Manage your account</CardDescription>
            </CardHeader>
            <CardContent className="pb-2 pt-0">
              <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center mb-2">
                <Settings className="text-ckd-primary h-6 w-6" />
              </div>
              <p className="text-sm text-gray-500">Update your profile, preferences, and notification settings</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Link to="/settings" className="w-full">
                <Button variant="outline" className="w-full">
                  Open Settings
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-ckd-primary" /> Prediction Trends
              </CardTitle>
              <CardDescription>Monthly prediction count</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="predictions" fill="#0073b6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-ckd-primary" /> Patient eGFR Trends
              </CardTitle>
              <CardDescription>Monthly average eGFR values</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={egfrData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="average" stroke="#0073b6" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <History className="mr-2 h-5 w-5 text-ckd-primary" /> Recent Predictions
            </CardTitle>
            <CardDescription>Your most recent CKD predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-500 uppercase border-b">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Patient ID
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Stage
                  </th>
                  <th scope="col" className="px-4 py-3">
                    eGFR
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Probability
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Actions
                  </th>
                </tr>
                </thead>
                <tbody>
                {recentPredictions.map((prediction) => (
                    <tr key={prediction.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{prediction.id}</td>
                      <td className="px-4 py-3">{prediction.date}</td>
                      <td className="px-4 py-3">{prediction.patientId}</td>
                      <td className="px-4 py-3">
                      <span className={`stage-indicator ${getStageClass(prediction.stage)}`}>
                        Stage {prediction.stage}
                      </span>
                      </td>
                      <td className="px-4 py-3">{prediction.egfr} mL/min</td>
                      <td className="px-4 py-3">{(prediction.probability * 100).toFixed(0)}%</td>
                      <td className="px-4 py-3">
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
          <CardFooter className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Showing 4 of 47 predictions</span>
            <Link to="/predictions">
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="bg-amber-50 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-amber-800">
              <AlertCircle className="mr-2 h-5 w-5 text-amber-600" />
              Clinical Advisory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-amber-800">
              Remember that CKD Predictor is designed to assist your clinical decision-making process, not replace it.
              Always combine these predictions with your professional judgment and consider individual patient factors.
            </p>
          </CardContent>
        </Card>
      </div>
  )
}

export default Dashboard
