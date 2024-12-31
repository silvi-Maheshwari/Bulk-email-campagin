import { useState } from "react";
import CampaignForm from "../components/CampaignForm";
import CampaignList from "../components/CampaignList";
import CampaignMetrics from "../components/CampaignMetrics";

const AdminDashboard = () => {
    const [editingCampaignId, setEditingCampaignId] = useState(null);

    const handleCampaignSubmit = () => {
        setEditingCampaignId(null); // Reset after submitting the campaign
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {/* Pass campaignId to CampaignForm */}
            <CampaignForm 
                campaignId={editingCampaignId} 
                onCampaignSubmit={handleCampaignSubmit} 
            />
            
            {/* Pass the campaignId to CampaignMetrics */}
            <CampaignList onCampaignEdit={setEditingCampaignId} />
            {editingCampaignId && <CampaignMetrics campaignId={editingCampaignId} />}
        </div>
    );
};

export default AdminDashboard;
