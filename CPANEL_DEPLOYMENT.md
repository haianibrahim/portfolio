# cPanel Deployment Guide

## Prerequisites
- cPanel hosting with Node.js support
- OpenAI API key (for chatbot functionality)

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

```
OPENAI_API_KEY=your_actual_openai_api_key
NODE_ENV=production
CV_LINK=https://your-domain.com/path/to/cv.pdf (optional)
NEXT_PUBLIC_FORMSPREE_ENDPOINT=your_formspree_endpoint (optional)
```

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

5. **Chatbot not working**:
   - Verify OPENAI_API_KEY is set correctly
   - Check API key permissions and billing

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

## Testing Your Deployment

1. Visit your domain/subdomain
2. Test the chatbot functionality
3. Test the contact form
4. Check both light and dark themes
5. Test on mobile devices

If you encounter issues, check the application logs in your cPanel Node.js interface. 