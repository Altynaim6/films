import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, Link } from "react-router-dom";
import { fetchComicsByCharacterId } from "../../store/slice/marvelSlice";
import Loader from "../../components/Loader/Loader";
import styles from "./Comics.module.css";

const ComicsList = () => {
    const { characterId } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const { comics, status } = useSelector((state) => state.marvel);

    const name = new URLSearchParams(location.search).get('name'); 
    useEffect(() => {
        dispatch(fetchComicsByCharacterId(characterId));
    }, [characterId, dispatch]);

    if (status === "loading") return <div className={styles.loaderWrapper}><Loader /></div>;
    if (status === "failed") return <p className={styles.errorMessage}>Error loading comics</p>;
    if (comics.length === 0) return <p className={styles.errorMessage}>No comics found.</p>;

    return (
        <>
            <div className={styles.comicsContainer}>
                <h1 className={styles.title}>
                    Comics with {name}
                </h1>
                <ul className={styles.comicList}>
                    {comics.map((comic) => (
                        <li key={comic.id} className={styles.comicItem}>
                            <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
                            <p>{comic.title}</p>
                        </li>
                    ))}
                </ul>
                <Link to="/" className={styles.backButton}>Back</Link>
            </div>
        </>
    );
};

export default ComicsList;