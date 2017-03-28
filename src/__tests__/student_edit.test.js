import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TraVerseStudentEdit from '../app/students_edit.jsx';

test('Match component.', () => {
  const component = shallow(
    <MuiThemeProvider>
      <TraVerseStudentEdit/>
    </MuiThemeProvider>
  );

  expect(toJson(component)).toMatchSnapshot();
});
