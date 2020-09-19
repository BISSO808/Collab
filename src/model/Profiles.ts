import mongoose, { Schema } from 'mongoose';
const ProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	name: {
		type: String,
		required: true,
	},
	bio: {
		type: String,
	},
	isAvailable: {
		type: Number,
	},
	subject: {
		type: Array,
	},
});
const Profile = mongoose.model('profile', ProfileSchema);
module.exports = Profile;
