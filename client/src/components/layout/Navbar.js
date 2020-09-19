import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { loadUser } from '../../actions/user';
import { classicNameResolver } from 'typescript';
import { AppBar, Toolbar, Typography, Grid } from '@material-ui/core';
import Profile from '../navbar/Profile';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	title: {
		flexGrow: 1,
	},
	linkstyle: {
		textDecoration: 'none',
		color: 'white',
	},
	menuText: {
		marginRight: 18,
	},
}));

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
	const classes = useStyles();
	const guestLink = (
		<div>
			<AppBar position="static" style={{ background: 'primary' }}>
				<Toolbar>
					<Typography variant="h5" className={classes.title}>
						<Link to="/" className={classes.linkstyle}>
							<i className="fas fa-book"></i>Tutor Connect
						</Link>
					</Typography>
					{/* <div className={classes.root} /> */}
					<div className={classes.sectionDesktop}>
						<Typography className={classes.menuText}>
							<Link to="/questions" className={classes.linkstyle}>
								<i class="fa fa-book" aria-hidden="true"></i>
								<span>Explore</span>{' '}
							</Link>
						</Typography>

						<Typography className={classes.menuText}>
							<Link to="/register" className={classes.linkstyle}>
								{' '}
								<i class="fa fa-user-plus" aria-hidden="true"></i>
								<span>Register</span>{' '}
							</Link>
						</Typography>

						<Typography className={classes.menuText}>
							<Link to="/login" className={classes.linkstyle}>
								{' '}
								<i class="fa fa-sign-in" aria-hidden="true"></i>
								<span>Login</span>{' '}
							</Link>
						</Typography>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
	const authlink = (
		<AppBar position="static" style={{ background: 'primary' }}>
			<Toolbar>
				<Typography className={classes.title} variant="h5">
					<Link to="/" className={classes.linkstyle}>
						<i className="fas fa-book"></i>Tutor Connect
					</Link>
				</Typography>
				<div className={classes.sectionDesktop}>
					<Typography className={classes.menuText}>
						<Link to="/questions" className={classes.linkstyle}>
							<i class="fa fa-book" aria-hidden="true"></i>
							<span>Explore</span>{' '}
						</Link>
					</Typography>
					<Typography className={classes.menuText}>
						<Profile></Profile>
					</Typography>

					<Typography className={classes.menuText}>
						<a onClick={logout} href="/" className={classes.linkstyle}>
							<i className="fa fa-sign-out-alt"> </i>
							{'  '} <span>Logout</span>
						</a>
					</Typography>
				</div>
			</Toolbar>
		</AppBar>
	);

	if (isAuthenticated && !loading) {
		return <Fragment>{authlink}</Fragment>;
	} else {
		return <Fragment> {guestLink}</Fragment>;
	}
};
Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	loadUser: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	user: state.user,
});

export default connect(mapStateToProps, { logout, loadUser })(Navbar);
