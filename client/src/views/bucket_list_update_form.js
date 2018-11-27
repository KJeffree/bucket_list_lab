const PubSub = require('../helpers/pub_sub.js');
const BucketListFormView = require('./bucket_list_form_view.js')

const BucketListUpdateForm = function (form) {
  this.form = form;
  this.id = null;
};

BucketListUpdateForm.prototype.bindEvents = function () {
  PubSub.subscribe("BucketList:activity-loaded", (event) => {
    const activityDetails = event.detail;
    this.populate(activityDetails);
  });

  this.createSubmit();

  this.form.addEventListener("submit", (event) => {
      this.handleSubmit(event);
    });
  };

  BucketListUpdateForm.prototype.createSubmit = function () {
    const submit = document.querySelector('#save')
    this.form.removeChild(submit)
    const update = document.createElement('button');
    update.type = "submit";
    update.id = "update";
    update.value = "Update";
    update.textContent = "Update"
    this.form.appendChild(update);
  };


BucketListUpdateForm.prototype.populate = function (details) {
  const activityName = document.querySelector("input#activity");
  activityName.value = details.activity;

  const type = document.querySelector("input#type");
  type.value = details.type;

  const date = document.querySelector("input#date");
  date.value = details.date;

  this.form.isUpdate.value = 'true';
  this.id = details._id;
  console.log("Details ID:", details._id);
};

BucketListUpdateForm.prototype.handleSubmit = function (event) {
  event.preventDefault();
  const updateActivity = this.createActivity(event.target);
  updateActivity.id = event.target._id.value;
  PubSub.publish("BucketListUpdateForm:update-submitted", updateActivity);
};

BucketListUpdateForm.prototype.createActivity = function (form) {
  const activity = {
    id: this.id,
    activity: form.activity.value,
    type: form.type.value,
    date: form.date.value
  };
  this.resetForm();
  return activity;
};

BucketListUpdateForm.prototype.resetForm = function () {
  const activityName = document.querySelector("input#activity");
  activityName.value = "";

  const type = document.querySelector("input#type");
  type.value = "";

  const date = document.querySelector("input#date");
  date.value = "";

  this.form.isUpdate.value = 'false';
  this.form._id.value = "";
};

module.exports = BucketListUpdateForm;
