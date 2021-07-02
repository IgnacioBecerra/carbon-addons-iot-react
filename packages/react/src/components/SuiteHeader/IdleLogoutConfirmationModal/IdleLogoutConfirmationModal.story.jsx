import React from 'react';

import IdleLogoutConfirmationModal from './IdleLogoutConfirmationModal';

export default {
  title: '1 - Watson IoT/SuiteHeader/IdleLogoutConfirmationModal',

  parameters: {
    component: IdleLogoutConfirmationModal,
  },
};

export const Default = () => (
  <div style={{ background: 'white' }}>
    <p>The logout confirmation dialog will show up after 10 seconds of inactivity.</p>
    <p>
      {
        'Open this story in another tab, wait for the dialog to show up in both tabs, then click "Stay logged in" to see the other dialog go away.'
      }
    </p>
    <IdleLogoutConfirmationModal
      idleTimeoutData={{
        timeout: 10,
        countdown: 10,
        cookieName: '_user_inactivity_timeout',
      }}
      routes={{
        logout: 'https://ibm.com',
        logoutInactivity: 'https://ibm.com',
        domain: '',
      }}
    />
  </div>
);

Default.story = {
  name: 'default',
};
