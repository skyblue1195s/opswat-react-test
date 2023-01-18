export interface IDrawer {
  title: string;
  isOpen: boolean;
  disabled?: boolean;
  onClose: any;
  size?: string;
  children: any;
  paddingBottom?: number;
}

export interface IDrawerOperator {
  title: string;
  isOpen: boolean;
  isDisabled: boolean;
  onClose: any;
  children: any;
  action: string;
  onEdit: any;
}
