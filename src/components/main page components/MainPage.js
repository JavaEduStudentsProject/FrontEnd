import React from 'react';

const MainPage = (props) => {
    const recommendedProducts = props.recommendationArray.map(id => {
        return <div>{id}</div>
    })
    return (
        <div>
            <h1>Here will be recommendationArray:</h1>
            {recommendedProducts}
        </div>
    );
};

export default MainPage;