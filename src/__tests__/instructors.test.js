import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HondaInstructors from '../app/instructors.jsx';

test('Match component.', () => {
  const component = shallow(
    <MuiThemeProvider>
      <HondaInstructors/>
    </MuiThemeProvider>
  );

  expect(toJson(component)).toMatchSnapshot();
});
