import React, {Fragment} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Home = ({isAuthenticated}) => {
    const guestLinks = () => (
        <Fragment>
            <p>Login to catch new Pokemons!</p>
            <div>
                <Link className="btn btn-primary " to="/login" role="button">Login</Link>
            </div>
            <div>
                <Link className="btn btn-primary mt-2" to="/register" role="button">Register</Link>
            </div>   
        </Fragment>
    );
    const authLinks = () => (
        <Fragment>
            <p>Pokémon around the world wait for you!</p>
            <div>
                <Link className="btn btn-primary " to="/my-pokemons" role="button">View My Pokemons</Link>
            </div>
            <div>
                <Link className="btn btn-primary mt-2" to="/catch-pokemon" role="button">Capture New Pokemon</Link>
            </div>   
        </Fragment>
    );
    return (
    <div className="container">
        <div className="jumbotron mt-5">
            <h1 className="display-4">Welcome to Pokemon Django!</h1>
            <p className="lead"><b>Gotta Catch 'Em All</b> </p>
            <hr className="my-4" />
            {isAuthenticated ? authLinks() : guestLinks()}
                
        </div>
    </div>
    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(Home);

