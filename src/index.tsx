import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from 'app/store';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';

async function render() {
    const rootNode = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
    rootNode.render(
        <Provider
            store={store}
            children={
                <BrowserRouter>
                    <CssBaseline />
                    <App />
                </BrowserRouter>
            }
        ></Provider>
    );
}

render();
