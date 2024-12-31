import { useState, useEffect } from "react";
import api from "../api";

const CampaignForm = ({ campaignId, onCampaignSubmit }) => {
    const [campaign, setCampaign] = useState({
        name: "",
        description: "",
        recipients: "",
        subject: "",
        content: "",
        scheduled_time: "",
    });

    useEffect(() => {
        if (campaignId) {
            // Fetch campaign details if editing an existing campaign
            api.get(`/${campaignId}`).then((response) => {
                setCampaign(response.data);
            });
        }
    }, [campaignId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCampaign((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (campaignId) {
            await api.put(`api/${campaignId}`, campaign);
        } else {
            await api.post("api/", campaign);
        }
        onCampaignSubmit();
    };

    return (
        <div
            style={{
                width: "100%",
                maxWidth: "600px",
                margin: "20px auto",
                padding: "70px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                
            }}
        >
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ marginBottom: "15px" }}>
                    <label
                        htmlFor="name"
                        style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "5px", color: "#333" }}
                    >
                        Campaign Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={campaign.name}
                        onChange={handleChange}
                        placeholder="Enter campaign name"
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "16px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            outline: "none",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label
                        htmlFor="description"
                        style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "5px", color: "#333" }}
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={campaign.description}
                        onChange={handleChange}
                        placeholder="Enter campaign description"
                        style={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "16px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            outline: "none",
                            resize: "vertical",
                            height: "120px",
                        }}
                    ></textarea>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label
                        htmlFor="recipients"
                        style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "5px", color: "#333" }}
                    >
                        Recipients
                    </label>
                    <input
                        type="text"
                        id="recipients"
                        name="recipients"
                        value={campaign.recipients}
                        onChange={handleChange}
                        placeholder="Enter recipients (comma separated)"
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "16px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            outline: "none",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label
                        htmlFor="subject"
                        style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "5px", color: "#333" }}
                    >
                        Subject
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={campaign.subject}
                        onChange={handleChange}
                        placeholder="Enter subject"
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "16px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            outline: "none",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label
                        htmlFor="content"
                        style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "5px", color: "#333" }}
                    >
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={campaign.content}
                        onChange={handleChange}
                        placeholder="Enter content for the campaign"
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "16px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            outline: "none",
                            resize: "vertical",
                            height: "120px",
                        }}
                    ></textarea>
                </div>


                <button
                    type="submit"
                    style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        padding: "12px",
                        fontSize: "16px",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = "#45a049"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "#4CAF50"}
                >
                    {campaignId ? "Update" : "Create"} Campaign
                </button>
            </form>
        </div>
    );
};

export default CampaignForm;
