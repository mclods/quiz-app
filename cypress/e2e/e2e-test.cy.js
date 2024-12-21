import questions from '../fixtures/questions.json';

const QUESTION_TIMER_TIMEOUT = 10000;
const LOCK_QUESTION_TIMEOUT = 1000;
const RESULT_TIMEOUT = 2000;

describe('quiz-app e2e tests', () => {
  it('Load the App', () => {
    cy.visit('/');
    cy.getTestId('header-logo').should('exist');
    cy.getTestId('header-title').should('have.text', 'Quiz App');
  });

  it('Attempt the quiz by skipping all questions', () => {
    cy.clock();
    cy.visit('/');
    questions.forEach((question) => {
      cy.getTestId('question-text').should('have.text', question.text);
      question.answers.forEach((answer, index) => {
        cy.getTestId(`answer-${index}-btn`).should('have.text', answer.text);
      });
      cy.tick(QUESTION_TIMER_TIMEOUT);
    });
  });

  it('Attempt the quiz by answering all questions correctly', () => {
    const SELECTED_ANSWER_INDEX = 0;

    cy.clock();
    cy.visit('/');
    questions.forEach((question) => {
      cy.getTestId('question-text').should('have.text', question.text);

      // No answer is highlighted if nothing is selected
      question.answers.forEach((answer, index) => {
        cy.getTestId(`answer-${index}-btn`).should('have.text', answer.text);
        cy.getTestId(`answer-${index}-btn`).should(
          'have.css',
          'background-color',
          'rgb(96, 165, 250)'
        );
      });

      // Selected answer is locked and highlighted
      // All answers are disabled
      cy.getTestId(`answer-${SELECTED_ANSWER_INDEX}-btn`).click();
      cy.getTestId(`answer-${SELECTED_ANSWER_INDEX}-btn`).should('be.disabled');
      cy.getTestId(`answer-${SELECTED_ANSWER_INDEX}-btn`).should(
        'have.css',
        'background-color',
        'rgb(250, 204, 21)'
      );

      // Other answers are not highlighted
      question.answers.forEach((answer, index) => {
        if (index !== SELECTED_ANSWER_INDEX) {
          cy.getTestId(`answer-${index}-btn`).should('be.disabled');
          cy.getTestId(`answer-${index}-btn`).should(
            'have.css',
            'background-color',
            'rgb(96, 165, 250)'
          );
        }
      });

      cy.tick(LOCK_QUESTION_TIMEOUT);

      // If the selected answer is correct, it is highlighted in green
      cy.getTestId(`answer-${SELECTED_ANSWER_INDEX}-btn`).should('be.disabled');
      cy.getTestId(`answer-${SELECTED_ANSWER_INDEX}-btn`).should(
        'have.css',
        'background-color',
        'rgb(74, 222, 128)'
      );

      // Other answers are not highlighted
      question.answers.forEach((answer, index) => {
        if (index !== SELECTED_ANSWER_INDEX) {
          cy.getTestId(`answer-${index}-btn`).should('be.disabled');
          cy.getTestId(`answer-${index}-btn`).should(
            'have.css',
            'background-color',
            'rgb(96, 165, 250)'
          );
        }
      });

      cy.tick(RESULT_TIMEOUT);
    });
  });

  it('Attempt the quiz by answering all questions wrong', () => {
    const SELECTED_ANSWER_INDEX = 1;

    cy.clock();
    cy.visit('/');
    questions.forEach((question) => {
      cy.getTestId('question-text').should('have.text', question.text);

      // No answer is highlighted if nothing is selected
      question.answers.forEach((answer, index) => {
        cy.getTestId(`answer-${index}-btn`).should('have.text', answer.text);
        cy.getTestId(`answer-${index}-btn`).should(
          'have.css',
          'background-color',
          'rgb(96, 165, 250)'
        );
      });

      // Selected answer is locked and highlighted
      // All answers are disabled
      cy.getTestId(`answer-${SELECTED_ANSWER_INDEX}-btn`).click();
      cy.getTestId(`answer-${SELECTED_ANSWER_INDEX}-btn`).should('be.disabled');
      cy.getTestId(`answer-${SELECTED_ANSWER_INDEX}-btn`).should(
        'have.css',
        'background-color',
        'rgb(250, 204, 21)'
      );

      // Other answers are not highlighted
      question.answers.forEach((answer, index) => {
        if (index !== SELECTED_ANSWER_INDEX) {
          cy.getTestId(`answer-${index}-btn`).should('be.disabled');
          cy.getTestId(`answer-${index}-btn`).should(
            'have.css',
            'background-color',
            'rgb(96, 165, 250)'
          );
        }
      });

      cy.tick(LOCK_QUESTION_TIMEOUT);

      // If the selected answer is wrong, it is highlighted in red
      cy.getTestId(`answer-${SELECTED_ANSWER_INDEX}-btn`).should('be.disabled');
      cy.getTestId(`answer-${SELECTED_ANSWER_INDEX}-btn`).should(
        'have.css',
        'background-color',
        'rgb(248, 113, 113)'
      );

      // Other answers are not highlighted
      question.answers.forEach((answer, index) => {
        if (index !== SELECTED_ANSWER_INDEX) {
          cy.getTestId(`answer-${index}-btn`).should('be.disabled');
          cy.getTestId(`answer-${index}-btn`).should(
            'have.css',
            'background-color',
            'rgb(96, 165, 250)'
          );
        }
      });

      cy.tick(RESULT_TIMEOUT);
    });
  });
});
