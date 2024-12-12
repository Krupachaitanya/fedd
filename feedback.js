// Parse URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Extract form details
const year = urlParams.get('year');
const semester = urlParams.get('semester');
const branch = urlParams.get('branch');
const section = urlParams.get('section');
const teachers = JSON.parse(urlParams.get('teachers') || '[]');
const subjects = JSON.parse(urlParams.get('subjects') || '[]');

// Populate form details
const formDetailsDiv = document.getElementById('formDetails');
formDetailsDiv.innerHTML = `
  <p><strong>Year:</strong> ${year}</p>
  <p><strong>Semester:</strong> ${semester}</p>
  <p><strong>Branch:</strong> ${branch}</p>
  <p><strong>Section:</strong> ${section}</p>
`;

// Populate the feedback table
const feedbackTableBody = document.getElementById('feedbackTableBody');
const headersRow = document.querySelector('thead tr');

teachers.forEach((teacher, index) => {
  if (teacher && subjects[index]) {
    // Add a header for each teacher and subject
    const th = document.createElement('th');
    th.innerText = `${teacher} (${subjects[index]})`;
    headersRow.appendChild(th);
  }
});

// Generate questions
const questions = [
  'Knowledge of the subject',
  'Communication skills',
  'Teaching methodology',
  'Punctuality in class',
  'Availability for doubts',
  'Clarity in explaining concepts',
  'Encourages student participation',
  'Regular evaluation of assignments',
  'Usage of modern teaching aids',
  'Overall teaching effectiveness',
];

questions.forEach((question, qIndex) => {
  const tr = document.createElement('tr');

  // Add question text
  const tdQuestion = document.createElement('td');
  tdQuestion.innerText = `${qIndex + 1}. ${question}`;
  tr.appendChild(tdQuestion);

  // Add feedback options for each teacher
  teachers.forEach(() => {
    const td = document.createElement('td');
    td.innerHTML = `
      <select>
        <option value="P">P</option>
        <option value="A">A</option>
        <option value="S">S</option>
        <option value="G">G</option>
        <option value="E">E</option>
      </select>
    `;
    tr.appendChild(td);
  });

  feedbackTableBody.appendChild(tr);
});

// Handle feedback form submission
document.getElementById('submitFeedbackForm').addEventListener('click', function () {
  const facultyComments = document.getElementById('facultyComments').value;
  const departmentComments = document.getElementById('departmentComments').value;

  const feedbackData = {
    year,
    semester,
    branch,
    section,
    facultyComments,
    departmentComments,
    feedback: [],
  };

  // Collect feedback ratings
  const rows = feedbackTableBody.querySelectorAll('tr');
  rows.forEach((row, qIndex) => {
    const ratings = Array.from(row.querySelectorAll('select')).map(select => select.value);
    feedbackData.feedback.push({ question: questions[qIndex], ratings });
  });

  console.log('Feedback Data:', feedbackData);
  alert('Feedback submitted successfully!');
});
