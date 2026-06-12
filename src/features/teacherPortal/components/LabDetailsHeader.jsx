import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Group, Paper } from '@mantine/core';

const LabDetailsHeader = ({ details }) => {
  const navigate = useNavigate();

  const labTitle = details?.title || 'Loading Lab...';

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
        <div>
          <Title
            order={1}
            size="h2"
            fw={800}
            c="blue"
            style={{ textTransform: 'uppercase' }}
          >
            {labTitle}
          </Title>

          <Text
            size="sm"
            c="dimmed"
            mt={4}
            fw={500}
          >
            Exam Workspace Context
          </Text>
        </div>

        <Button
          variant="filled"
          color="gray"
          onClick={() => navigate(-1)}
        >
          ← Back to List
        </Button>
      </Group>
    </Paper>
  );
};

export default LabDetailsHeader;