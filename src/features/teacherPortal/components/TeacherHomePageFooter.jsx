import { Text, Box, Paper } from '@mantine/core';

export default function TeacherHomePageFooter() {
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
          © {new Date().getFullYear()} Faculty Portal. All rights reserved.
        </Text>
      </Box>
    </Paper>
  );
}