import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWorkout, getExerciseHistoryForWorkout, getExercise } from "../apiCalls";

const ViewWorkout = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [workout, setWorkout] = useState(null);
    const [exerciseNames, setExerciseNames] = useState([]);
    const [exerciseHists, setExerciseHists] = useState([])
    const username = localStorage.getItem('username')

    useEffect(() => {
        const fetchData = async (id) => {
            await getWorkout(id)
                .then((res) => {
                    setWorkout(res.data)
                    setName(res.data.name)
                })
            const exerciseHistory = await getExerciseHistoryForWorkout(username, id);
            setExerciseHists(exerciseHistory);
            const names = [];
            const len = exerciseHistory.length;
            for (let i = 0; i < len; i++) {
                const exerciseData = await getExercise(exerciseHistory[i].data[0].exercise);
                names.push(exerciseData.data.name);
            }
            setExerciseNames(names);
        }
        fetchData(id);
    }, []);

    return (
        <>
            <h1>Workout: {name}
                <Button href={`/do-workout/${id}`}>Do Workout</Button>
            </h1>
            {exerciseNames.map((name, i) => (
                <li className="exercise-item" key={i}>
                    <h3>{name}</h3>
                    <div>Sets: {workout.sets_per[i]}</div>
                    <div>Reps: {workout.rep_ranges[i]}</div>
                    {exerciseHists[i].data[0].max_set.length > 0 ? (
                        <div>Max Set: {exerciseHists[i].data[0].max_set[1]} x {exerciseHists[i].data[0].max_set[0]}</div>
                    ) : (
                        <div>No history available</div>
                    )}
                </li>
            ))}
        </>
    )
}

export default ViewWorkout;