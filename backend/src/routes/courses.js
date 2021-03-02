const router = require('express').Router();
const { readFileSync } = require('fs');

router.get('/', (req, res) => {
    res.header({ 'Content-Type': 'application/json' }).send({ courses: getCourseNames() });

});

function getCourseNames () {
    const content = JSON.parse(readFileSync('./src/courses.json', { encoding: 'UTF-8' }, (e, data) => !e && data));
    const courses = [];
    content.forEach((course) => {
        courses.push(course.name);
    });

    return courses;
}

module.exports = router;