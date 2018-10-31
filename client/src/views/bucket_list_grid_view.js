const PubSub = require("../helpers/pub_sub.js");
const BucketListView = require("./bucket_list_view.js");

const BucketListGridView = function (container) {
  this.container = container;
};


BucketListGridView.prototype.bindEvents = function () {
  PubSub.subscribe("BucketList:data-loaded", (event) => {
    this.render(event.detail);
  });
};

BucketListGridView.prototype.render = function (activities) {
  this.container.innerHTML = "";
  const bucketListView = new BucketListView(this.container);
  activities.forEach((activity) => bucketListView.display(activity));
};

module.exports = BucketListGridView;
