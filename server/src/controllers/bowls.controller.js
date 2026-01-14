/**
 * Bowls Controller
 * Handles HTTP request/response for bowl endpoints
 */
const asyncHandler = require('../utils/asyncHandler');
const bowlsService = require('../services/bowls.service');

const bowlsController = {
  /**
   * GET /api/bowls/getallbowls
   * Get all bowls
   */
  getAllBowls: asyncHandler(async (req, res) => {
    const bowls = await bowlsService.getAllBowls();

    res.status(200).json(bowls);
  }),

  /**
   * POST /api/bowls/getbowlbyid
   * Get bowl by ID
   */
  getBowlById: asyncHandler(async (req, res) => {
    const { bowlid } = req.body;

    const bowl = await bowlsService.getBowlById(bowlid);

    res.status(200).json(bowl);
  }),

  /**
   * POST /api/bowls/addbowl
   * Add new bowl (admin)
   */
  addBowl: asyncHandler(async (req, res) => {
    const { bowl } = req.body;

    const result = await bowlsService.addBowl(bowl);

    res.status(201).json(result);
  }),

  /**
   * POST /api/bowls/updatebowl
   * Update bowl (admin)
   */
  updateBowl: asyncHandler(async (req, res) => {
    const { updatedBowl } = req.body;

    const bowl = await bowlsService.updateBowl(updatedBowl);

    res.status(200).json(bowl);
  }),

  /**
   * POST /api/bowls/deletebowl
   * Delete bowl (admin)
   */
  deleteBowl: asyncHandler(async (req, res) => {
    const { bowlid } = req.body;

    const bowl = await bowlsService.deleteBowl(bowlid);

    res.status(200).json(bowl);
  }),
};

module.exports = bowlsController;
