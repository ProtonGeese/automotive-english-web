import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HondaLessonsEdit from '../app/lessons_edit.jsx';

test('Match component.', () => {
  const component = shallow(
    <MuiThemeProvider>
      <HondaLessonsEdit/>
    </MuiThemeProvider>
  );

  expect(toJson(component)).toMatchSnapshot();
});
