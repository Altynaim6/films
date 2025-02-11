import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import CharactersList from '../../pages/CharactersList/CharactersList';
import Character from '../../pages/Character/Character';

const Main = () => {
    return (
        <main>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/characters' element={<CharactersList />} />
                <Route path='/character/:name' element={<Character/>} />
            </Routes>
        </main>
    );
};

export default Main;