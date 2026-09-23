import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Teams from "./pages/Teams";
import Hero from "./components/Hero";
import Message from "./components/Message";
import AboutUs from "./components/AboutUs";
import ActivityPage from "./components/ActivityPage";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import Events from "./components/Events";
import Notices from "./pages/Notices";
import SEO from "./components/SEO";
import { getBreadcrumbSchema } from "./lib/seo.js";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <>
              <SEO
                canonicalUrl="/"
                image="/og-image.png"
                schema={getBreadcrumbSchema([{ name: "Home", item: "/" }])}
              />
              <Hero />
              <Message />
            </>
          }
        />
        <Route path="/notice" element={<Notices />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activity/:domainId" element={<ActivityPage />} />
        <Route path="/schemes" element={<GovernmentSchemes />} />
      </Route>
    </Routes>
  );
}
