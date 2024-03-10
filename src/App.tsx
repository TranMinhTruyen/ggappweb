import ErrorFallback from 'components/ErrorFallback';
import { getAuth } from 'services/auth/authAction';
import RouterList from 'components/RouterList';
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
