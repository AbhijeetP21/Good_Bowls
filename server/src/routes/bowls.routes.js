/**
 * Bowls Routes
 * Endpoints for bowl CRUD operations
 */
const router = require('express').Router();
const bowlsController = require('../controllers/bowls.controller');
// const validate = require('../middlewares/validate');
// const {
//   createBowlSchema,
//   updateBowlSchema,
//   bowlIdSchema,
// } = require('../validators/bowl.validator');

// GET /api/bowls/getallbowls - Get all bowls
router.get('/getallbowls', bowlsController.getAllBowls);

// POST /api/bowls/getbowlbyid - Get bowl by ID
router.post('/getbowlbyid', /* validate(bowlIdSchema), */ bowlsController.getBowlById);

// POST /api/bowls/addbowl - Add new bowl (admin)
router.post('/addbowl', /* validate(createBowlSchema), */ bowlsController.addBowl);

// POST /api/bowls/updatebowl - Update bowl (admin)
router.post('/updatebowl', /* validate(updateBowlSchema), */ bowlsController.updateBowl);

// POST /api/bowls/deletebowl - Delete bowl (admin)
router.post('/deletebowl', /* validate(bowlIdSchema), */ bowlsController.deleteBowl);

module.exports = router;
