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
    const { data: {session}, error: sessionError } =
      await supabase.auth.getSession();

    const { data, error } = await supabase
        .from('profiles')
        .select().eq('username',params?.username)

    const profile = data && data[0]
     return <Profile profile={profile as Profile|undefined} session={session} />;
  }

