import React, { useState, useEffect } from 'react';

import api from '../api';

const CampaignMetrics = ({ campaignId }) => {
    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await api.get(`api/${campaignId}/metrics`);
                setMetrics(response.data);
            } catch (error) {
                console.error('Error fetching metrics:', error);
            }
        };
        fetchMetrics();
    }, [campaignId]);

    return (
        <div>
            <h2>Campaign Metrics</h2>
            {metrics ? (
                <div>
                    <p>Total Sent: {metrics.totalSent}</p>
                    <p>Success: {metrics.success}</p>
                    <p>Failed: {metrics.failed}</p>
                    <p>Open Rate: {metrics.openRate.toFixed(2)}%</p>
                    <p>Click Rate: {metrics.clickRate.toFixed(2)}%</p>
                </div>
            ) : (
                <p>Loading metrics...</p>
            )}
        </div>
    );
};

export default CampaignMetrics;
