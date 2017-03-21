import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HondaStudentNew from '../app/students.jsx';

test('Match component.', () => {
  const component = shallow(
    <MuiThemeProvider>
      <HondaStudentNew/>
    </MuiThemeProvider>
  );

  expect(toJson(component)).toMatchSnapshot();
});
