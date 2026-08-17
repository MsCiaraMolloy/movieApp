import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { BaseMovieProps } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";


const UpcomingMoviesPage: React.FC = () => {
    const { data: movies, error, isLoading, isError } = useQuery<BaseMovieProps[], Error>(
        "upcoming",
        getUpcomingMovies
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    return (
        <>
            {movies ? (
                <PageTemplate
                    title="Upcoming Movies"
                    movies={movies}
                    action={(movie: BaseMovieProps) => (
                      <>
                        <AddToFavouritesIcon {...movie} />
                        <IconButton aria-label="add to must watch">
                          <PlaylistAddIcon color="primary" fontSize="large" />
                        </IconButton>
                      </>
                    )}
                />
            ) : (
                <p>Waiting for upcoming movies</p>
            )}
        </>
    );
};

export default UpcomingMoviesPage;
