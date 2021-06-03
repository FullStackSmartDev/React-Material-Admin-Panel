import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useDraggableInPortal } from 'src/hooks/useDraggableInPortal';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
import '../styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAgentToDisplay } from '../../../actions/agentsManagementAction';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1} style={{ marginTop: 10 }}>
          <Typography component="span" variant="body1">
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%'
  },
  agentBox: {
    padding: 15,
    backgroundColor: theme.palette.background.dark,
    borderRadius: 5,
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 3px 4px -2px rgba(0,0,0,0.50)',
    marginBottom: '15px'
  },
  avatarLarge: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  p: {
    color: theme.palette.text.primary,
    fontSize: '10pt'
  },
  agentBoxArrow: {
    display: 'inline-block',
    float: 'right',
    marginTop: '-74px',
    background: '#8a85ff',
    padding: '5px 0px 0 20px',
    borderRadius: '0 3px 3px 0',
    zIndex: 0,
    marginRight: '-8px',
    color: 'white'
  },
  tabPanel: {
    maxHeight: 570
  },
  droppableColumn: {
    minHeight: '1px'
  }
}));

export default function Members({ droppableColumn, teamedAgents }) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const agentsManagement = useSelector((state) => state.agentsManagement);
  const dispatch = useDispatch();
  const renderDraggable = useDraggableInPortal();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const onChangeSelectedAgent = (agentObj) => {
    dispatch(setSelectedAgentToDisplay(agentObj));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Teamless Members" {...a11yProps(0)} />
          <Tab label="Teamed Members" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel
          value={value}
          index={0}
          dir={theme.direction}
          className={classes.tabPanel}
        >
          <Droppable
            droppableId={droppableColumn.id}
            className={classes.droppableColumn}
          >
            {(provided) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={classes.droppableColumn}
                >
                  {droppableColumn.column.items.map((agent, key) => {
                    return (
                      <Draggable
                        key={agent.id}
                        draggableId={agent.id}
                        index={key}
                      >
                        {renderDraggable((provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              color: 'white',
                              ...provided.draggableProps.style
                            }}
                          >
                            <div
                              className="agent-box-wrapper"
                              data-active={
                                agent.id === agentsManagement.agent.id
                              }
                              key={key}
                            >
                              <Box
                                className={classes.agentBox}
                                onClick={() => onChangeSelectedAgent(agent)}
                              >
                                <Grid container>
                                  <Grid item xs={3}>
                                    <Avatar
                                      src={agent.avatar}
                                      className={classes.avatarLarge}
                                    />
                                  </Grid>
                                  <Grid item xs={5}>
                                    <p className={classes.p}>
                                      {agent.fullName}
                                    </p>
                                    <p className={classes.p}>Position:</p>
                                    <p className={classes.p}>
                                      Call Center Agent
                                    </p>
                                  </Grid>
                                  <Grid item xs={4}>
                                    <p className={classes.p}>Team Lead:</p>
                                    <p className={classes.p}>
                                      {agent.teamLead}
                                    </p>
                                  </Grid>
                                </Grid>
                              </Box>
                            </div>
                          </div>
                        ))}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </TabPanel>
        <TabPanel
          value={value}
          index={1}
          dir={theme.direction}
          className={classes.tabPanel}
        >
          {teamedAgents.map((agent, key) => {
            return (
              <div
                className="agent-box-wrapper"
                data-active={agent.id === agentsManagement.agent.id}
                key={key}
              >
                <Box
                  className={classes.agentBox}
                  onClick={() => onChangeSelectedAgent(agent)}
                >
                  <Grid container>
                    <Grid item xs={3}>
                      <Avatar
                        src={agent.avatar}
                        className={classes.avatarLarge}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <p className={classes.p}>{agent.fullName}</p>
                      <p className={classes.p}>Position: </p>
                      <p className={classes.p}>Call Center Agent</p>
                    </Grid>
                    <Grid item xs={4}>
                      <p className={classes.p}>Team Lead:</p>
                      <p className={classes.p}>{agent.teamLead}</p>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            );
          })}
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

Members.propTypes = {
  teamedAgents: PropTypes.array.isRequired,
  droppableColumn: PropTypes.object.isRequired
};
