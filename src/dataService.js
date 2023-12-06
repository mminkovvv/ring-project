import { api } from "./api.js";

const dataEndPoints = {
    getAll: "data/characters?sortBy=_createdOn%20desc",
    singleCharacter: "data/characters/",
    addCharacter: "/data/characters"
}

async function getAllCharacters() {
    return api.get(dataEndPoints.getAll);
}

async function getSingleCharacter(id) {
    return api.get(dataEndPoints.singleCharacter + id);
}

async function createCharacter(data) {
    return api.post(dataEndPoints.addCharacter, data);
}

async function updateCharacter(id, data) {
    return api.put(dataEndPoints.singleCharacter + id, data);
}

async function deleteCharacter(id) {
    return api.del(dataEndPoints.singleCharacter + id);
}


export const dataService = {
    getAllCharacters,
    getSingleCharacter,
    createCharacter,
    updateCharacter,
    deleteCharacter,
};
