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
//Redux
import { loadUser } from './actions/user';
import { store, persistor } from './store';
import Dashboard from './components/layout/Dashboard';
import Image from './img/book-2943383_1280.png';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import AddProject from './components/project/addProject';
import { red } from '@material-ui/core/colors';
import Footer from './components/layout/Footer';
if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#006BA6',
			main: '#006BA6',
		},
		secondary: {
			light: '#ffffff',
			main: '#ffffff',
		},
		btn: {
			light: '#ff0000',
			main: '#ff0000',
		},
	},
});
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
		<ThemeProvider theme={theme}>
			<Router>
				<Grid container direction="column">
					<Fragment>
						<Grid item>
							<Navbar />
							{/* <h1>header</h1> */}
						</Grid>
					</Fragment>
					<Grid item container>
						{/* <Grid item sm={2} xs={0} ></Grid> */}
						<Grid item sm={12} xs={12} paddingTop="100px">
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
						{/* <Grid item sm={2} xs={0} /> */}
					</Grid>
				</Grid>
			</Router>
		</ThemeProvider>
	);
};

export default App;
