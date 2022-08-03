import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWorkout, getExerciseHistoryForWorkout, getExercise, logWorkout } from "../apiCalls";

const DoWorkout = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [workout, setWorkout] = useState(null);
    const [exerciseNames, setExerciseNames] = useState([]);
    const [exerciseHists, setExerciseHists] = useState([])
    const [exerciseIDs, setExerciseIDs] = useState([]);
    const username = localStorage.getItem('username');
    const [topWeights, setTopWeights] = useState([]);
    const [topReps, setTopReps] = useState([]);

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
            const IDs = [];
            console.log(exerciseHistory);
            const len = exerciseHistory.length;
            for (let i = 0; i < len; i++) {
                const exerciseData = await getExercise(exerciseHistory[i].data[0].exercise);
                names.push(exerciseData.data.name);
                IDs.push(exerciseData.data.id);
                setTopWeights(prevState => 
                    prevState.concat(''));
                setTopReps(prevState => 
                    prevState.concat(''));
            }
            setExerciseNames(names);
            setExerciseIDs(IDs);
        }
        fetchData(id);
    }, [username, id]);

    const finishedWorkout = async (event) => {
        event.preventDefault();
        await logWorkout(exerciseIDs, exerciseHists, topWeights, topReps, username, name, id)
            .then(alert("Good Work!"));
        window.location.replace('http://localhost:3000');
    }

    return (
        <>
            <h1>Current Workout: {name}</h1>
            <form onSubmit={finishedWorkout}>
                {exerciseNames ? (exerciseNames.map((name, i) => (
                    <li className="exercise-item" key={i}>
                        <h3>{name}</h3>
                        <div>Sets: {workout.sets_per[i]}</div>
                        <div>Rep Range: {workout.rep_ranges[i]}</div>
                        <label>
                            Top Set Weight:
                        <input type="number" onChange={(e) => topWeights[i] = e.target.value} />
                        </label>
                        <label>
                            Top Set Reps:
                        <input type="number" onChange={(e) => topReps[i] = e.target.value} />
                        </label>
                        {exerciseHists[i].data[0].max_set.length > 0 ? (
                            <div>Previous Max Set: {exerciseHists[i].data[0].max_set[1]} x {exerciseHists[i].data[0].max_set[0]}</div>
                        ) : (
                            <div>No history available</div>
                        )}
                    </li>
                    ))
                ) : (
                    <p>no exercises</p>
                )}
                <input type="submit" value="Finish Workout" />
            </form>
        </>
    )
}

export default DoWorkout;