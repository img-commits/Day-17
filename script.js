const nameInput = document.getElementById("nameInput");
const scoreInput = document.getElementById("scoreInput");
const addBtn = document.getElementById("addBtn");

const minScore = document.getElementById("minScore");
const maxScore = document.getElementById("maxScore");
const filterBtn = document.getElementById("filterBtn");

const studentList = document.getElementById("studentList");
const totalStudents = document.getElementById("totalStudents");
const averageScore = document.getElementById("averageScore");

let students = [
{ name: "Snow", score: 85 },
{ name: "C.T", score: 72 },
{ name: "Nerfed", score: 45 },
{ name: "F3ro", score: 91 },
{ name: "Y.G", score: 63 },
{ name: "IMG", score: 88 }
];

function scoreColor(score) {
if (score >= 80) return "text-green-600 font-bold";
if (score >= 50) return "text-yellow-500 font-bold";
return "text-red-500 font-bold";
}

function render(list) {

studentList.innerHTML = "";

list.map((student, index) => {

const row = document.createElement("tr");

row.className = "border-b transition-all duration-300";

row.innerHTML = `
<td class="py-2">${student.name}</td>
<td class="py-2 ${scoreColor(student.score)}">${student.score}</td>
<td>
<button data-index="${index}" class="text-red-500 hover:text-red-700">
Delete
</button>
</td>
`;

studentList.appendChild(row);

});

totalStudents.textContent = list.length;

const avg = list.reduce((sum, student) => sum + student.score, 0) / (list.length || 1);

averageScore.textContent = avg.toFixed(1);
}

function addStudent() {

const name = nameInput.value.trim();
const score = Number(scoreInput.value);

if (!name || score === "") return;

students.push({ name, score });

nameInput.value = "";
scoreInput.value = "";

render(students);
}

addBtn.addEventListener("click", addStudent);

filterBtn.addEventListener("click", () => {

const min = Number(minScore.value) || 0;
const max = Number(maxScore.value) || 100;

const filtered = students.filter(
student => student.score >= min && student.score <= max
);

render(filtered);

});

document.addEventListener("click", e => {

if (e.target.dataset.index !== undefined) {

students.splice(e.target.dataset.index, 1);

render(students);

}

});

render(students);