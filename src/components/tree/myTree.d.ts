export type TreeNode = {
  key: any;
  label: string;
  children?: TreeNode[];
  expanded?: boolean;
};
