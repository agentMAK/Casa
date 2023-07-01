import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import {
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: {session}, error: sessionError } =
    await supabase.auth.getSession();

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select().eq('user_id',session?.user.id);

  if (profileData && profileData?.length > 0) {
    redirect(`/profile/${profileData[0].username}`);
  }

  if (session) {
    redirect("/join");
  }

  return <>{children}</>;
}
