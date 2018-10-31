use bucketList;
db.dropDatabase();

db.activities.insertMany([
  {
    activity: "Defeat Voldemort",
    type: "Recreational",
    date: "2018-12-25"
  },
  {
    activity: "Join the Quidditch team",
    type: "Sport",
    date: "2018-11-04"
  },
  {
    activity: "Ride a Hippogriff",
    type: "Outdoor",
    date: "2019-01-01"
  }
]);
