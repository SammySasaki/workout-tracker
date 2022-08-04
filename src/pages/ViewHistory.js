import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import { getLog } from "../apiCalls";

const ViewHistory = () => {
    const username = localStorage.getItem('username');
    const [logData, setLogData] = useState([]);
    useEffect(() => {
        const fetchData = async (username) => {
            await getLog(username)
                .then(res => {
                    setLogData(res.data);
                })
        }
        fetchData(username);
    }, [username]);

    return (
        <>
            <div className="App-header">Your History</div>
            <div className="content">
                {logData[0] ? (logData.map((workout, i) => (
                    <li className="exercise-item" key={i}>
                        <h3>{workout.name}
                        <Button size="sm" href={`view-workout/${workout.workout}`}>view workout</Button></h3>
                        <div>{workout.date}</div>
                    </li>
                    ))
                ) : (
                    <p>no history</p>
                )}
            </div>
        </>
    )
}

export default ViewHistory;