/**
 * Routes Index
 * Mounts all route modules
 */
const router = require('express').Router();

const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');
const passwordResetRoutes = require('./passwordReset.routes');
const bowlsRoutes = require('./bowls.routes');
const paymentsRoutes = require('./payments.routes');
const adminRoutes = require('./admin.routes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/password-reset', passwordResetRoutes);
router.use('/bowls', bowlsRoutes);
router.use('/payment', paymentsRoutes);
router.use('/myobowl', adminRoutes);

module.exports = router;
