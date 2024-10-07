const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Remove the Review import from the top
// const Review = require("./review");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        : v,
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
