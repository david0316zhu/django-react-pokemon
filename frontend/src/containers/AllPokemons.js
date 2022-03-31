import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const AllPokemons = ({isAuthenticated}) => {
    const [pokelists, setPokelists] = useState([])
    const [ukpokelists, setUkPokelists] = useState([])
    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchData = async () => {
            if (localStorage.getItem('access')) {
                const config = {
                    headers: {
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Accept': 'application/json'
                    }
                };
                try {
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/pokemon/allpokemon/`, config);
                    const res_2 = await axios.get(`${process.env.REACT_APP_API_URL}/pokemon/unownedpokemon/`, config);
                    setPokelists(res.data);
                    setUkPokelists(res_2.data)
                }
                catch (err) {

                }
            }
        }

        fetchData();
    }, []);
    console.log(ukpokelists);
    const displayPokemons = () => {
        let result = [];

        pokelists.map(pokelist => {
            if (ukpokelists.some(ukpokelist => ukpokelist.name === pokelist.name)){
                
                return result.push(
                    <tr>
                        <td>{pokelist.name}</td>
                        <td>?</td>
                        <td>?</td>
                        <td>?</td>
                        <td>?</td>
                    </tr>
                );
                }
            else{
                return result.push(
                    <tr>
                        <td>{pokelist.name}</td>
                        <td>{pokelist.hp}</td>
                        <td>{pokelist.attack}</td>
                        <td>{pokelist.defense}</td>
                        <td>{pokelist.type}</td>
                    </tr>
                );
            }
        });
        return result;

    };
    const authLinks = () => (
        <Fragment>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">HP</th>
                        <th scope="col">Attack</th>
                        <th scope="col">Defense</th>
                        <th scope="col">Type</th>
                    </tr>
                </thead>
                <tbody>
                    {displayPokemons()} 
                </tbody>
                
            </table>
        </Fragment>
    );
    return (
    <div className="container">
        <div className="jumbotron mt-5">
            {isAuthenticated ? authLinks() : <Navigate to='/' />}
                
        </div>
    </div>
    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(AllPokemons);