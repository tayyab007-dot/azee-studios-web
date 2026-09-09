import { connectToDatabase } from './lib/db';
import PortfolioItem from './lib/models/PortfolioItem';

async function run() {
  await connectToDatabase();
  const res = await PortfolioItem.deleteMany({
    url: { $regex: 'video_[56]|photo_1[123]|video_2[123]|marketing and strategy' }
  });
  console.log('Deleted:', res);
  process.exit(0);
}

run();
