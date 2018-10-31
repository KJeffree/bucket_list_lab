const BucketListFormView = require("./views/bucket_list_form_view.js");
const BucketListUpdateForm = require("./views/bucket_list_update_form.js");
const BucketListGridView = require("./views/bucket_list_grid_view.js");
const BucketList = require("./models/bucket_list.js");

document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript loaded");

  const bucketListForm = document.querySelector("form#activity-form");
  const bucketListFormView = new BucketListFormView(bucketListForm);
  bucketListFormView.bindEvents();

  const bucketListUpdateForm = document.querySelector("form#activity-form");
  const bucketListUpdateView = new BucketListUpdateForm(bucketListUpdateForm);
  bucketListUpdateView.bindEvents();

  const activitiesContainer = document.querySelector("div#activities");
  const activitiesGridView = new BucketListGridView(activitiesContainer);
  activitiesGridView.bindEvents();

  const url = "http://localhost:3000/api/activities";
  const bucketList = new BucketList(url);
  bucketList.bindEvents();
  bucketList.getData();

});
