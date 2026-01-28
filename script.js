const surveyContainer = document.getElementById('survey-container');
const surveyForm = document.getElementById('surveyForm');
const resultsDiv = document.getElementById('results');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const submitButton = document.getElementById('submitButton');
const errorMessage = document.getElementById('error-message');

// Progress tracking
function updateProgress() {
    const sections = surveyContainer.querySelectorAll(':scope > div');
    const totalSections = sections.length;
    let currentSection = 1;

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2) {
            currentSection = index + 1;
        }
    });

    const progress = (currentSection / totalSections) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `Section ${currentSection} of ${totalSections}`;
}

window.addEventListener('scroll', updateProgress);
window.addEventListener('load', updateProgress);

// Get today's date in YYYY-MM-DD format
function getTodayString() {
    const today = new Date();
    return today.toISOString().substring(0, 10);
}

// Filter data by date (compares YYYY-MM-DD)
function filterByDate(data, dateString) {
    if (!dateString) return data;
    return data.filter(row => {
        const rowDate = row['Created on'] ? row['Created on'].substring(0, 10) : null;
        return rowDate === dateString;
    });
}

// Fetch aggregated group data from serverless function (filtered by today if possible)
async function fetchGroupData() {
    try {
        const response = await fetch('https://faas-ams3-2a2df116.doserverless.co/api/v1/web/fn-de36936e-caf8-41eb-8caf-a697942675cd/default/ai-survey-results');
        const data = await response.json();
        const allResults = data.results || [];

        // Check if Created on field is available
        const hasCreatedOn = allResults.length > 0 && allResults[0]['Created on'];

        if (hasCreatedOn) {
            // Filter to only today's responses for session-based comparison
            return { data: filterByDate(allResults, getTodayString()), isFiltered: true };
        } else {
            // Fallback: return all results if created_on is not available
            console.warn('created_on field not available - showing all responses');
            return { data: allResults, isFiltered: false };
        }
    } catch (error) {
        console.error('Error fetching group data:', error);
        return { data: [], isFiltered: false };
    }
}

const surveyQuestions = [
    {
        section: "Productivity Changes",
        questions: [
            {
               identifier: "speed",
                statement: "The use of AI tools has increased the speed at which I complete tasks.",
                type: "likert",
                options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            },
            {
                identifier: "volume",
                statement: "The use of AI tools has changed the volume of work I can complete.",
                type: "likert",
                options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            },
            {
                identifier: "deadlines",
                statement: "The use of AI has impacted my ability to meet deadlines.",
                type: "likert",
                options: ["Significantly more difficult", "Slightly more difficult", "No change", "Slightly easier", "Significantly easier"],
            },
        ],
    },
    {
        section: "Skill Changes",
        questions: [
            {
               identifier: "skillchanges",
                statement: "The introduction of AI has led to changes in the skills I need to perform my job.",
                type: "likert",
                options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            },
            {
                identifier: "lessimportant",
                statement: "The skills I previously needed are now less important.",
                 type: "openText",
            },
            {
                identifier: "moreimportant",
                statement: "New skills have become more important due to AI introduction.",
                 type: "openText",
            },
            {
               identifier: "improvedskills",
                statement: "The use of AI has improved my skills by enabling me to do more complex work.",
                type: "likert",
                options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            },
        ],
    },
    {
        section: "Job Role Changes",
        questions: [
            {
               identifier: "scope",
                statement: "The introduction of AI has changed the scope or responsibilities of my job.",
                type: "likert",
                options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            },
            {
                identifier: "changedresponsibilities",
                statement: "The scope and responsibilities of my job have changed due to the introduction of AI.",
                 type: "openText",
            },
            {
               identifier: "replace",
                statement: "AI has the potential to replace some of the tasks I currently perform.",
                type: "likert",
                options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            },
            {
               identifier: "augment",
                statement: "AI has the potential to augment my work and allow me to focus on higher level tasks.",
                type: "likert",
                options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            }
        ],
    },
    {
        section: "Accountability and Trust",
        questions: [
            {
               identifier: "responsible",
                statement: "I feel responsible for the output generated by AI tools I use.",
                type: "likert",
                options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            },
            {
               identifier: "understanding",
                statement: "I have sufficient understanding of how the AI tools I use make decisions.",
                type: "likert",
                options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            },
            {
               identifier: "trust",
                statement: "I trust that my colleagues are using AI responsibly.",
                type: "likert",
                options: ["Not at all", "A little", "Moderately", "A lot", "Completely"],
            },
            {
               identifier: "guidance",
                statement: "Management provides sufficient guidance on the use of AI.",
                type: "likert",
                options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            },
            {
               identifier: "training",
                statement: "My company provides training to ensure the responsible use of AI in the workplace.",
                type: "likert",
                options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            },
        ],
    },
    {
        section: "Job Satisfaction and Empowerment",
        questions: [
            {
               identifier: "interesting",
                statement: "The introduction of AI has made my job more or less interesting.",
                type: "likert",
                options: ["Significantly less interesting", "Slightly less interesting", "No change", "Slightly more interesting", "Significantly more interesting"],
            },
            {
               identifier: "jobenrichment",
                statement: "AI is positioned as a tool for job enrichment rather than just for productivity gain.",
                type: "likert",
                options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            },
            {
               identifier: "empowered",
                statement: "I feel empowered to experiment with AI to improve my work.",
                type: "likert",
                options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            },
        ],
    },
    {
        section: "Training and Support",
        questions: [
            {
               identifier: "trainingandsupport",
                statement: "I am provided with adequate training and support to use AI effectively.",
                type: "likert",
                options: ["Not at all", "A little", "Moderately", "A lot", "Completely"],
            },
            {
               identifier: "taskspecifictools",
                statement: "I have access to task-specific AI tools that are relevant to my daily work.",
                type: "likert",
                options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            },
        ],
    },
    {
        section: "Overall Impact",
        questions: [
            {
               identifier: "overallimpact",
                statement: "Overall, AI has impacted my work experience.",
                type: "likert",
                options: ["Very Negative", "Negative", "Neutral", "Positive", "Very Positive"],
            },
            {
               identifier: "mainbenefit",
                statement: "What is the main benefit you have experienced since your department started using AI?",
                 type: "openText",
            },
            {
               identifier: "mainchallenge",
                statement: "What is the main challenge you have experienced since your department started using AI?",
                 type: "openText",
            }
        ],
    },
];
function createQuestionElement(question, questionIndex, sectionIndex) {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('mb-6', 'mt-4');

    const statementElement = document.createElement('p');
    statementElement.classList.add('font-bold', 'mb-2');
    statementElement.textContent = `${questionIndex+1}. ${question.statement}`;
    questionDiv.appendChild(statementElement);

    let inputElement;

    switch (question.type) {
        case 'likert':
            inputElement = document.createElement('div');
            inputElement.classList.add('flex', 'flex-col', 'space-y-2', 'sm:flex-row', 'sm:space-y-0', 'sm:space-x-2', 'my-2');
            question.options.forEach((option, optionIndex) => {
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.id = `question-${sectionIndex}-${questionIndex}-option-${optionIndex}`;
                radio.name = `question-${sectionIndex}-${questionIndex}`;
                radio.value = optionIndex + 1; // RECORD THE INDEX PLUS 1
                radio.classList.add('hidden');

                const label = document.createElement('label');
                label.htmlFor = `question-${sectionIndex}-${questionIndex}-option-${optionIndex}`;
                label.textContent = option;
                label.classList.add('bg-gray-200', 'hover:bg-gray-300', 'border', 'border-gray-400', 'rounded-md', 'py-3', 'px-4', 'min-h-[44px]', 'cursor-pointer', 'text-center', 'block', 'w-full', 'transition-colors', 'duration-200', 'focus:outline-none', 'focus:ring', 'focus:ring-blue-200', 'text-sm', 'sm:text-base', 'flex', 'items-center', 'justify-center');


                inputElement.appendChild(radio);
                inputElement.appendChild(label);


              label.addEventListener('click', function(){
                // Reset all sibling labels to default state
                label.parentElement.querySelectorAll('label').forEach(siblingLabel => {
                  siblingLabel.classList.remove('bg-green-300', 'hover:bg-green-400', 'shadow-md');
                  siblingLabel.classList.add('bg-gray-200', 'hover:bg-gray-300');
                });
                // Set selected state with green hover
                label.classList.remove('bg-gray-200', 'hover:bg-gray-300');
                label.classList.add('bg-green-300', 'hover:bg-green-400', 'shadow-md');
              });

            });
            break;
        case 'openText':
            inputElement = document.createElement('div');
            const label = document.createElement('label');
              label.textContent = "Please elaborate";
              label.classList.add('block','mb-1','font-medium');
            const textArea = document.createElement('textarea');

              textArea.classList.add('shadow', 'appearance-none', 'border', 'rounded', 'w-full', 'py-2', 'px-3', 'text-gray-700', 'leading-tight', 'focus:outline-none', 'focus:shadow-outline', 'resize-vertical');
              textArea.rows = '3';
              textArea.name = `question-${sectionIndex}-${questionIndex}`;
                textArea.placeholder = 'Your answer here';
              inputElement.appendChild(label);
              inputElement.appendChild(textArea);

              break;
    }

    questionDiv.appendChild(inputElement);
    return questionDiv;
}

surveyQuestions.forEach((section, sectionIndex) => {
    const sectionDiv = document.createElement('div');
    sectionDiv.classList.add('mb-8');

    const sectionHeading = document.createElement('h2');
      sectionHeading.classList.add('text-2xl', 'font-bold', 'mb-4', 'mt-6', 'text-center', 'bg-gray-200', 'py-2', 'rounded-md');
    sectionHeading.textContent = section.section;

    sectionDiv.appendChild(sectionHeading);

    section.questions.forEach((question, questionIndex) => {
        const questionElement = createQuestionElement(question, questionIndex, sectionIndex);
        sectionDiv.appendChild(questionElement);
        if (question.type !=='openText'){

        }
    });
    const openTextDiv = document.createElement('div');
    const openText = document.createElement('textarea');
    openText.rows= '3';
    openText.classList.add('shadow', 'appearance-none', 'border', 'rounded', 'w-full', 'py-2', 'px-3', 'text-gray-700', 'leading-tight', 'focus:outline-none', 'focus:shadow-outline', 'resize-vertical')
    openText.placeholder = 'Any other thoughts to share?'
    openTextDiv.appendChild(openText);
    sectionDiv.appendChild(openTextDiv);

    surveyContainer.appendChild(sectionDiv);
});

surveyForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    errorMessage.classList.add('hidden');

    const firstName = document.getElementById('firstName').value;
    let results = {};
    surveyQuestions.forEach((section, sectionIndex) => {
        results[section.section] = {};
        section.questions.forEach((question, questionIndex) => {
            if (question.type === 'openText'){
                results[section.section][question.statement] = document.querySelector(`textarea[name="question-${sectionIndex}-${questionIndex}"]`).value;

            } else {
                 results[section.section][question.statement] = document.querySelector(`input[name="question-${sectionIndex}-${questionIndex}"]:checked`)?.value || '';
            }
        });
    });
     const baserowData = {
      firstName: firstName,
    };
   for (const sectionName in results){
     for (const questionStatement in results[sectionName]){
          const question = surveyQuestions.find(section => section.section === sectionName)
              .questions.find(question => question.statement === questionStatement)
       const key = question.identifier;
       baserowData[key]=results[sectionName][questionStatement];
       }
      }
    try {
        const response = await fetch('https://faas-ams3-2a2df116.doserverless.co/api/v1/web/fn-de36936e-caf8-41eb-8caf-a697942675cd/default/ai-survey', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ baserowData })
          });
          
       if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
       }

      const responseData = await response.json();
      console.log('Data posted successfully to Baserow:', responseData);
      submitButton.textContent = 'Submitted ✓';

      // Show results after short delay
      setTimeout(async () => {
        await generateReport(results, baserowData);
        surveyForm.classList.add('hidden');
        resultsDiv.classList.remove('hidden');
      }, 500);

    } catch (error) {
      console.error('Error posting to Baserow:', error);
      submitButton.disabled = false;
      submitButton.textContent = 'Submit';
      errorMessage.textContent = 'Something went wrong while submitting. Please try again.';
      errorMessage.classList.remove('hidden');
    }
});

async function generateReport(results, userAnswers) {
    // Fetch group data for comparison
    const { data: groupData, isFiltered } = await fetchGroupData();
    const totalResponses = groupData.length;

    const reportDiv = document.createElement('div');
    reportDiv.classList.add('mt-4', 'container', 'mx-auto', 'px-4');

    const reportHeading = document.createElement('h2');
    reportHeading.classList.add('text-2xl', 'font-bold', 'mb-2', 'text-center');
    reportHeading.textContent = "Your results compared to the group";
    reportDiv.appendChild(reportHeading);

    const subHeading = document.createElement('p');
    subHeading.classList.add('text-gray-600', 'text-center', 'mb-6');
    subHeading.textContent = isFiltered
        ? `Based on ${totalResponses} respondent(s) from today`
        : `Based on ${totalResponses} respondent(s)`;
    reportDiv.appendChild(subHeading);

    resultsDiv.appendChild(reportDiv);

    // Iterate over surveyQuestions to guarantee correct order
    surveyQuestions.forEach(section => {
        const sectionName = section.section;
        const sectionDiv = document.createElement('div');
        sectionDiv.classList.add('mb-6', 'p-4', 'bg-white', 'shadow-md', 'rounded-lg');

        const sectionHeading = document.createElement('h3');
        sectionHeading.classList.add('text-xl', 'font-bold', 'mb-4', 'text-center', 'bg-gray-100', 'py-2', 'rounded');
        sectionHeading.textContent = sectionName;
        sectionDiv.appendChild(sectionHeading);
        reportDiv.appendChild(sectionDiv);

        section.questions.forEach(question => {
            const userAnswer = userAnswers[question.identifier];

            const questionDiv = document.createElement('div');
            questionDiv.classList.add('mb-6', 'border-b', 'border-gray-200', 'pb-4');

            const questionTitle = document.createElement('p');
            questionTitle.classList.add('font-semibold', 'mb-3');
            questionTitle.textContent = question.statement;
            questionDiv.appendChild(questionTitle);
            sectionDiv.appendChild(questionDiv);

            if (question.type === 'likert') {
                const options = question.options;
                const userAnswerIndex = parseInt(userAnswer) - 1;

                // Count group responses
                const counts = new Array(options.length).fill(0);
                groupData.forEach(row => {
                    const value = parseInt(row[question.identifier]);
                    if (value >= 1 && value <= options.length) {
                        counts[value - 1]++;
                    }
                });

                // Calculate percentage for user's answer
                const userAnswerCount = counts[userAnswerIndex] || 0;
                const percentage = totalResponses > 0
                    ? Math.round((userAnswerCount / totalResponses) * 100)
                    : 0;

                // Create chart with highlighted user answer
                const canvas = document.createElement('canvas');
                canvas.id = `chart-${sectionName}-${question.identifier}`;
                canvas.classList.add('w-full', 'max-h-48', 'mb-3');
                questionDiv.appendChild(canvas);

                const ctx = canvas.getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: options,
                        datasets: [{
                            label: 'Number of respondents',
                            data: counts,
                            backgroundColor: options.map((_, i) =>
                                i === userAnswerIndex
                                    ? 'rgba(34, 197, 94, 0.6)'  // Green for user's answer
                                    : 'rgba(156, 163, 175, 0.4)' // Gray for others
                            ),
                            borderColor: options.map((_, i) =>
                                i === userAnswerIndex
                                    ? 'rgb(34, 197, 94)'
                                    : 'rgb(156, 163, 175)'
                            ),
                            borderWidth: options.map((_, i) =>
                                i === userAnswerIndex ? 3 : 1
                            )
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { display: false }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: { stepSize: 1 }
                            }
                        }
                    }
                });

                // Add user answer indicator
                const userIndicator = document.createElement('div');
                userIndicator.classList.add('flex', 'items-center', 'gap-2', 'text-sm', 'mt-2');
                userIndicator.innerHTML = `
                    <span class="inline-block w-4 h-4 bg-green-500 rounded"></span>
                    <span>Your answer: <strong>${options[userAnswerIndex] || 'No answer'}</strong></span>
                    <span class="text-gray-500">— ${percentage}% of respondents also chose this</span>
                `;
                questionDiv.appendChild(userIndicator);

            } else if (userAnswer) {
                // Open text response
                const responseText = document.createElement('div');
                responseText.classList.add('bg-green-50', 'border-l-4', 'border-green-500', 'p-3', 'rounded');
                responseText.innerHTML = `<p class="text-sm text-gray-600 mb-1">Your answer:</p><p>${userAnswer}</p>`;
                questionDiv.appendChild(responseText);
            }
        });
    });

    resultsDiv.appendChild(reportDiv);
}