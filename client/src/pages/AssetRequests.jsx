import { useEffect, useState } from "react";
import AssetRequestForm from "../components/assetRequests/AssetRequestForm";
import AssetRequestTable from "../components/assetRequests/AssetRequestTable";
import { getAssetRequests } from "../api/assetRequestApi";
import { toast } from "react-toastify";
import Button from "../components/ui/Button";
import PageHeader from "../components/ui/PageHeader";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";

export default function AssetRequests() {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const loadRequests = async () => {
    try {
      const data = await getAssetRequests();
      setRequests(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load asset requests"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  if (loading) {
    return <Loader text="Loading asset requests..." />;
  }

  return (
    <div className="app-page">

      <PageHeader
        title="Asset Requests"
        subtitle="Manage and track asset requests"
        actions={
          <Button
            variant="primary"
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? "Cancel" : "New Request"}
          </Button>
        }
      />

      {showForm && (
        <AssetRequestForm
          onCreated={() => {
            setShowForm(false);
            loadRequests();
          }}
        />
      )}

      {requests.length === 0 ? (
        <EmptyState
          title="No Asset Requests"
          message="No asset requests have been created yet."
        />
      ) : (
        <AssetRequestTable
          requests={requests}
          onRefresh={loadRequests}
        />
      )}

    </div>
  );
}