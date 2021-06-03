/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useLocation, matchPath } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'lodash';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { getTwilioToken } from 'src/actions/dialActions';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  ListSubheader,
  Typography,
  makeStyles
} from '@material-ui/core';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ChatIcon from '@material-ui/icons/Chat';
import {
  Calendar as CalendarIcon,
  ShoppingCart as ShoppingCartIcon,
  BarChart as BarChartIcon,
  DollarSign as DollarSignIcon
} from 'react-feather';
import Logo from 'src/components/Logo';
import { userRoles } from 'src/utils/data';
import {
  AssignmentInd,
  ContactsOutlined,
  DialerSip,
  GroupOutlined,
  ImportantDevices,
  ListAlt,
  PersonAdd,
  FeaturedPlayList,
  FormatIndentIncrease
} from '@material-ui/icons';
import useDialer from 'src/hooks/useDialer';
import { Device } from 'twilio-client';
import NavItem from './NavItem';

const navConfig = [
  {
    subheader: 'Agent',
    href: '/app/agent',
    items: [
      {
        title: 'Statistics',
        href: '/app/statistics',
        icon: BarChartIcon,
        section: 'Agent'
      },
      {
        title: 'Call Center',
        href: '/app/call-center',
        icon: DialerSip,
        section: 'Agent'
      },
      {
        title: 'Calendar',
        href: '/app/calendar',
        icon: CalendarIcon,
        section: 'Agent'
      },
      {
        title: 'Products',
        href: '/app/products',
        icon: ImportantDevices,
        section: 'Agent'
      },
      {
        title: 'Prices & Packages',
        href: '/app/prices-and-packages',
        icon: ShoppingCartIcon,
        section: 'Agent'
      },
      {
        title: 'FAQ',
        href: '/app/faq',
        icon: LiveHelpIcon,
        section: 'Agent'
      },
      {
        title: 'Manual',
        href: '/app/manual',
        icon: FileCopyIcon,
        section: 'Agent'
      },
      {
        title: 'Tutorials',
        href: '/app/tutorials',
        icon: MenuBookIcon,
        section: 'Agent'
      },
      {
        title: 'Chat',
        href: '/app/chat',
        icon: ChatIcon,
        section: 'Agent'
      },
      {
        title: 'Payment Terminal',
        href: '/app/payment-terminal',
        icon: DollarSignIcon,
        section: 'Agent'
      }
    ]
  },
  {
    subheader: 'Team Lead',
    href: '/app/team-lead',
    items: [
      {
        title: 'Team Tasks',
        href: '/app/team-tasks',
        icon: ListAlt,
        section: 'Supervisor'
      },
      {
        title: 'Leads Management',
        href: '/app/lead-management',
        icon: ContactsOutlined,
        section: 'Supervisor'
      },
      {
        title: 'Agents Management',
        href: '/app/agents-management',
        icon: GroupOutlined,
        section: 'Supervisor'
      }
    ]
  },
  {
    subheader: 'Leads Management',
    href: '/app/view-leas',
    items: [
      {
        title: 'View Leads',
        href: '/app/view-leads',
        icon: FeaturedPlayList,
        section: 'LeadManagement'
      },
      {
        title: 'Creat Leads',
        href: '/app/creat-leads',
        icon: FormatIndentIncrease,
        section: 'LeadManagement'
      }
    ]
  },
  {
    subheader: 'Admin',
    href: '/app/admin',
    items: [
      {
        title: 'Pending Account Approval',
        href: '/app/pending-account-approval',
        icon: AssignmentInd,
        section: 'Admin'
      },
      {
        title: 'Add Users',
        href: '/app/register-unprotected',
        icon: PersonAdd,
        section: 'Admin'
      },
      {
        title: 'Manage Users',
        href: '/app/manage-users',
        icon: AssignmentInd,
        section: 'Admin'
      }
    ]
  }
];

function renderNavItems({ items, ...rest }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, ...rest }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth = 0 }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        key={key}
        info={item.info}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        key={key}
        info={item.info}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

function NavBar({ openMobile, onMobileClose }) {
  const classes = useStyles();
  const location = useLocation();
  const { user } = useSelector((state) => state.account);
  const userProfile = useSelector((state) => state.profile.userProfile);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.dial.token);

  const teamSectionRoles = ['admin', 'call_agent_supervisor'];
  const adminSectionRoles = ['admin'];
  let userInfo = {};
  if (user && Object.keys(user).length > 0) {
    userInfo = get(user, 'data', {});
  }
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  useEffect(() => {
    dispatch(getTwilioToken());
  }, [dispatch]);

  const { updateDevice, device } = useDialer();

  useEffect(() => {
    if (!token) return;
    const device = new Device();

    device.setup(token, { debug: true });
    updateDevice(device);
  }, [token]);

  let userRole = 'admin';
  userRoles.map((role) => {
    if (role.value === userInfo.role) {
      userRole = role.label;
    }
  });
  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box p={2} display="flex" justifyContent="center">
            <RouterLink to="/">
              <Logo />
            </RouterLink>
          </Box>
        </Hidden>
        <Box p={2}>
          <Box display="flex" justifyContent="center">
            <RouterLink to="/app/account">
              <Avatar
                alt="User"
                className={classes.avatar}
                src={
                  userProfile.profileImage
                    ? userProfile.profileImage
                    : user.avatar
                }
              />
            </RouterLink>
          </Box>
          <Box mt={2} textAlign="center">
            <Link
              component={RouterLink}
              to="/app/account"
              variant="h5"
              color="textPrimary"
              underline="none"
            >
              {`${userInfo.firstName} ${userInfo.lastName}`}
            </Link>
            <Typography variant="body2" color="textSecondary">
              {userRole}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box p={2}>
          {navConfig.map((config) => {
            if (
              config.subheader === 'Team Lead' &&
              !teamSectionRoles.includes(userInfo.role)
            )
              return;
            if (
              config.subheader === 'Admin' &&
              !adminSectionRoles.includes(userInfo.role)
            )
              return;
            return (
              <List
                key={config.subheader}
                subheader={
                  <ListSubheader disableGutters disableSticky>
                    {config.subheader}
                  </ListSubheader>
                }
              >
                {renderNavItems({
                  items: config.items,
                  pathname: location.pathname
                })}
              </List>
            );
          })}
        </Box>
        <Divider />
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;
