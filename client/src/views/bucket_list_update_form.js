const PubSub = require('../helpers/pub_sub.js');

const BucketListUpdateForm = function (form) {
  this.form = form;
};

BucketListUpdateForm.prototype.bindEvents = function () {
  PubSub.subscribe("BucketList:activity-loaded", (event) => {
    const activityDetails = event.detail;
    this.populate(activityDetails);
  });

  this.form.addEventListener("submit", (event) => {
      console.log("DETAILS", event.detail);
      this.handleSubmit(event);
    });
  };


BucketListUpdateForm.prototype.populate = function (details) {
  const activityName = document.querySelector("input#activity");
  activityName.value = details.activity;

  const type = document.querySelector("input#type");
  type.value = details.type;

  const date = document.querySelector("input#date");
  date.value = details.date;

  this.form.isUpdate.value = 'true';
  this.form._id.value = details._id;
};

BucketListUpdateForm.prototype.handleSubmit = function (event) {
  event.preventDefault();
  const updateActivity = this.createActivity(event.target);
  console.log(updateActivity);
  updateActivity._id = event.target._id.value;
  PubSub.publish("BucketListUpdateForm:update-submitted", updateActivity);
};

BucketListUpdateForm.prototype.createActivity = function (form) {
  const activity = {
    activity: form.activity.value,
    type: form.type.value,
    date: form.date.value
  };
  console.log(activity);
  return activity;
};

module.exports = BucketListUpdateForm;
