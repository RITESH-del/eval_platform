import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Group, Paper, ActionIcon } from '@mantine/core';
import { ChevronLeft } from 'lucide-react';
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

     
      <Group align="center">
         <ActionIcon
            size={30}
            radius="xl"
            variant="filled"
            color="#D8DEF8"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={20} color="#0A2F7F" />
          </ActionIcon>
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
        </div>

        {/* <Button
          variant="filled"
          color="gray"
          onClick={() => navigate(-1)}
          leftSection={<ChevronLeft size={18} />}
        > */}


        
        {/* </Button> */}
      </Group>
    </Paper>
  );
};

export default LabDetailsHeader;