import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TraVerseConversation from '../app/conversation.jsx';

test('Match component.', () => {
  const component = shallow(
    <MuiThemeProvider>
      <TraVerseConversation/>
    </MuiThemeProvider>
  );

  expect(toJson(component)).toMatchSnapshot();
});
