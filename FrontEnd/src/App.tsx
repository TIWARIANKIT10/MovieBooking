
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,

} from "react-router-dom";

import RootLayout from "./layout/RootLayout";
import Movies from "./pages/Movies";
import Home from "./pages/Home";
import MoviesDetails from "./pages/MoviesDetails";
import SeatLayout from "./pages/SeatLayout";
import MyBookings from "./pages/MyBookings";
import Favorite from "./pages/Favorite";
import { Theater } from "lucide-react";
import Releases from './pages/Releases'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* Home */}
      <Route index element={<Home/>} />
      
      {/* Movies */}
      <Route path="movies" element={<Movies />} />
      <Route path="movies/:id" element={<MoviesDetails />} />
      <Route path="movies/:id/:date" element={<SeatLayout />} />

      {/* Theaters & Favorites */}
      <Route path="theaters" element={<Theater />} />
      <Route path="favorites" element={<Favorite />} />

      {/* My Bookings */}
      <Route path="my-bookings" element={<MyBookings />} />

      {/* Optional redirect for old capitalized paths */}
      <Route path="Releases" element={<Releases/>} />
    </Route>
  )
);

const App = () => <RouterProvider router={router} />;

export default App;
