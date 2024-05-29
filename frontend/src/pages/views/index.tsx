import { useGlobalContext } from "@/contexts/GlobalContext";
import Layout from "@/layout";
import { useEffect } from "react";
import MyViews from "@/components/Views";

export default function Views() {
  const { index, setIndex } = useGlobalContext();

  useEffect(() => {
    setIndex(1);
  }, []);

  return (
    <Layout>
      <MyViews />
    </Layout>
  );
}
