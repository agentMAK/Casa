"use client";

import { Box, Text } from "@chakra-ui/react";

type ProfileType = {
  profile: Profile | undefined;
};

export default function Profile({ profile }: ProfileType) {
  if (profile === undefined) {
    return <Box>User Not Found</Box>;
  }

  return (
    <Box>
      <Text>Username: {profile.username} </Text>
      <Text>First Name: {profile.first_name} </Text>
      <Text>Last Name: {profile.last_name} </Text>
      <Text>id: {profile.user_id} </Text>
    </Box>
  );
}
