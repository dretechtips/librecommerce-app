import React from 'react';
import { useHistory } from "react-router-dom";

function Logout() {
  const history = useHistory();
  history.push("/");
  window.location.reload();
  return (
    <div>
      
    </div>
  )
}

export default Logout
