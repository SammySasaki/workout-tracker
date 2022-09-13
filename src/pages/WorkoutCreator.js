import React, { useState } from 'react';
import { createExercise, createExerciseHistory, createWorkout } from '../apiCalls';

const WorkoutCreator = () => {
    const [workoutName, setWorkoutName] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [exerciseIDs, setExerciseIDs] = useState([]);
    const [currName, setCurrName] = useState('');
    const [currMuscles, setCurrMuscles] = useState([]);
    const [currEquipment, setCurrEquipment] = useState('');
    const [setsPer, setSetsPer] = useState([]);
    const [repRanges, setRepRanges] = useState([]);
    const username = localStorage.getItem('username');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await createExercise(currName, currMuscles, currEquipment);
        const exerciseID = response.data.id;
        setExerciseIDs(exerciseIDs.concat(response.data.id));
        setExercises(exercises.concat([response.data]));
        setsPer.push(' ');
        repRanges.push(' ');
        await createExerciseHistory(username, exerciseID);
        setCurrName('');
        setCurrMuscles('');
        setCurrEquipment('');
    }

    const generateWorkout = async (event) => {
        event.preventDefault();
        await createWorkout(username, workoutName, exerciseIDs, setsPer, repRanges)
        window.location.replace('https://workout-manager-ss.herokuapp.com/');
    }

    return (
        <>
            <div className="App-header">Create Workout</div>
            <div className="add-form">
                <h1>Add an exercise</h1>
                <form onSubmit={handleSubmit}>
                    <label className="add-exercise">
                        Exercise name:
                        <input type="text" value={currName} onChange={(e) => setCurrName(e.target.value)} />
                    </label>
                    <label className="add-exercise">
                        Muscles worked(input separated by commas):
                        <input type="text" value={currMuscles} onChange={(e) => setCurrMuscles(e.target.value.split(","))} />
                    </label>
                    <label className="add-exercise">
                        Equipment:
                        <input type="text" value={currEquipment} onChange={(e) => setCurrEquipment(e.target.value)} />
                    </label>
                    <input type="submit" value="Add Exercise" />
                </form>
            </div>
            <div className="workout-list">
                <form onSubmit={generateWorkout}>
                    <label>
                        Workout Name:
                        <input type="text" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} />
                    </label>
                    <ul>
                        {exercises.map((exercise, i) => (
                            <div key={i}>
                                <h1>{exercise.name}</h1>
                                <label>
                                    Sets
                                    <input type="text" onChange={(e) => setsPer[i] = e.target.value} />
                                </label>  
                                <label>
                                    Rep Range(min - max)
                                <input type="text" onChange={(e) => repRanges[i] = e.target.value} />
                                </label> 
                            </div>
                        ))}
                    </ul>
                    <input type="submit" value="Save Workout" />
                </form>
            </div>
            <h1>Exercises</h1>
            {/* <ExerciseList exercises={exercises} /> */}
        </>
    )
}

export default WorkoutCreator;