import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import _ from 'lodash';



const CatchPokemon = ({isAuthenticated}) => {
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState(false);
  const [answer, setAnswer] = useState(0);
  const [trial, setTrial] = useState(3)
  const [rightAnswer, setRightAnsweer] = useState(0);
  const [level, setLevel] = useState(0);
  const [newpokemon, setNewPokemon] = useState();

  console.log(rightAnswer);

  const [pokelists, setPokelists] = useState([])
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
                    setPokelists(res.data);
                }
                catch (err) {

                }
            }
        }

        fetchData();
    }, []);



  const submit = (e) => {
    e.preventDefault();
    const formValid = +answer >= 0;
    if (!formValid) {
      return;
    }
    if(trial > 1){
        if (+answer === +rightAnswer) {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };
            axios.post(`${process.env.REACT_APP_API_URL}/pokemon/addpokemon/`, { newpokemon, level }, config)
            setStatus("You caught it!");
            setStarted(false);
            
          } else if (+answer < +rightAnswer) {
            setStatus("Too Low");
            setTrial(trial-1);
          } else{
            setStatus("Too High");
            setTrial(trial-1);
          }
    }
    else{
        setStatus("You used up all your tries");
        setStarted(false);
             
    }
    
  };

  const start = () => {

    setRightAnsweer(Math.ceil(Math.random() * 10));
    setStarted(true);
    setTrial(3);
    setAnswer(0);
    setLevel(Math.floor(Math.random() * 101));
    setNewPokemon(_.sample(pokelists))
    setStatus(false)
  };

  

  if (started && isAuthenticated) {
    return (
      <div className="jumbotron" style={{ marginTop: 500, marginLeft: 800}}>
        <h1 style={{ marginTop: -400}}>Catch {newpokemon.name} at level {level}!</h1>
        <div style={{ marginTop: 50}}>
            <h2>Guess Number from 1-10</h2>
            <p className="lead">{trial} Tries Left</p>
        </div>
        <form onSubmit={submit}>
          <div>
            <label>Answer</label>
            <input style={{ marginLeft: 15 }} value={answer} onChange={(e) => setAnswer(e.target.value)} />
          </div>
          <button style={{ marginTop: 40, marginLeft:100 }} type="submit" className="btn btn-outline-success">check</button>
        </form>
        <p style={{ marginTop: -70, marginLeft: 100, color: "red"}}>{status}</p>
      </div>
    );
  } 
  else if(!started && isAuthenticated){

    return (
      <div className="jumbotron" style={{ marginTop: 500, marginLeft: 850}}>
        <button type="button" className="btn btn-outline-success" onClick={start}>
          Catch Pokemon
        </button>
        <p className="lead" style={{color: "green"}}>{status}</p>
      </div>
    );
  }
  else{
    return(
      <Navigate to='/' />
    )
  }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, {})(CatchPokemon);
