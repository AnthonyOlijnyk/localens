import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SimpleReactLightbox from 'simple-react-lightbox';

import DefaultLayout from './components/pages/landing/Landing';
import SecondLayout from './components/layouts/main-two';
import Layout from './components/app';

import AboutUs from './components/pages/about-us/AboutUs';
import Contact from './components/pages/contact/Contact';
import FAQ from './components/pages/faq/Faq';
import ErrorPage from './components/pages/404/404';
import SignIn from './components/pages/signin/SignIn';
import Register from './components/pages/register/Register';
import Search from './components/pages/search/Search';
import SearchResults from './components/pages/search/SearchResults';
import LocationDetails from './components/pages/location-details/LocationDetail';
import AllLocations from './components/pages/all-locations/AllLocations'

import './index.css';
import './index.scss';

class Root extends React.Component {
    render() {
        return (
            <BrowserRouter basename={'/'}>
                <SimpleReactLightbox>
                    <Routes>
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<DefaultLayout />} />
                        <Route path="/homepage" element={<SecondLayout />} />

                        {/* Nested routes inside Layout component */}
                        <Route path="/" element={<Layout />}>
                            <Route path="about-us" element={<AboutUs />} />
                            <Route path="faq" element={<FAQ />} />
                            <Route path="contact" element={<Contact />} />
                            <Route path="search" element={<Search />} />
                            <Route path="search-results" element={<SearchResults />} />
                            <Route path="location-details/:id" element={<LocationDetails />} />
                            <Route path="all-locations" element={<AllLocations />} />
                            {/* Send all pages that do not exist to error page */}
                            <Route path="*" element={<ErrorPage />} />
                        </Route>
                    </Routes>
                </SimpleReactLightbox>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById('root')
);
