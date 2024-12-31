import { useState, useEffect } from "react";
import api from "../api";

const CampaignList = ({ onCampaignEdit }) => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            const response = await api.get("/api/");
            setCampaigns(response.data);
        };
        fetchCampaigns();
    }, []);

    const handleEdit = (campaignId) => {
        onCampaignEdit(campaignId);
    };

    const handleDelete = async (campaignId) => {
        await api.delete(`/api/${campaignId}`);
        setCampaigns(campaigns.filter((campaign) => campaign._id !== campaignId));
    };

    return (
        <div style={{ margin: "20px", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Campaign List</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f4f4f4" }}>
                        <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Name</th>
                        <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Subject</th>
                        <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Scheduled Time</th>
                        <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map((campaign) => (
                        <tr key={campaign._id} style={{ borderBottom: "1px solid #ddd" }}>
                            <td style={{ padding: "12px" }}>{campaign.name}</td>
                            <td style={{ padding: "12px" }}>{campaign.subject}</td>
                            <td style={{ padding: "12px" }}>{new Date(campaign.scheduled_time).toLocaleString()}</td>
                            <td style={{ padding: "12px" }}>
                                <button
                                    onClick={() => handleEdit(campaign._id)}
                                    style={{
                                        marginRight: "10px",
                                        padding: "8px 12px",
                                        backgroundColor: "#4CAF50",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(campaign._id)}
                                    style={{
                                        padding: "8px 12px",
                                        backgroundColor: "#f44336",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CampaignList;
