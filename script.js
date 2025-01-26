const surveyContainer = document.getElementById('survey-container');
const surveyForm = document.getElementById('surveyForm');
const resultsDiv = document.getElementById('results');

const surveyQuestions = [
    {
        section: "Productivity Changes",
        questions: [
            {
                statement: "The use of AI tools has increased the speed at which I complete tasks.",
                type: "likert",
                options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            },
            {
                statement: "The use of AI tools has changed the volume of work I can complete.",
                type: "likert",
                options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            },
            {
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
                statement: "The introduction of AI has led to changes in the skills I need to perform my job.",
                type: "likert",
                options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            },
            {
                statement: "The skills I previously needed are now less important.",
                 type: "openText",
            },
            {
                statement: "New skills have become more important due to AI introduction.",
                 type: "openText",
            },
            {
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
                statement: "The introduction of AI has changed the scope or responsibilities of my job.",
                type: "likert",
                options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            },
            {
                statement: "The scope and responsibilities of my job have changed due to the introduction of AI.",
                 type: "openText",
            },
            {
                statement: "AI has the potential to replace some of the tasks I currently perform.",
                type: "likert",
                options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            },
            {
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
                statement: "I feel responsible for the output generated by AI tools I use.",
                type: "likert",
                options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            },
            {
                statement: "I have sufficient understanding of how the AI tools I use make decisions.",
                type: "likert",
                options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            },
            {
                statement: "I trust that my colleagues are using AI responsibly.",
                type: "likert",
                options: ["Not at all", "A little", "Moderately", "A lot", "Completely"],
            },
            {
                statement: "Management provides sufficient guidance on the use of AI.",
                type: "likert",
                options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            },
            {
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
                statement: "The introduction of AI has made my job more or less interesting.",
                type: "likert",
                options: ["Significantly less interesting", "Slightly less interesting", "No change", "Slightly more interesting", "Significantly more interesting"],
            },
            {
                statement: "AI is positioned as a tool for job enrichment rather than just for productivity gain.",
                type: "likert",
                options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
            },
            {
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
                statement: "I am provided with adequate training and support to use AI effectively.",
                type: "likert",
                options: ["Not at all", "A little", "Moderately", "A lot", "Completely"],
            },
            {
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
                statement: "Overall, AI has impacted my work experience.",
                type: "likert",
                options: ["Very Negative", "Negative", "Neutral", "Positive", "Very Positive"],
            },
            {
                statement: "What is the main benefit you have experienced since your department started using AI?",
                 type: "openText",
            },
            {
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
            inputElement.classList.add('flex', 'space-x-2', 'my-2');
            question.options.forEach((option, optionIndex) => {
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.id = `question-${sectionIndex}-${questionIndex}-option-${optionIndex}`;
                radio.name = `question-${sectionIndex}-${questionIndex}`;
                radio.value = option;
                radio.classList.add('hidden');

                const label = document.createElement('label');
                label.htmlFor = `question-${sectionIndex}-${questionIndex}-option-${optionIndex}`;
                label.textContent = option;
                label.classList.add('bg-gray-200', 'hover:bg-gray-300', 'border', 'border-gray-400', 'rounded-md', 'py-1', 'px-2', 'cursor-pointer', 'text-center', 'block', 'w-full', 'transition-colors','duration-200', 'focus:outline-none','focus:ring','focus:ring-blue-200');

                if (option === 'Neutral'){
                    label.classList.add('font-bold', 'flex', 'justify-center', 'items-center','bg-gray-300');
                }

                inputElement.appendChild(radio);
                inputElement.appendChild(label);


              label.addEventListener('click', function(){
                //remove 'selected' class on all sibling labels
                label.parentElement.querySelectorAll('label').forEach(siblingLabel => siblingLabel.classList.remove('bg-green-300','shadow-md'));
                label.classList.add('bg-green-300','shadow-md')
              });

            });
            break;
          case 'openText':
            inputElement = document.createElement('div');
            const label = document.createElement('label');
              label.textContent = "Please explain further";
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

surveyForm.addEventListener('submit', function(event) {
    event.preventDefault();

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
    generateReport(results);

    surveyForm.classList.add('hidden');
    resultsDiv.classList.remove('hidden');
});

function generateReport(results) {
    const reportDiv = document.createElement('div');
    reportDiv.classList.add('mt-4');
    const reportHeading = document.createElement('h2');
    reportHeading.classList.add('text-2xl', 'font-bold', 'mb-2', 'text-center');
    reportHeading.textContent = "Survey Results Report";
    reportDiv.appendChild(reportHeading);
    resultsDiv.appendChild(reportDiv);

    for (const sectionName in results) {
        const sectionResults = results[sectionName];
        const sectionDiv = document.createElement('div')
        sectionDiv.classList.add('mb-4', 'p-4','border', 'border-gray-400', 'rounded-md');

        const sectionHeading = document.createElement('h3');
        sectionHeading.classList.add('text-xl', 'font-bold', 'mb-2', 'text-center');
        sectionHeading.textContent = sectionName;
        sectionDiv.appendChild(sectionHeading);
        reportDiv.appendChild(sectionDiv);

        for (const questionStatement in sectionResults) {
            const questionResult = sectionResults[questionStatement];

            const questionDiv = document.createElement('div');
            questionDiv.classList.add('mb-4', 'border-b', 'border-gray-300', 'pb-4');

            const questionTitle = document.createElement('p');
            questionTitle.classList.add('font-semibold', 'mb-1')
            questionTitle.textContent = questionStatement;
            questionDiv.appendChild(questionTitle);
             sectionDiv.appendChild(questionDiv);

            if (surveyQuestions.find(section => section.section === sectionName).questions.find(question => question.statement === questionStatement).type === 'likert'){

                const labels = surveyQuestions.find(section => section.section === sectionName).questions.find(question => question.statement === questionStatement).options
                const counts = labels.reduce((acc, label) => {
                    acc[label] = 0
                    return acc;
                }, {})

                for (const sectionName2 in results){
                    for (const questionStatement2 in results[sectionName2]){
                        if (questionStatement2 == questionStatement){
                            counts[results[sectionName2][questionStatement2]]++;

                        }
                    }
                }
                const canvas = document.createElement('canvas');
                canvas.id = `chart-${sectionName}-${questionStatement.replace(/\s+/g, '-')}`; // Ensure unique IDs
                canvas.classList.add('w-full', 'max-h-40','mb-4')
                questionDiv.appendChild(canvas);

                const ctx = canvas.getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: Object.keys(counts),
                        datasets: [{
                            label: 'Responses',
                            data: Object.values(counts),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 205, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(54, 162, 235, 0.2)'
                            ],
                            borderColor: [
                                'rgb(255, 99, 132)',
                                'rgb(255, 159, 64)',
                                'rgb(255, 205, 86)',
                                'rgb(75, 192, 192)',
                                'rgb(54, 162, 235)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales:{
                            y:{
                                ticks:{
                                    stepSize:1,
                                }
                            }
                        }
                    }
                });


            } else if (questionResult) {
                const responseText = document.createElement('div');
              responseText.innerHTML = `<h4 class="text-md font-semibold mb-2 mt-4">User Comments:</h4><p>${questionResult}</p>`;
                 questionDiv.appendChild(responseText);
            }
        }
    }
    const downloadButton = document.createElement('button');
      downloadButton.classList.add('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'focus:outline-none', 'focus:shadow-outline', 'mt-4');
    downloadButton.textContent = "Download PDF";
      downloadButton.addEventListener('click', function() {
        generatePdf(reportDiv);
    });

    resultsDiv.appendChild(reportDiv);
      resultsDiv.appendChild(downloadButton)


}
function generatePdf(reportDiv) {
    const { jsPDF } = window.jspdf;
      const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text('AI Impact Survey Results', 10, 10);

      let yPosition = 30; // Initial Y position
    const elements = reportDiv.querySelectorAll('div');

    elements.forEach(element =>{
      const text = element.textContent;
       const chart = element.querySelector('canvas')
       if (text && text.trim()){
         const lines = pdf.splitTextToSize(text, 180);
         pdf.setFontSize(12);
         pdf.text(lines, 10, yPosition)
         yPosition += (lines.length * 6);
      }
      if (chart){
         const imgData = chart.toDataURL('image/png');
         pdf.addImage(imgData, 'PNG', 15, yPosition, 170, 80)
           yPosition += 90
        }
    })



    pdf.save("survey_report.pdf");
}