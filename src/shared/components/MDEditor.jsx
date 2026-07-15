import { useState, useRef } from "react";
import {
  Textarea,
  Paper,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { Eye, Pencil } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css/github-markdown.css";

export default function MarkdownEditor({
  value,
  onChange,
}) {
  const [preview, setPreview] = useState(false);
  const [height, setHeight] = useState(72); // ~2 rows
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    onChange(e.target.value);

    requestAnimationFrame(() => {
      if (textareaRef.current) {
        const input =
          textareaRef.current.querySelector("textarea");

        if (input) {
          setHeight(input.scrollHeight);
        }
      }
    });
  };

  return (
    <Paper
      withBorder
      radius="md"
      p={0}
      pos="relative"
    >
      <Tooltip label={preview ? "Edit" : "Preview"}>
        <ActionIcon
          variant="light"
          pos="absolute"
          top={12}
          right={12}
          style={{ zIndex: 10 }}
          onClick={() => setPreview((p) => !p)}
        >
          {preview ? (
            <Pencil size={18} />
          ) : (
            <Eye size={18} />
          )}
        </ActionIcon>
      </Tooltip>

      {preview ? (
        <Paper
          p="md"
          style={{
            minHeight: height,
            maxHeight: 300,
            overflowY: "auto",
          }}
        >
          <article
            className="markdown-body"
            style={{
              background: "transparent",
              color: "inherit",
              paddingRight: 48,
            }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {value}
            </ReactMarkdown>
          </article>
        </Paper>
      ) : (
        <Textarea
          ref={textareaRef}
          p="md"
          autosize
          minRows={2}
          maxRows={10}
          variant="unstyled"
          value={value}
          onChange={handleChange}
          styles={{
            input: {
              paddingRight: 48,
            },
          }}
        />
      )}
    </Paper>
  );
}