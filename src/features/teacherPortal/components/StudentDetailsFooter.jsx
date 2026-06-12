import { Text, Box, Paper } from '@mantine/core';

export default function StudentDetailsFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <Paper
       py="xs"
      radius={0}
      style={{
        backgroundColor: '#f8fafc',
        borderTop: '1px solid #e2e8f0',
      }}>
      <Box style={{ textAlign: 'center' }}>
        <Text size="xs" color="dimmed">© {currentYear} Faculty Portal. Evaluation Workspace Environment.</Text>
      </Box>
    </Paper>
  );
}