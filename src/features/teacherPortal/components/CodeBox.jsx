import { useState } from "react";
import {
  ActionIcon,
  Group,
  Paper,
  Select,
  Text,
  Tooltip,
} from "@mantine/core";

import { Check, Copy } from "lucide-react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeSubmissionCard({
  submissionHistory = [],
}) {
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [copied, setCopied] = useState(false);

  const selectedSubmission =
    submissionHistory[Number(selectedIndex)];

  const code = selectedSubmission?.code ?? "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const dropdownData = submissionHistory.map(
    (submission, index) => ({
      value: String(index),
      label: `Submission ${index + 1}`,
    })
  );

  return (
    <Paper
      radius="lg"
      withBorder
      style={{
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Group
        justify="space-between"
        px="md"
        py="sm"
        style={{
          background: "#1e1e1e",
          borderBottom: "1px solid #2d2d2d",
        }}
      >
        <Group gap="md">
          {/* Mac Window Buttons
          <Group gap={8}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#ff5f56",
              }}
            />

            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#ffbd2e",
              }}
            />

            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#27c93f",
              }}
            />
          </Group> */}

          <Text fw={600} c="white">
            {selectedSubmission?.language}
          </Text>
        </Group>

        <Group>
          {submissionHistory.length > 0 && (
            <Select
              size="xs"
              w={130}
              value={selectedIndex}
              onChange={(value) =>
                setSelectedIndex(value || "0")
              }
              data={dropdownData}
              allowDeselect={false}
            />
          )}

          <Tooltip
            label={copied ? "Copied!" : "Copy code"}
          >
            <ActionIcon
              variant="outline"
              color={copied ? "green" : "gray"}
              onClick={handleCopy}
            >
              {copied ? (
                <Check size={16} />
              ) : (
                <Copy size={16} />
              )}
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>

      {/* Code Area */}
      {code ? (
        <SyntaxHighlighter
          language="cpp"
          style={vscDarkPlus}
          showLineNumbers
          wrapLongLines
          customStyle={{
            margin: 0,
            padding: "20px",
            fontSize: "14px",
            maxHeight: "600px",
            overflow: "auto",
            borderRadius: 0,
          }}
          lineNumberStyle={{
            color: "#6e7681",
            minWidth: "3em",
            paddingRight: "1em",
            textAlign: "right",
            userSelect: "none",
          }}
        >
          {code}
        </SyntaxHighlighter>
      ) : (
        <div
          style={{
            background: "#1e1e1e",
            color: "#8b949e",
            padding: "40px",
            textAlign: "center",
          }}
        >
          No code submission available
        </div>
      )}
    </Paper>
  );
}