declare module '@editorjs/checklist' {
  import { BlockTool, BlockToolConstructable } from '@editorjs/editorjs';
  const CheckList: BlockToolConstructable;
  export default CheckList;
}

declare module '@editorjs/marker' {
  import { InlineTool } from '@editorjs/editorjs';
  const Marker: InlineTool;
  export default Marker;
}

declare module '@editorjs/link' {
  import { BlockTool, BlockToolConstructable } from '@editorjs/editorjs';
  const LinkTool: BlockToolConstructable;
  export default LinkTool;
}