import React, { useState, useEffect } from 'react';
import SearchBar from 'material-ui-search-bar';
import image from '../../img/pexels-jeshootscom-442574.jpg';
import { TextField, Button, Typography } from '@material-ui/core';
import { getTutors } from '../../actions/tutor';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fuse from 'fuse.js';
import PropTypes from 'prop-types';
import { getQuestionSearch } from '../../actions/search';
import TutorList from './TutorsList';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
	img: {
		flexGrow: 1,
		backgroundColor: theme.palette.secondary['A100'],
		overflow: 'hidden',
		background: `url(${image})no-repeat`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		marginTop: 5,
		padding: 100,
		paddingBottom: 200,
	},
	text: {
		align: 'center',
		color: '#264653',
		variant: 'h2',
	},
}));
const TutorSearch = ({
	history,
	profiles,
	getTutors,
	getQuestionSearch,
	searched,
}) => {
	const classes = useStyles();
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
		// const options = {
		// 	includeScore: true,
		// 	keys: ['subject', 'user', 'name'],
		// };
		// // const data = [];
		// // profiles.map((profile) => {
		// // 	data.push([profile.name, profile._id]);
		// // });
		// const fuse = new Fuse(profiles, options);
		// const result = fuse.search(search);
		// console.log(result);
		// setData({ ...data, search: '' });
		getQuestionSearch({ searchValue });
		const change = false;
		history.push('/questions');
	};
	const redirect = () => {
		return <Redirect to="/questions"></Redirect>;
	};
	return (
		<div>
			<div className={classes.img}>
				<form className={classes.form} onSubmit={(e) => onSubmit(e)}>
					<Typography align="center" color="primary" variant="h2">
						Tutor Connect
					</Typography>
					<Typography align="center" color="primary" variant="h4">
						Get Tutors to help you{' '}
					</Typography>
					<SearchBar
						name="searchValue"
						placeholder="What subject do you need help with?(e.g. 'Calculus')"
						value={searchValue}
						onChange={(e) => change(e)}
						onRequestSearch={(e) => onSubmit(e)}
						style={{
							margin: '0 auto',
							maxWidth: 800,
						}}
					/>
				</form>
			</div>
			<TutorList />
		</div>
	);
};

TutorSearch.propTypes = {
	searched: PropTypes.bool.isRequired,
};
const mapStatetoProps = (state) => ({
	profiles: state.tutorList.profiles,
	searched: state.search.searched,
});
export default connect(mapStatetoProps, { getTutors, getQuestionSearch })(
	TutorSearch
);
