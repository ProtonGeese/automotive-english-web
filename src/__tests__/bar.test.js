import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TraVerseBar from '../app/bar.jsx';

test('Match component.', () => {
  const component = shallow(
    <MuiThemeProvider>
      <TraVerseBar/>
    </MuiThemeProvider>
  );

  expect(toJson(component)).toMatchSnapshot();
});
