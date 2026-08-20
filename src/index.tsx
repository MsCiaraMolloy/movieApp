import React from "react";
import ReactDOM from 'react-dom/client'
import SiteHeader from './components/siteHeader'
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import MovieSearchPage from "./pages/movieSearchPage";
//Draft 2 
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

//Draft 2 Creating colours scheme before app component
const theme = createTheme({
  palette: {
    primary: {
      main: "#474769ff",   // dark navy - used for AppBar, buttons etc
    },
    secondary: {
      main: "#fa634cff",   // red/pink - used for secondary buttons, icons
    },
  },
});

//Draft 2 Wrap app with the theme.
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />  
          <MoviesContextProvider>
            <Routes>
              <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
              <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/reviews/:id" element={<MovieReviewPage/>} />
              <Route path="/movies/search" element={<MovieSearchPage />} />
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            </Routes>
          </MoviesContextProvider>   
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

