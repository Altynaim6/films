import React from 'react';
import { Link } from 'react-router-dom';

const CharacterCard = ({ character }) => {
    const { name, thumbnail } = character;
    const imageUrl = `${thumbnail.path}.${thumbnail.extension}`;

    return (
        <Link to={`/character/${name}`}>
            <div className="character-card">
                <img src={imageUrl} alt={name} />
                <h2>{name}</h2>
            </div>
        </Link>
    );
};

export default CharacterCard;