String.prototype.format = function() {
    var delimitersSpecified = typeof arguments[0] === 'object';
    var delimiters = delimitersSpecified ? arguments[0] : {};
    delimiters.left = delimiters.left || '{';
    delimiters.right = delimiters.right || '}';

    var formattedString = this;
    var strIndex = 0;
    var i = delimitersSpecified ? 1 : 0;
    for (; i < arguments.length; i++) {
        var reg = new RegExp('\\' + delimiters.left + strIndex + '\\' + delimiters.right, 'gm');
        formattedString = formattedString.replace(reg, arguments[i]);
        strIndex++;
    }

    return formattedString;
};

String.prototype.formatForLatex = function () {
    var args = [{ left: '@', right: '@' }];
    for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    }

    return this.format.apply(this, args);
}

var QS = {
    aInput: null,
    bInput: null,
    cInput: null,
    answerTextarea: null,

    setup: function() {
        // Get all of the elements
        this.aInput = document.getElementById('a');
        this.bInput = document.getElementById('b');
        this.cInput = document.getElementById('c');
        this.answerTextarea = document.getElementById('answer');

        // Load the data from local storage
        if (localStorage.savedAInput) {
            this.aInput.value = localStorage.savedAInput;
            this.bInput.value = localStorage.savedBInput;
            this.cInput.value = localStorage.savedCInput;

            if (localStorage.savedAInput !== 0 || localStorage.savedBInput !== 0 || localStorage.savedCInput !== 0) {
                QS.printAnswer();
            }
        }

        // Add event listeners
        this.aInput.addEventListener('change', function () { QS.printAnswer.apply(QS) }, false);
        this.bInput.addEventListener('change', function () { QS.printAnswer.apply(QS) }, false);
        this.cInput.addEventListener('change', function () { QS.printAnswer.apply(QS) }, false);
    },

    printAnswer: function () {
        var a = parseInt(this.aInput.value, 10);
        var b = parseInt(this.bInput.value, 10);
        var c = parseInt(this.cInput.value, 10);

        // Print the answer to the screen
        var answerSteps = QS.solveEquation(a, b, c);

        var answerHtml = '';
        for (var i = 0; i < answerSteps.length; i++) {
            var currentAnswerStep = answerSteps[i];
            answerHtml += currentAnswerStep.explanation + '$$' + currentAnswerStep.latex + '$$';
        }
        
        this.answerTextarea.innerHTML = answerHtml;
        MathJax.Hub.Typeset();

        // Load the values into local storage
        localStorage.savedAInput = a;
        localStorage.savedBInput = b;
        localStorage.savedCInput = c;

    },

    solveEquation: function(a, b, c) {
        var hasI = ((Math.pow(b, 2) - 4 * a * c) < 0);
        var underSqrRt = hasI ? (4 * a * c - Math.pow(b, 2)) : (Math.pow(b, 2) - 4 * a * c);
        var denominator = 2 * a;

        console.log('a: ', a);
        console.log('b: ', b);
        console.log('c: ', c);
        console.log('hasI:', hasI);
        console.log('underSqrRt:', underSqrRt);
        console.log('denominator:', denominator);

        // If a = 0, the equation is not quadratic. Solve using x = -c/b 
        if (a === 0) {
            if (b === 0 && c === 0) {
                return [{
                    explanation: '<span class="error">Please enter values for a, b and c.</span>',
                    latex: '',
                }];
            } else if (b === 0 && c !== 0) {
                return [{
                    explanation: 'Invalid quadratic equation. If $a = b = 0$ and $c \\neq 0$ then the equation says',
                    latex: '0x^2 + 0x + @0@ = 0 \\implies @0@ = 0'.formatForLatex(c),
                }, {
                    explanation: 'which is invalid.',
                    latex: '',
                }];
            }

            var latex = 'x = -\\frac{c}{b} = -\\frac{@0@}{@1@}'.formatForLatex(c, b);

            var frac = {numerator: c, denominator: b}
            frac = QS.simplifyFraction(frac);

            if (frac.denominator) {
                latex += '= @0@\\frac{@1@}{@2@}'.formatForLatex(!frac.isNegative ? '-' : '', Math.abs(frac.numerator), Math.abs(frac.denominator));
            } else {
                 latex += '= @0@'.formatForLatex(frac.numerator * -1);
            }

            return [{
                explanation: 'Since $a = 0$, the equation is not quadratic so solve using the equation $x = -\\frac{c}{b}$',
                latex: latex,
            }];
        }

        return [{
            explanation: 'in progress',
            latex: '0',
        }];

        // A = B = C = 0 or B = C = 0 & A != 0 or A = C = 0; B != 0
        if ((a === 0 && b === 0 && c === 0) || (a !== 0 && b === 0 && c === 0) || (a === 0 && b !== 0 && c === 0)) {
            answer = 0;
        } else if (a === 0 && b === 0 && c !== 0) {// A = B = 0; C != 0
            answer = c;
        }  else if (a === 0 && b !== 0 && c !== 0) {// A = 0; B != 0; C != 0
            console.log(b, c, b % c, c % b);
            if (b % c === 0) {
                answer = -c / b;
            } else if (c % b === 0) {
                // Check to see if the first fraction can be reduced
                for (var i = 2; i < 100000; i++) {
                    if ((b % i === 0 && c % i === 0)) {
                        answer = -c / b;
                    }
                }
            } else {
                answer = -c.toString() + '\n________________________________________________\n' + b;
            }
        } else if (a !== 0 && b === 0 && c !== 0) {// A != 0; B = 0; C != 0

        } else if (a !== 0 && b !== 0 && c == 0) {// A != 0; B != 0; C = 0

        }

        /*
        if (a === 0 && b === 0 && c === 0) {
        answer = '0';
        } else if (a === 0) {
        answer = -c.toString() + '\n________________________________________________\n' + b;
        } else if (b === 0) {
        answer = '';
        } else if (c === 0) {
        }

        /*Beautify the answer */
        /*
        // Check to see if the first fraction can be reduced
        for ( i = 2; i < 100000; i++) {
        if (firstPartOfNumerator % i === 0 && denominator % i === 0) {
        denominatorOfFirstPartOfAnswer = denominator / i;
        firstPartOfTop2 = firstPartOfNumerator / i;
        }
        }

        if (hasI) {
        underSqrRt = secondPartOfSqrRt - bSquared;
        // Print in columns put firstPartOfNumerator and the underline and
        // the
        // first denominator for the first colom
        // Print the rest in the next column
        answer = firstPartOfNumerator + '                      √' + underSqrRt +
        '\n' + '____________________ ± ____________________i\n' +
        denominatorOfFirstPartOfAnswer + '                      ' + denominator;
        } else {
        answer = firstPartOfNumerator + '±√' + underSqrRt + '\n' +
        '_______________________________________\n' + '  ' + denominator;
        }*/
    },

    // http://stackoverflow.com/questions/2941048/how-to-simplify-fractions-in-c
    simplifyFraction: function(fraction) {
        var numerator = fraction.numerator;
        var denominator = fraction.denominator;

        if (numerator === 0) {
            numerator = 0;
            denominator = null;
        } else {
            var gcd = QS.gcd(numerator, denominator);
            numerator = numerator / gcd;
            denominator = denominator / gcd;

            if (denominator === 1) {
                denominator = null;
            }
        }

        return { isNegative: (numerator / denominator) < 0, numerator: numerator, denominator: denominator };
    },

    gcd: function (a, b) {
        while (b > 0) {
            var rem = a % b;
            a = b;
            b = rem;
        }

        return a;
    },
};
