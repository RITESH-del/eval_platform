import {
  Button,
  Center,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Anchor } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Center h="100vh">
      <Stack align="center" gap="xs" pos="relative">
        <Title
          style={{
            fontFamily: 'cursive',
            fontSize: "10rem",
            fontWeight: 900,
            lineHeight: 1,
          }}
          c="blue"
        >
          404
        </Title>

        <Text
          size="xl"
          fw={500}
          c="dimmed"
          style={{
            fontFamily: 'cursive',
          }}
        >
          Oops, The page u are looking for cannot be found.
        </Text>

        

        <Group mt="lg">
          <Anchor
  onClick={() => navigate(-1)}        
  c="cyan"
  fw={500}
  size="sm"
  underline="never"
  style={{
    fontSize: `100%`,
    display: "flex",
    alignItems: "center",

    // gap: 2,
  }}
>
  <ChevronLeft size={18} />
  Go Back
</Anchor>
        </Group>
      </Stack>
    </Center>
  );
}
