const mongoose = require('mongoose');
//Connect to MongoDB
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
});
// Classes, Objests
const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name : 'Angular Course',
        author: 'Joy',
        tags: [ 'angular', 'frontend' ],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

async function getCourses() {// Querying Document
    const courses = await Course
        .find({ author: 'Joy', isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .select({ name:1, tags: 1 });
    console.log(courses);
}

getCourses(); // get array object courses from mongoDB
 //createCourse(); //Create Schema 