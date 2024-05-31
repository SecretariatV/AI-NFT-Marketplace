import { useGlobalContext } from "@/contexts/GlobalContext";
import Layout from "@/layout";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Views() {
  const router = useRouter();
  const { setIndex } = useGlobalContext();

  useEffect(() => {
    setIndex(1);
    router.push("/");
  }, []);

  return (
    <Layout>
      {/* <MyViews /> */}
      <div>redirecting...</div>
    </Layout>
  );
}
