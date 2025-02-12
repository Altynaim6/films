import axios from "axios";
import md5 from "md5";

const publicKey = "9c9b9d57fb5fa54e3d05d93aacfeabee";
const privateKey = "e05009a239f93efb7c152e1c44fa9a6bad5497de";
const ts = new Date().getTime();
const hash = md5(ts + privateKey + publicKey);

const instance = axios.create({
    baseURL: "https://gateway.marvel.com/v1/public/",
    headers: {
        "Content-Type": "application/json",
    },
});

export const marvelAPI = {
    getAllCharacters() {
        return instance.get("characters", {
            params: { ts, apikey: publicKey, hash },
        });
    },
    getByName(name) {
        return instance.get(`characters?name=${name}`, {
            params: { ts, apikey: publicKey, hash },
        });
    },
    getComicsByCharacterId(characterId) {
        return instance.get(`characters/${characterId}/comics`, {
            params: { ts, apikey: publicKey, hash },
        });
    }
    
       

};