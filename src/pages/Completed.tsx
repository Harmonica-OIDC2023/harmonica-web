import React, { useEffect, useState } from 'react';
import InProgressSpinner from '../components/InProgressSpinner';

const Completed= () => {

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoading(!loading), 20000);
    }, []);

    if (loading === false) return <InProgressSpinner />;
    return (
        <div>
            completed!
        </div>
    );
};
  
export default Completed;