import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SimpleReactLightbox from 'simple-react-lightbox';

import DefaultLayout from './components/pages/landing/Landing';
import SecondLayout from './components/layouts/main-two';
import Layout from './components/app';

import AboutUs from './components/pages/about-us/AboutUs';
import Destinations from './components/pages/destinations/Destinations';
import Packages from './components/pages/package/Packages';
import Contact from './components/pages/contact/Contact';
import FAQ from './components/pages/faq/Faq';
import ErrorPage from './components/pages/404/404';
import PackageSidebar from './components/pages/package/PackageSidebar';
import PackageStandard from './components/pages/package/PackageStanderd';
import PackageDetails from './components/pages/package/PackageDetails';
import SignIn from './components/pages/signin/SignIn';
import Register from './components/pages/register/Register';
import Search from './components/pages/search/Search';
import SearchResults from './components/pages/search/SearchResults';

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
                            <Route path="destination" element={<Destinations />} />
                            <Route path="package" element={<Packages />} />
                            <Route path="package-sidebar" element={<PackageSidebar />} />
                            <Route path="package-standard" element={<PackageStandard />} />
                            <Route path="package-details" element={<PackageDetails />} />
                            <Route path="faq" element={<FAQ />} />
                            <Route path="contact" element={<Contact />} />
                            <Route path="search" element={<Search />} />
                            <Route path="search-results" element={<SearchResults />} />
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
