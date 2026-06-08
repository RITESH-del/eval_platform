import { Button, Stack, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Stack
      h="100vh"
      justify="center"
      align="center"
      gap="xs"
    >
      <Title size="6rem" c="gray">
        404
      </Title>

      <Title order={2}>
        Page not found
      </Title>

      <Text c="dimmed">
        The page you are looking for does not exist.
      </Text>

      <Button onClick={() => navigate('/')}>
        Go Home
      </Button>
    </Stack>
  );
}