import React from 'react';
import {
  Box, makeStyles, Avatar, Grid
} from '@material-ui/core';
import Proptypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'white',
    borderRadius: 5,
    margin: theme.spacing(3)
  },
  company: {
    borderRight: '1px solid rgb(180,180,180)',
    paddingRight: theme.spacing(1)
  },
  text: {
    fontSize: 14
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  }
}));

function AvailableAgent({ agentList }) {
  const classes = useStyles();
  return agentList && agentList.length > 0 ? (
    agentList.map((agent) => (
      <Box className={classes.root} display="flex">
        <Box p={1}>
          <Grid container>
            <Grid item xs={4}>
              <Box pr={1}>
                {agent.profileImage ? (
                  // eslint-disable-next-line jsx-a11y/alt-text
                  <img src={agent.profileImage} className={classes.profileImage} />
                ) : (
                  <Avatar src="/broken-image.jpg" className={classes.profileImage} />
                )}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className={classes.company} pr={1}>
                <Box fontSize={14} fontWeight="bold">
                  {agent.name}
                </Box>
                <Box fontSize={14}>{agent.position}</Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box pl={1}>
                <Box fontSize={14} fontWeight="fontWeightBold">
                  Status:
                </Box>
                <Box
                  fontSize={14}
                  fontWeight="bold"
                  color={
										agent.status === 'available' ? (
										  '#357a38'
										) : agent.status === 'unavailable' ? (
										  '#c62828'
										) : (
										  '#2196f3'
										)
									}
                >
                  {agent.status}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    ))
  ) : (
    <Box textAlign="center" pt={2} color="white" fontSize={20} color="#8a85ff">
      No Available Agents
    </Box>
  );
}
AvailableAgent.propTypes = {
  leadList: Proptypes.array.isRequired
};
export default AvailableAgent;
