import React from "react";
import { useQuery } from "react-query";
import { getMovieCast } from "../../api/tmdb-api";
import { MovieDetailsProps, CastMember } from "../../types/interfaces";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Spinner from "../spinner";

const MovieCast: React.FC<MovieDetailsProps> = (movie) => {
    const { data: cast, isLoading, isError } = useQuery<CastMember[], Error>(
        ["cast", movie.id],
        () => getMovieCast(movie.id)
    );

    if (isLoading) return <Spinner />;
    if (isError) return <p>Error loading cast</p>;

    return (
        <Grid container spacing={2} sx={{ padding: 2 }}>
            {cast?.slice(0, 12).map((member) => (
                <Grid item xs={6} sm={4} md={2} key={member.id} sx={{ textAlign: "center" }}>
                    <Avatar
                        src={member.profile_path
                            ? `https://image.tmdb.org/t/p/w200/${member.profile_path}`
                            : undefined}
                        sx={{ width: 80, height: 80, margin: "auto" }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: "bold", mt: 1 }}>
                        {member.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {member.character}
                    </Typography>
                </Grid>
            ))}
        </Grid>
    );
};

export default MovieCast;
