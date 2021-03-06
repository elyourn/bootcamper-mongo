const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors'); // eslint-disable-line
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Bootcamp = require('./modules/bootcamps/model');
const Course = require('./modules/courses/model');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

// Read JSON files
const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/resourses/_data/bootcamps.json`, 'utf-8'),
);
const courses = JSON.parse(fs.readFileSync(`${__dirname}/resourses/_data/courses.json`, 'utf-8'));

// Import into DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        await Course.create(courses);
        console.log('Data Imported'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

// Delete Data
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();

        console.log('Data destroyed...'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
