import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchByName } from "../../store/slice/marvelSlice";

const Header = () => {
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    const searchByName = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        dispatch(fetchByName(name));
        console.log(name)
        setName("");
    };

    return (
        <header>
            <form onSubmit={searchByName}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Hero name"
                />
                <button type="submit">Search</button>
            </form>
        </header>
    );
};

export default Header;