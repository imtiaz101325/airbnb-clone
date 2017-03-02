import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/app-body';

import '../../ui/pages/app-not-found';

import '../../ui/components/search-view';

import '../../ui/accounts/accounts-templates';

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body');
  },
});

FlowRouter.route('/s', {
  name: 'App.search',
  action() {
    BlazeLayout.render('App_body', { main: 'Search_view' });
  },
});

FlowRouter.route('/s/:address', {
  name: 'App.search',
  action() {
    BlazeLayout.render('App_body', { main: 'Search_view' });
  },
});

// the App_notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
