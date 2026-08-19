import { useState } from "react";
import {
  Modal,
  TextInput,
  Select,
  Button,
  Group,
  Stack,
  Text,
  Box,
  ThemeIcon,
  FileInput,
} from "@mantine/core";

import {
  UserRound,
  Mail,
  LockKeyhole,
  FileSpreadsheet,
  Upload,
  Users,
  X,
} from "lucide-react";

export default function CreateFacultyModal({
  opened,
  onClose,
  onCreate,
  onUploadExcel,
}) {
  const [mode, setMode] = useState("single");

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [excelFile, setExcelFile] = useState(null);

  const departments = [
    {
      value: "cse",
      label: "Computer Science & Engineering",
    },
    {
      value: "ece",
      label: "Electronics & Communication",
    },
    {
      value: "me",
      label: "Mechanical Engineering",
    },
    {
      value: "civil",
      label: "Civil Engineering",
    },
    {
      value: "eee",
      label: "Electrical Engineering",
    },
  ];

  const handleCreate = () => {
    if (mode === "excel") {
      if (!excelFile) return;

      onUploadExcel?.(excelFile);
      return;
    }

    onCreate?.({
      name: name.trim(),
      department,
      email: email.trim(),
    });
  };

  const handleClose = () => {
    setName("");
    setDepartment("");
    setEmail("");
    setExcelFile(null);
    setMode("single");

    onClose();
  };

  const isValid =
    name.trim() &&
    department &&
    email.trim();

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      centered
      size={600}
      padding={0}
      radius="md"
      withCloseButton={false}
      styles={{
        content: {
          backgroundColor: "#1f1f1f",
          color: "#f5f5f5",
        },

        header: {
          backgroundColor: "#1f1f1f",
          color: "#f5f5f5",
        },

        body: {
          padding: 0,
          backgroundColor: "#1f1f1f",
        },
      }}
      overlayProps={{
        backgroundOpacity: 0.65,
        blur: 4,
      }}
    >
      {/* =========================
          HEADER
      ========================= */}

      <Box
        px="xl"
        py="lg"
        style={{
          borderBottom: "1px solid #303030",
          background: "#1f1f1f",
        }}
      >
        <Group
          justify="space-between"
          align="flex-start"
        >
          {/* <Box>
            <Text
              fw={650}
              size="lg"
              c="gray.0"
              style={{
                letterSpacing: "-0.02em",
              }}
            >
              Create Faculty Account
            </Text>

            <Text
              size="sm"
              c="gray.5"
              mt={3}
            >
              Add a faculty member or import
              multiple accounts.
            </Text>
          </Box> */}

          <Button
            variant="subtle"
            color="gray"
            size="sm"
            p={5}
            onClick={handleClose}
          >
            <X size={18} />
          </Button>
        </Group>
      </Box>

      {/* =========================
          CONTENT
      ========================= */}

      <Box
        px="xl"
        py="lg"
        style={{
          background: "#1f1f1f",
        }}
      >
        <Stack gap="lg">

          {/* Mode Selector */}
          <Group grow gap="xs">
            <Button
              variant={
                mode === "single"
                  ? "filled"
                  : "subtle"
              }
              color={
                mode === "single"
                  ? "blue"
                  : "gray"
              }
              radius="sm"
              leftSection={
                <UserRound size={15} />
              }
              onClick={() =>
                setMode("single")
              }
            >
              Single Faculty
            </Button>

            <Button
              variant={
                mode === "excel"
                  ? "filled"
                  : "subtle"
              }
              color={
                mode === "excel"
                  ? "blue"
                  : "gray"
              }
              radius="sm"
              leftSection={
                <FileSpreadsheet size={15} />
              }
              onClick={() =>
                setMode("excel")
              }
            >
              Excel Upload
            </Button>
          </Group>

          {/* =========================
              SINGLE FACULTY
          ========================= */}

          {mode === "single" && (
            <Stack gap="md">

              {/* Full Name */}
              <TextInput
                label="Full Name"
                placeholder="e.g. Dr. John Doe"
                leftSection={
                  <UserRound size={16} />
                }
                value={name}
                onChange={(e) =>
                  setName(
                    e.currentTarget.value
                  )
                }
                radius="sm"
                styles={{
                  label: {
                    color: "#e5e5e5",
                    fontWeight: 600,
                    marginBottom: 6,
                  },

                  input: {
                    backgroundColor:
                      "#292929",
                    borderColor:
                      "#404040",
                    color: "#f5f5f5",
                  },

                  section: {
                    color: "#929292",
                  },
                }}
              />

              {/* Department */}
              <Select
                label="Department"
                placeholder="Select department"
                leftSection={
                  <UserRound size={16} />
                }
                data={departments}
                value={department}
                onChange={setDepartment}
                radius="sm"
                styles={{
                  label: {
                    color: "#e5e5e5",
                    fontWeight: 600,
                    marginBottom: 6,
                  },

                  input: {
                    backgroundColor:
                      "#292929",
                    borderColor:
                      "#404040",
                    color: "#f5f5f5",
                  },

                  section: {
                    color: "#929292",
                  },
                }}
              />

              {/* Email */}
              <TextInput
                label="Institutional Email"
                placeholder="faculty@bmu.edu.in"
                leftSection={
                  <Mail size={16} />
                }
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.currentTarget.value
                  )
                }
                radius="sm"
                styles={{
                  label: {
                    color: "#e5e5e5",
                    fontWeight: 600,
                    marginBottom: 6,
                  },

                  input: {
                    backgroundColor:
                      "#292929",
                    borderColor:
                      "#404040",
                    color: "#f5f5f5",
                  },

                  section: {
                    color: "#929292",
                  },
                }}
              />

              {/* Security */}
              <Box
                p="md"
                style={{
                  background: "#182b42",
                  border:
                    "1px solid #24466d",
                  borderRadius: 8,
                }}
              >
                <Group
                  align="flex-start"
                  wrap="nowrap"
                >
                  <ThemeIcon
                    variant="light"
                    color="blue"
                    size={34}
                    radius="sm"
                  >
                    <LockKeyhole
                      size={17}
                    />
                  </ThemeIcon>

                  <Box>
                    <Text
                      size="sm"
                      fw={600}
                      c="gray.1"
                    >
                      Account Security
                    </Text>

                    <Text
                      size="xs"
                      c="gray.4"
                      mt={3}
                      lh={1.5}
                    >
                      A temporary password will
                      be generated automatically
                      and sent to the faculty
                      member's institutional email.
                    </Text>

                    <Text
                      size="xs"
                      c="gray.4"
                      mt={4}
                      lh={1.5}
                    >
                      The faculty member will be
                      required to change the
                      password after their first
                      login.
                    </Text>
                  </Box>
                </Group>
              </Box>

            </Stack>
          )}

          {/* =========================
              EXCEL UPLOAD
          ========================= */}

          {mode === "excel" && (
            <Stack gap="md">

              {/* Upload Area */}
              <Box
                p="xl"
                style={{
                  border:
                    "1.5px dashed #454545",
                  borderRadius: 10,
                  background: "#242424",
                  textAlign: "center",
                }}
              >
                <Stack
                  align="center"
                  gap="xs"
                >
                  <ThemeIcon
                    size={52}
                    radius="md"
                    variant="light"
                    color="green"
                  >
                    <FileSpreadsheet
                      size={26}
                    />
                  </ThemeIcon>

                  <Text
                    fw={600}
                    size="sm"
                    mt={4}
                    c="gray.1"
                  >
                    Import Faculty Accounts
                  </Text>

                  <Text
                    size="xs"
                    c="gray.5"
                    maw={390}
                    lh={1.5}
                  >
                    Upload an Excel spreadsheet
                    containing faculty information.
                    Multiple accounts can be
                    created at once.
                  </Text>

                  <FileInput
                    value={excelFile}
                    onChange={setExcelFile}
                    accept=".xlsx,.xls"
                    placeholder="Choose Excel file"
                    leftSection={
                      <Upload size={15} />
                    }
                    clearable
                    mt="sm"
                    w="100%"
                    styles={{
                      input: {
                        backgroundColor:
                          "#292929",
                        borderColor:
                          "#404040",
                        color:
                          "#f5f5f5",
                      },

                      placeholder: {
                        color:
                          "#888888",
                      },

                      section: {
                        color:
                          "#929292",
                      },
                    }}
                  />

                  <Text
                    size="xs"
                    c="gray.6"
                  >
                    Supported formats:
                    {" "}
                    .xlsx, .xls
                  </Text>
                </Stack>
              </Box>

              {/* Required Columns */}
              <Box>
                <Text
                  size="xs"
                  fw={600}
                  c="gray.3"
                  mb={6}
                >
                  Required columns
                </Text>

                <Group gap={6}>
                  {[
                    "name",
                    "department",
                    "email",
                    "phone_number",
                  ].map((column) => (
                    <Box
                      key={column}
                      px={8}
                      py={4}
                      style={{
                        background:
                          "#292929",
                        border:
                          "1px solid #383838",
                        borderRadius: 5,
                      }}
                    >
                      <Text
                        size="xs"
                        c="gray.4"
                      >
                        {column}
                      </Text>
                    </Box>
                  ))}
                </Group>
              </Box>

              {/* Security Note */}
              <Box
                p="md"
                style={{
                  background: "#182b42",
                  border:
                    "1px solid #24466d",
                  borderRadius: 8,
                }}
              >
                <Group
                  align="flex-start"
                  wrap="nowrap"
                >
                  <ThemeIcon
                    variant="light"
                    color="blue"
                    size={34}
                    radius="sm"
                  >
                    <LockKeyhole
                      size={17}
                    />
                  </ThemeIcon>

                  <Box>
                    <Text
                      size="sm"
                      fw={600}
                      c="gray.1"
                    >
                      Automatic Credentials
                    </Text>

                    <Text
                      size="xs"
                      c="gray.4"
                      mt={3}
                      lh={1.5}
                    >
                      A temporary password will
                      be generated for each faculty
                      member and sent to their
                      institutional email.
                    </Text>
                  </Box>
                </Group>
              </Box>

            </Stack>
          )}

        </Stack>
      </Box>

      {/* =========================
          FOOTER
      ========================= */}

      <Box
        px="xl"
        py="md"
        style={{
          borderTop:
            "1px solid #303030",
          background: "#1f1f1f",
        }}
      >
        <Group justify="flex-end">

          <Button
            variant="default"
            radius="sm"
            onClick={handleClose}
            styles={{
              root: {
                backgroundColor:
                  "#292929",
                borderColor:
                  "#404040",
                color: "#f5f5f5",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            radius="sm"
            leftSection={
              mode === "excel" ? (
                <Upload size={16} />
              ) : (
                <Users size={16} />
              )
            }
            disabled={
              mode === "excel"
                ? !excelFile
                : !isValid
            }
            onClick={handleCreate}
          >
            {mode === "excel"
              ? "Import Faculty"
              : "Create Account"}
          </Button>

        </Group>
      </Box>
    </Modal>
  );
}