const CodeQualityChecker = require('cqc');
const codeQualityChecker = new CodeQualityChecker(),
  // This will return a checkerResult object which include the check result
  cqcResult = codeQualityChecker.check(['src'], {
    ext: '.js,.vue',
    ignorePath: '.gitignore,.eslintignore',
    ignorePattern: 'src/utils/mescroll.js',
    // filterPattern: 'src/path/to/filterPattern',

    jscpdMinLines: 5,
    jspcdMinTokens: 70,
    complexityMax: 10,

    disableBase: false,
    disableSloc: false,
    disableJscpd: false,
    disableComplexity: true,

    format: undefined,
    verbose: true,
    thresholdJscpd: 3,
    thresholdComplexity: 10
  });

// Calling report function will console.log result like cli did
cqcResult.report({
  format: undefined,
  verbose: true,
  thresholdJscpd: 3,
  thresholdComplexity: 10
});
