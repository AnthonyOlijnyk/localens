import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Image LightBox
import SimpleReactLightbox from 'simple-react-lightbox';

// Layout default import from components.
import DefaultLayout from './components/pages/landing/Landing';
import SecondLayout from './components/layouts/main-two';

// Import wrapping layout
import Layout from './components/app';

// Import all pages from components
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

// Initializations All Css
import './index.css';
import './index.scss';

// Default Warning Error Hide
console.log = console.warn = console.error = () => {};

class Root extends React.Component {
  render() {
    return (
      <BrowserRouter basename={'/'}>
        <Routes>
          {/* Render sign-in and register pages without Layout */}
          <Route path={`${process.env.PUBLIC_URL}/signin`} element={<SignIn />} />
          <Route path={`${process.env.PUBLIC_URL}/register`} element={<Register />} />

          {/* Render landing page without Layout */}
          <Route path={`${process.env.PUBLIC_URL}/`} element={<DefaultLayout />} />

          {/* Render homepage without Layout */}
          <Route path={`${process.env.PUBLIC_URL}/homepage`} element={<SecondLayout />} />

          {/* Render other pages with Layout */}
          {/* Nesting routes inside the Layout component */}
          <Route path={`${process.env.PUBLIC_URL}/`} element={<Layout />}>
            <Route path='about-us' element={<AboutUs />} />
            <Route path='destination' element={<Destinations />} />
            <Route path='package' element={<Packages />} />
            <Route path='package-sidebar' element={<PackageSidebar />} />
            <Route path='package-standard' element={<PackageStandard />} />
            <Route path='package-details' element={<PackageDetails />} />
            <Route path='faq' element={<FAQ />} />
            <Route path='404' element={<ErrorPage />} />
            <Route path='contact' element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <SimpleReactLightbox>
      <Root />
    </SimpleReactLightbox>
  </React.StrictMode>,
  document.getElementById('root')
);
