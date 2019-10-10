import React from 'react';
import App from '../containers/App';
import { ProfileProps } from '../interface/Profile.interface';

function Profile(props?: ProfileProps) {
  if(props) 
    return(<React.Fragment>
      <img src={props.imageURL} alt="Profile Image" className="rounded-circle mr-2" width="40"/>
      {props.name}
    </React.Fragment>)
  else
    return (
      <App.contextType.Consumer>
        {state => (<React.Fragment>
          <img src={state.profile.imageURL} alt="Profile Image" className="rounded-circle mr-2" width="40"/>
          {state.profile.name}
        </React.Fragment>)}
      </App.contextType.Consumer>
    )
}

export default Profile

