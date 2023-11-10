import {IP_ADDRESS} from 'react-native-dotenv';
const get = async (url) => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error("bug axios", error)
        throw error
    }
}


export const getLeaderboard = async () => {
    const leaderboard = await get(`http://${IP_ADDRESS}:3000/users/leaderboard`)
    if (leaderboard && leaderboard.length > 0) {
        leaderboard.forEach(user => {
            const score = user.info.statistics.glass * 2 + user.info.statistics.plastic * 1 + user.info.statistics.organic * 1.5;
            user.score = score;
        });
        leaderboard.sort((a, b) => b.score - a.score);
    }
    return leaderboard
}

export const getUser = async (id) => {
    return await get(`http://${IP_ADDRESS}:3000/users/` + id)
}

export const getUserByEmail = async (email) => {
    return await get(`http://${IP_ADDRESS}:3000/users/email/` + email)
}

export const getUserInfo = async (id) => {
    return await get(`http://${IP_ADDRESS}:3000/users/informations/` + id)
}