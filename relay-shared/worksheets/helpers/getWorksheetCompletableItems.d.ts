import { Worksheet } from '../../RelayTypes';
export default function getWorksheetCompletableItems(worksheet: Worksheet): {
    nameWithLetter: string;
    letter: string;
    sectionIndex: number;
    type: "worksheet" | "message" | "image" | "response-text" | "response-buttons" | "section-start";
    editorState: Record<string, unknown>;
    data: any;
    name: string;
    _id: string;
}[];
//# sourceMappingURL=getWorksheetCompletableItems.d.ts.map