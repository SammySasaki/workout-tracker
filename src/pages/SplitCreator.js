import React, { useState, useEffect } from 'react';
import { editSplit, getSplit, makeSplit } from '../apiCalls';

const SplitCreator = () => {
    const [name, setName] = useState('');
    const [m, setM] = useState('');
    const [t, setT] = useState('');
    const [w, setW] = useState('');
    const [th, setTh] = useState('');
    const [f, setF] = useState('');
    const [s, setS] = useState('');
    const [su, setSu] = useState('');
    const [error, setError] = useState(null);
    const [hasSplit, setHasSplit] = useState(false);
    const user = localStorage.getItem('username')

    useEffect(() => {
        const fetchData = async () => {
            await getSplit(user)
                .then((res) => {
                    console.log(res);
                    if (res.data) {
                        setHasSplit(true)
                    }
                })
                .catch(e => console.log(e));
        };
        fetchData();
    }, []);

    const handleSubmit= async (event) => {
        event.preventDefault();
        if (name === '' || m === '' || t === '' || w === '' || th === '' || f === '' || s === '' || su === '') {
            setError(true);
        } else {
            if (hasSplit) {
                await editSplit(user, name, m, t, w, th, f, s, su);
                window.location.replace('https://workout-manager-ss.herokuapp.com/');
            } else {
                await makeSplit(user, name, m, t, w, th, f, s, su);
                window.location.replace('https://workout-manager-ss.herokuapp.com/');
            }
        }
    }

    return (
        <>
            <div className="App-header">Create Split</div>
            <div className="Add-split">
                <form onSubmit={handleSubmit}>
                    <label className="Split-name">
                        Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label className="Split-day">
                        Monday:
                        <input type="text" value={m} onChange={(e) => setM(e.target.value)} />
                    </label>
                    <label className="Split-day">
                        Tuesday:
                        <input type="text" value={t} onChange={(e) => setT(e.target.value)} />
                    </label>
                    <label className="Split-day">
                        Wednesday:
                        <input type="text" value={w} onChange={(e) => setW(e.target.value)} />
                    </label>
                    <label className="Split-day">
                        Thursday:
                        <input type="text" value={th} onChange={(e) => setTh(e.target.value)} />
                    </label>
                    <label className="Split-day">
                        Friday:
                        <input type="text" value={f} onChange={(e) => setF(e.target.value)} />
                    </label>
                    <label className="Split-day">
                        Saturday:
                        <input type="text" value={s} onChange={(e) => setS(e.target.value)} />
                    </label>
                    <label className="Split-day">
                        Sunday:
                        <input type="text" value={su} onChange={(e) => setSu(e.target.value)} />
                    </label>
                    <input className="Creator-button" type="submit" value="Confirm" />
                </form>
            </div>
        </>
    )
}

export default SplitCreator;