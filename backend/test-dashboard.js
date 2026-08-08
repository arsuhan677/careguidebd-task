const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  
  const dCount = await db.collection('doctors').countDocuments();
  const pCount = await db.collection('patients').countDocuments();
  console.log('Doctors:', dCount, 'Patients:', pCount);
  
  const result = await db.collection('patients').aggregate([
    {
      $group: {
        _id: '$gender',
        count: { $sum: 1 },
      },
    },
  ]).toArray();
  
  console.log('Gender dist:', result);
  process.exit(0);
}
run();
