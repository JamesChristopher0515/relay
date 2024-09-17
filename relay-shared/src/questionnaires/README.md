## questionnaires

The `questionnaires` directory contains the code responsible for handling the logic and data related to questionnaires within the application. This includes functions for calculating scores, formatting scale values, retrieving question information, and more.

### Files

#### questionnaires/helpers/calculateMotivationScore.ts

This file exports a function `calculateMotivationScore` that takes a `QuestionnaireForCalculation` object and an array of `QuestionnaireResultAnswer` objects, and calculates a motivation score based on the answers. The function iterates through a list of motivation statements, finds the corresponding happiness and importance questions and answers, and applies a formula to calculate the final score.

#### questionnaires/helpers/formatScaleValue.ts

This file exports a function `formatScaleValue` that takes a number and formats it as a string, rounding it to the nearest integer if it ends in ".00".

#### questionnaires/helpers/getAllQuestionnaireQuestions.ts

This file exports a function `getAllQuestionnaireQuestions` that takes a `Questionnaire` object and returns an array of all the questions in the questionnaire, including their section index. It also exports a helper function `isQuestionAQuestion` that checks if a given `QuestionnaireQuestion` object represents an actual question (as opposed to some other type of content).

#### questionnaires/helpers/getMotivationStatements.ts

This file exports a function `getMotivationStatements` that returns an array of objects, each representing a motivation statement with a question and a description.

#### questionnaires/helpers/getQuestionInfo.ts

This file exports a function `getQuestionInfo` that takes a questionnaire and a question ID, and returns the corresponding question object and its associated scale.

#### questionnaires/helpers/getQuestionnaireAnswerText.ts

This file exports a function `getQuestionnaireAnswerText` that takes a `Questionnaire`, a `QuestionnaireQuestion`, and an answer index, and returns the text corresponding to that answer.

#### questionnaires/helpers/getQuestionnaireEditability.ts

This file exports a function `getQuestionnaireEditability` that takes a `Questionnaire` and a `User`, and returns an enum indicating the level of editability for the questionnaire (none, names only, or all).

#### questionnaires/helpers/getQuestionnaireMaxPossibleScore.ts

This file exports a function `getQuestionnaireMaxPossibleScore` that takes a `Questionnaire` and an evaluation function, and calculates the maximum possible score for the questionnaire.

#### questionnaires/helpers/getQuestionnaireOutputs.ts

This file exports several functions related to calculating questionnaire outputs. The main function, `getQuestionnaireResultOutputs`, takes a list of answers, a questionnaire, and an evaluation function, and returns the calculated outputs. The other functions, `getQuestionnaireScaleMax` and `getQuestionnaireOutput`, are helpers used by the main function.

#### questionnaires/helpers/getQuestionnaireRangeInfo.ts

This file exports a function `getQuestionnaireRangeInfo` that takes a `Questionnaire` and an output index, and returns information about the minimum and maximum values of the output's range.

#### questionnaires/helpers/isQuestionnaireAnswerValid.ts

This file exports a function `isQuestionnaireAnswerValid` that takes a `Questionnaire`, a question ID, and an answer value, and checks if the answer is valid for the given question.

#### questionnaires/helpers/mapQuestionAnswers.ts

This file exports a function `mapQuestionAnswers` that takes a `Questionnaire` and a `QuestionnaireQuestion`, and returns an array of objects representing the possible answers for that question, including the text for each answer.

#### questionnaires/helpers/questionnaireTypes.ts

This file exports a type `QuestionnaireForCalculation`, which is a partial type of `Questionnaire` that includes only the properties needed for calculation-related functions.
