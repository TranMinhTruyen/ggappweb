import ErrorFallback from 'common/ErrorFallback';
import { getAuth } from 'common/sevices/auth/authAction';
import RouterList from './common/RouterList';
import { memo } from 'react';

const App = () => {
    getAuth();
    return (
        <ErrorFallback>
            <RouterList />
        </ErrorFallback>
    );
};

export default memo(App);
