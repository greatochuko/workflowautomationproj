
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { SidebarProvider } from "@/components/ui/sidebar";

// Import pages
import Login from "@/pages/Login";
import MainPage from "@/pages/MainPage";
import Calendar from "@/pages/Calendar";
import Profile from "@/pages/Profile";
import ChangePassword from "@/pages/ChangePassword";
import Users from "@/pages/Users";
import TaskHistory from "@/pages/TaskHistory";
import InstagramDM from "@/pages/InstagramDM";
import NewsletterTemplate from "@/pages/NewsletterTemplate";
import YouTubeRepurposing from "@/pages/YouTubeRepurposing";
import AdTracking from "@/pages/AdTracking";
import SharedDocument from "@/pages/SharedDocument";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SidebarProvider>
          <Router>
            <div className="min-h-screen bg-background w-full">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <MainPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <MainPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/calendar"
                  element={
                    <ProtectedRoute>
                      <Calendar />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ad-tracking"
                  element={
                    <ProtectedRoute>
                      <AdTracking />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/change-password"
                  element={
                    <ProtectedRoute>
                      <ChangePassword />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute>
                      <Users />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/history"
                  element={
                    <ProtectedRoute>
                      <TaskHistory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/instagram-dm"
                  element={
                    <ProtectedRoute>
                      <InstagramDM />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/newsletter-template"
                  element={
                    <ProtectedRoute>
                      <NewsletterTemplate />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/youtube-repurposing"
                  element={
                    <ProtectedRoute>
                      <YouTubeRepurposing />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/shared-docs/:documentId"
                  element={
                    <ProtectedRoute>
                      <SharedDocument />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Toaster />
          </Router>
        </SidebarProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
