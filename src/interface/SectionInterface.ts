import CardInterface from "./CardInterface";

export default interface KanbanSection {
    id: string;
    title: string;
    cards: CardInterface[];
}