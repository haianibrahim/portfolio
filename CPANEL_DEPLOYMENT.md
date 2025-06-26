# cPanel Deployment Guide

## Prerequisites
- cPanel hosting with Node.js support
- OpenAI API key (only if you want to enable the AI chatbot)

## Step 1: Upload Files

1. **Compress your project** (exclude `node_modules` and `.next` folders):
   - Create a ZIP file with all project files EXCEPT:
     - `node_modules/`
     - `.next/`
     - `dist/`
     - `.git/`

2. **Upload via File Manager**:
   - Log into cPanel
   - Open File Manager
   - Navigate to your chosen directory (e.g., `public_html/portfolio`)
   - Upload and extract the ZIP file

## Step 2: Set Up Node.js Application

1. **Find Node.js App in cPanel**:
   - Look for "Node.js App", "Node.js Selector", or "Setup Node.js App"

2. **Create New Application**:
   - **Node.js version**: Latest available (18.x or higher)
   - **Application mode**: Production
   - **Application root**: Path where you uploaded files
   - **Application URL**: Your domain/subdomain
   - **Application startup file**: `server.js`
   - **Passenger log file**: Leave default

3. **Click "Create"**

## Step 3: Install Dependencies

1. **In the Node.js App interface**:
   - Click "Open Terminal" or use the terminal button
   - Run: `npm install`
   - Wait for all dependencies to install

## Step 4: Set Environment Variables

1. **In the Node.js App interface**:
   - Find "Environment Variables" section
   - Add these variables:

### Required Variables:
```
NODE_ENV=production
NEXT_PUBLIC_AI_CHAT=true
```

### Optional Variables (based on features you want):
```
# Only needed if NEXT_PUBLIC_AI_CHAT=true
OPENAI_API_KEY=your_actual_openai_api_key

# For CV download functionality
CV_LINK=https://your-domain.com/path/to/cv.pdf

# For contact form
NEXT_PUBLIC_FORMSPREE_ENDPOINT=your_formspree_endpoint
```

### AI Chatbot Control:
- Set `NEXT_PUBLIC_AI_CHAT=true` to enable the AI chatbot
- Set `NEXT_PUBLIC_AI_CHAT=false` to disable the AI chatbot completely
- If disabled, you don't need the OpenAI API key

## Step 5: Build and Start

1. **Build the application**:
   - In terminal: `npm run build`

2. **Start the application**:
   - Click "Restart" in the Node.js App interface
   - Or use terminal: `npm start`

## Step 6: Configure Domain (if needed)

1. **If using subdomain**:
   - Make sure the subdomain points to your application directory
   - Update DNS settings if necessary

2. **If using main domain**:
   - Ensure the application root is set correctly
   - May need to adjust .htaccess files

## Feature Control Options

### Option 1: Full Portfolio with AI Chatbot
```
NEXT_PUBLIC_AI_CHAT=true
OPENAI_API_KEY=your_actual_openai_api_key
```

### Option 2: Portfolio without AI Chatbot (saves costs)
```
NEXT_PUBLIC_AI_CHAT=false
```
(No need for OpenAI API key)

### Option 3: Portfolio with Contact Form only
```
NEXT_PUBLIC_AI_CHAT=false
NEXT_PUBLIC_FORMSPREE_ENDPOINT=your_formspree_endpoint
```

## Troubleshooting

### Common Issues:

1. **"Module not found" errors**:
   - Ensure all dependencies are installed: `npm install`
   - Check Node.js version compatibility

2. **Port issues**:
   - cPanel automatically assigns ports
   - Don't manually set port numbers

3. **Environment variables not working**:
   - Double-check variable names (case-sensitive)
   - Restart the application after adding variables

4. **Build failures**:
   - Check Node.js version (should be 18+)
   - Ensure sufficient disk space
   - Check error logs in cPanel

5. **Chatbot not working** (when enabled):
   - Verify `NEXT_PUBLIC_AI_CHAT=true`
   - Verify OPENAI_API_KEY is set correctly
   - Check API key permissions and billing

6. **Chatbot button not showing**:
   - Check if `NEXT_PUBLIC_AI_CHAT=true`
   - Restart the application after changing this variable

### File Structure After Upload:
```
your-app-directory/
├── src/
├── public/
├── package.json
├── server.js
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── (other project files)
```

### Important Notes:
- Never upload `node_modules` - always use `npm install`
- Always run `npm run build` before starting
- Environment variables are case-sensitive
- Check cPanel error logs if application won't start
- The `NEXT_PUBLIC_AI_CHAT` variable controls if the chatbot appears at all

## Testing Your Deployment

1. Visit your domain/subdomain
2. Test basic functionality (theme switching, language switching)
3. If `NEXT_PUBLIC_AI_CHAT=true`: Test the chatbot functionality
4. Test the contact form (if configured)
5. Check both light and dark themes
6. Test on mobile devices

## Cost Optimization

- **Disable AI Chatbot**: Set `NEXT_PUBLIC_AI_CHAT=false` to completely remove the chatbot and avoid OpenAI costs
- **Static Features Only**: The portfolio works perfectly without the AI chatbot
- **Selective Features**: Enable only the features you need

If you encounter issues, check the application logs in your cPanel Node.js interface. 