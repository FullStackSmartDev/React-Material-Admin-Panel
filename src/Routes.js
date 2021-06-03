/* eslint-disable react/no-array-index-key */
import React, { lazy, Suspense, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import HomeView from 'src/views/pages/HomeView';
import LoadingScreen from 'src/components/LoadingScreen';

const routesConfig = [
  {
    exact: true,
    path: '/',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/pages/Error404View'))
  },
  {
    exact: true,
    // guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    path: '/login-unprotected',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    path: '/register-candidate',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    exact: true,
    // guard: GuestGuard,
    path: '/register',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    path: '/app',
    // guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/app/call-center',
        component: lazy(() => import('src/views/call-center')),
        section: 'Agent'
      },
      {
        exact: true,
        path: '/app/calendar',
        component: lazy(() => import('src/views/calendar/CalendarView')),
        section: 'Agent'
      },
      {
        exact: true,
        path: '/app/statistics',
        component: lazy(() => import('src/views/reports/DashboardView')),
        section: 'Agent'
      },
      {
        exact: true,
        path: '/app/products',
        component: lazy(() => import('src/views/products/ProductsView')),
        section: 'Agent'
      },
      {
        exact: true,
        path: '/app/prices-and-packages',
        component: lazy(() =>
          import('src/views/prices-and-packages/PricesAndPackagesView')
        ),
        section: 'Agent'
      },
      {
        exact: true,
        path: '/app/faq',
        component: lazy(() => import('src/views/faq/FaqView')),
        section: 'Agent'
      },
      {
        exact: true,
        path: '/app/tutorials',
        component: lazy(() => import('src/views/tutorials/TutorialsView')),
        section: 'Agent'
      },
      {
        exact: true,
        path: '/app/chat',
        component: lazy(() => import('src/views/chat/ChatView')),
        section: 'Agent'
      },
      {
        exact: true,
        path: '/app/team-tasks',
        component: lazy(() => import('src/views/team-tasks/TeamTasksView')),
        section: 'Supervisor'
      },
      {
        exact: true,
        path: '/app/agents-management',
        component: lazy(() =>
          import('src/views/agents-management/AgentsManagementView')
        ),
        section: 'Supervisor'
      },
      {
        exact: true,
        path: '/app/payment-terminal',
        component: lazy(() =>
          import('src/views/payment-terminal/PaymentTerminalView')
        ),
        section: 'Agent'
      },
      {
        exact: true,
        path: '/app/view-leads',
        component: lazy(() => import('src/views/leads-management/ViewLeads')),
        section: 'LeadManagement'
      },
      {
        exact: true,
        path: '/app/account',
        component: lazy(() => import('src/views/pages/AccountView')),
        section: 'Admin'
      },
      {
        exact: true,
        path: '/app/pending-account-approval',
        component: lazy(() =>
          import('src/views/auth/PendingAccountApprovalView')
        ),
        section: 'Admin'
      },
      {
        exact: true,
        path: '/app/manage-users',
        component: lazy(() => import('src/views/auth/ManageUsers')),
        section: 'Admin'
      },
      {
        exact: true,
        path: '/app/edit-user/:userId',
        component: lazy(() => import('src/views/auth/EditUser')),
        section: 'Admin'
      },
      {
        exact: true,
        path: '/app/register-unprotected',
        component: lazy(() => import('src/views/auth/RegisterByAdminView')),
        section: 'Admin'
      },
      {
        exact: true,
        path: '/app/management/leads',
        component: lazy(() => import('src/views/management/LeadsListView')),
        section: 'Supervisor'
      },
      {
        exact: true,
        path: '/app/management/leads/create',
        component: lazy(() => import('src/views/management/LeadsCreateView'))
      },
      {
        exact: true,
        path: '/app/management/leads/call/:leadId',
        component: lazy(() => import('src/views/management/LeadsCallView')),
        section: 'Supervisor'
      },
      {
        exact: true,
        path: '/app/management/customers',
        component: lazy(() => import('src/views/management/LeadsCreateView')),
        section: 'Supervisor'
      }
    ]
  },
  {
    path: '*',
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: '/home',
        component: HomeView
      }
    ]
  }
];

const renderRoutes = (routes) =>
  routes ? (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {routes.map((route, i) => {
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component = route.component;

          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  ) : null;

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
