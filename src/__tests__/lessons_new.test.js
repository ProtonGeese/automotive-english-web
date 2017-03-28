import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TraVerseLessonsNew from '../app/lessons_new.jsx';

test('Match component.', () => {
  const component = shallow(
    <MuiThemeProvider>
      <TraVerseLessonsNew/>
    </MuiThemeProvider>
  );

  expect(toJson(component)).toMatchSnapshot();
});
