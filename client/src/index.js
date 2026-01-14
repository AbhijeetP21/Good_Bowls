import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Custom theme
import theme from './theme';

// Use new RTK store (includes legacy reducers for gradual migration)
import store from './app/store';

// Error boundary for catching unhandled errors
import ErrorBoundary from './Components/shared/ErrorBoundary';

ReactDOM.render(
	<Provider store={store}>
		<ChakraProvider theme={theme}>
			<BrowserRouter>
				<ErrorBoundary>
					<App />
				</ErrorBoundary>
			</BrowserRouter>
		</ChakraProvider>
	</Provider>,
	document.getElementById('root'),
);

