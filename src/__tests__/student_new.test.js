import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TraVerseStudentNew from '../app/students_new.jsx';

test('Match component.', () => {
  const component = shallow(
    <MuiThemeProvider>
      <TraVerseStudentNew/>
    </MuiThemeProvider>
  );

  expect(toJson(component)).toMatchSnapshot();
});
