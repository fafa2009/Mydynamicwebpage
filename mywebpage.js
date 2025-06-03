// Dynamic Year
const currentYearSpan = document.getElementById('current-year');
currentYearSpan.textContent = new Date().getFullYear();

// Skill Description
const skillButtons = document.querySelectorAll('.skill-btn');
const skillDescription = document.getElementById('skill-description');

const skillInfo = {
    "HTML": "HTML (HyperText Markup Language) is the backbone of all web pages, defining their structure.",
    "CSS": "CSS (Cascading Style Sheets) is used to style the visual presentation of web pages, making them look great!",
    "JavaScript": "JavaScript is a programming language that enables interactive web pages, allowing complex features and dynamic content."
};

skillButtons.forEach(button => {
    button.addEventListener('click', () => {
        const skill = button.dataset.skill;
        skillDescription.textContent = skillInfo[skill];
        skillDescription.style.color = '#0056b3';
    });
});

// Dark Mode
const themeToggleBtn = document.getElementById('themeToggle');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Load theme preference
window.addEventListener('load', () => {
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }
    fetchProjects();
});

// Fetch and display projects from JSON
function fetchProjects() {
    fetch('portfolio_items.json')
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('projects-container');
            data.projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank">View Project</a>
                `;
                container.appendChild(card);
            });
        })
        .catch(err => console.error('Error loading projects:', err));
}
