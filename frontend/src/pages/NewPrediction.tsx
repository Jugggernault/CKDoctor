"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import PageHeader from "@/components/PageHeader"
import { ArrowLeft, ArrowRight, Save, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define the form schema for each step
const patientInfoSchema = z.object({
  patientId: z.string().min(1, "Patient ID is required"),
  age: z
      .string()
      .refine((val) => !isNaN(Number.parseInt(val)), { message: "Age must be a number" })
      .refine((val) => Number.parseInt(val) >= 18 && Number.parseInt(val) <= 120, {
        message: "Age must be between 18 and 120",
      }),
  gender: z.enum(["male", "female"]),
  weight: z
      .string()
      .refine((val) => !isNaN(Number.parseFloat(val)), { message: "Weight must be a number" })
      .refine((val) => Number.parseFloat(val) > 0, { message: "Weight must be greater than 0" }),
  height: z
      .string()
      .refine((val) => !isNaN(Number.parseFloat(val)), { message: "Height must be a number" })
      .refine((val) => Number.parseFloat(val) > 0, { message: "Height must be greater than 0" }),
})

const biomarkersSchema = z.object({
  creatinine: z
      .string()
      .refine((val) => !isNaN(Number.parseFloat(val)), { message: "Creatinine must be a number" })
      .refine((val) => Number.parseFloat(val) > 0, { message: "Creatinine must be greater than 0" }),
  urea: z
      .string()
      .refine((val) => !isNaN(Number.parseFloat(val)), { message: "Urea must be a number" })
      .refine((val) => Number.parseFloat(val) > 0, { message: "Urea must be greater than 0" }),
  hemoglobin: z
      .string()
      .refine((val) => !isNaN(Number.parseFloat(val)), { message: "Hemoglobin must be a number" })
      .refine((val) => Number.parseFloat(val) > 0, { message: "Hemoglobin must be greater than 0" }),
  albumin: z
      .string()
      .refine((val) => !isNaN(Number.parseFloat(val)), { message: "Albumin must be a number" })
      .refine((val) => Number.parseFloat(val) > 0, { message: "Albumin must be greater than 0" }),
  sodium: z
      .string()
      .refine((val) => !isNaN(Number.parseFloat(val)), { message: "Sodium must be a number" })
      .refine((val) => Number.parseFloat(val) > 0, { message: "Sodium must be greater than 0" }),
  potassium: z
      .string()
      .refine((val) => !isNaN(Number.parseFloat(val)), { message: "Potassium must be a number" })
      .refine((val) => Number.parseFloat(val) > 0, { message: "Potassium must be greater than 0" }),
  chloride: z
      .string()
      .refine((val) => !isNaN(Number.parseFloat(val)), { message: "Chloride must be a number" })
      .refine((val) => Number.parseFloat(val) > 0, { message: "Chloride must be greater than 0" }),
})

const vitalsSchema = z.object({
  systolicBP: z
      .string()
      .refine((val) => !isNaN(Number.parseInt(val)), { message: "Systolic BP must be a number" })
      .refine((val) => Number.parseInt(val) > 0, { message: "Systolic BP must be greater than 0" }),
  diastolicBP: z
      .string()
      .refine((val) => !isNaN(Number.parseInt(val)), { message: "Diastolic BP must be a number" })
      .refine((val) => Number.parseInt(val) > 0, { message: "Diastolic BP must be greater than 0" }),
  glucose: z
      .string()
      .refine((val) => !isNaN(Number.parseFloat(val)), { message: "Glucose must be a number" })
      .refine((val) => Number.parseFloat(val) > 0, { message: "Glucose must be greater than 0" }),
  pulse: z
      .string()
      .refine((val) => !isNaN(Number.parseInt(val)), { message: "Pulse must be a number" })
      .refine((val) => Number.parseInt(val) > 0, { message: "Pulse must be greater than 0" }),
})

const historySchema = z.object({
  hasDiabetes: z.boolean().optional(),
  hasHypertension: z.boolean().optional(),
  hasCardiovascularDisease: z.boolean().optional(),
  hasCKDFamilyHistory: z.boolean().optional(),
  smoker: z.boolean().optional(),
  hasRetinopathy: z.boolean().optional(),
  hasNephropathy: z.boolean().optional(),
  hasNeuropathy: z.boolean().optional(),
  hasOliguria: z.boolean().optional(),
  hasOmi: z.boolean().optional(),
})
const NewPrediction = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<string>("patient-info")

  // Create forms for each step
  const patientInfoForm = useForm<z.infer<typeof patientInfoSchema>>({
    resolver: zodResolver(patientInfoSchema),
    defaultValues: { patientId: "", age: "", gender: "male", weight: "", height: "" },
  })

  const biomarkersForm = useForm<z.infer<typeof biomarkersSchema>>({
    resolver: zodResolver(biomarkersSchema),
    defaultValues: { creatinine: "", urea: "", hemoglobin: "", albumin: "", sodium: "", potassium: "", chloride: "" },
  })

  const vitalsForm = useForm<z.infer<typeof vitalsSchema>>({
    resolver: zodResolver(vitalsSchema),
    defaultValues: { systolicBP: "", diastolicBP: "", glucose: "", pulse: "" },
  })

  const historyForm = useForm<z.infer<typeof historySchema>>({
    resolver: zodResolver(historySchema),
    defaultValues: {
      hasDiabetes: false,
      hasHypertension: false,
      hasCardiovascularDisease: false,
      hasCKDFamilyHistory: false,
      smoker: false,
      hasRetinopathy: false,
      hasNephropathy: false,
      hasNeuropathy: false,
      hasOliguria: false,
      hasOmi: false,
    },
  })
  // Tab change handlers
  const handleNextTab = (currentTab: string) => {
    switch (currentTab) {
      case "patient-info":
        if (patientInfoForm.formState.isValid) {
          setActiveTab("biomarkers")
        } else {
          patientInfoForm.trigger()
        }
        break
      case "biomarkers":
        if (biomarkersForm.formState.isValid) {
          setActiveTab("vitals")
        } else {
          biomarkersForm.trigger()
        }
        break
      case "vitals":
        if (vitalsForm.formState.isValid) {
          setActiveTab("history")
        } else {
          vitalsForm.trigger()
        }
        break
      case "history":
        handleSubmit()
        break
    }
  }

  const handlePrevTab = (currentTab: string) => {
    switch (currentTab) {
      case "biomarkers":
        setActiveTab("patient-info")
        break
      case "vitals":
        setActiveTab("biomarkers")
        break
      case "history":
        setActiveTab("vitals")
        break
    }
  }

  // Final submit handler
  const handleSubmit = async () => {
    const raw = {
      ...patientInfoForm.getValues(),
      ...biomarkersForm.getValues(),
      ...vitalsForm.getValues(),
      ...historyForm.getValues(),
    }

    const payload = {
      Age: Number(raw.age),
      Sexe: raw.gender,
      "Personnels Médicaux/HTA": raw.hasHypertension,
      "Personnels Médicaux/Diabète 2": raw.hasDiabetes,
      "TA (mmHg)/Systole": Number(raw.systolicBP),
      "TA (mmHg)/Diastole": Number(raw.diastolicBP),
      "Poul (bpm)": Number(raw.pulse),
      "Urée (g/L)": Number(raw.urea),
      "Créatinine (mg/L)": Number(raw.creatinine),
      "Na^+ (meq/L)": Number(raw.sodium),
      "K^+ (meq/L)": Number(raw.potassium),
      "Cl^- (meq/L)": Number(raw.chloride),
      "Hb (g/dL)": Number(raw.hemoglobin),
      "Symptômes/Oligurie": raw.hasOliguria,
      "Symptômes/OMI": raw.hasOmi,
    }

    try {
      toast({ title: "Processing prediction", description: "Votre prédiction est en cours" })
      const response = await fetch('http://localhost:8000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json()
      navigate('/prediction/results', {
        state: {
          prediction: result.prediction,
          probabilities: result.probabilities,
          feature_importance:result.feature_importance,
          formData: raw,
          patientId: raw.patientId,
        },
      })
    } catch (error) {
      toast({ title: "Error", description: "Échec de la prédiction" })
      console.log(error)
    }
  }
  // Calculate progress percentage
  const getProgressPercentage = () => {
    switch (activeTab) {
      case "patient-info":
        return 25
      case "biomarkers":
        return 50
      case "vitals":
        return 75
      case "history":
        return 100
      default:
        return 0
    }
  }

  return (
      <div className="space-y-6">
        <PageHeader title="New CKD Prediction" description="Enter patient data to generate a prediction" />

        <div className="mb-6">
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
                className="bg-ckd-primary h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <div className={activeTab === "patient-info" ? "font-medium text-ckd-primary" : ""}>Patient Info</div>
            <div className={activeTab === "biomarkers" ? "font-medium text-ckd-primary" : ""}>Biomarkers</div>
            <div className={activeTab === "vitals" ? "font-medium text-ckd-primary" : ""}>Vitals</div>
            <div className={activeTab === "history" ? "font-medium text-ckd-primary" : ""}>History</div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="patient-info">
            <Card>
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
                <CardDescription>Enter basic patient details</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...patientInfoForm}>
                  <form className="space-y-6">
                    <FormField
                        control={patientInfoForm.control}
                        name="patientId"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center">
                                Patient ID
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Enter the patient's unique identifier</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. P12345" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                          control={patientInfoForm.control}
                          name="age"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel>Age (years)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="e.g. 65" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />

                      <FormField
                          control={patientInfoForm.control}
                          name="gender"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <div className="flex space-x-4 pt-2">
                                  <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="male"
                                        checked={field.value === "male"}
                                        onChange={() => field.onChange("male")}
                                        className="mr-2"
                                    />
                                    Male
                                  </label>
                                  <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="female"
                                        checked={field.value === "female"}
                                        onChange={() => field.onChange("female")}
                                        className="mr-2"
                                    />
                                    Female
                                  </label>
                                </div>
                                <FormMessage />
                              </FormItem>
                          )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                          control={patientInfoForm.control}
                          name="weight"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel>Weight (kg)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="e.g. 70" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />

                      <FormField
                          control={patientInfoForm.control}
                          name="height"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel>Height (cm)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="e.g. 170" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />
                    </div>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => navigate("/dashboard")}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
                </Button>
                <Button onClick={() => handleNextTab("patient-info")}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="biomarkers">
            <Card>
              <CardHeader>
                <CardTitle>Biomarkers</CardTitle>
                <CardDescription>Enter laboratory values</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...biomarkersForm}>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                          control={biomarkersForm.control}
                          name="creatinine"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center">
                                  Serum Creatinine (mg/dL)
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Normal range: 0.7-1.3 mg/dL (males), 0.6-1.1 mg/dL (females)</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.01" placeholder="e.g. 1.2" {...field} />
                                </FormControl>
                                <FormDescription>Recent value within last 3 months</FormDescription>
                                <FormMessage />
                              </FormItem>
                          )}
                      />

                      <FormField
                          control={biomarkersForm.control}
                          name="urea"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center">
                                  Blood Urea Nitrogen (mg/dL)
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Normal range: 7-20 mg/dL</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.1" placeholder="e.g. 15" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                          control={biomarkersForm.control}
                          name="hemoglobin"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center">
                                  Hemoglobin (g/dL)
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Normal range: 13.5-17.5 g/dL (males), 12.0-15.5 g/dL (females)</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.1" placeholder="e.g. 14.5" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />

                      <FormField
                          control={biomarkersForm.control}
                          name="albumin"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center">
                                  Albumin (g/dL)
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Normal range: 3.4-5.4 g/dL</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.1" placeholder="e.g. 4.0" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />
                      <FormField
                          control={biomarkersForm.control}
                          name="sodium"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel>Na^+ (meq/L)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="e.g. 140" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />
                      {/* Potassium */}
                      <FormField
                          control={biomarkersForm.control}
                          name="potassium"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel>K^+ (meq/L)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="e.g. 4.5" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />
                      {/* Chloride */}
                      <FormField
                          control={biomarkersForm.control}
                          name="chloride"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cl^- (meq/L)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="e.g. 102" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />
                    </div>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => handlePrevTab("biomarkers")}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button onClick={() => handleNextTab("biomarkers")}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="vitals">
            <Card>
              <CardHeader>
                <CardTitle>Vitals</CardTitle>
                <CardDescription>Enter patient vital signs</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...vitalsForm}>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                          control={vitalsForm.control}
                          name="systolicBP"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center">
                                  Systolic Blood Pressure (mmHg)
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Normal range: &lt;120 mmHg</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="e.g. 120" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>

                          )}
                      />

                      <FormField
                          control={vitalsForm.control}
                          name="diastolicBP"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center">
                                  Diastolic Blood Pressure (mmHg)
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Normal range: &lt;80 mmHg</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="e.g. 80" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />
                      <FormField
                          control={vitalsForm.control}
                          name="pulse"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel>Poul (bpm)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="e.g. 75" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />
                    </div>

                    <FormField
                        control={vitalsForm.control}
                        name="glucose"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center">
                                Fasting Blood Glucose (mg/dL)
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Normal range: 70-100 mg/dL</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="e.g. 95" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                    />
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => handlePrevTab("vitals")}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button onClick={() => handleNextTab("vitals")}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Patient History</CardTitle>
                <CardDescription>Select any relevant medical conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...historyForm}>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <FormField
                            control={historyForm.control}
                            name="hasDiabetes"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Diabetes Mellitus</FormLabel>
                                  </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={historyForm.control}
                            name="hasHypertension"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Hypertension</FormLabel>
                                  </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={historyForm.control}
                            name="hasCardiovascularDisease"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Cardiovascular Disease</FormLabel>
                                  </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={historyForm.control}
                            name="hasCKDFamilyHistory"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Family History of CKD</FormLabel>
                                  </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={historyForm.control}
                            name="hasRetinopathy"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Retinopathy</FormLabel>
                                  </div>
                                </FormItem>
                            )}
                        />
                      </div>

                      <div className="space-y-4">
                        <FormField
                            control={historyForm.control}
                            name="smoker"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Current Smoker</FormLabel>
                                  </div>
                                </FormItem>
                            )}
                        />



                        <FormField
                            control={historyForm.control}
                            name="hasNephropathy"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Nephropathy</FormLabel>
                                  </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={historyForm.control}
                            name="hasNeuropathy"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Neuropathy</FormLabel>
                                  </div>
                                </FormItem>
                            )}
                        />
                        {/* Oligurie */}
                        <FormField
                            control={historyForm.control}
                            name="hasOliguria"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Oligurie</FormLabel>
                                  </div>
                                </FormItem>
                            )}
                        />
                        {/* OMI */}
                        <FormField
                            control={historyForm.control}
                            name="hasOmi"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Œdème des membres inférieurs (OMI)</FormLabel>
                                  </div>
                                </FormItem>
                            )}
                        />
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => handlePrevTab("history")}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button onClick={handleSubmit}>
                  <Save className="mr-2 h-4 w-4" /> Generate Prediction
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  )
}

export default NewPrediction
