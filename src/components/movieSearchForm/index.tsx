//Same imports from filterMoviesCard/index.tsx
import React, { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

const styles = {
    formControl: {
        margin: 1,
        minWidth: 220,
        backgroundColor: "rgb(255, 255, 255)",
    },
};

//American ratings
const certifications = ["G", "PG", "PG-13", "R", "NC-17"];

//define interface for props
interface MovieSearchFormProps {
    onSearch: (year: string, certification: string) => void;
}

//Using useState for form fields 
const MovieSearchForm: React.FC<MovieSearchFormProps> = ({ onSearch }) => {
    const [year, setYear] = useState("");
    const [certification, setCertification] = useState("");

    const handleSubmit = () => {
        onSearch(year, certification);
    };

    //same as filterMoviesCard
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h1">
                    <SearchIcon fontSize="large" />
                    Search Movies
                </Typography>
                <TextField
                    sx={styles.formControl}
                    id="year-input"
                    label="Release Year"
                    type="number"
                    value={year}
                    variant="filled"
                    onChange={(e) => setYear(e.target.value)}
                />
                <FormControl sx={styles.formControl}>
                    <InputLabel id="certification-label">Certification</InputLabel>
                    <Select
                        labelId="certification-label"
                        id="certification-select"
                        value={certification}
                        onChange={(e: SelectChangeEvent) => setCertification(e.target.value)}
                    >
                        {certifications.map((cert) => (
                            <MenuItem key={cert} value={cert}>
                                {cert}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ marginTop: 2 }}
                >
                    Search
                </Button>
            </CardContent>
        </Card>
    );
};

export default MovieSearchForm;
