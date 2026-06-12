import React from 'react';
import { Group, Title, Text, Button, Box, Paper } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../auth/models/authSlice';

const TeacherHomePageHeader = ({ profile, onOpenModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const teacherName = profile?.name || 'Loading...';
  const teacherEmail = profile?.email || '';
  const teacherRole =
    profile?.role === 'faculty'
      ? 'Faculty Access'
      : `${profile?.role || ''} Access`;

  return (
    <Paper
      p="md"
      radius="md"
      shadow="sm"
      bg="white"
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
            {teacherName}
          </Title>

          <Text size="sm" c="dimmed" mt={4}>
            {teacherEmail}
            <span
              style={{
                margin: '0 6px',
                color: '#cbd5e0',
              }}
            >
              •
            </span>
            {teacherRole}
          </Text>
        </Box>

        <Group gap="sm">
          <Button
            variant="filled"
            color="blue"
            onClick={onOpenModal}
          >
            Create New Quiz +
          </Button>

          <Button
            variant="filled"
            color="red"
            onClick={()=>{
                localStorage.removeItem("token");
                dispatch(logout());
                navigate("/login");
            }}
          >
            Logout
          </Button>
        </Group>
      </Group>
    </Paper>
  );
};

export default TeacherHomePageHeader;