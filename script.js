let skill_assessments = document.querySelector(".skill-assessments");

function fetchJson(jsonFilePath)
{
    return fetch(jsonFilePath) // Start the request

        .then(res => {
        // Check if the server responded successfully
            if (!res.ok) 
            {
                // If not, create an error to be caught by .catch()
                throw new Error(`HTTP error! Status: ${res.status}`);
            } 
            else 
                // If successful, tell it to parse the response body as JSON
                // This returns another promise
                return res.json();
        })
        .catch(function(error) {
            // This runs IF there was any error during fetch() or .then()
            console.error('Error fetching or parsing JSON:', error);
        });
}

function loadSkillAssessments()
{   
    skills_promise = fetchJson("./data/skills.json");
    
    skills_promise.then(data => {
        for (let i = 0; i < data.length; i++) 
            {
                const skill = data[i];
                const assessment_markup = 
                    `<figure class="skill-assessment ${skill.category.toLowerCase()}">
                        <span>
                            <img src=${skill.icon} alt="${skill.category} icon">
                            <figcaption>${skill.category}</figcaption>
                        </span>
                    <p class="skill-assessment-score"><span>${skill.score}</span> / 100</p>
                    </figure>
                    `;    
        
                skill_assessments.insertAdjacentHTML("beforeend", assessment_markup);
            }
    });
}

loadSkillAssessments();