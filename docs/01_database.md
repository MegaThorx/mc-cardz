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

    USERS ||--|{ TOPICS : ""
    TOPICS ||--|{ QUESTIONS : ""
    QUESTIONS ||--|{ ANSWERS : ""
```