import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HondaBar from '../app/bar.jsx';

test('Match component.', () => {
  const component = shallow(
    <MuiThemeProvider>
      <HondaBar/>
    </MuiThemeProvider>
  );

  expect(toJson(component)).toMatchSnapshot();
});
