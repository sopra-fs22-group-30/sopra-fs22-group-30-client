import {api, handleError} from "../../helpers/api";
import {useEffect, useState} from "react";

const UsernameOptions = () => {
    const [usernames,setUsernames] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get('/users');
                const myUsernames = response.data.map((user) => user.username)
                setUsernames(myUsernames);
            } catch (error) {
                alert("Something went wrong while fetching the usernames!");
            }
        }
        fetchData();
    }, []);
    console.log(usernames);
    return (
        usernames
    )
}
export default UsernameOptions;