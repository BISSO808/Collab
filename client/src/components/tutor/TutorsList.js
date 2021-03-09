import React, { useState, useEffect } from 'react';
import Tutor from './Tutor';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import { getTutors } from '../../actions/tutor';
import { connect } from 'react-redux';
import SearchBar from 'material-ui-search-bar';
import { getQuestionSearch } from '../../actions/search';
import { CircularProgress } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
	root: {},
	content: {},
	pagination: {
		marginTop: theme.spacing(1),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
}));

const TutorsList = ({history, getTutors, profiles, loading }) => {
	useEffect(() => {
		getTutors();
	}, []);
	const [data, setData] = useState({
		searchValue: '',
	});
	const { searchValue } = data;
	const change = (e) => {
		setData({ ...data, searchValue: e });
	};
	const onSubmit = (e) => {
		getQuestionSearch({ searchValue });
		history.push('/questions')
	};
	const classes = useStyles();
	if (loading) {
		return <CircularProgress disableShrink />;
	} else {
		return (
			<div>
		
			<div className={classes.content}>
				<Grid container spacing={3}>
					{profiles.map((profile) => (
						<Grid item key={profile.id} lg={4} md={6} xs={12}>
							<Tutor profile={profile} />
						</Grid>
					))}
				</Grid>
			</div>
			</div>
		);
	}
};

const mapStateToProps = (state) => ({
	profiles: state.tutorList.profiles,
	loading: state.tutorList.loading,
});
export default connect(mapStateToProps, { getTutors, getQuestionSearch })(TutorsList);
