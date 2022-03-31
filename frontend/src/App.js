import React from "react";
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./containers/Home";
import Activate from "./containers/Activate";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Reset from "./containers/Reset";
import ResetPasswordConfirm from "./containers/Resetform";
import AllPokemons from "./containers/AllPokemons";
import MyPokemons from "./containers/MyPokemons";
import CatchPokemon from "./containers/CatchPokemon";
import Layout from "./hoc/Layout";
import { Provider } from "react-redux";

import store from "./store";

const App = () => (
  <Provider store={store}>
      <Router>
          <Layout>
              <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route exact path="/login" element={<Login/>} />
                    <Route exact path="/register" element={<Register/>} />
                    <Route exact path="/reset-password" element={<Reset/>} />
                    <Route exact path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>} />
                    <Route exact path="/activate/:uid/:token" element={<Activate/>} />
                    <Route exact path="/pokemon-database" element={<AllPokemons/>} />
                    <Route exact path="/my-pokemons" element={<MyPokemons/>} />
                    <Route exact path="/catch-pokemon" element={<CatchPokemon/>} />
              </Routes>
          </Layout>
        
      </Router>
  </Provider>
);

export default App;