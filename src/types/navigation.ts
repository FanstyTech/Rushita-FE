import { IconType } from 'react-icons';

export interface NavItem {
  name: string;
  id: string;
  icon: IconType;
  href?: string;
  description?: string;
  children?: NavItem[];
  permission?: string;
}
