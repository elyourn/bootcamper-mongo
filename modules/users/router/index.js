const express = require('express');
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controller');

const User = require('../../auth/model');
const { protect, authorize } = require('../../../middleware/auth');
const { advancedResults } = require('../../../middleware/advanced-results');

const router = express.Router({ mergeParams: true });

router.use(protect);
router.use(authorize('admin'));

router.route('/')
    .get(advancedResults(User), getUsers)
    .post(createUser);


router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

    
module.exports = router;
