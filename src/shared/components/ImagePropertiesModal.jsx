import { useEffect, useState } from "react";
import {
  Modal,
  Stack,
  NumberInput,
  TextInput,
  SegmentedControl,
  Button,
  Group,
} from "@mantine/core";

export default function ImagePropertiesModal({
  opened,
  onClose,
  image,
  onApply,
}) {
  const [width, setWidth] = useState(300);
  const [alt, setAlt] = useState("");
  const [align, setAlign] = useState("center");

  useEffect(() => {
    if (!image) return;

    setWidth(image.width || image.clientWidth);

    setAlt(image.alt || "");

    const style = image.style;

    if (style.marginLeft === "auto" && style.marginRight === "auto")
      setAlign("center");
    else if (style.float === "right")
      setAlign("right");
    else
      setAlign("left");
  }, [image]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Image Properties"
      centered
    >
      <Stack>

        <NumberInput
          label="Width"
          value={width}
          onChange={setWidth}
          min={50}
          max={2000}
        />

        <TextInput
          label="Alt Text"
          value={alt}
          onChange={(e) => setAlt(e.currentTarget.value)}
        />

        <SegmentedControl
          value={align}
          onChange={setAlign}
          data={[
            {
              value: "left",
              label: "Left",
            },
            {
              value: "center",
              label: "Center",
            },
            {
              value: "right",
              label: "Right",
            },
          ]}
        />

        <Group justify="flex-end">

          <Button
            variant="default"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            onClick={() => {
              onApply({
                width,
                alt,
                align,
              });

              onClose();
            }}
          >
            Apply
          </Button>

        </Group>

      </Stack>
    </Modal>
  );
}