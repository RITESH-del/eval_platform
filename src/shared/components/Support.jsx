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
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function SupportPage({ role = "student" }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const isFaculty = role === "faculty";

  const [issueType, setIssueType] = useState(null);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);

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
          a: "Double click on the image. This will open a dialog box. Now, enter the new dimensions or change the orientation.",
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

  const handleSubmit = async () => {
    if (!issueType || !subject.trim() || !description.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const templateParams = {
        subject: subject.trim(),
        role: role,
        issue_type: issueType,
        description: description.trim(),

        // Optional attachment information
        attachment_name: attachment
          ? attachment.name
          : "No attachment",
      };

      const result = await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  {
    name: "Exam Portal User",
    email: "ritesh.kumar.24cse@bmu.edu.in",

    subject: subject.trim(),
    role,
    issue_type: issueType,
    description: description.trim(),

    attachment_name: attachment
      ? attachment.name
      : "No attachment",
  },
  {
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  }
);

console.log("EmailJS result:", result);

      alert("Support ticket submitted successfully!");

      setIssueType(null);
      setSubject("");
      setDescription("");
      setAttachment(null);
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Failed to submit support ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
        {/* Report Issue */}
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
              value={issueType}
              onChange={setIssueType}
              required
            />

            <TextInput
              label="Subject"
              placeholder={
                isFaculty
                  ? "Brief summary of the faculty issue"
                  : "Brief summary of the issue"
              }
              value={subject}
              onChange={(e) =>
                setSubject(e.currentTarget.value)
              }
              required
            />

            <Textarea
              label="Description"
              minRows={5}
              placeholder="Describe your issue in detail..."
              value={description}
              onChange={(e) =>
                setDescription(e.currentTarget.value)
              }
              required
            />

            <FileInput
              label="Attachment (Optional)"
              placeholder="Upload screenshot"
              value={attachment}
              onChange={setAttachment}
              clearable
            />

            <Button
              onClick={handleSubmit}
              loading={loading}
              disabled={
                !issueType ||
                !subject.trim() ||
                !description.trim()
              }
            >
              Submit Ticket
            </Button>
          </Stack>
        </Paper>

        {/* Right Side */}
        <Stack>
          {/* FAQs */}
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

          {/* Quick Links */}
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

          {/* Contact Information */}
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
//   Divider,
//   Anchor,
// } from "@mantine/core";

// import {
//   Mail,
//   Phone,
//   Clock,
//   Bug,
//   Moon,
//   Sun,
//   ArrowRight,
// } from "lucide-react";

// import { useMantineColorScheme } from "@mantine/core";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import emailjs from "@emailjs/browser";

// export default function SupportPage({ role = "student" }) {
//   const { colorScheme, toggleColorScheme } =
//     useMantineColorScheme();

//   const isFaculty = role === "faculty";

//   const [issueType, setIssueType] = useState(null);
//   const [subject, setSubject] = useState("");
//   const [description, setDescription] = useState("");
//   const [attachment, setAttachment] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const issueTypes = isFaculty
//     ? [
//         "Creating Practical",
//         "Editing Practical",
//         "Lab Session",
//         "Student Submission",
//         "Manual Evaluation",
//         "Publishing Results",
//         "Technical Issue",
//         "Other",
//       ]
//     : [
//         "Login Issue",
//         "Exam Issue",
//         "Submission Issue",
//         "Compilation Error",
//         "Results Issue",
//         "Technical Issue",
//         "Other",
//       ];

//   const faqs = isFaculty
//     ? [
//         {
//           q: "How do I create a practical?",
//           a: "Navigate to Create Practical from the sidebar, configure the questions and publish the practical.",
//         },
//         {
//           q: "Why can't students see my exam?",
//           a: "Ensure the exam has been published and the scheduled start time has been reached.",
//         },
//         {
//           q: "How do I manually adjust marks?",
//           a: "Open the student's submission, review the evaluation and update the manual score before publishing.",
//         },
//         {
//           q: "How do I resize a image in create practical page?",
//           a: "Double click on the image. This will open a dialog box. Now, enter the new dimensions or change the orientation.",
//         },
//       ]
//     : [
//         {
//           q: "I can't login.",
//           a: "Verify your university credentials and ensure Caps Lock is disabled. If the issue persists, contact support.",
//         },
//         {
//           q: "My exam isn't visible.",
//           a: "Confirm that your instructor has published the exam and that the scheduled start time has been reached.",
//         },
//         {
//           q: "My submission failed.",
//           a: "Check your internet connection and verify that the submission deadline has not passed before trying again.",
//         },
//         {
//           q: "When will results be available?",
//           a: "Results become available once your instructor publishes them.",
//         },
//       ];

//   const quickLinks = isFaculty
//     ? [
//         {
//           label: "Create Practical",
//           to: "/Faculty/create-practical",
//         },
//       ]
//     : [
//         {
//           label: "Exam Results",
//           to: "/student/results",
//         },
//         {
//           label: "Home",
//           to: "/student",
//         },
//       ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !issueType ||
//       !subject.trim() ||
//       !description.trim()
//     ) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     try {
//       setLoading(true);

//       console.log("Sending support ticket...");

//       const result = await emailjs.sendForm(
//         import.meta.env.VITE_EMAILJS_SERVICE_ID,
//         import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
//         e.currentTarget,
//         {
//           publicKey:
//             import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
//         }
//       );

//       console.log("EmailJS result:", result);

//       alert(
//         "Support ticket submitted successfully!"
//       );

//       // Reset form
//       setIssueType(null);
//       setSubject("");
//       setDescription("");
//       setAttachment(null);

//       e.currentTarget.reset();
//     } catch (error) {
//       console.error(
//         "EmailJS error:",
//         error
//       );

//       alert(
//         `Failed to submit support ticket.\n\n${
//           error?.text ||
//           error?.message ||
//           "Please try again."
//         }`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container size="lg" py="xl">
//       <Group justify="space-between" mb="xl">
//         <div>
//           <Title order={2}>
//             Support Center
//           </Title>

//           <Text c="dimmed">
//             Need help? Report an issue or browse
//             frequently asked questions.
//           </Text>
//         </div>

//         <ActionIcon
//           variant="light"
//           size="lg"
//           radius="xl"
//           onClick={() =>
//             toggleColorScheme()
//           }
//         >
//           {colorScheme === "dark" ? (
//             <Sun size={18} />
//           ) : (
//             <Moon size={18} />
//           )}
//         </ActionIcon>
//       </Group>

//       <SimpleGrid
//         cols={{ base: 1, md: 2 }}
//         spacing="xl"
//       >
//         {/* Report Issue */}
//         <Paper
//           withBorder
//           radius="md"
//           p="lg"
//         >
//           <form onSubmit={handleSubmit}>
//             <Stack>
//               <Group>
//                 <ThemeIcon
//                   size="lg"
//                   radius="xl"
//                 >
//                   <Bug size={18} />
//                 </ThemeIcon>

//                 <Title order={4}>
//                   Report an Issue
//                 </Title>
//               </Group>

//               {/* Hidden fields used by EmailJS */}
//               <input
//                 type="hidden"
//                 name="name"
//                 value="Exam Portal User"
//                 readOnly
//               />

//               <input
//                 type="hidden"
//                 name="email"
//                 value="ritesh.kumar.24cse@bmu.edu.in"
//                 readOnly
//               />

//               <input
//                 type="hidden"
//                 name="role"
//                 value={role}
//                 readOnly
//               />

//               <Select
//                 label="Issue Type"
//                 placeholder="Select issue"
//                 data={issueTypes}
//                 value={issueType}
//                 onChange={setIssueType}
//                 required
//               />

//               {/* Hidden actual form value for EmailJS */}
//               <input
//                 type="hidden"
//                 name="issue_type"
//                 value={issueType || ""}
//                 readOnly
//               />

//               <TextInput
//                 label="Subject"
//                 placeholder={
//                   isFaculty
//                     ? "Brief summary of the faculty issue"
//                     : "Brief summary of the issue"
//                 }
//                 name="subject"
//                 value={subject}
//                 onChange={(e) =>
//                   setSubject(
//                     e.currentTarget.value
//                   )
//                 }
//                 required
//               />

//               <Textarea
//                 label="Description"
//                 minRows={5}
//                 placeholder="Describe your issue in detail..."
//                 name="description"
//                 value={description}
//                 onChange={(e) =>
//                   setDescription(
//                     e.currentTarget.value
//                   )
//                 }
//                 required
//               />

//               <FileInput
//                 label="Attachment (Optional)"
//                 placeholder="Upload screenshot"
//                 name="attachment"
//                 value={attachment}
//                 onChange={setAttachment}
//                 clearable
//                 accept="image/*,.pdf,.doc,.docx"
//               />

//               <Button
//                 type="submit"
//                 loading={loading}
//                 disabled={
//                   !issueType ||
//                   !subject.trim() ||
//                   !description.trim()
//                 }
//               >
//                 Submit Ticket
//               </Button>
//             </Stack>
//           </form>
//         </Paper>

//         {/* Right Side */}
//         <Stack>
//           {/* FAQs */}
//           <Paper
//             withBorder
//             radius="md"
//             p="lg"
//           >
//             <Title order={4} mb="md">
//               Frequently Asked Questions
//             </Title>

//             <Accordion variant="separated">
//               {faqs.map((faq, index) => (
//                 <Accordion.Item
//                   key={index}
//                   value={String(index)}
//                 >
//                   <Accordion.Control>
//                     {faq.q}
//                   </Accordion.Control>

//                   <Accordion.Panel>
//                     {faq.a}
//                   </Accordion.Panel>
//                 </Accordion.Item>
//               ))}
//             </Accordion>
//           </Paper>

//           {/* Quick Links */}
//           <Paper
//             withBorder
//             radius="md"
//             p="lg"
//           >
//             <Title order={5}>
//               Quick Links
//             </Title>

//             <Divider my="sm" />

//             <Stack gap="xs">
//               {quickLinks.map((link) => (
//                 <Anchor
//                   key={link.to}
//                   component={Link}
//                   to={link.to}
//                   underline="never"
//                 >
//                   <Group gap="xs">
//                     <ArrowRight size={16} />
//                     <Text>
//                       {link.label}
//                     </Text>
//                   </Group>
//                 </Anchor>
//               ))}
//             </Stack>
//           </Paper>

//           {/* Contact Information */}
//           <SimpleGrid cols={1}>
//             <Card
//               withBorder
//               radius="md"
//             >
//               <Group>
//                 <ThemeIcon variant="light">
//                   <Mail size={18} />
//                 </ThemeIcon>

//                 <div>
//                   <Text fw={600}>
//                     Email
//                   </Text>

//                   <Text
//                     size="sm"
//                     c="dimmed"
//                   >
//                     support@bmu.edu.in
//                   </Text>
//                 </div>
//               </Group>
//             </Card>

//             <Card
//               withBorder
//               radius="md"
//             >
//               <Group>
//                 <ThemeIcon variant="light">
//                   <Phone size={18} />
//                 </ThemeIcon>

//                 <div>
//                   <Text fw={600}>
//                     Phone
//                   </Text>

//                   <Text
//                     size="sm"
//                     c="dimmed"
//                   >
//                     +91 XXXXX XXXXX
//                   </Text>
//                 </div>
//               </Group>
//             </Card>

//             <Card
//               withBorder
//               radius="md"
//             >
//               <Group align="flex-start">
//                 <ThemeIcon variant="light">
//                   <Clock size={18} />
//                 </ThemeIcon>

//                 <div>
//                   <Text fw={600}>
//                     Office Hours
//                   </Text>

//                   <Text
//                     size="sm"
//                     c="dimmed"
//                   >
//                     Monday – Friday
//                   </Text>

//                   <Text
//                     size="sm"
//                     c="dimmed"
//                   >
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