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
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Monday:
                <input type="text" value={m} onChange={(e) => setM(e.target.value)} />
            </label>
            <label>
                Tuesday:
                <input type="text" value={t} onChange={(e) => setT(e.target.value)} />
            </label>
            <label>
                Wednesday:
                <input type="text" value={w} onChange={(e) => setW(e.target.value)} />
            </label>
            <label>
                Thursday:
                <input type="text" value={th} onChange={(e) => setTh(e.target.value)} />
            </label>
            <label>
                Friday:
                <input type="text" value={f} onChange={(e) => setF(e.target.value)} />
            </label>
            <label>
                Saturday:
                <input type="text" value={s} onChange={(e) => setS(e.target.value)} />
            </label>
            <label>
                Sunday:
                <input type="text" value={su} onChange={(e) => setSu(e.target.value)} />
            </label>
            <input className="Creator-button" type="submit" value="Confirm" />
        </form>
    )
}

export default SplitCreator;