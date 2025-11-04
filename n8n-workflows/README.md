# 🦚 Rohimaya Publishing - n8n Workflows

**Complete Automation Workflows for Business Operations**

## Overview

This directory contains 5 complete n8n workflow JSON files that automate key business processes for Rohimaya Publishing. Import these into your n8n instance to automate user onboarding, book publishing, content distribution, payment processing, and customer support.

## Workflows Included

### 1. **user-onboarding.json** - New User Automation
**Trigger:** Webhook when user signs up
**Actions:**
- Send welcome email with getting started guide
- Create user record in Supabase database
- Add to email list (MailChimp)
- Schedule Day 3 follow-up email
- Return success response

**Setup Required:**
- Email service credentials (SendGrid, SMTP, etc.)
- Supabase database credentials
- MailChimp API key

**Expected Flow:**
1. User signs up on website
2. Webhook triggers workflow
3. Welcome email sent immediately
4. User added to database
5. Subscribed to mailing list
6. Follow-up scheduled
7. Workflow completes

---

### 2. **book-publishing.json** - Book Launch Automation
**Trigger:** Webhook when book marked "ready to publish"
**Actions:**
- Send congratulations email to author
- Generate marketing copy (AI-powered)
- Create social media posts
- Update book status in database
- Offer audiobook generation upsell
- Return success response

**Setup Required:**
- Email service credentials
- API endpoint for marketing copy generation
- Social media API credentials (Twitter, Facebook, etc.)
- Supabase database credentials

**Expected Flow:**
1. Author marks book as "ready"
2. Workflow triggered
3. Congrats email sent
4. Marketing copy auto-generated
5. Social posts created
6. Database updated
7. Audiobook upsell offered

---

### 3. **content-publishing.json** - Blog to Social Media
**Trigger:** File watcher for new blog posts
**Actions:**
- Read new blog post
- Generate SEO meta description (AI)
- Create social media snippets (AI)
- Post to Twitter/X
- Post to Facebook
- Email subscribers
- Update RSS feed

**Setup Required:**
- OpenAI API key (for AI generation)
- Twitter API credentials
- Facebook API credentials
- Email service credentials
- MongoDB or RSS feed system

**Expected Flow:**
1. New blog post added to folder
2. Workflow detects file
3. AI generates SEO description
4. AI creates social snippets
5. Posted to all platforms
6. Subscribers emailed
7. RSS feed updated

---

### 4. **payment-processing.json** - Stripe Webhook Handler
**Trigger:** Stripe webhook (checkout.session.completed)
**Actions:**
- Send invoice/receipt email
- Unlock pro features in database
- Add user to premium email segment
- Track revenue in analytics
- Acknowledge webhook

**Setup Required:**
- Stripe webhook endpoint configured
- Stripe API credentials
- Email service credentials
- Supabase database credentials
- MailChimp API key

**Expected Flow:**
1. User completes payment on Stripe
2. Stripe sends webhook
3. Invoice email sent
4. Pro features unlocked
5. User segmented as premium
6. Revenue tracked
7. Webhook acknowledged

---

### 5. **customer-support.json** - Intelligent Support Routing
**Trigger:** Webhook from support form
**Actions:**
- Send auto-reply acknowledgment
- Check knowledge base with AI
- If answer found: Send automated solution
- If no answer: Create support ticket
- Notify support team
- Return success response

**Setup Required:**
- Email service credentials
- OpenAI API key (for knowledge base AI)
- Supabase database credentials

**Expected Flow:**
1. User submits support request
2. Auto-reply sent immediately
3. AI checks knowledge base
4. If answer exists: Automated response sent
5. If no answer: Ticket created, team notified
6. Workflow completes

---

## Installation Instructions

### Step 1: Import Workflows

**Using n8n Cloud:**
1. Log in to your n8n cloud instance
2. Click "Workflows" → "Add workflow" → "Import from file"
3. Select a JSON file from this directory
4. Click "Import"
5. Repeat for all 5 workflows

**Using Self-Hosted n8n:**
1. SSH into your n8n server
2. Navigate to n8n workflows directory
3. Copy JSON files to workflows folder
4. Restart n8n service
5. Workflows will appear in UI

### Step 2: Configure Credentials

Each workflow requires specific credentials. Set these up in n8n:

**Email (required for all workflows):**
- Type: SMTP, SendGrid, or Email Send
- Configuration: smtp.gmail.com:587 (or your provider)

**Supabase (required for 4 workflows):**
- Type: Supabase
- URL: https://your-project.supabase.co
- API Key: Your anon/service key

**OpenAI (required for 2 workflows):**
- Type: OpenAI
- API Key: sk-YOUR_KEY_HERE

**Stripe (required for 1 workflow):**
- Type: Stripe
- API Key: sk_test_YOUR_KEY (test) or sk_live_YOUR_KEY (production)
- Webhook Secret: whsec_YOUR_SECRET

**Social Media (optional):**
- Twitter: API keys from developer.twitter.com
- Facebook: App ID and Secret from developers.facebook.com

**MailChimp (optional):**
- Type: MailChimp
- API Key: From mailchimp.com/account/api

### Step 3: Update Workflow Parameters

Open each workflow and update:

**user-onboarding.json:**
- Line 8: `webhook-path` → Your desired webhook URL
- Line 22: `fromEmail` → Your email address
- Line 50: `listId` → Your MailChimp list ID

**book-publishing.json:**
- Line 8: `webhook-path` → Your webhook URL
- Line 57: Update API endpoint for marketing copy generation

**content-publishing.json:**
- Line 10: `folderToWatch` → Your blog posts directory
- Line 143: Social media IDs

**payment-processing.json:**
- Line 8: Configure Stripe webhook secret
- Line 82: Premium segment list ID

**customer-support.json:**
- Line 8: Support webhook URL
- Line 90: Support team email address

### Step 4: Test Each Workflow

**Test Mode:**
1. Click "Execute Workflow" button
2. Provide test data in webhook/trigger
3. Watch nodes execute one by one
4. Check for errors in node output
5. Verify results (email sent, database updated, etc.)

**Production Testing:**
1. Activate workflow (toggle on)
2. Trigger via real webhook
3. Monitor workflow executions
4. Check logs for any issues

### Step 5: Activate Workflows

Once tested:
1. Toggle "Active" switch to ON
2. Workflow will run automatically on triggers
3. Monitor in "Executions" tab
4. Set up error notifications (optional)

---

## Workflow Dependencies

### API Services Required:
- **OpenAI:** GPT-4 for AI generation ($0.03/1K tokens)
- **Stripe:** Payment processing (2.9% + $0.30/transaction)
- **SendGrid:** Email delivery (Free: 100/day, $15/month: 40K/month)
- **Supabase:** Database + Auth (Free tier sufficient to start)

### Optional Services:
- **MailChimp:** Email marketing ($13/month for 500 contacts)
- **Twitter API:** $100/month for API access
- **Facebook Graph API:** Free for basic posting
- **MongoDB:** For RSS feed storage

---

## Customization Guide

### Adding New Actions

To add actions to any workflow:
1. Open workflow in n8n editor
2. Click "+" button to add node
3. Choose node type (email, database, API call, etc.)
4. Configure node parameters
5. Connect to existing nodes
6. Test and save

### Modifying Email Templates

Email content is in the `message` parameter of email nodes:
1. Click email node
2. Scroll to "Message" field
3. Edit HTML (use {{variables}} for dynamic content)
4. Preview and test

### Changing Triggers

To use different triggers:
1. Delete existing trigger node
2. Add new trigger type (Schedule, Email, Manual, etc.)
3. Reconnect to first action node
4. Configure trigger parameters

---

## Monitoring & Maintenance

### View Execution History

**n8n Cloud:**
- Go to "Executions" tab
- Filter by workflow, status, date
- Click execution to see detailed logs

**Self-Hosted:**
- Access logs at `/home/n8n/.n8n/logs/`
- Set up log rotation
- Configure error notifications

### Error Handling

**Email Notifications:**
Add error notification node:
```json
{
  "type": "n8n-nodes-base.emailSend",
  "parameters": {
    "toEmail": "admin@rohimayapublishing.com",
    "subject": "⚠️ Workflow Error: {{$workflow.name}}",
    "message": "Error: {{$json.error}}"
  }
}
```

**Retry Logic:**
Enable retry in workflow settings:
- Max retries: 3
- Retry interval: 5 minutes
- Exponential backoff: Yes

### Performance Optimization

**Large Volumes:**
- Use queue mode for high-traffic workflows
- Batch database operations
- Cache frequent API calls
- Implement rate limiting

**Cost Reduction:**
- Use webhooks instead of polling
- Minimize AI API calls
- Batch email sends
- Optimize database queries

---

## Security Best Practices

### Webhook Security

1. **Use Secret Tokens:**
   - Add authentication tokens to webhooks
   - Verify tokens in workflow
   - Rotate tokens regularly

2. **IP Whitelisting:**
   - Restrict webhook access by IP
   - Use Cloudflare for protection
   - Enable rate limiting

3. **HTTPS Only:**
   - All webhooks must use HTTPS
   - Use valid SSL certificates
   - No self-signed certificates

### Credential Management

1. **Never Commit Secrets:**
   - Don't export workflows with credentials
   - Use environment variables
   - Rotate keys regularly

2. **Principle of Least Privilege:**
   - Use read-only keys where possible
   - Limit scope of API keys
   - Create service accounts

3. **Audit Access:**
   - Log all workflow executions
   - Monitor for suspicious activity
   - Review credentials quarterly

---

## Troubleshooting

### Common Issues

**Workflow Not Triggering:**
- Check if workflow is activated
- Verify webhook URL is correct
- Test trigger manually
- Check firewall settings

**Email Not Sending:**
- Verify email credentials
- Check spam folder
- Review email service logs
- Test with simple message

**Database Errors:**
- Check Supabase credentials
- Verify table names match
- Review RLS policies
- Check data types

**API Rate Limits:**
- Reduce frequency of calls
- Implement caching
- Use batch operations
- Upgrade API plan

**Timeout Errors:**
- Increase workflow timeout setting
- Break into smaller workflows
- Use async operations
- Optimize queries

---

## Support Resources

### n8n Documentation:
- Official Docs: https://docs.n8n.io
- Community Forum: https://community.n8n.io
- YouTube Tutorials: https://youtube.com/c/n8n-io

### Rohimaya Support:
- Email: support@rohimayapublishing.com
- Documentation: https://docs.rohimayapublishing.com
- Community: Join our Discord

---

## Workflow Diagram

```
USER JOURNEY AUTOMATION:

1. Signup → user-onboarding.json
   ├─ Welcome email
   ├─ Database entry
   ├─ Email list
   └─ Follow-up scheduled

2. Write Book → (User works in apps)

3. Publish → book-publishing.json
   ├─ Congrats email
   ├─ Marketing copy
   ├─ Social posts
   └─ Audiobook upsell

4. Create Content → content-publishing.json
   ├─ SEO optimization
   ├─ Social snippets
   ├─ Email blast
   └─ RSS feed

5. Subscribe → payment-processing.json
   ├─ Invoice email
   ├─ Features unlocked
   ├─ Premium segment
   └─ Revenue tracking

6. Need Help → customer-support.json
   ├─ Auto-reply
   ├─ AI knowledge base
   ├─ Ticket creation
   └─ Team notification
```

---

## Updates & Maintenance

**Version:** 1.0.0
**Last Updated:** November 2025
**Compatibility:** n8n v1.0+

**Changelog:**
- v1.0.0 (Nov 2025): Initial release with 5 core workflows

**Planned Enhancements:**
- SMS notification workflow
- Advanced analytics workflow
- Competitor monitoring workflow
- Social media scheduling workflow
- Automated book marketing campaigns

---

**Built with 🦚 by Rohimaya Publishing**
*Ascend • Flourish • Enlighten*
