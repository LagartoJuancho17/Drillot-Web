import React from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import RecentWorks from '../components/RecentWorks';
import Inspiration from '../components/Inspiration';
import Newsletter from '../components/Newsletter';
import './Home.css';

const Home = () => {
    return (
        <main>
            <Hero />
            <Categories />
            <RecentWorks />
            <Inspiration />
            <Newsletter />
        </main>
    );
};

export default Home;
