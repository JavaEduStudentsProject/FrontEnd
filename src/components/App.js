import React from 'react';
import Header from "./header components/Header";
import MainContent from "./MainContent";
import Footer from "./footer components/Footer";
import Products from "./AllProducts/Products";

function App() {
    return (
        <div className="App">
            <Header/>
            <Products/>
            {/*<MainContent/>*/}
            <Footer/>
        </div>
    )
}

export default App;
