import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import {
  createClientComponentClient,
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
    .select();

  if((profileData && profileData?.length === 0) && session) {
    return <>{children}</>;
  }

  redirect('/')

}
