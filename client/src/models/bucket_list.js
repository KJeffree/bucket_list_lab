const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const BucketList = function (url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
};

BucketList.prototype.bindEvents = function () {
  PubSub.subscribe("BucketListFormView:form-submitted", (event) => {
    this.addNew(event.detail);
  });
  PubSub.subscribe('BucketListView:delete-clicked', (event) => {
    this.deleteActivity(event.detail);
  });
};

BucketList.prototype.getData = function () {
  this.request.get()
    .then((activities) => {
      PubSub.publish("BucketList:data-loaded", activities);
    })
    .catch(console.error);
};

BucketList.prototype.addNew = function (activity) {
  this.request.post(activity)
    .then((activities) => {
      PubSub.publish("BucketList:data-loaded", activities);
    })
    .catch(console.error);
};

BucketList.prototype.deleteActivity = function (activityId) {
  this.request.delete(activityId)
    .then((activities) => {
      PubSub.publish("BucketList:data-loaded", activities);
    })
    .catch(console.error);
};

module.exports = BucketList;
