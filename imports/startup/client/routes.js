import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/app-body';

import '../../ui/pages/app-not-found';
import '../../ui/pages/login-status';
import '../../ui/pages/tutorial-page';

import '../../ui/accounts/accounts-templates';

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'Login_status' });
  },
});

FlowRouter.route('/tutorial', {
  name: 'Tutorial_page',
  action() {
    BlazeLayout.render('Tutorial_page');
  },
});

// the App_notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
