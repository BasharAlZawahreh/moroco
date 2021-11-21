import React from 'react'
import { useHistory } from "react-router-dom";

function Main() {
    const history = useHistory();
    history.push("/Login");
    return (
        <div>
        
        </div>
    )
}

export default Main


