import { useContext } from "react";

import { UserContext } from "../context/UserContext";

export const useUser = () => {
    const user = useContext(UserContext)

    if (user === undefined) {
        throw new Error("useUser must be used within a userProvider");
    }

    return user;
}