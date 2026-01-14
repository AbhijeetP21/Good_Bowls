/**
 * Admin Routes (MYO Bowl)
 * Endpoints for bowl customization options (bases, toppings, cheese, sauces)
 */
const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
// const validate = require('../middlewares/validate');
// const {
//   createBaseSchema,
//   updateBaseSchema,
//   baseIdSchema,
//   createToppingSchema,
//   updateToppingSchema,
//   toppingIdSchema,
// } = require('../validators/admin.validator');

// ============ BASES ============

// GET /api/myobowl/getallbases
router.get('/getallbases', adminController.getAllBases);

// POST /api/myobowl/getbasebyid
router.post('/getbasebyid', /* validate(baseIdSchema), */ adminController.getBaseById);

// POST /api/myobowl/addbase
router.post('/addbase', /* validate(createBaseSchema), */ adminController.addBase);

// POST /api/myobowl/updatebase
router.post('/updatebase', /* validate(updateBaseSchema), */ adminController.updateBase);

// POST /api/myobowl/deletebase
router.post('/deletebase', /* validate(baseIdSchema), */ adminController.deleteBase);

// ============ TOPPINGS ============

// GET /api/myobowl/getalltoppings
router.get('/getalltoppings', adminController.getAllToppings);

// POST /api/myobowl/gettoppingbyid
router.post('/gettoppingbyid', /* validate(toppingIdSchema), */ adminController.getToppingById);

// POST /api/myobowl/addtopping
router.post('/addtopping', /* validate(createToppingSchema), */ adminController.addTopping);

// POST /api/myobowl/updatetopping
router.post('/updatetopping', /* validate(updateToppingSchema), */ adminController.updateTopping);

// POST /api/myobowl/deletetopping
router.post('/deletetopping', /* validate(toppingIdSchema), */ adminController.deleteTopping);

// ============ CHEESE & SAUCES ============

// GET /api/myobowl/getallcheese
router.get('/getallcheese', adminController.getAllCheese);

// GET /api/myobowl/getallsauces
router.get('/getallsauces', adminController.getAllSauces);

module.exports = router;
