import React, { useEffect } from 'react';
import { useNavigation } from 'react-router';
import NProgress from 'nprogress';
import 'nprogress/'; // Import NProgress CSS

const ProgressBar = () => {
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === 'loading') {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [navigation.state]); // Re-run effect when navigation state changes

  return null; // This component doesn't render any visible UI
};
export default ProgressBar