import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { checkAuthLoader } from './util/auth';
import HomePage from './pages/Home';
import RootLayout from './pages/Root';
import EventsRootLayout from './pages/EventsRoot';
import EventsPage from './pages/Events';
import NewEventPage from './pages/NewEvent';
import { action as logoutAction } from './pages/Logout';
import { applicationLoader } from './components/EventForm';
import { eventsLoader } from './pages/Events';
import EventDetailPage, {eventDetailLoader} from './pages/EventDetail';
import EditEventPage, {editEventLoader} from './pages/EditEvent';
import ChartsPage from './pages/Charts';
import Error404 from './pages/Error404';
import {store, persistor  }from './store/index.js';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id:'root',
    loader: checkAuthLoader,
    children: [
      {
        index: true, 
        element: <HomePage /> 
      },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children:[
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,            
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                loader: editEventLoader
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            loader: applicationLoader
          }
        ]
      },
      {
        path: 'charts',
        element: <EventsRootLayout />,
        children:[
          {
            index: true,
            element: <ChartsPage />
          }
        ]  
      },  
      {
        path:'logout',
        action: logoutAction
      },
      {
        path: 'Error404',
        element: <Error404 />
      }      
    ]
  }
]);

function App() {
  return (
    <>
         <Provider store={store}>
            <PersistGate persistor={persistor}>
              <RouterProvider router={router} />
            </PersistGate>  
          </Provider>
    </>
  )
}

export default App
