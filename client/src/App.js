import React, { Fragment, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './Temp.css';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import Profile from './components/layout/profile';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/alert';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import AddQuestion from './components/question/AddQuestion';
import Questioninfo from './components/question/Questioninfo';
// import Tutors from './components/tutor/TutorsList';
import Tutors from './components/tutor/TutorSearch';
import openSocket from 'socket.io-client';
import Fuse from 'fuse.js';
//Redux
import { loadUser } from './actions/user';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import Dashboard from './components/layout/Dashboard';
import Image from './img/book-2943383_1280.png';
if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const useStyle = () =>
	makeStyles({
		image: {
			backgroundImage: `url(${Image})`,
		},
		root: {
			paddingTop: '100px',
		},
	});
const classes = useStyle();
const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Router>
			<Grid container direction="column">
				<Fragment>
					<Grid item>
						<Navbar />
						{/* <h1>header</h1> */}
					</Grid>
				</Fragment>
				<Grid item container>
					<Grid item sm={2} xs={0} />
					<Grid item sm={8} xs={12} paddingTop="100px">
						<Fragment>
							<Route exact path="/" component={Tutors} />

							{/* <section className="container"> */}
							<Alert />
							<Switch>
								<Route exact path="/questions" component={Dashboard} />
								<Route exact path="/register" component={Register} />
								<Route exact path="/login" component={Login} />
								<Route exact path="/profile/:id" component={Profile} />
								{/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
								<PrivateRoute
									exact
									path="/create-question"
									component={AddQuestion}
								/>
								<Route
									exact
									path="/question-info"
									component={Questioninfo}
								></Route>
							</Switch>
							{/* </section> */}
						</Fragment>
					</Grid>
					<Grid item sm={2} xs={0} />
				</Grid>
			</Grid>
		</Router>
	);
};

export default App;