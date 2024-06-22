import { useState } from "react";

// endpoints
const keys = require("../endpoints.json");

interface userData {
    "User": string,
    "Product": string,
    "Quantity": string,
    "Address": string
}

const useDataAPI = (user: string) => {
    const [data, setData] = useState<userData>();
    const target = keys['getDataFromTable'] + user

    fetch(target)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error("Error")
            }
        })
        .then(data => {
            setData(data);
        })
        .catch(err => {
            console.error('Error: ', err)
        })

    return data;
};

export default useDataAPI