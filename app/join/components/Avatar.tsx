import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { Box, Flex, Image, Input, useToast } from "@chakra-ui/react";
import { FormLabel } from "@/app/components/FormLabel";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

type AvatarType = {
  uid: string;
  url: Profiles["avatar_path"];
  size: number;
  onUpload: (path: string) => void;
};

export default function Avatar({ uid, url, size, onUpload }: AvatarType) {
  const supabase = createClientComponentClient<Database>();
  const [avatarUrl, setAvatarUrl] = useState<Profiles["avatar_path"] | null>(
    url
  );
  const [uploading, setUploading] = useState(false);

  const toast = useToast();
  const toastIdRef = React.useRef();

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("profiles")
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      toast({
        title: `Uploading`,
        status: "info",
      });

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      let { error: uploadError, data } = await supabase.storage
        .from("profiles")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
      toast.closeAll();
    }
  };

  return (
    <Box width={"fit-content"}>
      {avatarUrl ? (
        <Image
          width={size}
          height={size}
          src={avatarUrl}
          alt="Avatar"
          borderRadius={size}
        />
      ) : (
        <Box position={"relative"} width={size} height={size}>
          <FormLabel htmlFor="single" borderRadius={size} cursor="pointer">
            <Flex borderRadius={'150px'} boxSize={'150px'} backgroundColor={'#EDEDED'} alignItems={'center'} justifyContent={'center'}>
              <Image
                src={"/images/image.svg"}
                alt={"upload"}
                height={'60px'}
              />
            </Flex>
          </FormLabel>
          <Input
            position={"absolute"}
            hidden
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </Box>
      )}
    </Box>
  );
}
