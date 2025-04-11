"use client"
import { useNavigate, useLocation } from "react-router-dom"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import PageHeader from "@/components/PageHeader"
import { Download, Save as SaveIcon, ArrowLeft, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Enhanced colors for each stage with better contrast
const stageColors: Record<string, string> = {
  "1": "#4CAF50", // Green
  "2": "#8BC34A", // Light Green
  "3a": "#FFC107", // Amber
  "3b": "#FF9800", // Orange
  "4": "#FF5722", // Deep Orange
  "5": "#D32F2F", // Red
}

const PredictionResults = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const location = useLocation()
  const state = location.state as {
    prediction?: string
    probabilities?: Record<string, number>
    feature_importance?: Record<string, number>
    formData?: Record<string, never>
    patientId?: string
  }

  const { prediction, probabilities, feature_importance, formData, patientId } = state || {}

  if (!prediction || !probabilities || !formData) {
    return (
        <div className="p-6">
          <p>No prediction data available.</p>
          <Button onClick={() => navigate("/prediction/new")}>New Prediction</Button>
        </div>
    )
  }

  // Prepare pie chart data
  const stageProbabilities = Object.entries(probabilities).map(([stage, value]) => ({
    name: `Stage ${stage}`,
    value,
    color: stageColors[stage] || "#8884d8",
  }))

  // Prepare feature importance data
  const featureImportanceData = feature_importance ?
      Object.entries(feature_importance)
          .sort((a, b) => b[1] - a[1]) // Sort by importance (descending)
          .slice(0, 6) // Get top 6 features
          .map(([feature, value]) => ({
            name: feature.split('/').pop() || feature, // Take last part after slash or full name
            value: parseFloat((value * 100).toFixed(1)), // Convert to percentage
          }))
      : []

  // Summarize biomarkers and vitals
  const biomarkers = {
    creatinine: formData.creatinine,
    urea: formData.urea,
    hemoglobin: formData.hemoglobin,
    albumin: formData.albumin,
  }
  const vitals = {
    systolicBP: formData.systolicBP,
    diastolicBP: formData.diastolicBP,
    glucose: formData.glucose,
    pulse: formData.pulse,
  }

  const handleSave = () => {
    toast({ title: "Prediction saved", description: "This prediction has been saved to your records" })
    setTimeout(() => navigate("/predictions"), 1000)
  }

  return (
      <div className="space-y-6">
        <PageHeader
            title="Prediction Results"
            description={`Patient ID: ${patientId}`}
            actions={
              <div className="flex space-x-3">
                <Button variant="outline" size="sm" onClick={handleSave}>
                  <SaveIcon className="mr-2 h-4 w-4" /> Save
                </Button>
              </div>
            }
        />

        {/* Main prediction card */}
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-2xl">CKD Prediction</CardTitle>
            <CardDescription>Based on provided data</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 text-center">
            <div className="mb-2 text-gray-500 text-sm">Predicted CKD Stage</div>
            <div
                className="inline-block rounded-full text-white px-10 py-6 mb-4"
                style={{ backgroundColor: stageColors[prediction] }}
            >
              <div className="text-4xl font-bold">Stage {prediction}</div>
            </div>
          </CardContent>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                    data={stageProbabilities}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${(value * 100).toFixed(0)}%`}
                >
                  {stageProbabilities.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val:number) => `${(val * 100).toFixed(1)}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Feature importance card */}
        {feature_importance && featureImportanceData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Key Influencing Factors</CardTitle>
                <CardDescription>Top factors affecting this prediction</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                      data={featureImportanceData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" label={{ value: 'Importance (%)', position: 'insideBottom', offset: -5 }} />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Importance']} />
                    <Bar dataKey="value" fill="#8884d8" barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
        )}

        {/* Patient data summary */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Data Summary</CardTitle>
            <CardDescription>Data used for prediction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Biomarkers */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Biomarkers</h3>
                <div className="space-y-2">
                  {Object.entries(biomarkers).map(([key, val]) => (
                      <div key={key} className="grid grid-cols-2 gap-2">
                        <div className="text-gray-500 capitalize">{key}</div>
                        <div>{val}</div>
                      </div>
                  ))}
                </div>
              </div>

              {/* Vitals */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Vital Signs</h3>
                <div className="space-y-2">
                  {Object.entries(vitals).map(([key, val]) => (
                      <div key={key} className="grid grid-cols-2 gap-2">
                        <div className="text-gray-500 capitalize">{key}</div>
                        <div>{val}</div>
                      </div>
                  ))}
                </div>
              </div>

              {/* Medical History */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Medical History</h3>
                <div className="space-y-2">
                  {Object.entries(formData)
                      .filter(([key]) => key.startsWith("has"))
                      .map(([key, val]) => (
                          <div key={key} className="grid grid-cols-2 gap-2">
                            <div className="text-gray-500 capitalize">{key.replace('has', '')}</div>
                            <div>{val ? 'Yes' : 'No'}</div>
                          </div>
                      ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" onClick={() => navigate("/prediction/new")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> New Prediction
            </Button>
            <Button variant="default" onClick={handleSave}>
              Save Results <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
  )
}

export default PredictionResults