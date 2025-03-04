```mermaid
erDiagram
    USERS
    TOPICS {
        string name
    }
    QUESTIONS {
        string question
    }
    ANSWERS {
        string answer
        bool isCorrect
        bool isAiGenerated
    }

    USERS ||--|{ TOPICS : ""
    TOPICS ||--|{ QUESTIONS : ""
    QUESTIONS ||--|{ ANSWERS : ""
```