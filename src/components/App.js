import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((questions) => setQuestions(questions));
  }, []);

  function AddQuestion(question) {
    setQuestions([...questions, question]);
  }

  function deleteQuestion(deltedQuestion) {
    const updatedQuestionList = questions.filter(
      (question) => question.id !== deltedQuestion.id
    );
    setQuestions(updatedQuestionList);
  }

  function updatedCorrectIndex(updatedQuestion) {
    const updatedAnswerIndex = questions.map((question) => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion;
      } else {
        return question;
      }
    });
    setQuestions(updatedAnswerIndex);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={AddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={deleteQuestion}
          onCorrectIndexUpdate={updatedCorrectIndex}
        />
      )}
    </main>
  );
}

export default App;
