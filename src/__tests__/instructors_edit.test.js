import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TraVerseInstructorsEdit from '../app/instructors_edit.jsx';

test('Match component.', () => {
  const component = shallow(
    <MuiThemeProvider>
      <TraVerseInstructorsEdit/>
    </MuiThemeProvider>
  );

  expect(toJson(component)).toMatchSnapshot();
});
