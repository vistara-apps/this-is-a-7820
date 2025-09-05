# KnowYourRights

Navigate police stops with confidence, state by state.

## 🚀 Overview

KnowYourRights is a mobile-first web application that provides users with state-specific legal information and actionable scripts for police interactions. Built with React, Vite, and modern web technologies, it empowers users with immediate, accurate knowledge to protect their rights during police encounters.

## ✨ Features

### Core Features
- **📍 State-Specific Legal Guides**: Comprehensive rights information tailored to each US state's laws
- **💬 Actionable Scripts & Prompts**: Pre-written phrases in English and Spanish for police interactions
- **📝 Incident Recording & Sharing**: Quick logging and documentation of police encounters
- **🚨 Emergency Contact Alert**: Discreet location-based emergency notifications

### Enhanced Features
- **🤖 AI-Powered Script Generation**: Personalized scripts using OpenAI integration
- **👤 User Authentication**: Secure account management with Supabase
- **💳 Payment Processing**: State guide purchases via Web3 wallets or Stripe
- **🗺️ Advanced Geolocation**: Accurate state detection and emergency services

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Supabase (Database, Auth, API)
- **AI Integration**: OpenAI GPT-4
- **Payments**: Web3 (RainbowKit, Wagmi) + Stripe
- **Geolocation**: Browser Geolocation API + OpenStreetMap Nominatim
- **State Management**: React Context + Hooks
- **Styling**: Tailwind CSS with custom design system

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project
- OpenAI API key (optional, for AI features)
- Stripe account (optional, for traditional payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vistara-apps/this-is-a-7820.git
   cd this-is-a-7820
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   ```env
   # Required
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Optional
   VITE_OPENAI_API_KEY=your_openai_api_key
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Set up Supabase database**
   
   Run the following SQL in your Supabase SQL editor:
   
   ```sql
   -- Create users table
   CREATE TABLE users (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     email text,
     state_preference text,
     purchased_states text[],
     created_at timestamp with time zone DEFAULT now(),
     updated_at timestamp with time zone DEFAULT now()
   );
   
   -- Create state_guides table
   CREATE TABLE state_guides (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     state_id text UNIQUE NOT NULL,
     state_name text NOT NULL,
     rights_content jsonb NOT NULL,
     script_content jsonb NOT NULL,
     languages text[] DEFAULT ARRAY['en'],
     emergency_contacts jsonb,
     created_at timestamp with time zone DEFAULT now(),
     updated_at timestamp with time zone DEFAULT now()
   );
   
   -- Create incident_logs table
   CREATE TABLE incident_logs (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id uuid REFERENCES users(id) ON DELETE CASCADE,
     state text NOT NULL,
     timestamp timestamp with time zone NOT NULL,
     notes text,
     location jsonb,
     shared_content_url text,
     metadata jsonb,
     created_at timestamp with time zone DEFAULT now(),
     updated_at timestamp with time zone DEFAULT now()
   );
   
   -- Create purchases table
   CREATE TABLE purchases (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id uuid REFERENCES users(id) ON DELETE CASCADE,
     state_id text NOT NULL,
     purchase_type text NOT NULL,
     amount decimal(10,2) NOT NULL,
     payment_method text,
     transaction_id text,
     status text DEFAULT 'completed',
     created_at timestamp with time zone DEFAULT now()
   );
   
   -- Create emergency_contacts table
   CREATE TABLE emergency_contacts (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id uuid REFERENCES users(id) ON DELETE CASCADE,
     name text NOT NULL,
     phone text NOT NULL,
     relationship text,
     is_primary boolean DEFAULT false,
     created_at timestamp with time zone DEFAULT now(),
     updated_at timestamp with time zone DEFAULT now()
   );
   
   -- Enable Row Level Security
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE incident_logs ENABLE ROW LEVEL SECURITY;
   ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
   ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;
   
   -- Create policies
   CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
   CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
   CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);
   
   CREATE POLICY "Users can view own incidents" ON incident_logs FOR SELECT USING (auth.uid() = user_id);
   CREATE POLICY "Users can insert own incidents" ON incident_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
   CREATE POLICY "Users can update own incidents" ON incident_logs FOR UPDATE USING (auth.uid() = user_id);
   CREATE POLICY "Users can delete own incidents" ON incident_logs FOR DELETE USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can view own purchases" ON purchases FOR SELECT USING (auth.uid() = user_id);
   CREATE POLICY "Users can insert own purchases" ON purchases FOR INSERT WITH CHECK (auth.uid() = user_id);
   
   CREATE POLICY "Users can manage own emergency contacts" ON emergency_contacts FOR ALL USING (auth.uid() = user_id);
   
   -- State guides are publicly readable
   CREATE POLICY "State guides are publicly readable" ON state_guides FOR SELECT TO anon, authenticated USING (true);
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ErrorBoundary.jsx
│   ├── EmergencyAlert.jsx
│   ├── IncidentLogger.jsx
│   ├── PaymentModal.jsx
│   ├── ScriptLibrary.jsx
│   ├── StateGuide.jsx
│   └── StateSelector.jsx
├── contexts/           # React contexts
│   └── AuthContext.jsx
├── data/              # Static data
│   ├── stateGuides.js
│   └── scriptLibrary.js
├── hooks/             # Custom hooks
│   └── usePaymentContext.js
├── lib/               # Third-party integrations
│   └── supabase.js
├── services/          # API services
│   ├── api.js
│   ├── geolocation.js
│   └── openai.js
├── config/            # Configuration
│   └── environment.js
├── App.jsx            # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles
```

## 🎨 Design System

The app uses a comprehensive design system built with Tailwind CSS:

### Colors
- **Primary**: `hsl(230, 80%, 50%)` - Main brand color
- **Accent**: `hsl(170, 60%, 45%)` - Highlight color
- **Surface**: `hsl(0, 0%, 100%)` - Card backgrounds
- **Background**: `hsl(0, 0%, 98%)` - Page background

### Typography
- **Display**: Large headings (text-4xl, font-bold)
- **Heading**: Section headings (text-2xl, font-semibold)
- **Body**: Regular text (text-base, leading-7)
- **Caption**: Small text (text-sm, text-textSecondary)

### Components
- **Buttons**: Primary, secondary, and outline variants
- **Cards**: Default and feature variants with shadows
- **Inputs**: Consistent form styling
- **Animations**: Smooth transitions with cubic-bezier easing

## 🔧 Configuration

The app uses a comprehensive configuration system in `src/config/environment.js`:

### Feature Flags
- **Core Features**: Always enabled (state guides, scripts, incident logging)
- **Enhanced Features**: Enabled based on API availability
- **Development Features**: Debug tools and detailed logging

### API Integration
- **Supabase**: Required for user auth and data persistence
- **OpenAI**: Optional for AI-powered features
- **Stripe**: Optional for traditional payment processing
- **Geolocation**: Browser API + optional enhanced geocoding

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables for Production
Ensure all required environment variables are set:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Optional but recommended:
- `VITE_OPENAI_API_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_ANALYTICS_ID`

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📱 Mobile Support

The app is built mobile-first with:
- Responsive design for all screen sizes
- Touch-friendly interface
- Offline capability for core features
- Progressive Web App (PWA) support

## 🔒 Security & Privacy

- **Data Encryption**: All data encrypted in transit and at rest
- **Row Level Security**: Supabase RLS policies protect user data
- **Privacy First**: Location data only used when explicitly requested
- **No Tracking**: No unnecessary data collection or tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@knowyourrights.app or create an issue in this repository.

## 🙏 Acknowledgments

- Legal information sourced from ACLU and legal aid organizations
- Icons by [Lucide React](https://lucide.dev/)
- UI components inspired by modern design systems
- Built with love for civil rights and justice

---

**Disclaimer**: This app provides educational information only and does not constitute legal advice. Always consult with a qualified attorney for legal matters.
