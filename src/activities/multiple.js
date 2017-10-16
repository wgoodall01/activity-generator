import {shuffle, randomChoice} from '../lib/util.js';

const CHOICE_AMT = 5;

function multiple(vocab, params) {
  // Shuffle the vocab list
  shuffle(vocab.words);

  // Limit the vocab to params.num
  const usedWords = vocab.words.slice(0, params.num || vocab.words.length);

  const questions = usedWords.map(w => {
    // Pick some wrong answers
    const wrong = [];
    for (let i = 0; i < CHOICE_AMT; i++) {
      wrong.push(randomChoice(vocab.words));
    }

    // Make the choices and prompt
    const choices = wrong.map(e => ({correct: false, term: e[1]}));
    choices.push({correct: true, term: w[1]});
    const prompt = w[0];

    return {choices, prompt};
  });

  return template({title: vocab.name, questions});
}

const template = ({title, questions}) => `
%%% Generated LaTeX by matching.py %%%

\\documentclass{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage[margin=1in]{geometry}
\\usepackage{multicol}
\\usepackage{changepage}
\\usepackage{enumitem}
\\usepackage{ifthen}
\\usepackage{titling}
\\usepackage{setspace}
\\newboolean{answer_key}

%% Configuration %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\setboolean{answer_key}{false}
\\title{${title}}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\begin{document}
\\setlength{\\parindent}{0pt}
\\pagestyle{empty}

\\newenvironment{question}
  {\\par\\nobreak\\vfil\\penalty0\\vfilneg
   \\vtop\\bgroup}
  {\\par\\xdef\\tpd{\\the\\prevdepth}\\egroup
   \\prevdepth=\\tpd}
   
\\newenvironment{answercontainer}
	{\\begin{adjustwidth}{0.3in}{}\\begin{enumerate}[label=(\\Alph*)]}
    {\\end{enumerate}\\end{adjustwidth}}

{\\huge \\centering \\thetitle\\par}
\\ifthenelse{\\boolean{answer_key}}{
  {\\large \\centering Answer Key\\par}
}{
  {\\large \\centering \\ \\par}
}
\\vspace{0.2in}

\\ifthenelse{\\boolean{answer_key}}{
  \\newcommand{\\answerItem}[1]{\\underline{\\textbf{#1}}}
}{
  \\newcommand{\\answerItem}[1]{#1}
}

\\setlength{\\parskip}{3pt}

\\begin{multicols}{2}

${questions
  .map(
    ({prompt, choices}, ind) => `
\\begin{question}
\\makebox[0.3in][l]{${ind + 1}.}${prompt}
\\begin{answercontainer}
${choices
      .map(({correct, term}) => `\\item ` + (correct ? `\\answerItem{${term}}` : term))
      .join('\n')}
\\end{answercontainer}
\\end{question}
\\vspace{0.1in}

`
  )
  .join('\n')}


\\end{multicols}
\\end{document}

`;

export default multiple;
