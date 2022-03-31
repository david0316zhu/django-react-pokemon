import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";



const MyPokemons = ({isAuthenticated}) => {
    const [mypokelists, setMyPokelists] = useState([])
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
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/pokemon/mypokemon/`, config);
                    setMyPokelists(res.data);
                }
                catch (err) {

                }
            }
        }

        fetchData();
    }, []);
    console.log(mypokelists);
    const releasePokemon = async (uid) => {

        

        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json',
                
            }
        };
        await axios.post(`${process.env.REACT_APP_API_URL}/pokemon/releasepokemon/`, { uid }, config);
        const index = mypokelists.findIndex(mypoke => mypoke.uid === uid);
        setMyPokelists(prevState => prevState.splice(index,1))
    }
    const displayMyPokemons = () => {
        let result = [];

        mypokelists.map(mypokelist => {
            return result.push(
                <tr>
                    <td>{mypokelist.name}</td>
                    <td>{mypokelist.hp}</td>
                    <td>{mypokelist.attack}</td>
                    <td>{mypokelist.defense}</td>
                    <td>{mypokelist.type}</td>
                    <td>{mypokelist.level}</td>
                    <td>
                        <button className="btn btn-danger" onClick={() => releasePokemon(mypokelist.uid)}>Release</button>
                    </td>
                </tr>
            );
        });
        return result;

    };
    const authLinks = () => (
        <Fragment>
            <h1>My Pokemons</h1>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">HP</th>
                        <th scope="col">Attack</th>
                        <th scope="col">Defense</th>
                        <th scope="col">Type</th>
                        <th scope="col">Level</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {displayMyPokemons()} 
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

export default connect(mapStateToProps, {})(MyPokemons);