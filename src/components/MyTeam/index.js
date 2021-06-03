import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { setSelectedAgentToDisplay } from 'src/actions/agentsManagementAction';
import { useDraggableInPortal } from 'src/hooks/useDraggableInPortal';
import '../../assets/css/styles.scss';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import RemoveIcon from '@material-ui/icons/Remove';

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
    marginBottom: '15px',
    '&$disabled': {
      color: 'white'
    }
  },
  avatarLarge: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  p: {
    color: theme.palette.text.primary,
    fontSize: '10pt'
  },
  msgp: {
    color: theme.palette.text.primary,
    textAlign: 'center',
    fontSize: '80%'
  },
  agentBoxDraggableArea: {
    height: '100px',
    border: `2px dashed ${theme.palette.background.dark}`,
    borderRadius: '5px',
    marginBottom: '20px',
    placeItems: 'center',
    display: 'grid',
    textAlign: 'center',
    padding: '25px',
    '& p': {
      color: theme.palette.text.primary,
      opacity: '0.3'
    }
  },
  alert: {
    borderColor: 'red'
  },
  icon: {
    width: 25,
    height: 25,
    borderRadius: '50%',
    backgroundColor: '#797f8b',
    marginBottom: -9,
    padding: 3,
    fontWeight: 'bold',
    marginTop: '-55px',
    marginRight: '-20px',
    float: 'right'
  }
}));

export default function MyTeam({ isUnblocked, droppableColumn }) {
  const classes = useStyles();
  const agentsManagement = useSelector((state) => state.agentsManagement);
  const dispatch = useDispatch();
  const renderDraggable = useDraggableInPortal();

  const onChangeSelectedAgent = (agentObj) => {
    dispatch(setSelectedAgentToDisplay(agentObj));
  };

  const createEmptySpot = (agentsBySupervisor) => {
    const emptySpots = [];

    for (let i = 0; i < 5 - agentsBySupervisor.length; i++) {
      emptySpots.push(i);
    }

    return emptySpots;
  };

  const agentStatus = (availability) => {
    switch (availability) {
      case 'available':
        return (
          <CheckIcon className={classes.icon} style={{ background: 'green' }} />
        );
      case 'unavailable':
        return (
          <CloseIcon className={classes.icon} style={{ background: 'red' }} />
        );
      default:
        return <RemoveIcon className={classes.icon} />;
    }
  };

  return (
    <div className={classes.root}>
      <Droppable droppableId={droppableColumn.id} isDropDisabled={isUnblocked}>
        {(provided) => {
          return (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {droppableColumn.column.items.map((agent, key) => {
                return (
                  <Draggable key={agent.id} draggableId={agent.id} index={key}>
                    {renderDraggable((provided) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
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
                                    data-avatart-alert={agent.needHelp}
                                  />
                                </Grid>
                                <Grid item xs={5}>
                                  <p className={classes.p}>{agent.fullName}</p>
                                  <p className={classes.p}>Position:</p>
                                  <p className={classes.p}>Call Center Agent</p>
                                </Grid>
                                <Grid item xs={4}>
                                  <p className={classes.p}>Team Lead:</p>
                                  <p className={classes.p}>{agent.teamLead}</p>
                                  {agentStatus(agent.availability)}
                                </Grid>
                                <Grid> </Grid>
                              </Grid>
                            </Box>
                          </div>
                        </div>
                      );
                    })}
                  </Draggable>
                );
              })}
              {createEmptySpot(droppableColumn.column.items).map((key) => (
                <div className={classes.agentBoxDraggableArea} key={key}>
                  <p>Drag and drop here a teamless member of your choice.</p>
                </div>
              ))}
            </div>
          );
        }}
      </Droppable>
      <p className={classes.msgp}>Your current maximum limit is 5 agents.</p>
    </div>
  );
}

MyTeam.propTypes = {
  isUnblocked: PropTypes.bool.isRequired,
  droppableColumn: PropTypes.object.isRequired
};
