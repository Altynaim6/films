import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import { useDispatch } from 'react-redux';
import { fetchCharacters } from '../../store/slice/marvelSlice';
import CharactersList from '../CharactersList/CharactersList';

const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCharacters())
    }, [dispatch])

    return (
        <div>
            <Header />
            <CharactersList />
        </div>
    );
};

export default Home;