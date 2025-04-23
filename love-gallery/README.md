# Love Gallery

A beautiful photo gallery to surprise your loved one with special moments.

## Features

- Responsive image gallery with 10 images
- Smooth sliding transitions
- Special message page
- Mobile-friendly design

## Deployment Instructions

### Deploy to Vercel

1. **Fork or Clone the Repository**
   - Fork this repository to your GitHub account or clone it and push to a new repository.

2. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com/) and sign up/login with your GitHub account.
   - Click "New Project" and import your repository.

3. **Configure the Project**
   - Select the repository you want to deploy.
   - Vercel should automatically detect the project settings.
   - Make sure the "Root Directory" is set to the project root (where the vercel.json file is located).
   - Click "Deploy".

4. **Share Your Gallery**
   - Once deployed, Vercel will provide you with a URL (e.g., https://your-gallery.vercel.app).
   - Share this URL with anyone you want to see your gallery.

### Customizing the Gallery

To customize the gallery with your own images:

1. Replace the images in the `public/images` folder with your own images.
2. Update the captions in `server/index.js` to match your new images.
3. Customize the special message in `server/index.js` to your liking.

## Local Development

To run the project locally:

1. Install dependencies:
   ```
   npm run install-all
   ```

2. Start the development server:
   ```
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## License

ISC
