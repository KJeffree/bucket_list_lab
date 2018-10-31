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
  PubSub.subscribe('BucketListView:edit-clicked', (event) => {
    this.getOne(event.detail);
  });
  PubSub.subscribe("BucketListUpdateForm:update-submitted", (event) => {
    this.updateActivity(event.detail, event.detail._id);
  })
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

BucketList.prototype.getOne = function (activityId) {
  this.request.getOne(activityId)
    .then((activity) => {
      PubSub.publish("BucketList:activity-loaded", activity);
    })
    .catch(console.error);
};

BucketList.prototype.updateActivity = function (activity, activityId) {
  delete activity._id;
  this.request.put(activityId, activity)
    .then((activities) => {
      PubSub.publish("BucketList:data-loaded", activities)
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
