/**
 * Main Layout
 * Layout wrapper for authenticated user pages
 */
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Navbar from '../Components/Navbar/Navbar';

const MainLayout = () => {
  return (
    <Box minH="100vh">
      <Navbar />
      <Box as="main">
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
