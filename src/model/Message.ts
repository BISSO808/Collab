import mongoose, { Schema } from 'mongoose';
const MessageSchema = new Schema({
	users: [{ String }],
	time: {
		type: Date,
		default: Date.now,
	},
	detail: {
		type: String,
		required: true,
	},
});
const Message = mongoose.model('message', MessageSchema);
module.exports = Message;
