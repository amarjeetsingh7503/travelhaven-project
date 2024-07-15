const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const { forwardGeocoding } = require("../middleware.js");

module.exports.index = async (req, res) => {
  let { search } = req.query;
  let listings;
  if (typeof search == "undefined" || search == "") {
    listings = await Listing.find();
  } else {
    listings = await Listing.find({ country: search });
    if (listings.length === 0) {
      listings = await Listing.find();
    }
  }
  res.render("listings/index.ejs", { listings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.createNewListing = async (req, res) => {
  const address = req.body.listing.location + ", " + req.body.listing.country;
  const coordinates = await forwardGeocoding(address);
  const latitude = coordinates.lat;
  const longitude = coordinates.lon;

  let url = req.file.path;
  let filename = req.file.filename;
  let listing = req.body.listing;
  const newListing = await new Listing(listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.coordinates = { longitude, latitude };
  // console.log(newListing.coordinates);
  await newListing.save();
  // console.log(saved);
  req.flash("success", "New Listing Added!");
  res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing does not exist!");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing does not exist!");
    res.redirect("/listings");
  }
  let originalImgUrl = listing.image.url;
  originalImgUrl = originalImgUrl.replace("/upload", "/upload/h_120");
  // console.log(originalImgUrl);
  res.render("listings/edit.ejs", { listing, originalImgUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};

module.exports.yourListings = async (req, res) => {
  let listings = await Listing.find({ owner: req.user.id });
  res.render("listings/yourListings.ejs", { listings });
};

module.exports.userProfile = async (req, res) => {
  let userInfo = await User.findOne({ _id: req.user._id });
  res.render("user/userProfile.ejs", { userInfo });
};

module.exports.privacyPolicy = (req, res) => {
  res.render("policies/privacy.ejs");
};

module.exports.termsConditions = (req, res) => {
  res.render("policies/terms.ejs");
};

module.exports.companyDetails = (req, res) => {
  res.render("policies/details.ejs");
};
