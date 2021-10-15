import {AccessTokenProvider, useAccessTokenContext} from '../contexts/AccessTokenContext'
import { SnackbarProvider, useSnackbarContext } from '../contexts/SnackbarContext'
import store from '../redux/store'
import { Provider } from 'react-redux'
import { ContextMenuProvider } from '../contexts/ContextMenuContext'
import Dashboard from '../components/Dashboard/Dashboard'

const Index = (props) => {

  return (
    <Provider store={store}>
      <SnackbarProvider>
        <AccessTokenProvider>
          <ContextMenuProvider>
            <Dashboard/>
          </ContextMenuProvider>
        </AccessTokenProvider>
      </SnackbarProvider>
    </Provider>
    
    
  )
}

export default Index