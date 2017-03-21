import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AppContainer from '../app/students_new.jsx';

test('Match component.', () => {
  const component = shallow(
    <AppContainer/>
  );

  expect(toJson(component)).toMatchSnapshot();
});
