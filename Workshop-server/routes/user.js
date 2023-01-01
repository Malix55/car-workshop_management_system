const { createAdmin, adminDashboard, signin, adminAuth, addProduct, verifyToken, getProducts, addStaff, addClient, getStaff, getClient, deleteStaff, deleteClient, updateStaff, getAdmin, updateAdmin, addExpense, getExpense, deleteExpense, updateExpense, updateClient, addEvent, getEvent, getTask, deleteProduct, updateProducts, getOrders, getTasks, updateTask } = require('../controllers/user');
const authorization = require('../middleware/jwt-auth');
const { requireAdmin, requireClient } = require('../middleware/userAuth');
const fileUpload = require('../middleware/file-upload');
const router = require('express').Router();


router.post('/admin/signup', createAdmin);
router.post('/signin', signin);
router.get('/admin', authorization, requireAdmin, getAdmin);
router.post('/admin/verify', adminAuth);
router.post('/products/create', authorization, requireAdmin, fileUpload.single('file'), addProduct);
router.get('/products/', authorization, requireAdmin, getProducts);
router.get('/staff/', authorization, requireAdmin, getStaff);
router.get('/expense/', authorization, requireAdmin, getExpense);
router.post('/expense/create', authorization, requireAdmin, addExpense);
router.post('/event/create', authorization, requireAdmin, addEvent);
router.get('/event/', authorization, requireAdmin, getEvent);
router.patch('/staff/update', authorization, requireAdmin, updateStaff);
router.patch('/expense/update', authorization, requireAdmin, updateExpense);
router.patch('/admin/update', authorization, requireAdmin, updateAdmin);
router.patch('/products/update', authorization, requireAdmin, updateProducts);
router.delete('/staff/delete', authorization, requireAdmin, deleteStaff);
router.delete('/expense/delete', authorization, requireAdmin, deleteExpense);
router.delete('/products/delete', authorization, requireAdmin, deleteProduct);
router.delete('/client/delete', authorization, requireAdmin, deleteClient);
router.get('/client/', authorization, requireAdmin, getClient);
router.get('/tasks/', getTasks);
router.get('/orders/', authorization, requireAdmin, getOrders);
router.post('/staff/create', authorization, requireAdmin, fileUpload.single('file'), addStaff);
router.post('/client/create', authorization, requireAdmin, fileUpload.single('file'), addClient);
router.patch('/client/update', authorization, requireAdmin, updateClient);
router.patch('/task/update', authorization, requireAdmin, updateTask);
router.get('/admin/dashboard', authorization, adminDashboard);
router.get('/verify', authorization, verifyToken);

module.exports = router;