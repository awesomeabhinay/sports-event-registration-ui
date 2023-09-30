import { useEffect, useState } from "react"

const useUser = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUser(storedUsername);
        }
    }, []);

    const login = (currUser) => {
        setUser({ currUser });
        localStorage.setItem('username', currUser);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('username');
    };

    return { user, login, logout };
}

export default useUser;