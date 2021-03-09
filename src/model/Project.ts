import mongoose, { Schema } from 'mongoose';
const ProjectSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	userName: {
		type: String,
		required: true,
	},
	projectName: {
		type: String,
		required: true,
	},
	language: {
		type: Array,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	value: {
		type: Number,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});
const Project = mongoose.model('project', ProjectSchema);
module.exports = Project;
