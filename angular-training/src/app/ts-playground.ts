// Interface cho 1 người
interface person{
    age: number,
    name: string,
    gender: gender
}
// Enum nghề ngiệp
enum gender{
    Male = "Nam", Female = "Nữ"
}
// Object thực tế cho interface
const person1: person = {
    age: 21,
    name: "Khuê",
    gender: gender.Male
}
const person2: person = {
    age: 27,
    name: "Nam",
    gender: gender.Male
}
const person3 : person = {
    age: 30,
    name: "Hà",
    gender: gender.Female
}
// Array của các object
const people:Array<person> = [person1, person2, person3]
// Function lọc những người đủ tuổi nhập ngũ
function filterMilitaryService(people: Array<person>){
    return people.filter(n => n.age > 18 && n.gender == gender.Male)
}
console.log(filterMilitaryService(people))
