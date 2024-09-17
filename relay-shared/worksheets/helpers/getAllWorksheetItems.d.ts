import { Worksheet } from '../../RelayTypes';
export default function getAllWorksheetItems(worksheet: Worksheet): {
    sectionIndex: number;
    type: "worksheet" | "message" | "image" | "response-text" | "response-buttons" | "section-start";
    editorState: Record<string, unknown>;
    data: any;
    name: string;
    _id: string;
}[];
//# sourceMappingURL=getAllWorksheetItems.d.ts.map