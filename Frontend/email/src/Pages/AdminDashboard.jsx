import { useState } from "react";
import CampaignForm from "../components/CampaignForm";
import CampaignList from "../components/CampaignList";
import CampaignMetrics from "../components/CampaignMetrics";

const AdminDashboard = () => {
    const [editingCampaignId, setEditingCampaignId] = useState(null);
    const [viewingMetricsCampaignId, setViewingMetricsCampaignId] = useState(null);

    const handleCampaignSubmit = () => {
        setEditingCampaignId(null); // Reset after submitting the campaign
    };

    const handleMetricsView = (campaignId) => {
        setViewingMetricsCampaignId(campaignId);
    };

    const handleMetricsClose = () => {
        setViewingMetricsCampaignId(null); // Close metrics view
    };

    return (
        <div>
            <h1 style={{textAlign:"center"}}>Admin Dashboard</h1>
            {!viewingMetricsCampaignId && (
                <>
                    {/* Campaign Form */}
                    <CampaignForm 
                        campaignId={editingCampaignId} 
                        onCampaignSubmit={handleCampaignSubmit} 
                    />

                    {/* Campaign List */}
                    <CampaignList 
                        onCampaignEdit={setEditingCampaignId} 
                        onMetricsView={handleMetricsView} 
                    />
                </>
            )}

            {/* Campaign Metrics */}
            {viewingMetricsCampaignId && (
                <div>
                    <button 
                        onClick={handleMetricsClose} 
                        style={{ marginBottom: "20px", padding: "10px 15px", cursor: "pointer" }}
                    >
                        Back to Campaigns
                    </button>
                    <CampaignMetrics campaignId={viewingMetricsCampaignId} />
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
