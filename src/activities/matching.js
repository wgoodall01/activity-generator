import {shuffle} from '../lib/util.js';

function matching(vocab, params) {
  // Shuffle the vocab list, in-place.
  shuffle(vocab.words);

  // Limit the vocab list to params.num, if set
  if (params.num != null) {
    vocab.words = vocab.words.slice(0, params.num);
  }

  // Split the vocab list into [[i,term]...] and [[i,def]...] lists
  const indexedTerms = vocab.words.map((e, i) => [i, e[0]]);
  const indexedDefs = vocab.words.map((e, i) => [i, e[1]]);

  // Shuffle the definitions.
  shuffle(indexedDefs);

  // Zip the term/defs list into rows, increment indexes.
  const rows = indexedTerms.map((term, i) => [
    term[0] + 1,
    term[1],
    indexedDefs[i][0] + 1,
    indexedDefs[i][1]
  ]);

  // Render the template.
  return template({title: vocab.name, rows});
}

const template = ({title, rows}) => `
%%% Generated LaTeX by activity-generator %%%

\\documentclass{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage[margin=1in]{geometry}
\\usepackage{tabularx}
\\usepackage{ifthen}
\\usepackage{titling}
\\usepackage{setspace}
\\newboolean{answer_key}

%% Configuration %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\setboolean{answer_key}{true}
\\title{${title}}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\begin{document}
\\pagestyle{empty}
\\onehalfspacing

{\\huge \\centering \\thetitle\\par}
\\ifthenelse{\\boolean{answer_key}}{
  {\\large \\centering Answer Key\\par}
}{
  {\\large \\centering \\ \\par}
}
\\vspace{0.2in}

\\ifthenelse{\\boolean{answer_key}}{
  \\newcommand{\\matchRow}[4]{#1&#2&\\underline{\\makebox[20pt]{#3}}&#4\\\\}
}{
  \\newcommand{\\matchRow}[4]{#1&#2&\\underline{\\makebox[20pt]{}}&#4\\\\}
}
\\begin{tabularx}{\\textwidth}{lXlX}

${rows.map(e => `\\matchRow{${e[0]}}{${e[1]}}{${e[2]}}{${e[3]}}`).join('\n')}

\\end{tabularx}
\\end{document}
`;

export default matching;
