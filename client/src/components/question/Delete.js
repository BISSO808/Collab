import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteQuestion } from '../../actions/question';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

const Delete = ({ questionId, deleteQuestion }) => {
	const deleteQues = async (id) => {
		console.log(id);
		if (window.confirm('Delete the item?')) {
			await deleteQuestion({ id });
		}
	};

	return (
		<Button variant="contained" onClick={() => deleteQues(questionId)}>
			<DeleteIcon color="btn" fontSize="large" />
		</Button>
	);
};

Delete.propTypes = {
	deleteQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	deleted: state.question.deleted,
});

export default connect(mapStateToProps, { deleteQuestion })(Delete);
