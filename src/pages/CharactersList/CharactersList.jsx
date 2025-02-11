import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../../store/slice/marvelSlice";
import CharacterCard from "../../components/CharacterCard/CharacterCard";

const CharactersList = () => {
  const dispatch = useDispatch();
  const { characters, status, error } = useSelector((state) => state.marvel);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCharacters());
    }
  }, [dispatch, status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Marvel Characters</h1>
      <ul>
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </ul>
    </div>
  );
};

export default CharactersList;