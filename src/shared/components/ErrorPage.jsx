// import {
//   Button,
//   Center,
//   Group,
//   Stack,
//   Text,
//   Title,
// } from "@mantine/core";
// import { Anchor } from "@mantine/core";
// import { ChevronLeft } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";

// export default function ErrorPage() {
//   const navigate = useNavigate();

//   return (
//     <Center h="100vh">
//       <Stack align="center" gap="xs" pos="relative">
//         <Title
//           style={{
//             fontFamily: 'cursive',
//             fontSize: "10rem",
//             fontWeight: 900,
//             lineHeight: 1,
//           }}
//           c="blue"
//         >
//           404
//         </Title>

//         <Text
//           size="xl"
//           fw={500}
//           c="dimmed"
//           style={{
//             fontFamily: 'cursive',
//           }}
//         >
//           Oops, The page u are looking for cannot be found.
//         </Text>

        

//         <Group mt="lg">
//           <Anchor
//   onClick={() => navigate(-1)}        
//   c="cyan"
//   fw={500}
//   size="sm"
//   underline="never"
//   style={{
//     fontSize: `100%`,
//     display: "flex",
//     alignItems: "center",

//     // gap: 2,
//   }}
// >
//   <ChevronLeft size={18} />
//   Go Back
// </Anchor>
//         </Group>
//       </Stack>
//     </Center>
//   );
// }
import {
  Button,
  Container,
  Image,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Container className="min-h-screen flex items-center justify-center py-20">
      <SimpleGrid
        spacing={{ base: 40, sm: 80 }}
        cols={{ base: 1, sm: 2 }}
        className="items-center w-full"
      >
        {/* Mobile Image */}
        <Image
          src="https://ui.mantine.dev/_next/static/media/image.71460e26.svg"
          alt="Page not found"
          className="block md:hidden"
        />

        <div>
          <Title className="mb-4 text-[32px] sm:text-[34px] font-medium font-[Outfit]">
            Something is not right...
          </Title>

          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error, contact support.
          </Text>

          <Button
            variant="outline"
            size="md"
            mt="xl"
            className="w-full sm:w-auto"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>

        {/* Desktop Image */}
        {/* <Image
          src="https://ui.mantine.dev/_next/static/media/image.71460e26.svg"
          alt="Page not found"
          className="hidden md:block"
        /> */}
      </SimpleGrid>
    </Container>
  );
}