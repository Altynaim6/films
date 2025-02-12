import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../../store/slice/marvelSlice";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import Loader from "../../components/Loader/Loader";
import styles from "./CharactersList.module.css";

const CharactersList = () => {
  const dispatch = useDispatch();
  const { characters, status, error } = useSelector((state) => state.marvel);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCharacters());
    }
  }, [dispatch, status]);

  if (status === "loading") return <Loader />;
  if (status === "failed") return <p className={styles.error}>Error: {error}</p>;

  return (
    <div className={styles.charactersContainer}>
      <h1 className={styles.title}>Marvel Characters</h1>
      <ul className={styles.charactersGrid}>
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </ul>
    </div>
  );
};

export default CharactersList;