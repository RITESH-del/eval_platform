// import { useState, useRef } from "react";
// import {
//   Textarea,
//   Paper,
//   ActionIcon,
//   Tooltip,
// } from "@mantine/core";
// import { Eye, Pencil } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import "github-markdown-css/github-markdown.css";
// import "../../index.css";
// import rehypeRaw from "rehype-raw";


// export default function MarkdownEditor({
//   value,
//   onChange,
// }) {
//   const [preview, setPreview] = useState(false);
//   const [height, setHeight] = useState(72); // ~2 rows
//   const textareaRef = useRef(null);

//   const handleChange = (e) => {
//     onChange(e.target.value);

//     requestAnimationFrame(() => {
//       if (textareaRef.current) {
//         const input =
//           textareaRef.current.querySelector("textarea");

//         if (input) {
//           setHeight(input.scrollHeight);
//         }
//       }
//     });
//   };

//   return (
//     <Paper
//       withBorder
//       radius="md"
//       p={0}
//       pos="relative"
//     >
//       <Tooltip label={preview ? "Edit" : "Preview"}>
//         <ActionIcon
//           variant="light"
//           pos="absolute"
//           top={12}
//           right={12}
//           style={{ zIndex: 10 }}
//           onClick={() => setPreview((p) => !p)}
//         >
//           {preview ? (
//             <Pencil size={18} />
//           ) : (
//             <Eye size={18} />
//           )}
//         </ActionIcon>
//       </Tooltip>

//       {preview ? (
//         <Paper
//           p="md"
//           style={{
//             minHeight: height,
//               maxHeight: 300,
//               overflowY: "auto",

//               // Hide scrollbar
//               scrollbarWidth: "none", // Firefox
//               msOverflowStyle: "none", // IE/Edge
//             }}
//             styles={{
//               root: {
//                 "&::-webkit-scrollbar": {
//                   display: "none",
//                 },
//               },
//             }}
// >
//           <article
//             className="markdown-body"
//             style={{
//               background: "transparent",
//               color: "inherit",
//               paddingRight: 48,
//             }}
//           >
//   <ReactMarkdown
//   remarkPlugins={[remarkGfm]}
//   rehypePlugins={[rehypeRaw]}
//   components={{
//     img: ({ src, alt }) => {
//       console.log("IMG SRC:", src);

//       return (
//         <img
//           src={src}
//           alt={alt}
//           style={{
//             maxWidth: "100%",
//             borderRadius: 8,
//             display: "block",
//             margin: "12px auto",
//           }}
//           onError={(e) => {
//             console.error("Image failed:", src);
//           }}
//         />
//       );
//     },
//   }}
// >
//   {value}
// </ReactMarkdown>
//           </article>
//         </Paper>
//       ) : (
//         <Textarea
//           ref={textareaRef}
//           p="md"
//           autosize
//           minRows={2}
//           maxRows={10}
//           variant="unstyled"
//           value={value}
//           onChange={handleChange}
//            styles={{
//               input: {
//                 paddingRight: 48,

//                 /* Hide scrollbar */
//                 scrollbarWidth: "none",      // Firefox
//                 msOverflowStyle: "none",     // IE/Edge

//                 "&::-webkit-scrollbar": {
//                   display: "none",           // Chrome, Safari
//                 },
//               },
//             }}
//         />
//       )}
//     </Paper>
//   );
// }

function applyImageProperties({ width, alt, align }) {
  const editor = editorRef.current?.getInstance();

  if (!editor || !selectedImage) return;

  const oldHTML = selectedImage.outerHTML;

  let style = "";

  switch (align) {
    case "center":
      style = "display:block;margin-left:auto;margin-right:auto;";
      break;

    case "right":
      style = "display:block;margin-left:auto;";
      break;

    default:
      style = "display:block;margin-right:auto;";
  }

  const newHTML = `
<img
    src="${selectedImage.src}"
    alt="${alt}"
    width="${width}"
    style="${style}"
/>`;

  const html = editor.getHTML();

  editor.setHTML(html.replace(oldHTML, newHTML));

  setSelectedImage(null);
}



import { useEffect, useRef, useState } from "react";
import { Button } from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";
import { Editor } from "@toast-ui/react-editor";

import ImagePropertiesModal from "./ImagePropertiesModal";

export default function MarkdownEditor({
  value,
  onChange,
}) {
  const editorRef = useRef(null);

  const { colorScheme } = useMantineColorScheme();

  const [selectedImage, setSelectedImage] = useState(null);

  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    const instance = editorRef.current?.getInstance();

    if (!instance) return;

    const current = instance.getMarkdown();

    if (current !== (value ?? "")) {
      instance.setMarkdown(value ?? "", false);
    }
  }, [value]);

  useEffect(() => {
    const root = editorRef.current?.getRootElement();

    if (!root) return;

    const handleClick = (e) => {
  if (e.target.tagName !== "IMG") return;

  document
    .querySelectorAll(".selected-editor-image")
    .forEach((img) => img.classList.remove("selected-editor-image"));

  e.target.classList.add("selected-editor-image");

  setSelectedImage(e.target);
};

const handleDoubleClick = (e) => {
  if (e.target.tagName !== "IMG") return;

  setSelectedImage(e.target);

  setModalOpened(true);
};

    root.addEventListener("click", handleClick);
root.addEventListener("dblclick", handleDoubleClick);

    return () => {
  root.removeEventListener("click", handleClick);
  root.removeEventListener("dblclick", handleDoubleClick);
};
  }, []);

  function applyImageProperties({
    width,
    alt,
    align,
  }) {
    if (!selectedImage) return;

    selectedImage.width = width;

    selectedImage.alt = alt;

    selectedImage.style.float = "";

    selectedImage.style.display = "block";

    selectedImage.style.marginLeft = "0";
    selectedImage.style.marginRight = "0";

    if (align === "center") {
      selectedImage.style.marginLeft = "auto";
      selectedImage.style.marginRight = "auto";
    }

    if (align === "right") {
      selectedImage.style.marginLeft = "auto";
      selectedImage.style.marginRight = "0";
    }

    if (align === "left") {
      selectedImage.style.marginLeft = "0";
      selectedImage.style.marginRight = "auto";
    }
  }

  return (
    <>
      {/* <Button
        mb="sm"
        disabled={!selectedImage}
        onClick={() => setModalOpened(true)}
      >
        Image Properties
      </Button> */}

      <Editor
        key={colorScheme}
        ref={editorRef}
        initialValue={value ?? ""}
        initialEditType="wysiwyg"
        previewStyle="vertical"
        height="300px"
        theme={colorScheme === "dark" ? "dark" : undefined}
        usageStatistics={false}
        hideModeSwitch={false}
        autofocus={false}
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task"],
          ["table", "link"],
          ["code", "codeblock"],
        ]}
        onChange={() => {
          const instance = editorRef.current?.getInstance();

          if (!instance) return;

          onChange(instance.getMarkdown());
        }}
      />

      <ImagePropertiesModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        image={selectedImage}
        onApply={applyImageProperties}
      />
    </>
  );
}