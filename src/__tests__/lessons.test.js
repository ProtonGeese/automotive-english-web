import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HondaLessons from '../app/lessons.jsx';

test('Match component.', () => {
  const component = shallow(
    <MuiThemeProvider>
      <HondaLessons/>
    </MuiThemeProvider>
  );

  expect(toJson(component)).toMatchSnapshot();
});
