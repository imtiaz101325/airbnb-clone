import { Template } from 'meteor/templating';

import 'bootstrap-datepicker';

import './toolbar.html';

Template.Toolbar.onRendered(function renderFunc() {
  this.$('.input-daterange input').each(function eachElem() {
    $(this).datepicker();
  });
});
