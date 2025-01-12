import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const SkeletonLoader = () => {
  return (
    <Box width="100%" marginTop={5}>
  {[...Array(6)].map((_, index) => (
    <Box key={index} marginBottom={2}>
      <Skeleton key={index} variant="rectangular" height={30} width="100%" />
    </Box>
  ))}
</Box>
  );
};

export default SkeletonLoader;
