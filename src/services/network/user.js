import {get} from "./service.js";

const getUsers = (callback) => {

    get("users", callback);

}

export const authentication = (data, callback) => {
    getUsers((users) => {
        if(users) {

            const match = users.filter((user => user.email === data.email && user.password === data.password))
            const userLogged = match && match.length > 0 ? match[0] : {}

            callback(userLogged)

        } else {
            callback(null)
        }
    });
}