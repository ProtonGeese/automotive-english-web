import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TraVerseSegmentsNew from '../app/segments_new.jsx';

test('Match component.', () => {
  const component = shallow(
    <MuiThemeProvider>
      <TraVerseSegmentsNew
        params={{}}
      />
    </MuiThemeProvider>
  );

  expect(toJson(component)).toMatchSnapshot();
});
