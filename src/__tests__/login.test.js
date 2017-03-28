import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TraVerseLogin from '../app/login.jsx';

test('Match component.', () => {
  const component = shallow(
    <MuiThemeProvider>
      <TraVerseLogin/>
    </MuiThemeProvider>
  );

  expect(toJson(component)).toMatchSnapshot();
});
