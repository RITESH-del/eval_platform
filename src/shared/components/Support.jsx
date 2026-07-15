import {
  Container,
  Title,
  Text,
  Paper,
  Stack,
  Group,
  TextInput,
  Textarea,
  Select,
  FileInput,
  Button,
  Accordion,
  SimpleGrid,
  ActionIcon,
  Card,
  ThemeIcon,
} from "@mantine/core";

import {
  Mail,
  Phone,
  Clock,
  Bug,
  Moon,
  Sun,
} from "lucide-react";

import { useMantineColorScheme } from "@mantine/core";

export default function SupportPage() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2}>Support Center</Title>

          <Text c="dimmed">
            Need help? Report an issue or browse frequently asked questions.
          </Text>
        </div>

        <ActionIcon
          variant="light"
          size="lg"
          radius="xl"
          onClick={() => toggleColorScheme()}
        >
          {colorScheme === "dark" ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </ActionIcon>
      </Group>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
        <Paper withBorder radius="md" p="lg">
          <Stack>
            <Group>
              <ThemeIcon size="lg" radius="xl">
                <Bug size={18} />
              </ThemeIcon>

              <Title order={4}>Report an Issue</Title>
            </Group>

            <Select
              label="Issue Type"
              placeholder="Select issue"
              data={[
                "Login Issue",
                "Exam Issue",
                "Submission Issue",
                "Results Issue",
                "Technical Issue",
                "Other",
              ]}
            />

            <TextInput
              label="Subject"
              placeholder="Brief summary"
            />

            <Textarea
              label="Description"
              minRows={5}
              placeholder="Describe your issue..."
            />

            <FileInput
              label="Attachment (Optional)"
              placeholder="Upload screenshot"
            />

            <Button>Submit Ticket</Button>
          </Stack>
        </Paper>

        <Stack>
          <Paper withBorder radius="md" p="lg">
            <Title order={4} mb="md">
              Frequently Asked Questions
            </Title>

            <Accordion variant="separated">
              <Accordion.Item value="1">
                <Accordion.Control>
                  I can't login.
                </Accordion.Control>

                <Accordion.Panel>
                  Verify your university credentials and ensure
                  Caps Lock is disabled. If the issue persists,
                  contact support.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="2">
                <Accordion.Control>
                  My exam isn't visible.
                </Accordion.Control>

                <Accordion.Panel>
                  Confirm that your instructor has published the
                  exam and that it has started.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="3">
                <Accordion.Control>
                  My submission failed.
                </Accordion.Control>

                <Accordion.Panel>
                  Check your internet connection and try again.
                  Contact support immediately if the issue
                  continues.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="4">
                <Accordion.Control>
                  When will results be available?
                </Accordion.Control>

                <Accordion.Panel>
                  Results become available once your instructor
                  publishes them.
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Paper>

          <SimpleGrid cols={1}>
            <Card withBorder radius="md">
              <Group>
                <ThemeIcon variant="light">
                  <Mail size={18} />
                </ThemeIcon>

                <div>
                  <Text fw={600}>Email</Text>
                  <Text size="sm" c="dimmed">
                    support@bmu.edu.in
                  </Text>
                </div>
              </Group>
            </Card>

            <Card withBorder radius="md">
              <Group>
                <ThemeIcon variant="light">
                  <Phone size={18} />
                </ThemeIcon>

                <div>
                  <Text fw={600}>Phone</Text>
                  <Text size="sm" c="dimmed">
                    +91 XXXXX XXXXX
                  </Text>
                </div>
              </Group>
            </Card>

            <Card withBorder radius="md">
              <Group>
                <ThemeIcon variant="light">
                  <Clock size={18} />
                </ThemeIcon>

                <div>
                  <Text fw={600}>Office Hours</Text>
                  <Text size="sm" c="dimmed">
                    Monday – Friday
                  </Text>

                  <Text size="sm" c="dimmed">
                    9:00 AM – 5:00 PM
                  </Text>
                </div>
              </Group>
            </Card>
          </SimpleGrid>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}