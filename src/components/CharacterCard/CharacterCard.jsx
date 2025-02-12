import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./CharacterCard.module.css";

const CharacterCard = ({ character }) => {
    const { name, id, thumbnail } = character;
    const imageUrl = `${thumbnail.path}.${thumbnail.extension}`;

    return (
        <div className={styles.characterCard}>
            <Link to={`/comics/${id}?name=${name}`} className={styles.cardLink}>
                <div className={styles.imageContainer}>
                    <img src={imageUrl} alt={name} className={styles.characterImage} />
                </div>
                <h2 className={styles.characterName}>{name}</h2>
            </Link>

        </div>
    );
};

export default CharacterCard;