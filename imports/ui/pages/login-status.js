import { Template } from 'meteor/templating';

import './login-status.html';
import '../accounts/admin';
import '../accounts/secret';

Template.Login_status.helpers({
  userStatus() {
    return !!Meteor.userId();
  },
  userName() {
    if (Meteor.user() && Meteor.user().profile) {
      return Meteor.user().profile.name;
    }
    return '';
  },
  admin() {
    return Meteor.user().roles && (Meteor.user().roles['default-group'][0] === 'admin');
  },
  secret() {
    return Meteor.user().roles && (Meteor.user().roles['default-group'][0] === 'view-secrets');
  },
});

Template.Login_status.events({
  'click .js-logout'() {
    Meteor.logout();
  },
});
