/* eslint-env mocha */
import { expect } from 'meteor/practicalmeteor:chai';

import render from '../../../libs/test-helper';

import '../map';

import mapsObj from '../../../libs/maps';

describe('Map', function testDescribeFunc() {
  it('render and has a map object in the template instance', function testitFunc() {
    render('Map', '', el => {
      if (mapsObj.checkLoaded()) {
        expect(Template.Map.instance()).to.have.property('map');
      }
    });
  });
});
