import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import NewPrediction from "./pages/NewPrediction"
import PredictionResults from "./pages/PredictionResults"
import PredictionHistory from "./pages/PredictionHistory"
import Analytics from "./pages/Analytics"
import Help from "./pages/Help"
import Settings from "./pages/Settings"
import Account from "./pages/Account"
import AppLayout from "./components/AppLayout"
import NotFound from "./pages/NotFound"

// Placeholder component for routes that don't have pages yet
const Admin = () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <p>Admin panel content will appear here.</p>
    </div>
)

const queryClient = new QueryClient()

const App = () => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes (would normally have auth check) */}
            <Route path="/" element={<AppLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="prediction/new" element={<NewPrediction />} />
              <Route path="prediction/results" element={<PredictionResults />} />
              <Route path="predictions" element={<PredictionHistory />} />
              <Route path="predictions/:id" element={<PredictionResults />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="account" element={<Account />} />
              <Route path="settings" element={<Settings />} />
              <Route path="help" element={<Help />} />
              <Route path="admin" element={<Admin />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
)

export default App
