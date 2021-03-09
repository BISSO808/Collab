import express from 'express';
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Project = require('../../model/Project');
const User = require('../../model/User');
const auth = require('../../middleware/auth');

router.post(
	'/',
	auth,
	[
		check('projectName', "Project's name is required").not().isEmpty(),
		check('language', 'Langauge is required').not().isEmpty(),
		check('description', 'Description  is required').not().isEmpty(),
	],
	async (req: any, res: any) => {
		const { projectName, language, description } = req.body;
		console.log(req.body);
		let user = await User.findById(res.locals.user.id).select('-password');
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			try {
				let project = new Project({
					user: res.locals.user.id,
					userName: user.name,
					projectName,
					language,
					description,
				});
				await project.save();
				res.send(project);
			} catch (err) {
				res.status(500).send('server error');
			}
		} else {
			return res.status(400).json({ error: errors.array() });
		}
	}
);
module.exports = router;
