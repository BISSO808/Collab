import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { deleteQuestion, loadQuestions } from '../../actions/question';
import { loadQuestionById } from '../../actions/question';
import TutorProfile from '../tutor/TutorProfile';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import Delete from '../question/Delete';

const useStyles = makeStyles((theme) => ({
	table: {
		minWidth: 50,
	},
	root: {
		padding: theme.spacing(4),
	},
}));
const Ques = ({ loadQuestionById, match, userQuestions, loading, user }) => {
	const id = match.params.id;
	useEffect(() => {
		loadQuestionById({ id });
	}, [id]);
	// console.log(match);
	const classes = useStyles();

	return !loading ? (
		<div className={classes.root}>
			{user._id ? (
				<Link to="/addProject" style={{ textDecoration: 'none' }}>
					<Button style={{ background: 'green', color: 'white' }}>
						Add Project
					</Button>
				</Link>
			) : (
				<p></p>
			)}

			<Grid container spacing={4}>
				<Grid item lg={2} md={4} xl={4} xs={12}>
					<TutorProfile id={match.params.id} />
				</Grid>
				<Grid item lg={10} md={8} xl={8} xs={12}>
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="simple table">
							<TableHead>
								{' '}
								<TableRow>
									<TableCell align="center">
										<h2 className="text-primary">Your Projects</h2>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{userQuestions != null &&
									userQuestions.length > 0 &&
									userQuestions.map((ques) => (
										<TableRow>
											<TableCell align="left">
												<div>
													<Link
														to={{ pathname: '/question-info', state: ques }}
														style={{ textDecoration: 'none', color: 'black' }}
													>
														{ques.problem}
														{ques.user}aaaaaaaaaaaa{user._id}
													</Link>
												</div>
											</TableCell>
											{user._id == ques.user ? (
												<TableCell>
													<Delete questionId={ques._id} />
												</TableCell>
											) : (
												<p></p>
											)}
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</div>
	) : (
		<CircularProgress disableShrink />
	);
};

Ques.propTypes = {
	deleteQuestion: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	userQuestion: state.userQuestion,
	userQuestions: state.userQuestion.userQuestions,
	user: state.user.user,
	state: state,
});

export default connect(mapStateToProps, { deleteQuestion, loadQuestionById })(
	Ques
);
