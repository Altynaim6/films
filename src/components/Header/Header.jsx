import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchByName } from "../../store/slice/marvelSlice";
import styles from "./Header.module.css";
import logo from "../../assets/img/logo.png"

const Header = () => {
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    const searchByName = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        dispatch(fetchByName(name));
        // console.log(name);
        setName("");
    };

    return (
        <header className={styles.header}>
            <img width={150} src={logo} alt="Marvel Logo" className={styles.marvelLogo} />
            <form onSubmit={searchByName} className={styles.searchForm}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Hero name"
                    className={styles.searchInput}
                />
                <button type="submit" className={styles.buttonMarvel}>Search</button>
            </form>
        </header>
    );
};

export default Header;