const campagin = require('../models/campagin');
// const Campaign = require('../models/Campaign');
const nodemailer = require('nodemailer');
// const { format } = require('date-fns');

// Get all campaigns
const getCampaigns = async (req, res) => {
    try {
        const campaigns = await campagin.find();
        res.status(200).json(campaigns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific campaign by ID
const getCampaignById = async (req, res) => {
    try {
        const campaign = await campagin.findById(req.params.id);
        if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new campaign
const createCampaign = async (req, res) => {
    const { name, description, recipients, subject, content, scheduled_time } = req.body;

    try {
        const campaign = new campagin({
            name,
            description,
            recipients,
            subject,
            content,
            scheduled_time,
        });
        await campaign.save();
        res.status(201).json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing campaign
const updateCampaign = async (req, res) => {
    const { id } = req.params;
    const { name, description, recipients, subject, content, scheduled_time } = req.body;

    try {
        const campaign = await campagin.findByIdAndUpdate(
            id,
            { name, description, recipients, subject, content, scheduled_time },
            { new: true }
        );
        if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
        res.status(200).json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a campaign
const deleteCampaign = async (req, res) => {
    try {
        const campaign = await campagin.findByIdAndDelete(req.params.id);
        if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
        res.status(200).json({ message: 'Campaign deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Send campaign emails
const sendCampaignEmails = async (req, res) => {
    const { id } = req.params;

    try {
        const campaign = await campagin.findById(id);
        if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

        const transporter = nodemailer.createTransport({
            service: 'SendGrid',
            auth: {
                user: process.env.SENDGRID_USERNAME,
                pass: process.env.SENDGRID_PASSWORD,
            },
        });

        const sendEmailPromises = campaign.recipients.map(email => {
            return transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: email,
                subject: campaign.subject,
                text: campaign.content,
                html: `<p>${campaign.content}</p>`,
            });
        });

        await Promise.all(sendEmailPromises);
        res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get performance metrics for a campaign
const getCampaignMetrics = async (req, res) => {
    const { id } = req.params;

    try {
        const campaign = await campagin.findById(id);
        if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

        // Placeholder metrics for now
        const metrics = {
            totalSent: campaign.recipients.length,
            success: Math.floor(Math.random() * campaign.recipients.length),
            failed: campaign.recipients.length - Math.floor(Math.random() * campaign.recipients.length),
            openRate: Math.random() * 100,
            clickRate: Math.random() * 100,
        };

        res.status(200).json(metrics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCampaigns,
    getCampaignById,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    sendCampaignEmails,
    getCampaignMetrics,
};
