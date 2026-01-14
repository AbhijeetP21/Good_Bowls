/**
 * Admin Controller
 * Handles HTTP request/response for admin-specific endpoints (MYO Bowl)
 */
const asyncHandler = require('../utils/asyncHandler');
const adminService = require('../services/admin.service');

const adminController = {
  // ============ BASES ============

  /**
   * GET /api/myobowl/getallbases
   */
  getAllBases: asyncHandler(async (req, res) => {
    const bases = await adminService.getAllBases();
    res.status(200).json(bases);
  }),

  /**
   * POST /api/myobowl/getbasebyid
   */
  getBaseById: asyncHandler(async (req, res) => {
    const { baseid } = req.body;
    const base = await adminService.getBaseById(baseid);
    res.status(200).json(base);
  }),

  /**
   * POST /api/myobowl/addbase
   */
  addBase: asyncHandler(async (req, res) => {
    const { base } = req.body;
    const result = await adminService.addBase(base);
    res.status(201).json(result);
  }),

  /**
   * POST /api/myobowl/updatebase
   */
  updateBase: asyncHandler(async (req, res) => {
    const { updatedBase } = req.body;
    const base = await adminService.updateBase(updatedBase);
    res.status(200).json(base);
  }),

  /**
   * POST /api/myobowl/deletebase
   */
  deleteBase: asyncHandler(async (req, res) => {
    const { baseid } = req.body;
    const base = await adminService.deleteBase(baseid);
    res.status(200).json(base);
  }),

  // ============ TOPPINGS ============

  /**
   * GET /api/myobowl/getalltoppings
   */
  getAllToppings: asyncHandler(async (req, res) => {
    const toppings = await adminService.getAllToppings();
    res.status(200).json(toppings);
  }),

  /**
   * POST /api/myobowl/gettoppingbyid
   */
  getToppingById: asyncHandler(async (req, res) => {
    const { toppingid } = req.body;
    const topping = await adminService.getToppingById(toppingid);
    res.status(200).json(topping);
  }),

  /**
   * POST /api/myobowl/addtopping
   */
  addTopping: asyncHandler(async (req, res) => {
    const { topping } = req.body;
    const result = await adminService.addTopping(topping);
    res.status(201).json(result);
  }),

  /**
   * POST /api/myobowl/updatetopping
   */
  updateTopping: asyncHandler(async (req, res) => {
    const { updatedTopping } = req.body;
    const topping = await adminService.updateTopping(updatedTopping);
    res.status(200).json(topping);
  }),

  /**
   * POST /api/myobowl/deletetopping
   */
  deleteTopping: asyncHandler(async (req, res) => {
    const { toppingid } = req.body;
    const topping = await adminService.deleteTopping(toppingid);
    res.status(200).json(topping);
  }),

  // ============ CHEESE & SAUCES ============

  /**
   * GET /api/myobowl/getallcheese
   */
  getAllCheese: asyncHandler(async (req, res) => {
    const cheese = await adminService.getAllCheese();
    res.status(200).json(cheese);
  }),

  /**
   * GET /api/myobowl/getallsauces
   */
  getAllSauces: asyncHandler(async (req, res) => {
    const sauces = await adminService.getAllSauces();
    res.status(200).json(sauces);
  }),
};

module.exports = adminController;
