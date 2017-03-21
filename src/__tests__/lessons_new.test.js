import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HondaLessonsNew from '../app/lessons_new.jsx';

test('Match component.', () => {
  const component = shallow(
    <MuiThemeProvider>
      <HondaLessonsNew/>
    </MuiThemeProvider>
  );

  expect(toJson(component)).toMatchSnapshot();
});
