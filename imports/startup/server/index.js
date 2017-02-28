import { Meteor } from 'meteor/meteor';

import '../../api/roles';

import Tasks from '../../api/tasks';

Meteor.publish('tasks', function tasksPublication() {
  return Tasks.find({
    $or: [
      { private: { $ne: true } },
      { owner: this.userId },
    ],
  });
});
