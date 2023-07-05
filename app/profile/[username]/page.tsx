import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Profile from "./Profile";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  const { data:profileData, error:profileError } = await supabase
    .from("profiles")
    .select()
    .eq("username", params?.username);

  const profile = profileData && profileData[0];

  const { data:nftData, error:nftError } = await supabase
  .from('nfts')
  .select()
  .eq("user_id", profileData && profileData[0].user_id)

  return <Profile profile={profile as Profile | undefined} session={session} nfts={nftData as any[]} />;
}
