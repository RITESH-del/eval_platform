import {
  Anchor,
  Divider,
  Group,
  Paper,
  Text,
} from "@mantine/core";

export default function StudentHomePageFooter() {
  return (
    <Paper
      component="footer"
      withBorder
      bg="var(--mantine-color-body)"
      radius={0}
      p="lg"
      mt="xl"
    >
      <Group
        justify="space-between"
        align="center"
        wrap="wrap"
      >
        <Text size="xs" c="dimmed">
          © 2024 Academic Faculty Intelligence System. All rights reserved.
        </Text>

        <Group gap="lg" wrap="wrap">
          <Anchor
            href="#privacy"
            size="xs"
            c="dimmed"
            underline="never"
          >
            Privacy Policy
          </Anchor>

          <Anchor
            href="#terms"
            size="xs"
            c="dimmed"
            underline="never"
          >
            Terms of Service
          </Anchor>

          <Anchor
            href="#support"
            size="xs"
            c="dimmed"
            underline="never"
          >
            Support
          </Anchor>
        </Group>
      </Group>
    </Paper>
  );
}