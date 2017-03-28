import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TraVerseInstructors from '../app/instructors.jsx';

test('Match component.', () => {
  const component = shallow(
    <MuiThemeProvider>
      <TraVerseInstructors/>
    </MuiThemeProvider>
  );

  expect(toJson(component)).toMatchSnapshot();
});
