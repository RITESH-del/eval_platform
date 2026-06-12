import React from 'react';
import { Text, Box, Paper } from '@mantine/core';

const LabDetailsFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Paper
      py="xs"
      radius={0}
      style={{
        backgroundColor: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
      }}
    >
      <Box ta="center">
        <Text size="xs" c="dimmed">
          © {currentYear} Faculty Portal. All rights reserved.
        </Text>
      </Box>
    </Paper>
  );
};

export default LabDetailsFooter;