import { Button } from "@chakra-ui/react";
import { useRef } from "react";
import { MdFileUpload } from "react-icons/md";
interface UploadButtonProps {
  label: string;
  fileName?: string;
  acceptedTypes: string;
  allowMultiple?: boolean;
  onChange: (files: File[]) => void;
}

export function UploadButton({
  label,
  fileName = "files",
  acceptedTypes,
  allowMultiple,
  onChange,
}: UploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const files = [];

      Array.from(event.target.files).forEach((file) => {
        files.push(file);
      });

      onChange(files);
    }
    formRef.current?.reset();
  };

  return (
    <form ref={formRef}>
      <Button
        onClick={onClickHandler}
        colorScheme="gray"
        rightIcon={<MdFileUpload />}
      >
        {label}
      </Button>

      <input
        accept={acceptedTypes}
        multiple={allowMultiple}
        name={fileName}
        onChange={onChangeHandler}
        ref={fileInputRef}
        style={{ display: "none" }}
        type="file"
      />
    </form>
  );
}
