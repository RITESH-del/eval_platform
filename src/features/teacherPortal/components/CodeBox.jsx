import {
  ActionIcon,
  Group,
  Paper,
  Select,
  Text,
  Tooltip,
} from "@mantine/core";

import { useState, useMemo, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeSubmissionCard({
  submissionHistory = [],
  selectedIndex,
  onSubmissionChange,
}) {
  const [copied, setCopied] = useState(false);


  const selectedSubmission =
    submissionHistory[selectedIndex ?? bestIndex];
  

  const code = selectedSubmission?.code ?? "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const dropdownData = submissionHistory.map(
    (_, index) => ({
      value: String(index),
      label: `Submission ${index + 1}`,
    })
  );

  return (
    <Paper
      radius="lg"
      withBorder
      style={{ overflow: "hidden" }}
    >
      <Group
        justify="space-between"
        px="md"
        py="sm"
        style={{
          background: "#1e1e1e",
          borderBottom: "1px solid #2d2d2d",
        }}
      >
        <Text fw={600} c="white">
          {selectedSubmission?.language}
        </Text>

        <Group>
          {submissionHistory.length > 0 && (
            <Select
              size="xs"
              w={140}
              value={String(selectedIndex)}
              onChange={(value) =>
                onSubmissionChange(
                  Number(value ?? 0)
                )
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

      {code ? (
        <SyntaxHighlighter
  language="cpp"
  style={vscDarkPlus}
  showLineNumbers
  wrapLongLines
  customStyle={{
    margin: 0,
    padding: 20,
    fontSize: 14,
    width: "100%",
    maxWidth: "100%",
    maxHeight: 600,
    overflowX: "auto",
    overflowY: "auto",
    boxSizing: "border-box",
  }}
>
  {code}
</SyntaxHighlighter>
      ) : (
        <div
          style={{
            background: "#1e1e1e",
            color: "#8b949e",
            padding: 40,
            textAlign: "center",
          }}
        >
          No code submission available
        </div>
      )}
    </Paper>
  );
}