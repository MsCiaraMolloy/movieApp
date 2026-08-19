import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import { getMoviesBySearch } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import MovieSearchForm from "../components/movieSearchForm";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const MovieSearchPage: React.FC = () => {
    const [year, setYear] = useState("");
    const [certification, setCertification] = useState("");
    const [page, setPage] = useState(1);
    const [hasSearched, setHasSearched] = useState(false);

    const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
        ["search", year, certification, page],
        () => getMoviesBySearch(year, certification, page),
        { enabled: hasSearched }
    );

    const handleSearch = (searchYear: string, searchCert: string) => {
        setYear(searchYear);
        setCertification(searchCert);
        setPage(1);
        setHasSearched(true);
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{(error as Error).message}</h1>;
    }

    const movies = data ? data.results : [];
    const totalPages = data ? data.total_pages : 0;

    return (
        <>
            <MovieSearchForm onSearch={handleSearch} />
            {hasSearched && movies.length === 0 && !isLoading && (
                <h2>No results found</h2>
            )}
            {movies.length > 0 && (
                <>
                    <PageTemplate
                        title="Search Results"
                        movies={movies}
                        action={(movie: BaseMovieProps) => (
                            <AddToFavouritesIcon {...movie} />
                        )}
                    />
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, padding: 2 }}>
                        <Button
                            variant="contained"
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                        >
                            Previous
                        </Button>
                        <span>Page {page} of {totalPages}</span>
                        <Button
                            variant="contained"
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => p + 1)}
                        >
                            Next
                        </Button>
                    </Box>
                </>
            )}
        </>
    );
};

export default MovieSearchPage;
