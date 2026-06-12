import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Group, Title, Text, Button, Box, Paper } from '@mantine/core';

const StudentDetailsHeader = ({ data }) => {
  const navigate = useNavigate();

  const studentName = data?.student_details?.name || 'Loading Name...';
  const rollNumber = data?.student_details?.university_id || '------';
  const examTitle = data?.exam_details?.title || 'Loading Exam Title...';

  return (
    <Paper
      p="md"
      radius={0}
      style={{
        backgroundColor: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      <Group justify="space-between" align="center">
        <Box>
          <Title
            order={2}
            style={{
              fontWeight: 800,
              color: '#1a202c',
            }}
          >
            Review Submission:{' '}
            <span style={{ color: '#1e40af' }}>
              {studentName}
            </span>
          </Title>

          <Text size="sm" c="dimmed" mt={4}>
            Roll Number: {rollNumber}
            <span
              style={{
                margin: '0 6px',
                color: '#cbd5e0',
              }}
            >
              •
            </span>
            {examTitle}
          </Text>
        </Box>

        <Button
          variant="filled"
          color="gray"
          onClick={() => navigate(-1)}
        >
          ← Back to Submissions
        </Button>
      </Group>
    </Paper>
  );
};

export default StudentDetailsHeader;