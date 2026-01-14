/**
 * Bowls Service
 * Business logic for bowl management
 */
const AppError = require('../utils/AppError');
const bowlRepository = require('../repositories/bowl.repository');

const bowlsService = {
  /**
   * Get all bowls
   */
  async getAllBowls() {
    return bowlRepository.findAll();
  },

  /**
   * Get bowl by ID
   */
  async getBowlById(bowlId) {
    const bowl = await bowlRepository.findById(bowlId);

    if (!bowl) {
      throw new AppError('Bowl not found', 404);
    }

    return bowl;
  },

  /**
   * Add a new bowl
   */
  async addBowl(bowlData) {
    const newBowl = {
      name: bowlData.name,
      image: bowlData.image,
      varients: ['small', 'medium', 'large'],
      description: bowlData.description,
      category: bowlData.category,
      prices: [bowlData.prices],
    };

    await bowlRepository.create(newBowl);

    return { message: 'New Bowl Added Successfully' };
  },

  /**
   * Update bowl
   */
  async updateBowl(updatedBowlData) {
    const bowl = await bowlRepository.updateById(
      updatedBowlData._id,
      updatedBowlData
    );

    if (!bowl) {
      throw new AppError('Bowl not found', 404);
    }

    return bowl;
  },

  /**
   * Delete bowl
   */
  async deleteBowl(bowlId) {
    const bowl = await bowlRepository.deleteById(bowlId);

    if (!bowl) {
      throw new AppError('Bowl not found', 404);
    }

    return bowl;
  },
};

module.exports = bowlsService;
