import { useGlobalContext } from "@/contexts/GlobalContext";
import Layout from "@/layout";
import { useEffect } from "react";
import MyViews from "@/components/Views";
import { useRouter } from "next/router";

export default function ViewPage() {
  const { index, setIndex } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    setIndex(1);
  }, []);

  return (
    <Layout>
      <MyViews />
    </Layout>
  );
}
