import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HondaHome from '../app/home.jsx';

test('Match component.', () => {
  const component = shallow(
    <MuiThemeProvider>
      <HondaHome/>
    </MuiThemeProvider>
  );

  expect(toJson(component)).toMatchSnapshot();
});
