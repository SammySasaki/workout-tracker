import { getSplit, getWorkouts } from '../apiCalls';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

const Home = () => {
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [workouts, setWorkouts] = useState([]);
    const [hasSplit, setHasSplit] = useState(false);
    const [split, setSplit] = useState(null);
    const [doingToday, setDoingToday] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            await getSplit(username)
                .then((res) => {
                    setSplit(res.data);
                    setHasSplit(true);
                    const d = new Date();
                    const weekday = ["Su","M","T","W","Th","F","S"];
                    const dayofweek = weekday[d.getDay()];
                    setDoingToday(res.data[dayofweek]);
                })
                .catch(e => console.log(e));
            await getWorkouts(username)
                .then((res) => {
                    setWorkouts(res.data)
                    console.log(res.data)
                })
        };
        fetchData();
      }, []);
    return (
        <>
            <div className="App-header">Workout Tracker</div>
            <div className="content">
                {!hasSplit ? (
                    <>
                        <p>No split made</p>
                        <Button href="/create-split">Create a Split</Button>
                    </>
                ) : (
                    <>
                        <p>Split:</p>
                        <table>
                            <thead>
                                <tr className="table-elem">
                                    <th>Monday</th>
                                    <th>Tuesday</th>
                                    <th>Wednesday</th>
                                    <th>Thursday</th>
                                    <th>Friday</th>
                                    <th>Saturday</th>
                                    <th>Sunday</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="table-elem">
                                    <td>{split.M}</td>
                                    <td>{split.T}</td>
                                    <td>{split.W}</td>
                                    <td>{split.Th}</td>
                                    <td>{split.F}</td>
                                    <td>{split.S}</td>
                                    <td>{split.Su}</td>
                                </tr>
                            </tbody>
                        </table>
                        <Button href="/create-split">Choose new Split</Button>
                        <h1>Today we are doing: {doingToday}</h1>
                    </>
                )}
                <Button href="/workout-history">View History</Button>
                <h1>My Workouts</h1>
                <ul className="exercise-item">
                    {workouts[0] ? (workouts.map((workout, i) => (
                        <div key={i}>
                            <p>{workout.name}</p>
                            <p>Last Done: {workout.last_done}</p>
                            <Button href={`/view-workout/${workout.id}`} size="sm">View Workout</Button>
                            <Button variant="success" href={`/do-workout/${workout.id}`} size="sm">Do Workout</Button>
                        </div>
                    ))
                    ) : (
                        <p>no workouts created</p>
                    )}
                </ul>
                <Button href="/create-workout">Create new workout</Button>
            </div>
        </>
    )
}

export default Home;