import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getPopularActors } from "../api/tmdb-api";
import { Actor } from "../types/interfaces";
import Spinner from "../components/spinner";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";

const TOTAL_QUESTIONS = 3;

const QuizPage: React.FC = () => {
    // Pick a random page (1-20) so the actors vary each time
    const [randomPage] = useState(() => Math.floor(Math.random() * 20) + 1);

    const { data, isLoading, isError, error } = useQuery(
        ["popularActors", randomPage],
        () => getPopularActors(randomPage)
    );

    const [questionNumber, setQuestionNumber] = useState(1);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [guess, setGuess] = useState("");
    const [feedback, setFeedback] = useState("");
    const [quizActors, setQuizActors] = useState<Actor[]>([]);

    // When data arrives, pick 3 random actors that have known_for movies
    useEffect(() => {
        if (data?.results) {
            const usable = data.results.filter(
                (a: Actor) => a.profile_path && a.known_for.length > 0
            );
            const shuffled = [...usable].sort(() => 0.5 - Math.random());
            setQuizActors(shuffled.slice(0, TOTAL_QUESTIONS));
        }
    }, [data]);

    if (isLoading) return <Spinner />;
    if (isError) return <h1>{(error as Error).message}</h1>;
    if (quizActors.length === 0) return <Spinner />;

    const currentActor = quizActors[questionNumber - 1];

    const checkAnswer = () => {
        const answer = guess.trim().toLowerCase();
        const correct = currentActor.known_for.some((m) =>
            (m.title || m.name || "").toLowerCase().includes(answer)
        );

        if (answer && correct) {
            setScore((s) => s + 1);
            setFeedback("Correct!");
        } else {
            const titles = currentActor.known_for
                .map((m) => m.title || m.name)
                .join(", ");
            setFeedback(`Wrong. They are known for: ${titles}`);
        }
    };

    const nextQuestion = () => {
        setGuess("");
        setFeedback("");
        if (questionNumber < TOTAL_QUESTIONS) {
            setQuestionNumber((n) => n + 1);
        } else {
            setFinished(true);
        }
    };

    const restart = () => {
        setQuestionNumber(1);
        setScore(0);
        setFinished(false);
        setGuess("");
        setFeedback("");
        // reshuffle from existing data
        const usable = data.results.filter(
            (a: Actor) => a.profile_path && a.known_for.length > 0
        );
        const shuffled = [...usable].sort(() => 0.5 - Math.random());
        setQuizActors(shuffled.slice(0, TOTAL_QUESTIONS));
    };

    if (finished) {
        return (
            <Box sx={{ textAlign: "center", padding: 4 }}>
                <Typography variant="h4">Quiz Complete!</Typography>
                <Typography variant="h5" sx={{ mt: 2 }}>
                    You scored {score} out of {TOTAL_QUESTIONS}
                </Typography>
                <Button variant="contained" sx={{ mt: 3 }} onClick={restart}>
                    Play Again
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 4 }}>
            <Typography variant="h4">Guess a Movie This Actor Is In</Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
                Question {questionNumber} of {TOTAL_QUESTIONS}
            </Typography>
            <Card sx={{ maxWidth: 300, mt: 2 }}>
                <CardMedia
                    component="img"
                    height="400"
                    image={`https://image.tmdb.org/t/p/w300/${currentActor.profile_path}`}
                    alt={currentActor.name}
                />
                <CardContent>
                    <Typography variant="h6">{currentActor.name}</Typography>
                </CardContent>
            </Card>
            <TextField
                label="Name a movie"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                sx={{ mt: 2, backgroundColor: "white" }}
                disabled={feedback !== ""}
            />
            {feedback === "" ? (
                <Button variant="contained" sx={{ mt: 2 }} onClick={checkAnswer}>
                    Submit
                </Button>
            ) : (
                <>
                    <Typography variant="h6" sx={{ mt: 2 }}>{feedback}</Typography>
                    <Button variant="contained" sx={{ mt: 1 }} onClick={nextQuestion}>
                        {questionNumber < TOTAL_QUESTIONS ? "Next Question" : "See Results"}
                    </Button>
                </>
            )}
        </Box>
    );
};

export default QuizPage;
