import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Paper,
  Title,
  Text,
  Stack,
  Group,
  Badge,
  Box,
} from '@mantine/core';
import { setSelectedSubmission } from '../models/facultySlice';

const LabDetailsMiddleware = ({ submissions }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { examId } = useParams(); 

  if (!submissions || submissions.length === 0) {
    return (
      <Paper
        p="xl"
        radius="md"
        withBorder
        mih="50vh"
      >
        <Text c="dimmed">
          No student sessions found for this lab.
        </Text>
      </Paper>
    );
  }

  return (
    <Paper
      p="xl"
      radius="md"
      withBorder
      mih="55vh"
    >
      <Title order={2} mb="lg">
        Student Submissions Tracking
      </Title>

      <Stack gap="md">
        {submissions.map((student) => {
          let langText = '';
          if (student.language === null) {
            langText = 'N/A';
          } else {
            langText = student.language;
          }

          let autoScore = '';
          if (student.autograding_score === null) {
            autoScore = '-';
          } else {
            autoScore = student.autograding_score;
          }

          let manScore = '';
          if (student.manual_score === null) {
            manScore = '-';
          } else {
            manScore = student.manual_score;
          }

          const isAbsent = student.status === 'absent';

          return (
            <Paper
              key={student.session_id}
              withBorder
              p="md"
              radius="md"
              onClick={() => {
                if (!isAbsent) {
                  dispatch(setSelectedSubmission(student))
                  navigate(`/TeacherHomePage/LabDetails/${examId}/StudentDetails/${student.session_id}`);
                }
              }}
              style={{
                cursor: isAbsent ? 'not-allowed' : 'pointer',
                opacity: isAbsent ? 0.6 : 1,
                transition: 'all 0.2s ease',
              }}
            >
              <Group justify="space-between" align="center">
                {/* Left Side */}
                <Group gap="md">
                  <Text size="sm" c="dimmed" fw={600}>
                    Roll:{' '}
                    <Text span c="dark">
                      {student.university_id}
                    </Text>
                  </Text>

                  <Badge
                    variant="light"
                    color="gray"
                  >
                    Sec - {student.section}
                  </Badge>

                  <Text
                    fw={700}
                    c="blue"
                    size="lg"
                  >
                    {student.name}
                  </Text>
                </Group>

                {/* Right Side */}
                <Group gap="xl">
                  <Box>
                    <Text size="sm" c="dimmed">
                      Language:{' '}
                      <Text span fw={700} c="dark">
                        {langText}
                      </Text>
                    </Text>
                  </Box>

                  <Box>
                    <Text size="sm" c="dimmed">
                      App Marks:{' '}
                      <Text span fw={900} c="teal">
                        {autoScore}
                      </Text>
                    </Text>
                  </Box>

                  <Box>
                    <Text size="sm" c="dimmed">
                      Teacher Marks:{' '}
                      <Text span fw={900} c="blue">
                        {manScore}
                      </Text>
                    </Text>
                  </Box>

                  <Badge
                    color={isAbsent ? 'red' : 'green'}
                    variant="light"
                    size="lg"
                  >
                    {student.status}
                  </Badge>
                </Group>
              </Group>
            </Paper>
          );
        })}
      </Stack>
    </Paper>
  );
};

export default LabDetailsMiddleware;