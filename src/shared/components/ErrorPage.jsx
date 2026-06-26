import {
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  ArrowLeft,
  Compass,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Container size="sm" h="100vh">
      <Stack
        h="100%"
        justify="center"
        align="center"
      >
        <Paper
          p={48}
          radius="xl"
          shadow="sm"
          withBorder
          style={{
            width: "100%",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          {/* Background Number */}
          <Title
            style={{
              position: "absolute",
              top: "-30px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "12rem",
              fontWeight: 900,
              opacity: 0.04,
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            404
          </Title>

          <Stack align="center" gap="md">
            <Compass
              size={72}
              strokeWidth={1.5}
            />

            <Title order={1}>
              Looks like you've wandered off course
            </Title>

            <Text
              c="dimmed"
              size="lg"
              maw={450}
            >
              The page you're trying to reach isn't
              available right now. It may have been
              moved, removed, or never existed.
            </Text>

            <Group mt="md">
              <Button
                leftSection={<Home size={18} />}
                onClick={() => navigate("/")}
              >
                Go Home
              </Button>

              <Button
                variant="default"
                leftSection={<ArrowLeft size={18} />}
                onClick={() => navigate(-1)}
              >
                Go Back
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
