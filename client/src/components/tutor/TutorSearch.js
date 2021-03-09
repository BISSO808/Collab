import React, { useState, useEffect } from 'react';
import SearchBar from 'material-ui-search-bar';
import image from '../../img/collab.jpg';
import {Typography } from '@material-ui/core';
import { getTutors } from '../../actions/tutor';
import { makeStyles, } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core'
import PropTypes from 'prop-types';
import { getQuestionSearch } from '../../actions/search';
import TutorList from './TutorsList';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Login from '../auth/Login'
const useStyles = makeStyles((theme) => ({
	img: {
		flexGrow: 1,
		opacity: 0.8,
		backgroundColor: theme.palette.secondary['A100'],
		background: `url(${image})no-repeat`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		marginTop: 5,
		padding: 200,
		height: 100,
	},
	text: {
		position: 'relative',
		bottom: 200,
	},
	form: {
		opacity: 1,
	},
	sectionMobile: {
		display: 'block',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'block',
		},
	},
	info:{
		paddingTop:300
	}
}));
const TutorSearch = ({
	history,
	profiles,
	getTutors,
	getQuestionSearch,
	isAuthenticated,
	searched,
}) => {
	const classes = useStyles();
	useEffect(() => {
		getTutors();
	}, []);
console.log("hey lover"+history)
	const [data, setData] = useState({
		searchValue: '',
	});
	const { searchValue } = data;
	const change = (e) => {
		setData({ ...data, searchValue: e });
	};
	const onSubmit = (e) => {
		getQuestionSearch({ searchValue });
		const change = false;
		history.push('/questions');
	};
	return (
		(!isAuthenticated) ?
		<div>
			{console.log(isAuthenticated)}
			<div className={classes.img} />
			<div className={classes.text}>
				<form className={classes.text} onSubmit={(e) => onSubmit(e)}>
					<div className={classes.sectionDesktop}>
						<Grid container>
						<Grid xs={6}>
						<div className="info">
						<Typography align="center" color="secondary" variant="h1">
							Code Collab
						</Typography>
						<Typography align="center" color="secondary" variant="h4">
							Project Collaboration Platform{' '}
						</Typography>
						</div>
						</Grid>
						<Grid xs={6}>
						<Login/>
						</Grid>
						</Grid>
					</div>
					<div className={classes.sectionMobile}>
						<Typography align="center" color="secondary" variant="h3">
							Code Collab
						</Typography>
						<SearchBar
							name="searchValue"
							placeholder="Search for project or project owner"
							value={searchValue}
							onChange={(e) => change(e)}
							onRequestSearch={(e) => onSubmit(e)}
							style={{
								margin: '0 auto',
								maxWidth: 300,
							}}
						/>
					</div>
				</form>
				{/* <TutorList /> */}
			</div>
		</div>:	<TutorList />
	);
};

TutorSearch.propTypes = {
	searched: PropTypes.bool.isRequired,
};
const mapStatetoProps = (state) => ({
	profiles: state.tutorList.profiles,
	searched: state.search.searched,
	isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStatetoProps, { getTutors, getQuestionSearch })(
	TutorSearch
);
