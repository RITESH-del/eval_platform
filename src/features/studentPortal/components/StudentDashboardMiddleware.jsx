import { useNavigate } from "react-router-dom";
import {
  Alert,
  Badge,
  Button,
  Container,
  Grid,
  Group,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  Activity,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Trophy,
} from "lucide-react";

function DashboardStatCard({
  title,
  value,
  color,
  // Icon,
}) {
  return (
    <Paper
      withBorder
      bg="var(--mantine-color-body)"
      radius="md"
      p="lg"
      shadow="xs"
    >
      <Group justify="space-between">
        <Text
          size="sm"
          c="dimmed"
          fw={500}
        >
          {title}
        </Text>

        {/* <ThemeIcon
          variant="light"
          color={color}
          radius="xl"
          size={38}
        >
          <Icon size={18} /> 
        </ThemeIcon> */}
      </Group>

      <Title
        order={2}
        mt="sm"
        c={color}
      >
        {value}
      </Title>
    </Paper>
  );
}

export default function StudentDashboardPage({
  exams = [],
  completed = [],
  averageScore = 0,
  bestScore = 0,
}) {
  const navigate = useNavigate();

  return (
    <Container
      size="xl"
      py="md"
      bg="var(--mantine-color-body)"
    >
      <Stack gap="lg">

        {/* Header */}

        <Group justify="space-between">
          <Stack gap={2}>
            <Title order={2} c="blue">
              Student Dashboard
            </Title>

            <Text
              size="sm"
              c="dimmed"
            >
              Live performance insights from your
              latest exam data.
            </Text>
          </Stack>

          <Button
            rightSection={
              <ArrowRight size={16} />
            }
            onClick={() =>
              navigate("/student/results")
            }
          >
            View Exam Results
          </Button>
        </Group>

        {/* Statistics */}

        <SimpleGrid
          cols={{
            base: 1,
            sm: 2,
            lg: 4,
          }}
        >
          <DashboardStatCard
            title="Total Exams"
            value={exams.length}
            color="blue"
            // Icon={BookOpen}
          />

          <DashboardStatCard
            title="Completed"
            value={completed.length}
            color="green"
            // Icon={CheckCircle2}
          />

          <DashboardStatCard
            title="Pending"
            value={
              exams.length -
              completed.length
            }
            color="yellow"
            // Icon={Activity}
          />

          <DashboardStatCard
            title="Average Score"
            value={`${averageScore}%`}
            color="indigo"
            // Icon={Trophy}
          />
        </SimpleGrid>

        <Grid>

          {/* Recent Activity */}

          <Grid.Col
            span={{
              base: 12,
              lg: 8,
            }}
          >
            <Paper
              withBorder
              radius="md"
              p="lg"
            >
              <Group
                justify="space-between"
                mb="lg"
              >
                <Stack gap={2}>
                  <Title order={4} c="blue">
                    Recent Activity
                  </Title>

                  <Text
                    size="sm"
                    c="dimmed"
                  >
                    Latest submissions
                  </Text>
                </Stack>

                {/* <ThemeIcon
                  variant="light"
                  color="blue"
                >
                  <Activity size={18} />
                </ThemeIcon> */}
              </Group>

              <Stack gap="sm">
                {exams.length === 0 ? (
                  <Paper
                    withBorder
                    radius="md"
                    p="xl"
                  >
                    <Text
                      ta="center"
                      c="dimmed"
                    >
                      No exams available yet.
                    </Text>
                  </Paper>
                ) : (
                  exams
                    .slice(0, 5)
                    .map((exam) => (
                      <Paper
                        key={exam.examId}
                        withBorder
                        radius="md"
                        p="md"
                      >
                        <Group justify="space-between">
                          <Stack gap={2}>
                            <Text fw={600}>
                              {exam.title}
                            </Text>

                            <Text
                              size="xs"
                              c="dimmed"
                            >
                              {exam.submittedAt
                                ? new Date(
                                    exam.submittedAt
                                  ).toLocaleDateString(
                                    "en-IN"
                                  )
                                : "Date not available"}
                            </Text>
                          </Stack>

                          <Badge
                            variant="light"
                            color={
                              exam.isPending
                                ? "yellow"
                                : "green"
                            }
                          >
                            {exam.isPending
                              ? "Pending"
                              : `${Math.round(
                                  exam.scoreValue
                                )} / ${
                                  exam.maxScore
                                }`}
                          </Badge>
                        </Group>
                      </Paper>
                    ))
                )}
              </Stack>
            </Paper>
          </Grid.Col>
                    {/* Performance Snapshot */}

          <Grid.Col
            span={{
              base: 12,
              lg: 4,
            }}
          >
            <Paper
              withBorder
              radius="md"
              p="lg"
              h="100%"
            >
              <Group mb="lg">

                <Title order={4} c="blue">
                  Performance Snapshot
                </Title>
              </Group>

              <Stack gap="lg">
                <div>
                  <Group justify="space-between" mb={6}>
                    <Text size="sm" c="dimmed">
                      Best Score
                    </Text>

                    <Text fw={600}>
                      {Math.round(bestScore)}%
                    </Text>
                  </Group>

                  <Progress
                    value={Math.min(bestScore, 100)}
                    color="blue"
                    radius="xl"
                  />
                </div>

                <Alert
                  variant="light"
                  color="blue"
                  title="Dashboard Insight"
                >
                  Your dashboard is generated directly
                  from the latest exam submissions.
                  Scores, pending evaluations and
                  performance statistics stay
                  synchronized with your Exam Results.
                </Alert>

                <div>
                  <Group justify="space-between" mb={6}>
                    <Text size="sm" c="dimmed">
                      Overall Average
                    </Text>

                    <Text fw={600}>
                      {averageScore}%
                    </Text>
                  </Group>

                  <Progress
                    value={averageScore}
                    color="green"
                    radius="xl"
                  />
                </div>

                <div>
                  <Group justify="space-between" mb={6}>
                    <Text size="sm" c="dimmed">
                      Best Performance
                    </Text>

                    <Text fw={600}>
                      {Math.round(bestScore)}%
                    </Text>
                  </Group>

                  <Progress
                    value={Math.min(bestScore, 100)}
                    color="indigo"
                    radius="xl"
                  />
                </div>

                <Paper
                  withBorder
                  bg="var(--mantine-color-body)"
                  radius="md"
                  p="md"
                >
                  <Stack gap={4}>
                    <Text
                      size="sm"
                      fw={600}
                      c="blue"
                    >
                      Quick Summary
                    </Text>

                    <Group justify="space-between">
                      <Text
                        size="sm"
                        c="dimmed"
                      >
                        Total Exams
                      </Text>

                      <Text fw={600}>
                        {exams.length}
                      </Text>
                    </Group>

                    <Group justify="space-between">
                      <Text
                        size="sm"
                        c="dimmed"
                      >
                        Completed
                      </Text>

                      <Badge color="green">
                        {completed.length}
                      </Badge>
                    </Group>

                    <Group justify="space-between">
                      <Text
                        size="sm"
                        c="dimmed"
                      >
                        Pending
                      </Text>

                      <Badge color="yellow">
                        {exams.length -
                          completed.length}
                      </Badge>
                    </Group>
                  </Stack>
                </Paper>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
}