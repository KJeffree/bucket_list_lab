const PubSub = require("../helpers/pub_sub.js");

const BucketListView = function (container) {
  this.container = container;
};

BucketListView.prototype.display = function (activityItem) {
  const activityContainer = document.createElement("div");
  activityContainer.id = "activity";

  const activityName = this.createHeading(activityItem.activity);
  activityContainer.appendChild(activityName);

  const type = this.createDetail("Type", activityItem.type);
  activityContainer.appendChild(type);

  const date = this.createDetail("Date", activityItem.date);
  activityContainer.appendChild(date);

  const deleteButton = this.createDeleteButton(activityItem._id);
  activityContainer.appendChild(deleteButton);

  this.container.appendChild(activityContainer);
};

BucketListView.prototype.createHeading = function (textContent) {
  const heading = document.createElement("h3");
  heading.textContent = textContent;
  return heading;
};

BucketListView.prototype.createDetail = function (label, text) {
  const detail = document.createElement("p");
  detail.textContent = `${label}: ${text}`;
  return detail;
};

BucketListView.prototype.createDeleteButton = function (activityId) {
  const button = document.createElement('button');
  button.classList.add('delete-button');
  button.value = activityId;
  button.textContent = "Delete"

  button.addEventListener('click', (event) => {
    PubSub.publish('BucketListView:delete-clicked', event.target.value)
  });

  return button;
};

module.exports = BucketListView;
