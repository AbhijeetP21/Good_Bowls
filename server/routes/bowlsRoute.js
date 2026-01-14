const express = require('express');
const router = express.Router();
const Bowl = require('../models/bowlModel');

router.get('/getallbowls', async (req, res) => {
	try {
		const bowls = await Bowl.find({});
		res.send(bowls);
	} catch (error) {
		return res.status(404).json({ message: error });
	}
});

router.post('/addbowl', async (req, res) => {
	const bowl = req.body.bowl;
	try {
		const newBowl = new Bowl({
			name: bowl.name,
			image: bowl.image,
			varients: ['small', 'medium', 'large'],
			description: bowl.description,
			category: bowl.category,
			prices: [bowl.prices],
		});
		await newBowl.save();
		res.send('New Bowl Added Successfully');
	} catch (error) {
		return res.status(404).json({ message: error });
	}
});

//bowl by id
router.post('/getbowlbyid', async (req, res) => {
	const bowlid = req.body.bowlid;
	try {
		const bowl = await Bowl.findById(bowlid);
		res.send(bowl);
	} catch (error) {
		return res.status(404).json({ message: error });
	}
});

//bowl by name
router.post('/updatebowl', async (req, res) => {
	const updatedBowl = req.body.updatedBowl;
	try {
		const bowl = await Bowl.findByIdAndUpdate(
			updatedBowl._id,
			updatedBowl,
		);
		res.send(bowl);
	} catch (error) {
		return res.status(404).json({ message: error });
	}
});

//delete bowl
router.post('/deletebowl', async (req, res) => {
	const bowlid = req.body.bowlid;
	try {
		const bowl = await Bowl.findByIdAndDelete(bowlid);
		res.send(bowl);
	} catch (error) {
		return res.status(404).json({ message: error });
	}
});

module.exports = router;
