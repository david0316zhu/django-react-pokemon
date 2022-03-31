import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../actions/auth";

const Activate = ({ verify, isAuthenticated }) => {

    const [verified, setVerified] = useState(false);
    const {uid, token} = useParams()
    
    const verify_account = e => {
        verify(uid, token);
        setVerified(true);
    };
    if (verified){
        return <Navigate to='/' />
    }
    return (
        <div className="container mt-5">
            <div className="d-flex flex-column justify-content align-items-center" style={{marginTop: '200px'}}>
                <h1>Verify Your Account</h1>
                <button className="btn btn-primary" onClick={verify_account} style={{marginTop: '50px'}} type="button">
                    Verify
                </button>
            </div>
        </div>
    )
}




export default connect(null, { verify })(Activate);
