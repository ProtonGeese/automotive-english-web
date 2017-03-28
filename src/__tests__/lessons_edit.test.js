import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TraVerseLessonsEdit from '../app/lessons_edit.jsx';

test('Match component.', () => {
  const component = shallow(
    <MuiThemeProvider>
      <TraVerseLessonsEdit/>
    </MuiThemeProvider>
  );

  expect(toJson(component)).toMatchSnapshot();
});
