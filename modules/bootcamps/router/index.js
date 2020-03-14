const express = require('express');
const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius,
    bootcampPhotoUpload
} = require('../controller');
const { protect, authorize } = require('../../../middleware/auth');
const Bootcamp = require('../model');
const { advancedResults } = require('../../../middleware/advanced-results');
//Include other resource routers
const courseRouter = require('../../courses/router');
const reviewRouter = require('../../reviews/router');

const router = express.Router();

//Re-route into ither resource routers
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

router.route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius)

router.route('/:id/photo').put(
    protect, 
    authorize('publisher', 'admin'), 
    bootcampPhotoUpload);

router.route('/')
    .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
    .post(protect, authorize('publisher', 'admin'), createBootcamp);

router.route('/:id')
    .get(getBootcamp)
    .put(protect, authorize('publisher', 'admin'), updateBootcamp)
    .delete(protect, authorize('publisher', 'admin'), deleteBootcamp)

module.exports = router;
