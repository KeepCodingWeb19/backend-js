import { connectMongoose } from './lib/connectMongoose.js';
import { User } from './models/User.js';

const connection = await connectMongoose();
console.log(`Connected to MongoDB: ${connection.name}`);

const AGENTS = [
    { name: 'Smith', age: 45, owner: undefined },
    { name: 'Brown', age: 33, owner: undefined },
    { name: 'Jones', age: 24, owner: undefined },
];

await seedUsers();

await connection.close();
process.exit(0);

async function seedUsers() {

    const USERS = [
        { email: 'user@example.com', password: await User.hashPassword('1234') },
        { email: 'admin@example.com', password: await User.hashPassword('1234') }
    ];

    // Delete all users
    const deleteResult = await User.deleteMany();
    console.log(`Deleted ${deleteResult.deletedCount} Users`);

    const insertResult = await User.insertMany(USERS);

    console.log(`Inserted ${insertResult.length} Users`);

}

// TODO: Crea una función para inicializar los agentes.
// Los dos primeros senrán propiedad de admin y el tercero de user.