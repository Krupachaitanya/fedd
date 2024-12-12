document.getElementById('submitFirstForm').addEventListener('click', function () {
    // Collect form values
    const year = document.getElementById('year').value;
    const semester = document.getElementById('semester').value;
    const branch = document.getElementById('branch').value;
    const section = document.getElementById('section').value;
  
    const teachers = [];
    const subjects = [];
  
    for (let i = 1; i <= 6; i++) {
        const teacher = document.getElementById(`teacher${i}`);
        const subject = document.getElementById(`subject${i}`);
  
        if (teacher && subject) {
            teachers.push(teacher.value);
            subjects.push(subject.value);
        }
    }
  
    // Validate input
    if (!year || !semester || !branch || !section || teachers.every(t => !t)) {
        alert('Please fill in all required fields.');
        return;
    }
  
    // Create a query string
    const params = new URLSearchParams({
        year,
        semester,
        branch,
        section,
        teachers: JSON.stringify(teachers),
        subjects: JSON.stringify(subjects),
    });
  
    // Generate the shareable URL
    const baseURL = window.location.origin + '/your-repo-name/feedback.html'; // Adjust this URL
    const shareableURL = `${baseURL}?${params.toString()}`;
  
    // Display the URL in the input field and show the "Copy" button
    const urlDisplay = document.getElementById('urlDisplay');
    const generatedUrl = document.getElementById('generatedUrl');
    generatedUrl.value = shareableURL;
    urlDisplay.style.display = 'block';
  });
  
  // Function to copy the URL to the clipboard
  function copyToClipboard() {
    const generatedUrl = document.getElementById('generatedUrl');
    generatedUrl.select();
    generatedUrl.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    alert('URL copied to clipboard!');
  }
  