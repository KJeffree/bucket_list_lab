const PubSub = require('../helpers/pub_sub.js');

const BucketListFormView = function (form) {
  this.form = form;
};

BucketListFormView.prototype.bindEvents = function () {
  this.createSubmit();
  this.form.addEventListener('submit', (event) => {
    this.handleSubmit(event);
  });
};

BucketListFormView.prototype.createSubmit = function () {
  const submit = document.createElement('button');
  submit.type = "submit";
  submit.id = "save";
  submit.value = "Save";
  submit.textContent = "Save"
  this.form.appendChild(submit);
};

BucketListFormView.prototype.handleSubmit = function (event) {
  event.preventDefault();
  const newActivity = this.createActivity(event.target);
  PubSub.publish("BucketListFormView:form-submitted", newActivity);
};

BucketListFormView.prototype.createActivity = function (form) {
  const activity = {
    activity: form.activity.value,
    type: form.type.value,
    date: form.date.value
  };
  return activity;
};

module.exports = BucketListFormView;
