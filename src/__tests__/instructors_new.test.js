import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HondaInstructorsNew from '../app/instructors_new.jsx';

test('Match component.', () => {
  const component = shallow(
    <MuiThemeProvider>
      <HondaInstructorsNew/>
    </MuiThemeProvider>
  );

  expect(toJson(component)).toMatchSnapshot();
});
