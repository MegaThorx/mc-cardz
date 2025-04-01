```mermaid
erDiagram
    USERS
    TOPICS {
        string name
    }
    QUESTIONS {
        string text
    }
    ANSWERS {
        string text
        bool isCorrect
        bool isAiGenerated
    }

    TOPICS ||--|{ QUESTIONS : ""
    QUESTIONS ||--|{ ANSWERS : ""
```