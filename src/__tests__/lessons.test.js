import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TraVerseLessons from '../app/lessons.jsx';

test('Match component.', () => {
  const component = shallow(
    <MuiThemeProvider>
      <TraVerseLessons/>
    </MuiThemeProvider>
  );

  expect(toJson(component)).toMatchSnapshot();
});
