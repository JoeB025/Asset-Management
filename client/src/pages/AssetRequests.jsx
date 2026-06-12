import { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { getAssetRequests } from "../api/assetRequestApi";

export default function AssetRequests() {

  useEffect(() => {

    const loadData = async () => {

      const data =
        await getAssetRequests();

      console.log(data);

    };

    loadData();

  }, []);

  return (
    <Layout>
      <h1>Asset Requests</h1>
    </Layout>
  );

}