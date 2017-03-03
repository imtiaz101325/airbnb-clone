import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Template } from 'meteor/templating';

import 'bootstrap-sass';

import './app-body.html';

import '../components/navigation';
import '../components/footer';

import mapsObj from '../../libs/maps';

const CONNECTION_ISSUE_TIMEOUT = 5000;

// A store which is local to this file?
const showConnectionIssue = new ReactiveVar(false);

Meteor.startup(() => {
  // Only show the connection error box if it has been 5 seconds since
  // the app started
  setTimeout(() => {
    // Show the connection error box
    showConnectionIssue.set(true);
  }, CONNECTION_ISSUE_TIMEOUT);
});

Template.App_body.onCreated(function appBodyOnCreated() {
  if (!mapsObj.checkLoaded()) {
    mapsObj.loadMap();
  }
});
