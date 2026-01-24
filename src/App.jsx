import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import ScrollToTop from './components/ScrollToTop'

import BookingInquiry from './pages/BookingInquiry'
import IGSpots from './pages/IGSpots'

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'))
const ItineraryPlanner = lazy(() => import('./pages/ItineraryPlanner'))
const Seasons = lazy(() => import('./pages/Seasons'))
const Rooms = lazy(() => import('./pages/Rooms'))
const Fireworks = lazy(() => import('./pages/Fireworks'))
const FoodMap = lazy(() => import('./pages/FoodMap'))
const Activities = lazy(() => import('./pages/Activities'))
const ActivityDetail = lazy(() => import('./pages/ActivityDetail'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
// const IGSpots = lazy(() => import('./pages/IGSpots'))
const MosesSea = lazy(() => import('./pages/MosesSea'))
// const BookingInquiry = lazy(() => import('./pages/BookingInquiry'))

// Loading Spinner Component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="w-16 h-16 border-4 border-ocean-blue border-t-transparent rounded-full animate-spin"></div>
  </div>
)

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="fireworks-2026" element={<Fireworks />} />
            <Route path="itinerary" element={<ItineraryPlanner />} />
            <Route path="seasons" element={<Seasons />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="food-map" element={<FoodMap />} />
            <Route path="activities" element={<Activities />} />
            <Route path="activities/:id" element={<ActivityDetail />} />
            <Route path="moses-sea" element={<MosesSea />} />
            <Route path="booking" element={<BookingInquiry />} />
            <Route path="ig-spots" element={<IGSpots />} />
            {/* <Route path="blog" element={<Blog />} /> */}
            {/* <Route path="blog/:id" element={<BlogDetail />} /> */}
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
