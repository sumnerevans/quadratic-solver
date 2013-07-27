var QS = {
    aInput: null,
    bInput: null,
    cInput: null,
    answerTextarea: null,

    setup: function () {
        // Get all of the elements
        aInput = document.getElementById('a');
        bInput = document.getElementById('b');
        cInput = document.getElementById('c');
        answerTextarea = document.getElementById('answer');

        // Load the data from local storage
        if (localStorage.savedAInput) {
            aInput.value = localStorage.savedAInput;
            bInput.value = localStorage.savedBInput;
            cInput.value = localStorage.savedCInput;
            QS.solveEquation();
        }

        // Add event listeners
        aInput.addEventListener('change', QS.solveEquation, false);
        bInput.addEventListener('change', QS.solveEquation, false);
        cInput.addEventListener('change', QS.solveEquation, false);
    },

    solveEquation: function () {
		var a = aInput.value,
			b = bInput.value,
			c = cInput.value;
			
			console.log(a, b, c);
			
			/*
			bSquared = Math.pow(b, 2),
			secondPartOfSqrRt = 4 * a * c,
			sqrRt = bSquared - secondPartOfSqrRt,
			denominator = 2 * a,
			denominatorOfFirstPartOfAnswer = denominator,
			firstPartOfTop = -b,
			firstPartOfTop2 = firstPartOfTop,
			
			answer,
			hasI = secondPartOfSqrRt > bSquared
			
			i = 0;
			
			
		/* Beautify the answer *
		
		// Check to see if the first fraction can be reduced
		for (i = 2; i < 100000; i++) {
			if (firstPartOfTop % i === 0 && denominator % i === 0){
				denominatorOfFirstPartOfAnswer = denominator / i;
				firstPartOfTop2 = firstPartOfTop / i;
			}
		}
		
		if (denominator === 0) {
			answer = 'undefined';
		} else if (hasI) {
			sqrRt = secondPartOfSqrRt - bSquared;
			// Print in columns put firstPartOfTop and the underline and the first denominator for the first colom
            // Print the rest in the next column
            answer = firstPartOfTop + '                      √' + sqrRt + '\n' +
                    '____________________ ± ____________________i\n' +
                    + denominatorOfFirstPartOfAnswer + '                      ' + denominator;
		} else {
			answer = firstPartOfTop + '±√' + sqrRt + '\n' +
                    '_______________________________________\n' +
                    '  ' + denominator;
		}
		
		// Print the answer to the screen
		answerTextarea.value = answer;*/
    }
};
