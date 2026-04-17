---

## 🚀 Supabase Backend Architecture (Edge Functions)

This project uses **Supabase Edge Functions** as a controller layer to handle data transformation, side effects, and secure database updates before the data reaches the client.

### 1. Prerequisites
Ensure you have the Supabase CLI installed:
```bash
brew install supabase/tap/supabase

# Initialize the supabase directory in the project root
supabase init

# Link your local environment to the remote project
# You will need your Project Ref from the Supabase Dashboard
supabase link --project-ref <your-project-ref>

# Creates a new function scaffold in /supabase/functions/
supabase functions new get-market-insights

# Starts local Docker containers for Supabase
supabase start 
supabase functions serve get-market-insights --no-verify-jwt

# Deploy a specific function
supabase functions deploy get-market-insights

# To deploy all functions at once
supabase functions deploy