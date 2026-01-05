// Enum nghề ngiệp
var gender;
(function (gender) {
    gender["Male"] = "Nam";
    gender["Female"] = "N\u1EEF";
})(gender || (gender = {}));
// Object thực tế cho interface
var person1 = {
    age: 21,
    name: "Khuê",
    gender: gender.Male
};
var person2 = {
    age: 27,
    name: "Nam",
    gender: gender.Male
};
var person3 = {
    age: 30,
    name: "Hà",
    gender: gender.Female
};
// Array của các object
var people = [person1, person2, person3];
// Function lọc những người đủ tuổi nhập ngũ
function filterMilitaryService(people) {
    return people.filter(function (n) { return n.age > 18 && n.gender == gender.Male; });
}
console.log(filterMilitaryService(people));
