const express = require('express');
const mongoose = require('mongoose');
const {
    getReviews,
    getReview,
    addReview,
    updateReview,
    deleteReview
} = require('../controller');


const Review = require('../model');
const { protect, authorize } = require('../../../middleware/auth');
const { advancedResults } = require('../../../middleware/advanced-results');

const router = express.Router({ mergeParams: true });

router.route('/')
    .get(advancedResults(Review, {
        path: 'bootcamp',
        select: 'name description',
    }), getReviews)
    .post(protect, authorize('users', 'admin'), addReview);

router.route('/:id')
    .get(getReview)
    .put(protect, authorize('users', 'admin'), updateReview)
    .delete(protect, authorize('users', 'admin'), deleteReview)

module.exports = router;
