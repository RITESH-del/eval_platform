// import {
//   Container,
//   Title,
//   Text,
//   Paper,
//   Stack,
//   Group,
//   TextInput,
//   Textarea,
//   Select,
//   FileInput,
//   Button,
//   Accordion,
//   SimpleGrid,
//   ActionIcon,
//   Card,
//   ThemeIcon,
// } from "@mantine/core";

// import {
//   Mail,
//   Phone,
//   Clock,
//   Bug,
//   Moon,
//   Sun,
// } from "lucide-react";

// import { useMantineColorScheme } from "@mantine/core";

// export default function SupportPage() {
//   const { colorScheme, toggleColorScheme } = useMantineColorScheme();

//   return (
//     <Container size="lg" py="xl">
//       <Group justify="space-between" mb="xl">
//         <div>
//           <Title order={2}>Support Center</Title>

//           <Text c="dimmed">
//             Need help? Report an issue or browse frequently asked questions.
//           </Text>
//         </div>

//         <ActionIcon
//           variant="light"
//           size="lg"
//           radius="xl"
//           onClick={() => toggleColorScheme()}
//         >
//           {colorScheme === "dark" ? (
//             <Sun size={18} />
//           ) : (
//             <Moon size={18} />
//           )}
//         </ActionIcon>
//       </Group>

//       <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
//         <Paper withBorder radius="md" p="lg">
//           <Stack>
//             <Group>
//               <ThemeIcon size="lg" radius="xl">
//                 <Bug size={18} />
//               </ThemeIcon>

//               <Title order={4}>Report an Issue</Title>
//             </Group>

//             <Select
//               label="Issue Type"
//               placeholder="Select issue"
//               data={[
//                 "Login Issue",
//                 "Exam Issue",
//                 "Submission Issue",
//                 "Results Issue",
//                 "Technical Issue",
//                 "Other",
//               ]}
//             />

//             <TextInput
//               label="Subject"
//               placeholder="Brief summary"
//             />

//             <Textarea
//               label="Description"
//               minRows={5}
//               placeholder="Describe your issue..."
//             />

//             <FileInput
//               label="Attachment (Optional)"
//               placeholder="Upload screenshot"
//             />

//             <Button>Submit Ticket</Button>
//           </Stack>
//         </Paper>

//         <Stack>
//           <Paper withBorder radius="md" p="lg">
//             <Title order={4} mb="md">
//               Frequently Asked Questions
//             </Title>

//             <Accordion variant="separated">
//               <Accordion.Item value="1">
//                 <Accordion.Control>
//                   I can't login.
//                 </Accordion.Control>

//                 <Accordion.Panel>
//                   Verify your university credentials and ensure
//                   Caps Lock is disabled. If the issue persists,
//                   contact support.
//                 </Accordion.Panel>
//               </Accordion.Item>

//               <Accordion.Item value="2">
//                 <Accordion.Control>
//                   My exam isn't visible.
//                 </Accordion.Control>

//                 <Accordion.Panel>
//                   Confirm that your instructor has published the
//                   exam and that it has started.
//                 </Accordion.Panel>
//               </Accordion.Item>

//               <Accordion.Item value="3">
//                 <Accordion.Control>
//                   When will results be available?
//                 </Accordion.Control>

//                 <Accordion.Panel>
//                   Results become available once your instructor
//                   publishes them.
//                 </Accordion.Panel>
//               </Accordion.Item>
//             </Accordion>
//           </Paper>

//           <SimpleGrid cols={1}>
//             <Card withBorder radius="md">
//               <Group>
//                 <ThemeIcon variant="light">
//                   <Mail size={18} />
//                 </ThemeIcon>

//                 <div>
//                   <Text fw={600}>Email</Text>
//                   <Text size="sm" c="dimmed">
//                     support@bmu.edu.in
//                   </Text>
//                 </div>
//               </Group>
//             </Card>

//             <Card withBorder radius="md">
//               <Group>
//                 <ThemeIcon variant="light">
//                   <Phone size={18} />
//                 </ThemeIcon>

//                 <div>
//                   <Text fw={600}>Phone</Text>
//                   <Text size="sm" c="dimmed">
//                     +91 XXXXX XXXXX
//                   </Text>
//                 </div>
//               </Group>
//             </Card>

//             <Card withBorder radius="md">
//               <Group>
//                 <ThemeIcon variant="light">
//                   <Clock size={18} />
//                 </ThemeIcon>

//                 <div>
//                   <Text fw={600}>Office Hours</Text>
//                   <Text size="sm" c="dimmed">
//                     Monday – Friday
//                   </Text>

//                   <Text size="sm" c="dimmed">
//                     9:00 AM – 5:00 PM
//                   </Text>
//                 </div>
//               </Group>
//             </Card>
//           </SimpleGrid>
//         </Stack>
//       </SimpleGrid>
//     </Container>
//   );
// }

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
  Divider,
  Anchor,
} from "@mantine/core";

import {
  Mail,
  Phone,
  Clock,
  Bug,
  Moon,
  Sun,
  ArrowRight,
} from "lucide-react";

import { useMantineColorScheme } from "@mantine/core";
import { Link } from "react-router-dom";

export default function SupportPage({ role = "student" }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const isFaculty = role === "faculty";

  const issueTypes = isFaculty
    ? [
        "Creating Practical",
        "Editing Practical",
        "Lab Session",
        "Student Submission",
        "Manual Evaluation",
        "Publishing Results",
        "Technical Issue",
        "Other",
      ]
    : [
        "Login Issue",
        "Exam Issue",
        "Submission Issue",
        "Compilation Error",
        "Results Issue",
        "Technical Issue",
        "Other",
      ];

  const faqs = isFaculty
    ? [
        {
          q: "How do I create a practical?",
          a: "Navigate to Create Practical from the sidebar, configure the questions and publish the practical.",
        },
        {
          q: "Why can't students see my exam?",
          a: "Ensure the exam has been published and the scheduled start time has been reached.",
        },
        {
          q: "How do I manually adjust marks?",
          a: "Open the student's submission, review the evaluation and update the manual score before publishing.",
        },
        {
          q: "How do I resize a image in create practical page?",
          a: "double click on the image, this will open a dialog box. Now, enter the new dimensions or change the orientation",
        },
      ]
    : [
        {
          q: "I can't login.",
          a: "Verify your university credentials and ensure Caps Lock is disabled. If the issue persists, contact support.",
        },
        {
          q: "My exam isn't visible.",
          a: "Confirm that your instructor has published the exam and that the scheduled start time has been reached.",
        },
        {
          q: "My submission failed.",
          a: "Check your internet connection and verify that the submission deadline has not passed before trying again.",
        },
        {
          q: "When will results be available?",
          a: "Results become available once your instructor publishes them.",
        },
      ];

  const quickLinks = isFaculty
    ? [
        {
          label: "Create Practical",
          to: "/Faculty/create-practical",
        },
        // {
        //   label: "Lab Sessions",
        //   to: "/Faculty/Lab-Sessions",
        // },
      ]
    : [
        {
          label: "Exam Results",
          to: "/student/results",
        },
        {
          label: "Home",
          to: "/student",
        },
      ];

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2}>Support Center</Title>

          <Text c="dimmed">
            Need help? Report an issue or browse frequently asked
            questions.
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
              data={issueTypes}
            />

            <TextInput
              label="Subject"
              placeholder={
                isFaculty
                  ? "Brief summary of the faculty issue"
                  : "Brief summary of the issue"
              }
            />

            <Textarea
              label="Description"
              minRows={5}
              placeholder="Describe your issue in detail..."
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
              {faqs.map((faq, index) => (
                <Accordion.Item
                  key={index}
                  value={String(index)}
                >
                  <Accordion.Control>
                    {faq.q}
                  </Accordion.Control>

                  <Accordion.Panel>
                    {faq.a}
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Paper>

          <Paper withBorder radius="md" p="lg">
            <Title order={5}>Quick Links</Title>

            <Divider my="sm" />

            <Stack gap="xs">
              {quickLinks.map((link) => (
                <Anchor
                  key={link.to}
                  component={Link}
                  to={link.to}
                  underline="never"
                >
                  <Group gap="xs">
                    <ArrowRight size={16} />
                    <Text>{link.label}</Text>
                  </Group>
                </Anchor>
              ))}
            </Stack>
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
              <Group align="flex-start">
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