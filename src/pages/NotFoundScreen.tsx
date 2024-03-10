import { Container, Typography } from '@mui/material';
import { memo } from 'react';

const NotFoundScreen = () => {
    return (
        <Container>
            <div className="notfound-404">
                <h1>404</h1>
            </div>
            <h2>Oops! Nothing was found</h2>
            <Typography>
                The page you are looking for might have been removed had its name changed or is
                temporarily unavailable. <a href={'/'}>Return to homepage</a>
            </Typography>
        </Container>
    );
};

export default memo(NotFoundScreen);
