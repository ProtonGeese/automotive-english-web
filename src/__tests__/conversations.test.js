import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TraVerseConversations from '../app/conversations.jsx';

test('Match component.', () => {
  const component = shallow(
    <MuiThemeProvider>
      <TraVerseConversations/>
    </MuiThemeProvider>
  );

  expect(toJson(component)).toMatchSnapshot();
});
