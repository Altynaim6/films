import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCharacterDetails } from "../../store/slice/marvelSlice";
import Loader from "../../components/Loader/Loader";

const Character = () => {
    const { name } = useParams();
    const dispatch = useDispatch();
    const { character, status } = useSelector((state) => state.marvel);

    useEffect(() => {
        dispatch(fetchCharacterDetails(name));
    }, [name, dispatch]);

    if (status === "loading") return <Loader/>;
    if (!character || Object.keys(character).length === 0) return <p>No character found.</p>;

    return (
        <div>
            <h1>{character.name}</h1>
            <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
            <p>{character.description || "No description available."}</p>
        </div>
    );
};

export default Character;
