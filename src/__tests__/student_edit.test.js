import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HondaStudentEdit from '../app/students_edit.jsx';

test('Match component.', () => {
  const component = shallow(
    <MuiThemeProvider>
      <HondaStudentEdit/>
    </MuiThemeProvider>
  );

  expect(toJson(component)).toMatchSnapshot();
});
