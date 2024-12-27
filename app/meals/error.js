'use client';

const Error = (props) => {
    console.log("Error: ", props, JSON.stringify(props));
    return (
        <div className="error">
            <h1>Something went wrong!</h1>
            <p>We are sorry, but we could not load the page you requested.</p>
        </div>
    );
};

export default Error;