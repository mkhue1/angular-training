// Interface cho 1 người
export interface person{
    age: number,
    name: string,
    gender: gender
}
// Enum giới tính
export enum gender{
    Male = "Nam", Female = "Nữ"
}
// Object thực tế cho interface
export const person1: person = {
    age: 21,
    name: "Khuê",
    gender: gender.Male
}
export const person2: person = {
    age: 27,
    name: "Nam",
    gender: gender.Male
}
export const person3 : person = {
    age: 30,
    name: "Hà",
    gender: gender.Female
}
// Array của các object
export const people:Array<person> = [person1, person2, person3]


