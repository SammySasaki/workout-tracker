import axios from 'axios';


axios.defaults.baseURL = 'https://workout-manager-ss.herokuapp.com/api';
export const getToken = (username, password) => {
    const data = {
        username: username,
        password: password
    }
    return axios.post('/dj-rest-auth/login/', data)
}

export const register = (username, password1, password2) => {
    const data = {
        username: username,
        password1: password1,
        password2: password2
    }
    return axios.post('/dj-rest-auth/registration/', data)
}

const token = localStorage.getItem('token');

export const logout = async () => {
    localStorage.clear()
    window.location = window.location.origin
    await axios.post('/dj-rest-auth/logout/')
}

export const getUser = () => {
    return axios.get(`/users/${token}`)
}

export const editSplit = (user, name, m, t, w, th, f, s, su) => {
    const data = {
        name: name,
        M: m,
        T: t,
        W: w,
        Th: th,
        F: f,
        S: s,
        Su: su
    };
    
    return axios.put(`/splits/${user}`, data, {
        headers: {
            Authorization: 'Token ' + token 
        }
    })
}

export const makeSplit = (user, name, m, t, w, th, f, s, su) => {
    const data = {
        name: name,
        M: m,
        T: t,
        W: w,
        Th: th,
        F: f,
        S: s,
        Su: su,
        owner: user
    };
    return axios.post(`/splits`, data, {
        headers: {
            Authorization: 'Token ' + token 
        }
    });
}

export const getSplit = (user) => {
    return axios.get(`/splits/${user}`, {
        headers: {
            Authorization: 'Token ' + token 
        }
    });
}

export const createExercise = (name, muscles, equipment) => {
    const data = {
        name: name,
        muscles: muscles,
        equipment: equipment
    }
    return axios.post(`/exercises`, data, {
        headers: {
            Authorization: 'Token ' + token 
        }
    })
}

export const createExerciseHistory = (username, exerciseID) => {
    const data = {
        owner: username,
        exercise: exerciseID
    }
    return axios.post(`logged_exercises`, data, {
        headers: {
            Authorization: 'Token ' + token 
        }
    })
}

export const createWorkout = (username, name, exercises, setsPer, repRanges) => {
    const data = {
        name: name,
        exercises: exercises,
        sets_per: setsPer,
        rep_ranges: repRanges,
        owner: username
    };
    return axios.post(`workouts`, data, {
        headers: {
            Authorization: 'Token ' + token 
        }
    });
}

// pagination?
export const getWorkouts = (user) => {
    return axios.get(`/workouts/user/${user}`, {
        headers: {
            Authorization: 'Token ' + token 
        }
    });
}

export const getWorkout = (id) => {
    return axios.get(`workouts/${id}`, {
        headers: {
            Authorization: 'Token ' + token 
        }
    });
}

export const getUserExerciseHistory = (user, id) => {
    return axios.get(`logged_exercises/${user}/${id}`, {
        headers: {
            Authorization: 'Token ' + token 
        }
    });
}

export const getExerciseHistoryForWorkout = async (user, workoutID) => {
    const workout = await getWorkout(workoutID);
    const numExercises = workout.data.exercises.length;
    const res = []
    for (let i = 0; i < numExercises; i++) {
        const exerciseHistory = await getUserExerciseHistory(user, workout.data.exercises[i]);
        res.push(exerciseHistory);
    }
    return res;
}

export const getExercise = (id) => {
    return axios.get(`/exercises/${id}`, {
        headers: {
            Authorization: 'Token ' + token 
        }
    });
}

const updateExerciseHistory = async (exerciseID, topWeight, topReps, user) => {
    const response = await getUserExerciseHistory(user, exerciseID);
    var max = response.data[0].max_set[0];
    var reps = response.data[0].max_set[1];
    const historyID = response.data[0].id;
    if (topWeight > max) {
        max = topWeight
        reps = topReps
    }
    const data = {
        id: historyID,
        last_set: [topWeight, topReps],
        max_set: [max, reps],
        owner: user,
        exercise: exerciseID
    }
    axios.put(`/logged_exercises/${user}/${exerciseID}`, data, {
        headers: {
            Authorization: 'Token ' + token 
        }
    });
}

export const logWorkout = async (exerciseIDs, exerciseHists, topWeights, topReps, user, name, id) => {
    const len = exerciseIDs.length;
    for (let i = 0; i < len; i++) {
        await updateExerciseHistory(exerciseIDs[i], topWeights[i], topReps[i], user)
    }
    const data = {
        name: name,
        workout: id,
        owner: user
    }
    axios.post(`logged_workout`, data, {
        headers: {
            Authorization: 'Token ' + token 
        }
    });
}

export const getLog = (user) => {
    return axios.get(`/logged_workout/${user}`)
}