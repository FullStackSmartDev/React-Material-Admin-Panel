import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid, makeStyles, useTheme } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import TeamTabs from '../TeamTabs';
import MyTeam from '../../../components/MyTeam';
import MemberExtraData from '../MemberExtraData';
import CallRecordings from '../CallRecordings';
import SelectedMemberInfo from '../SelectedMemberInfo';
import * as actionTypes from '../../../actionTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 25,
    marginLeft: 25,
    padding: 25
  },
  boxStyle: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    padding: 25,
    backgroundColor: theme.palette.background.default,
    borderRadius: 5,
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.70), 0 3px 4px -2px rgba(0,0,0,0.50)'
  },
  boxHeading: {
    color: theme.palette.text.primary,
    textAlign: 'center',
    textTransformation: 'uppercase',
    fontSize: '11pt',
    marginBottom: '5px'
  },
  hr: {
    background: 'none',
    border: `1px solid ${theme.palette.split}`,
    opacity: 0.2
  }
}));

const initialColumns = [
  {
    id: '1',
    column: {
      name: 'MyTeam',
      items: []
    }
  },
  {
    id: '2',
    column: {
      name: 'TeamLess',
      items: []
    }
  }
];

const onDragEnd = async (result, columns, setColumns, user, supervisor) => {
  if (!result.destination) return;

  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns.filter((item) => {
      return item.id === source.droppableId;
    });
    const destColumn = columns.filter((item) => {
      return item.id === destination.droppableId;
    });
    const sourceItems = [...sourceColumn[0].column.items];
    const destItems = [...destColumn[0].column.items];
    const [removed] = sourceItems.splice(source.index, 1);

    if (!removed.hasOwnProperty('supervisor')) {
      removed.supervisor = supervisor.id;
      removed.teamLead = `${user.data.firstName} ${user.data.lastName}`;
    } else {
      delete removed.supervisor;
      delete removed.teamLead;
    }

    destItems.splice(destination.index, 0, removed);
    const updatedColumns = columns.map((item) => {
      return {
        id: item.id,
        column: {
          name: item.column.name,
          items: item.id === source.droppableId ? sourceItems : destItems
        }
      };
    });
    setColumns(updatedColumns);

    if (removed.hasOwnProperty('supervisor')) {
      await axios.post(`${actionTypes.API_URL}/agent/assign-agent`, {
        agentId: parseInt(removed.id, 10),
        supervisorId: supervisor.id
      });
    } else {
      await axios.post(`${actionTypes.API_URL}/agent/unassign-agent`, {
        agentId: parseInt(removed.id, 10)
      });
    }
  } else {
    const column = columns.filter((item) => {
      return item.id === source.droppableId;
    });
    const copiedItems = [...column[0].column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    const updatedColumns = columns.map((item) => {
      return {
        id: item.id,
        column: {
          name: item.column.name,
          items:
            item.id === source.droppableId ? copiedItems : item.column.items
        }
      };
    });
    setColumns(updatedColumns);
  }
};

const AgentsManagementView = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { user } = useSelector((state) => state.account);
  const [agents, setAgents] = useState([]);
  const [supervisor, setSupervisor] = useState({});
  const [columns, setColumns] = useState(initialColumns);
  const [teamedAgents, setTeamedAgents] = useState([]);
  const [isUnblocked, setUnblocked] = useState(false);

  const getAgents = useCallback(async () => {
    const res = await axios.get(`${actionTypes.API_URL}/agent/get-all-agents`);
    setAgents(res.data.data);
  }, []);

  const getSupervisor = useCallback(async () => {
    const res = await axios.post(`${actionTypes.API_URL}/supervisor`, {
      userId: user.data.id
    });
    setSupervisor(res.data.data);
  }, []);

  useEffect(() => {
    getAgents();
  }, [getAgents]);

  useEffect(() => {
    getSupervisor();
  }, [getSupervisor]);

  useEffect(() => {
    const updatedAgents = [
      supervisor.id
        ? agents.filter((agent) => agent.supervisor === supervisor.id)
        : [],
      agents.filter((agent) => !agent.teamLead)
    ];
    const updatedColumns = columns.map((item, index) => {
      return {
        id: item.id,
        column: {
          name: item.column.name,
          items: updatedAgents[index]
        }
      };
    });
    setColumns(updatedColumns);
  }, [agents, supervisor]);

  useEffect(() => {
    if (columns[0].column.items.length > 4) {
      setUnblocked(true);
    } else {
      setUnblocked(false);
    }
    const copiedAgents = [...agents];
    const copiedTeamLessAgents = [...columns[1].column.items];
    copiedTeamLessAgents.forEach((item) => {
      let ItemIndex = copiedAgents.findIndex((agent) => agent.id === item.id);
      copiedAgents.splice(ItemIndex, 1);
    });
    setTeamedAgents(copiedAgents);
  }, [columns]);

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <DragDropContext
            onDragEnd={(result) =>
              onDragEnd(result, columns, setColumns, user, supervisor)
            }
          >
            <Grid container>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Box className={classes.boxStyle}>
                  <h3 className={classes.boxHeading}>
                    Team under my supervision
                  </h3>
                  <hr className={classes.hr} />
                  <br />
                  <br />
                  <MyTeam
                    isUnblocked={isUnblocked}
                    droppableColumn={columns[0]}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <Box className={classes.boxStyle}>
                  <TeamTabs
                    teamedAgents={teamedAgents}
                    droppableColumn={columns[1]}
                  />
                </Box>
              </Grid>
            </Grid>
          </DragDropContext>
          <Grid item xs={6} sm={6} md={6} lg={12}>
            <Box className={classes.boxStyle}>
              <SelectedMemberInfo />
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Box className={classes.boxStyle}>
            <CallRecordings />
          </Box>
          <MemberExtraData />
        </Grid>
      </Grid>
    </div>
  );
};

export default AgentsManagementView;
