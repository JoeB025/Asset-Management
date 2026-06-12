import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";

import AssetRequestForm from "../components/assetRequests/AssetRequestForm";
import AssetRequestTable from "../components/assetRequests/AssetRequestTable";

import { getAssetRequests } from "../api/assetRequestApi";

export default function AssetRequests() {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const loadRequests = async () => {

    try {

      const data = await getAssetRequests();

      setRequests(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadRequests();

  }, []);

  if (loading) {

    return (
      <Layout>
        <h1>Asset Requests</h1>
        <p>Loading...</p>
      </Layout>
    );

  }

  return (

    <Layout>

      <h1>Asset Requests</h1>

      <button
        onClick={() => setShowForm(!showForm)}
      >
        {showForm
          ? "Cancel"
          : "New Request"}
      </button>

      <br />
      <br />

      {showForm && (

        <AssetRequestForm
          onCreated={() => {
            setShowForm(false);
            loadRequests();
          }}
        />

      )}

      <AssetRequestTable
        requests={requests}
        onRefresh={loadRequests}
      />

    </Layout>

  );

}