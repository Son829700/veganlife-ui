import { Routes, Route } from "react-router-dom";

import AppLayout from "../layout/AppLayout";
import HomePage from "../pages/home/HomePage";
import AboutPage from "../pages/about/AboutPage";
import ResourcePage from "../pages/resource/ResourcePage";
import CoachingPage from "../pages/coaching/CoachingPage";
import CoachingDashboard from "../pages/dashboard/CoachingDashboard";
import CommunityPage from "../pages/community/CommunityPage";
import OnboardingPage from "../pages/dashboard/OnboardingPage";
import OAuth2RedirectHandler from "../components/others/OAuth2RedirectHandler";
import PaymentPage from "../pages/payment/PaymentPage";
import ScrollToTop from "../components/others/ScrollToTop";

// Admin Pages
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUserPage from "../pages/admin/ManageUserPage";
import ManageCoachPage from "../pages/admin/ManageCoachPage";
import ManageSessionsPage from "../pages/admin/ManageSessionsPage";
import ManageResourcesPage from "../pages/admin/ManageResourcesPage";
import AdminSettingsPage from "../pages/admin/AdminSettingsPage";
import AddResourcePage from "../pages/admin/AddResourcePage";
import ReadingPage from "../pages/resource/ReadingPage";


import CoachLayout from "../layout/CoachLayout";
import DashBoardCoach from "../components/coach/DashBoardCoach";
import SessionTab from "../components/coach/SessionTab";
import SettingsTab from "../components/coach/SettingsTab";
import MessagesTabCoach from "../components/coach/MessagesTabCoach";

export default function AppRoute() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="resources" element={<ResourcePage />} />
          <Route path="coaching" element={<CoachingPage />} />
          <Route path="coaching-dashboard" element={<CoachingDashboard />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="onboarding" element={<OnboardingPage />} />
          <Route path="/resources/:id" element={<ReadingPage />} />
          <Route path="/oauth2/success" element={<OAuth2RedirectHandler />} />
          <Route path="/payment" element={<PaymentPage />} />


        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<ManageUserPage />} />
          <Route path="coaches" element={<ManageCoachPage />} />
          <Route path="sessions" element={<ManageSessionsPage />} />
          <Route path="resources" element={<ManageResourcesPage />} />
          <Route path="resources/add" element={<AddResourcePage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        <Route path="/coach" element={<CoachLayout />}>
          <Route index element={<DashBoardCoach />} />
          <Route path="sessions" element={<SessionTab />} />
          <Route path="settings" element={<SettingsTab />} />
          <Route path="messages" element={<MessagesTabCoach />} />
        </Route>

      </Routes>
    </>

  );
}
