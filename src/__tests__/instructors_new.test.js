import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TraVerseInstructorsNew from '../app/instructors_new.jsx';

test('Match component.', () => {
  const component = shallow(
    <MuiThemeProvider>
      <TraVerseInstructorsNew/>
    </MuiThemeProvider>
  );

  expect(toJson(component)).toMatchSnapshot();
});
