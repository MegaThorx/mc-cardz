export default class Answer {
    id: string = '';
    questionId: string = '';
    text: string = '';
    isCorrect: boolean = false;
    isAiGenerated: boolean = false;
    
    constructor(id: string, questionId: string, text: string, isCorrect: boolean, isAiGenerated: boolean) {
        this.id = id;
        this.questionId = questionId;
        this.text = text;
        this.isCorrect = isCorrect;
        this.isAiGenerated = isAiGenerated;
    }
}