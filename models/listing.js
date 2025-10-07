const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Remove the Review import from the top
// const Review = require("./review");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Middleware to delete associated reviews after listing deletion
listingSchema.post("findOneAndDelete", async function (listing) {
  if (listing) {
    try {
      // Import Review model here to avoid circular dependency
      const Review = require("./review");
      await Review.deleteMany({ _id: { $in: listing.reviews } });
    } catch (err) {
      console.error("Error deleting reviews:", err);
    }
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
