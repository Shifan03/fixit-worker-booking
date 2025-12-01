import React from 'react';
import Header from '../components/Header';
import ServiceCategoriesMenu from '../components/ServiceCategoriesMenu'; // Updated component
import TopWorkers from '../components/TopWorkers'; // Updated component
import Banner from '../components/Banner';

const Home = () => {
    return (
        <div>
            <Header />
            <ServiceCategoriesMenu />
            <TopWorkers />
            <Banner />
        </div>
    );
};

export default Home;