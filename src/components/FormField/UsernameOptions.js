import {api, handleError} from "../../helpers/api";
import {useEffect, useState} from "react";

const UsernameOptions = () => {
    const [usernames,setUsernames] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get('/users');
                const usersWithOutMe = response.data.filter((user) =>
                    (user.id !== Number(localStorage.getItem("id") )))
                const otherUsernames = usersWithOutMe.map((usersWithOutMe) => usersWithOutMe.username)
                setUsernames(otherUsernames);
            } catch (error) {
                alert("Something went wrong while fetching the usernames!");
            }
        }
        fetchData();
    }, []);
    return (
        usernames
    )
}
export default UsernameOptions;