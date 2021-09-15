import http from "../http-common";

class TournamentDataService {
    getAll(page = 0){
        return http.get(`?page=${page}`)
    }

    find(query, by = "name", page = 0){
        return http.get(`?${by}=${query}&page=${page}`)
    }

    createTournament(data){
        return http.post("/import", data)
    }
}

export default new TournamentDataService()