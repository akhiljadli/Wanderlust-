const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsyc.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isreviewAuthor } = require("../middleware.js");

const reviewControllers = require("../controllers/review.js");

//review route
//post route
//create revirw route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewControllers.createReview));

//delete review route

router.delete("/:reviewId", isLoggedIn, isreviewAuthor, wrapAsync(reviewControllers.destroyReview));

module.exports = router;