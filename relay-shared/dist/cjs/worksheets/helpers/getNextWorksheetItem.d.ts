import { Worksheet, WorksheetItem } from '../../RelayTypes';
export default function getNextWorksheetItem(worksheet: Worksheet, currentItem: WorksheetItem): {
    sectionIndex: number;
    type: "worksheet" | "message" | "image" | "response-text" | "response-buttons" | "section-start";
    editorState: Record<string, unknown>;
    data: any;
    name: string;
    _id: string;
};
//# sourceMappingURL=getNextWorksheetItem.d.ts.map