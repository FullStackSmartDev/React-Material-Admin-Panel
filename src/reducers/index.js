import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import accountReducer from './accountReducer';
import notificationsReducer from './notificationsReducer';
import chatReducer from './chatReducer';
import mailReducer from './mailReducer';
import kanbanReducer from './kanbanReducer';
import profileReducer from './profileReducer';
import leadReducer from './leadReducer';
import eventReducer from './eventReducer';
import dialReducer from './dialReducer';
import agentsManagementReducer from './agentsManagementReducer';
import selectedLeadReducer from './selectedLeadReducer';

const rootReducer = (history) => combineReducers({
  account: accountReducer,
  notifications: notificationsReducer,
  chat: chatReducer,
  mail: mailReducer,
  kanban: kanbanReducer,
  form: formReducer,
  profile: profileReducer,
  leads: leadReducer,
  event: eventReducer,
  agentsManagement: agentsManagementReducer,
  selectedLead: selectedLeadReducer,
  dial: dialReducer
});

export default rootReducer;
