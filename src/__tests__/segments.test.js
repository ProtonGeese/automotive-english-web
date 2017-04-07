import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TraVerseSegments from '../app/segments.jsx';

test('Match component.', () => {
  const component = shallow(
    <MuiThemeProvider>
      <TraVerseSegments
        params={{}}
      />
    </MuiThemeProvider>
  );

  expect(toJson(component)).toMatchSnapshot();
});
