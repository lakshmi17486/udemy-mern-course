import React, {Component} from "react";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from "./Payments";

class Header extends Component {
// this.props.auth ==> has the user data
    renderContent() {
      switch(this.props.auth) {
        case null:
            return;
        case false:
            return (
                <li><a href="/auth/google">Login With Google</a></li>
            );
       default: 
          return [
            <li key="1" style={{ margin: '10px 10px'}}><Payments /></li>,
            <li key="2" style={{ margin: '15px 10px'}}>
                Credits: {this.props.auth.credits}
                </li>,
            <li key="3"><a href="/api/logout">Logout</a></li>
          ];
      }
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                 <div className="container-fluid">
                     <div className="navbar-header">
                     <Link 
                         to={this.props.auth ? '/surveys': '/'} 
                         className="nav navbar-nav navbar-brand navbar-left"
                         >
                        Emaily
                        </Link>
                        <ul className="nav navbar-nav navbar-right">
                            {this.renderContent()}
                        </ul>

                     </div>
                 </div>
            </nav>
        )
    }
}

function mapStateToPropps({ auth }) {
    return { auth };
}

export default connect(mapStateToPropps) (Header);