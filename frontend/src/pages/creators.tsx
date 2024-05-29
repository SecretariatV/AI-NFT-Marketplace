import { useGlobalContext } from "@/contexts/GlobalContext";
import Layout from "@/layout";
import { useEffect } from "react";
import CreatorsView from "@/components/Creators";

export default function Creators() {
  const { index, setIndex } = useGlobalContext();

  useEffect(() => {
    setIndex(1);
  }, []);

  return (
    <Layout>
      <CreatorsView />
    </Layout>
  );
}
