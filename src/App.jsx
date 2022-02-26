import React from 'react'
import styled from 'styled-components'
import { ThemeProvider, makeStyles, createTheme } from '@mui/material'
import { grey } from '@mui/material/colors'
import Home from './pages/Home';
import Events from './pages/Events'
import { EventSeatOutlined } from '@mui/icons-material';
import EventHome from './pages/EventHome';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { selectUser } from './redux/userRedux';
import EventUpload from './pages/EventUpload';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: '#e6bcca',
      light: '#d4d4d4',
    },
  },
});

const App = () => {
  const user = useSelector(selectUser);
  return (
    <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/events">
              <Events />
            </Route>
            <Route path="/events/:id">
              <EventHome />
            </Route>
            <Route path="/my-tickets">
              <Cart />
            </Route>
            <Route path="/login">
              {user ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route path="/register">
              {user ? <Redirect to="/" /> : <Register />}
            </Route>
            <Route path="/publish-event">
              <EventUpload />
            </Route>
          </Switch>
        </Router>
    </ThemeProvider>
  )
}

export default App;
